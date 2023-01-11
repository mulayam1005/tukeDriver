import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState, useContext, useRef, useEffect} from 'react';
import {colors, images} from '../../constants';
import CommonInputField from '../../components/CommonInputField';
import {fs, h, regx, w} from '../../config';
import CommonBtn from '../../components/CommonBtn';
import CustomHeader from '../../components/CustomHeader';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {loader} from '../../redux/actions/loader';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {ApplicationContext} from '../../utils/context';
import PhoneInput from 'react-native-phone-number-input';
import Geolocation from 'react-native-geolocation-service';

const LoginScreen = ({navigation}) => {
  const [number, setnumber] = useState('');
  const [value, setValue] = useState('');
  const [isError, setIsError] = useState(false);
  const [formattedValue, setFormattedValue] = useState('');
  const [countryCode, setCountryCode] = useState('');

  const [appData, setAppData] = useContext(ApplicationContext);
  const [currLoc, setcurrLoc] = useState('');
  const phoneInput = useRef();
  const [driveName, setDriverName] = useState('');
  const [licenseData, setLicenseData] = useState('');

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
          setcurrLoc(cords);
          resolve(cords);
        },
        error => {
          reject(error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    });

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const onConfirmHandler = async () => {
    if (!number) {
      setIsError(true);
    } else {
      dispatch(loader(true));
      const ddd = encodeURIComponent('+');

      axios
        .post(
          `https://tuketuke.com/api/Login/SMSNotification`,
          {
            mobile_No: formattedValue,
            //  mobile_No: "+85268135921",
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
        .then(function (response) {
          if (response.status == 200) {
            const {data} = response;
            console.log('data=>', data);
            if (data.status == 'Success') {
              dispatch(loader(false));
              setAppData({
                ...appData,
                mobile_No: data.data.mobileNo,
                driver_Name: driveName,
                licences_No: licenseData,
              });
              navigation.navigate('OtpScreen', {
                loginData: data.data,
               
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
      <ScrollView>
        <View style={{marginTop: 60}}>
          <View>
            <Image source={images.commonLogo} style={styles.appLogo} />
            <Text style={styles.heading}>Login to Tuketuke</Text>
          </View>
          <View style={styles.inputFieldContainer}>
            <Text style={styles.fieldName}> Please Enter Driver Details</Text>
          </View>
        </View>

        <View style={{marginTop: 0}}>
          <CommonInputField
            placeholder="Enter Driver Full Name"
            value={driveName}
            onChangeText={data => setDriverName(data)}
            maxLength={15}
            secureTextEntry={false}
            warningTitle={!driveName ? `Drive Name is Required.` : ``}
            warning={!driveName ? isError : driveName}
          />
        </View>
        <View style={{marginTop: 30}}>
          <CommonInputField
            placeholder="Enter Driver License Number"
            value={licenseData}
            onChangeText={data => setLicenseData(data)}
            maxLength={15}
            secureTextEntry={false}
            warningTitle={!licenseData ? `License Number is Required` : ``}
            warning={!licenseData ? isError : licenseData}
          />
        </View>
        <View style={{marginTop: 30}}>
          <PhoneInput
            ref={phoneInput}
            defaultValue={value}
            defaultCode="NG"
            layout="second"
            onChangeText={text => {
              setnumber(text);
            }}
            onChangeFormattedText={text => {
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
            marginTop: 20,
            backgroundColor: colors.hex_f56725,
          }}
        />

        <TouchableOpacity
          onPress={() => navigation.navigate('LoginWithPassword')}>
          <Text
            style={{
              textAlign: 'center',
              marginTop: h(2),
              fontSize: fs(16),
              color: '#000',
            }}>
            Login with a password{' '}
          </Text>
        </TouchableOpacity>
      </ScrollView>
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
    color: '#000',
  },
  otpSendText: {
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 0,
    fontSize: 15,
    color: '#000',
  },
  passwordText: {
    alignSelf: 'center',
    marginTop: 22,
    fontSize: 16,
  },
});
