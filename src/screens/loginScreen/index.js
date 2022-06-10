import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState,useContext} from 'react';
import {colors, images} from '../../constants';
import CommonInputField from '../../components/CommonInputField';
import {fs, h, regx, w} from '../../config';
import CommonBtn from '../../components/CommonBtn';
import CustomHeader from '../../components/CustomHeader';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {loader} from '../../redux/actions/loader';
import {showMessage, hideMessage} from 'react-native-flash-message';
import { ApplicationContext } from '../../utils/context';


const LoginScreen = ({navigation}) => {
  const [number, setnumber] = useState('+919874563000');
  const [isError, setIsError] = useState(false);
  const [appData, setAppData] = useContext(ApplicationContext);

  const dispatch = useDispatch();

  const onConfirmHandler = async () => {
    if (!number) { 
      setIsError(true);
    } else {
      dispatch(loader(true));
      const ddd = encodeURIComponent('+');
      axios({
        url: `http://tuketuke.azurewebsites.net/api/Login/SMSNotification?Mobile_No=${ddd}${number}`,
        method: 'post',
        headers: {
          // Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then(function (response) {
          console.log('response: ', response.data);
          if (response.status == 200) {
            const {data} = response;

            if (data.status == 'Success') {
              dispatch(loader(false));
              setAppData({mobile_No:number})
              navigation.navigate('OtpScreen', {
                loginData: data.data,
                mobileNo: number,
              });
            } else {
              dispatch(loader(false));
              showMessage({
                message: `${data.message} `,
                type: 'warning',
              });
            }
          } else {
            dispatch(loader(false));
            showMessage({
              message: `${response.statusText} `,
              type: 'warning',
            });
          }
        })
        .catch(function (error) {
          dispatch(loader(false));
          showMessage({
            message: `${error.response.status} ${error.response.statusText}`,
            type: 'warning',
          });
        });
    }
  };

  return (
    <View style={styles.container}>
      <CustomHeader onPress={() => navigation.goBack()} />
      <View style={{marginTop: 60}}>
        <View>
          <Image source={images.commonLogo} style={styles.appLogo} />
          <Text style={styles.heading}>Login to Tuketuke</Text>
        </View>
        <View style={styles.inputFieldContainer}>
          <Text style={styles.fieldName}>Enter your number</Text>
        </View>
        <CommonInputField
          value={number}
          onChangeText={text => setnumber(text)}
          maxLength={15}
          keyboardType={'phone-pad'}
          warningTitle={
            !number
              ? `Mobile Number is required`
              : `Please enter your valid mobile number!`
          }
          warning={!number ? isError : false}
        />
      </View>
      <Text style={styles.otpSendText}>
        We will send you verification to this number
      </Text>
      <CommonBtn
        text="Confirm"
        onPress={onConfirmHandler}
        customBtnStyle={{
          padding: 12,
          width: w(85),
          backgroundColor: colors.hex_f56725,
        }}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate('LoginWithPassword')}>
        <Text style={{textAlign: 'center', marginTop: h(2), fontSize: fs(16)}}>
          Login with a password{' '}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  appLogo: {
    width: 80,
    height: 60,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 9,
  },
  container: {
    flex: 1,
    backgroundColor: 'lightgray',
  },
  heading: {
    alignSelf: 'center',
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  inputFieldContainer: {
    alignItems: 'center',
    marginTop: 28,
    fontSize: 19,
    marginBottom: 12,
  },
  fieldName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  otpSendText: {
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 25,
    fontSize: 15,
  },
  passwordText: {
    alignSelf: 'center',
    marginTop: 22,
    fontSize: 16,
  },
});
