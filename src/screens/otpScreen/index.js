import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {colors, images} from '../../constants';
import CustomHeader from '../../components/CustomHeader';
import OtpField from '../../components/OtpField';
import {AuthContext} from '../../utils/context';
import {showMessage} from 'react-native-flash-message';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {loader} from '../../redux/actions/loader';
import EncryptedStorage from 'react-native-encrypted-storage';
import { cleanSingle } from 'react-native-image-crop-picker';

const OtpScreen = ({navigation, route}) => {
  const {loginData, mobileNo} = route.params;
  const {signIn} = useContext(AuthContext);
  const [resendOtp, setresendOtp] = useState(true);
  const [timerCount, setTimer] = useState(60);
  const dispatch = useDispatch();
  useEffect(() => {
    showMessage({message: `${loginData.otp} this is the otp for now`});
    let interval = setInterval(() => {
      setTimer(lastTimerCount => {
        lastTimerCount <= 1 && clearInterval(interval);
        return lastTimerCount - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const sendOtpHandler = () => {
    setTimer(60);
    let interval = setInterval(() => {
      setTimer(lastTimerCount => {
        lastTimerCount <= 1 && clearInterval(interval);
        return lastTimerCount - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  };

  const onSubmitOTP = async val => {
    const session = await EncryptedStorage.getItem('fcm_id');
    if (session) {
      const token = JSON.parse(session).fcm_id;
       console.log('token===>>',token);
      if (val == loginData.otp) {
        axios
          .post(
            `http://tuketuke.azurewebsites.net/api/Login/DriverLoginWithOutPassword`,
            {
              mobile_No: `${mobileNo}`,
              password: '',
              fcM_ID: token,
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            },
          )
          .then(async function (response) {
            if (response.status == 200) {
              if (response.data.status == 'Success') {
                await EncryptedStorage.setItem(
                  'user_signin',
                  JSON.stringify({
                    signData: response.data,
                  }),
                );
                navigation.navigate('VehicleScreen');
                dispatch(loader(false));
              } else {
                dispatch(loader(false));
              }
            } else {
              dispatch(loader(false));
            }
          })
          .catch(function (error) {
            showMessage({
              message: `${error.response.status} ${error.response.statusText}`,
              type: 'warning',
            });
            dispatch(loader(false));
          });
      } else {
        showMessage({message: 'otp not match', type: 'warning'});
      }
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
        <View style={styles.verificationTextView}>
          <Text style={styles.verificationText}>Enter verification number</Text>
        </View>
        <OtpField onSubmitOTP={val => onSubmitOTP(val)} />
      </View>
      {resendOtp && timerCount ? (
        <Text style={styles.sendOtp}>
          {`We will resend you verification code in ${timerCount}\nseconds`}
        </Text>
      ) : (
        <TouchableOpacity onPress={sendOtpHandler}>
          <Text style={[styles.sendOtp, {color: 'red'}]}>Resend</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  appLogo: {
    width: 80,
    height: 60,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 9,
  },
  sendOtp: {
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 25,
    textAlign: 'center',
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
  verificationTextView: {
    alignItems: 'center',
    marginTop: 45,
    fontSize: 19,
    marginBottom: 12,
  },
  verificationText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
});
