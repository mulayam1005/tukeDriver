import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {colors, images} from '../../constants';
import CommonInputField from '../../components/CommonInputField';
import {h, regx, w} from '../../config';
import CommonBtn from '../../components/CommonBtn';
import CustomHeader from '../../components/CustomHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';



const LoginScreen = ({navigation}) => {
  const [number, setnumber] = useState('');
  const [isError, setIsError] = useState(false);


  

  const onConfirmHandler = async () => {
    if (!number) {
      setIsError(true);
    
    } else {
      setIsError(false);
      axios
        .get(
          `http://192.168.0.178:5001/api/Login/CheckUserDriver?Mobile_No=${number}`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
        // axios
        //   .get('http://192.168.0.178:5001/api/Login/CheckUserDriver')
        .then(function (response) {
          console.log('respons===>>', response);
          navigation.navigate('OtpScreen');
        })
        .catch(function (error) {
          alert("phone number not found")
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
          maxLength={10}
          keyboardType={'numeric'}
          warningTitle={
            !number
              ? `Mobile Number is required`
              : `Please enter your valid mobile number!`
          }
          warning={
            !number
              ? isError
              : number && !regx.phoneLastTen.test(number)
          }
        />
      </View>
      <Text style={styles.otpSendText}>
        {' '}
        We will send you verification to this number
      </Text>
      <CommonBtn text="Confirm" onPress={onConfirmHandler} customBtnStyle={styles.loginBtn} />
      <TouchableOpacity
        onPress={() => navigation.navigate('LoginWithPassword')}>
        <Text style={styles.passwordText}>Login with a password </Text>
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
  },
  passwordText: {
    alignSelf: 'center',
    marginTop: 22,
    fontSize: 16,
  },
  loginBtn: {
    width: 355,
    padding: 11,
    backgroundColor:colors.hex_f66820
  },
});
