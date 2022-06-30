import {ActivityIndicator, Dimensions} from 'react-native';
import React, {useMemo, useEffect, useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../screens/splashScreen/index';
import WelcomeScreen from '../screens/welcomeScreen';
import LoginScreen from '../screens/loginScreen';
import LoginWithPassword from '../screens/loginScreen/LoginWithPassword';
import OtpScreen from '../screens/otpScreen/index';
import VehicleScreen from '../screens/vehicleScreen';
import VehiclePicture from '../screens/vehiclePicture';
import ProfileScreen from '../screens/profileScreen';
import LicenseScreen from '../screens/licenseScreen';
import MapScreen from '../screens/mapScreen/index';
import OrderTrackingScreen from '../screens/OrderTrackingScreen';
import EncryptedStorage from 'react-native-encrypted-storage';
import {AuthContext, OrderContext, UserContext} from '../utils/context';
import {useSelector} from 'react-redux';
import {navigationRef} from './RootNavigation';
import axios from 'axios';

const Stack = createNativeStackNavigator();
const Auth = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Auth.Navigator screenOptions={{headerShown: false}}>
      <Auth.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <Auth.Screen name="LoginScreen" component={LoginScreen} />
      <Auth.Screen name="LoginWithPassword" component={LoginWithPassword} />
      <Auth.Screen name="OtpScreen" component={OtpScreen} />
      <Auth.Screen name="VehicleScreen" component={VehicleScreen} />
      <Auth.Screen name="VehiclePicture" component={VehiclePicture} />
      <Auth.Screen name="ProfileScreen" component={ProfileScreen} />
      <Auth.Screen name="LicenseScreen" component={LicenseScreen} />
    </Auth.Navigator>
  );
};

const AppNavigator = () => {
  const [orderData, setOrderData] = useContext(OrderContext);
  if (orderData.order_No) {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="OrderTrackingScreen"
          component={OrderTrackingScreen}
        />
        <Stack.Screen name="MapScreen" component={MapScreen} />
      </Stack.Navigator>
    );
  } else {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="MapScreen" component={MapScreen} />
        <Stack.Screen
          name="OrderTrackingScreen"
          component={OrderTrackingScreen}
        />
      </Stack.Navigator>
    );
  }
};

const StackNavigation = () => {
  const [userData, setUserData] = useContext(UserContext);
  const [orderData, setOrderData] = useContext(OrderContext);
  const {loading} = useSelector(state => state.loaderReducer);

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
      }
    },
    {
      isLoading: true,
      userToken: null,
    },
  );
  useEffect(() => {
    tokenUser();
  }, []);
  const tokenUser = async () => {
    var userToken = null;
    try {
      userToken = await EncryptedStorage.getItem('user_session');
      const userData = await EncryptedStorage.getItem('@userData');
      if (userToken) {
        setUserData(JSON.parse(userData).data);
        axios
          .get(
            `http://tuketuke.azurewebsites.net/api/OrderDetails/DriverActiveOrderDetails?Mobile_No=${
              JSON.parse(userData).data.mobile_No
            }`,
            {
              headers: {
                'Content-Type': 'application/json',
              },
            },
          )
          .then(async function (response) {
             console.log('response--->>',response.data)
            if (response.status == 200) {
              if (response.data.status == 'Success') {
                await setOrderData(response.data.data);
                dispatch({type: 'RESTORE_TOKEN', token: userToken});
              } else {
                dispatch({type: 'RESTORE_TOKEN', token: userToken});
              }
            } else {
              dispatch({type: 'RESTORE_TOKEN', token: userToken});
            }
          })
          .catch(function (error) {
            console.log('error: ', error);
            dispatch({type: 'RESTORE_TOKEN', token: userToken});
          });
      } else {
        dispatch({type: 'RESTORE_TOKEN', token: userToken});
      }
      // setTimeout(() => {
      //   dispatch({type: 'RESTORE_TOKEN', token: userToken});
      // }, 2000);
    } catch (err) {
      showMessage({
        message: `${err.response.status} ${err.response.statusText}`,
        type: 'warning',
      });
    }
  };

  const authContext = useMemo(
    () => ({
      signIn: async res => {
        const token = res.token;
        setUserData(res.data);
        await EncryptedStorage.setItem('user_session', token);
        await EncryptedStorage.setItem('@userData', JSON.stringify(res));
        dispatch({type: 'SIGN_IN', token: token});
      },
    }),
    [],
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {state.isLoading ? (
            <Auth.Screen name="SplashScreen" component={SplashScreen} />
          ) : state.userToken == null ? (
            <Auth.Screen name="Auth" component={AuthNavigator} />
          ) : (
            <Stack.Screen name="App" component={AppNavigator} />
          )}
        </Stack.Navigator>
        {loading && (
          <ActivityIndicator
            style={{
              width: Dimensions.get('window').width,
              height: Dimensions.get('window').height,
              position: 'absolute',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 1000,
              backgroundColor: 'rgba(0,0,0,0.5)',
            }}
            size="large"
            color="black"
          />
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default StackNavigation;
