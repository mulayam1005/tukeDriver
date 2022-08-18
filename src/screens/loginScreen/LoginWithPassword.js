import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState, useContext,useRef} from 'react';
import {colors} from '../../constants';
import CommonInputField from '../../components/CommonInputField';
import {regx, w,h,fs} from '../../config';
import CommonBtn from '../../components/CommonBtn';
import CustomHeader from '../../components/CustomHeader';
import {MOBILE_NUMBER} from '../../redux/constants/type';
import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import {AuthContext} from '../../utils/context';
import {useDispatch} from 'react-redux';
import {loader} from '../../redux/actions/loader';
import {_checkInternet} from '../../utils/internet';
import NoInternet from '../../components/NoInternet';
import {showMessage} from 'react-native-flash-message';
import PhoneInput from 'react-native-phone-number-input';

const LoginWithPassword = ({navigation}) => {
  const [number, setnumber] = useState('');
  const [password, setpassword] = useState('');
  const [isError, setIsError] = useState(false);
  const [isNet, setIsNet] = useState(true);
  const [formattedValue, setFormattedValue] = useState('');
  console.log('formattedValue: ', formattedValue);
  const [countryCode, setCountryCode] = useState('');
  console.log('countryCode: ', countryCode);
  const phoneInput = useRef(null);

  const {signIn} = useContext(AuthContext);

  const dispatch = useDispatch();

  const onConfirmHandler = async () => {
    const session = await EncryptedStorage.getItem('fcm_id');
    if (session) {
      const token = JSON.parse(session).fcm_id;
      console.log('token: ', token);
      if (!formattedValue) {
      // console.log('formattedValue: ', formattedValue);
      // console.log('password: ', password);
        setIsError(true);
      } else {
        const net = await _checkInternet();
        console.log('net: ', net);
        if (net) {
          setIsNet(true);
          dispatch(loader(true));
          setIsError(false);
          axios
            .post('https://tuketuke.com/api/Login/DriverLogin', {
              password: password,
              mobile_No: formattedValue,
              fcM_Id: token,
            })
            .then(async function (response) {
            console.log('response: ', response);
              dispatch(loader(false));
              if (response.status == 200) {
                dispatch(loader(false));

                try {
                  await EncryptedStorage.setItem(
                    'user_signin',
                    JSON.stringify({
                      signData: response.data,
                    }),
                  );
                  navigation.navigate('VehicleScreen');
                } catch (error) {
                  showMessage({
                    message: `${error} `,
                    type: 'warning',
                  });
                }
              }
            })
            .catch(function (error) {
            console.log('error: ', error);
              showMessage({
                message: `${error.response.status} ${error.response.statusText}`,
                type: 'warning',
              });
              dispatch(loader(false));
            });
          dispatch({type: MOBILE_NUMBER, moblieNumber: number});
        } else {
          setIsNet(false);
          showMessage({
            message: 'Oops! Check your Internet Connection',
            type: 'danger',
          });
        }
      }
    } else {
      showMessage({message: 'something went wrong please try again'});
    }
  };

  return (
    <>
      {isNet ? (
        <View style={styles.container}>
          <CustomHeader onPress={() => navigation.goBack()} />
          <View style={{marginTop: 40}}>
            <View style={styles.headingView}>
              <Text style={styles.headingText}>Enter your number</Text>
            </View>
            <PhoneInput
          ref={phoneInput}
          defaultValue={number}
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
            width: w(85),
            alignSelf: 'center',
          }}
          textInputStyle={{
            height: h(7),
            marginLeft: w(-3),
            fontSize: fs(16),
          }}
        />
            {/* <View style={{marginTop: 22}}>
              <CommonInputField
                placeholder="Enter your password"
                value={password}
                onChangeText={data => setpassword(data)}
                maxLength={15}
                secureTextEntry={true}
                warningTitle={!password ? `Password is required.` : ``}
                warning={!password ? isError : password}
              />
            </View> */}
          </View>

          <View style={{marginTop: 48}}>
            <CommonBtn
              text="Confirm"
              onPress={onConfirmHandler}
              customBtnStyle={{
                padding: 11,
                width: w(85),
                backgroundColor: colors.hex_f56725,
              }}
            />
          </View>
          <View style={styles.confirmBtn}>
            <TouchableOpacity>
              <Text style={{fontSize: 16}}>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={{fontSize: 16}}>Forgot password</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <NoInternet />
      )}
    </>
  );
};

export default LoginWithPassword;

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
    backgroundColor: '#E7E7E7',
  },
  headingView: {
    alignItems: 'center',
    marginTop: 28,
    fontSize: 19,
    marginBottom: 42,
  },
  confirmBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: w(85),
    alignSelf: 'center',
    marginTop: 15,
  },
  headingText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#414042',
  },
});
