import {StyleSheet, Text, Alert, View,PermissionsAndroid,
  Platform,} from 'react-native';
import React, {useEffect} from 'react';
import StackNavigation from './src/navigation/StackNavigation';
import {Provider} from 'react-redux';
import {store} from './src/redux/store/store';
import FlashMessage from 'react-native-flash-message';
import {ApplicationProvider} from './src/utils/context';
import messaging from '@react-native-firebase/messaging';
import Geolocation from 'react-native-geolocation-service';
import EncryptedStorage from 'react-native-encrypted-storage';

const App = () => {
  useEffect(() => {
    locationPermission();
    requestUserPermission();
  }, []);
  Geolocation.requestAuthorization('always');
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      messaging()
        .getToken()
        .then(async res => {
          try {
            console.log('res', res);
            await EncryptedStorage.setItem(
              'fcm_id',
              JSON.stringify({
                fcm_id: res,
              }),
            );
          } catch (error) {
            console.log('error', error);
          }
        })
        .catch(error => {
          console.log('err', error);
        });
      console.log('Authorization status:', authStatus);
    }
  }

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  const locationPermission = () =>
    new Promise(async (resolve, reject) => {
      if (Platform.ios === 'ios') {
        try {
          const permissionStatus = await Geolocation.requestAuthorization(
            'whenInUse',
          );
          if (permissionStatus === 'granted') {
            return resolve('granted');
          }
          reject('permission not granted');
        } catch (error) {
          return reject(error);
        }
      }
      return PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      )
        .then(granted => {
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            resolve('granted');
          }
          return reject('Location Permission denied');
        })
        .catch(error => {
          console.log('Ask Location permission error: ', error);
          return reject(error);
        });
    });

  return (
    <Provider store={store}>
      <ApplicationProvider>
        <StackNavigation />
        <FlashMessage position="top" />
      </ApplicationProvider>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
