import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import React, { useState, createContext, useMemo, useEffect, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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
import OrderScreen from '../screens/mapScreen/orderScreen';
import EncryptedStorage from 'react-native-encrypted-storage';
import { AuthContext, UserContext } from '../utils/context';
import { useSelector } from 'react-redux';

const Stack = createNativeStackNavigator();
const Auth = createNativeStackNavigator();

const StackNavigation = () => {
  const [userData, setUserData] = useContext(UserContext)
  const { loading } = useSelector(state => state.loaderReducer);

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
        setUserData(JSON.parse(userData));
      }
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    } catch (error) {
      console.log('error==>>', error);
    }
  };

  const authContext = useMemo(
    () => ({
      signIn: async res => {
        const token = res.token;
        setUserData(res.data)
        await EncryptedStorage.setItem('user_session', token);
        await EncryptedStorage.setItem('@userData', JSON.stringify(res));
        dispatch({ type: 'SIGN_IN', token: token });
      },
    }),
    [],
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {state.isLoading ? (
            <Auth.Screen name="SplashScreen" component={SplashScreen} />
          ) : state.userToken == null ? (
            <>
              <Auth.Screen name="LoginScreen" component={LoginScreen} />
              <Auth.Screen
                name="LoginWithPassword"
                component={LoginWithPassword}
              />
              <Auth.Screen name="OtpScreen" component={OtpScreen} />
              <Stack.Screen name="VehicleScreen" component={VehicleScreen} />
              <Stack.Screen name="VehiclePicture" component={VehiclePicture} />
              <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
              <Stack.Screen name="LicenseScreen" component={LicenseScreen} />
            </>
          ) : (
            <>
              <Stack.Screen name="MapScreen" component={MapScreen} />
              <Stack.Screen name="OrderTrackingScreen" component={OrderTrackingScreen} />
              <Stack.Screen name="OrderScreen" component={OrderScreen} />
            </>
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
