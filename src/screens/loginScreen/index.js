import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState,useContext,useRef,useEffect} from 'react';
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
import PhoneInput from 'react-native-phone-number-input';
import Geolocation from 'react-native-geolocation-service';

const LoginScreen = ({navigation}) => {
  const [number, setnumber] = useState('');
  const [value, setValue] = useState('');
  const [isError, setIsError] = useState(false);
  const [formattedValue, setFormattedValue] = useState('');
  const [countryCode, setCountryCode] = useState('');
  console.log('countryCode: ', countryCode);
  const [appData, setAppData] = useContext(ApplicationContext);
  const [currLoc, setcurrLoc] = useState("")
  const phoneInput = useRef();

  const dispatch = useDispatch();

  const getCurrentLocation = () =>
    new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        position => {
          const cords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            heading: position?.coords?.heading,
          };
          setcurrLoc(cords)
          resolve(cords);
        },
        error => {
          reject(error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    });

  

    useEffect(() => {
     getCurrentLocation()
    }, [])
    

  const onConfirmHandler = async () => {
    if (!number) { 
      setIsError(true);
    } else {
      dispatch(loader(true));
      const ddd = encodeURIComponent('+');
      console.log('number: ', number);
      axios
        .post(
          `https://tuketuke.com/api/Login/SMSNotification`,
          {
            // mobile_No: formattedValue,
            mobile_No: "+85268135921",
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
        .then(function (response) {
          console.log('response: ', response.data);
          if (response.status == 200) {
            const {data} = response;

            if (data.status == 'Success') {
              dispatch(loader(false));
              setAppData({...appData,mobile_No:number})
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
        console.log('error: ', error);
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
        <PhoneInput
          ref={phoneInput}
          defaultValue={value}
          defaultCode = 'NG'
          layout="second"
          onChangeText={text => {
            setnumber(text);
          }}
          onChangeFormattedText={text => {
          console.log('text: ', text);
            setFormattedValue(text);
            setCountryCode(phoneInput.current?.state.code || '');
          }}
          countryPickerProps={{withAlphaFilter: true}}
          // disabled={disabled}

          withDarkTheme
          withShadow
          autoFocus
          containerStyle={{
            height: h(7),
            width: w(90),
            alignSelf: 'center',
          }}
          textInputStyle={{
            height: h(7),
            marginLeft: w(-3),
            fontSize: fs(16),
          }}
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
        <Text style={{textAlign: 'center', marginTop: h(2), fontSize: fs(16),color:'#000'}}>
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
    color:'#000'
  },
  otpSendText: {
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 25,
    fontSize: 15,
    color:'#000'
  },
  passwordText: {
    alignSelf: 'center',
    marginTop: 22,
    fontSize: 16,
  },
});
