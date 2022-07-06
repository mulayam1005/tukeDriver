/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

PushNotification.configure({
  onNotification: function (notification) {
    console.log('notification-->>',notification)
    PushNotification.localNotification({
      channelId: notification.channelId,
     
    });
  },
 
   popInitialNotification: true,
   requestPermissions: true,
   sound: true,
});

AppRegistry.registerComponent(appName, () => App);
