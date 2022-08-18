import React from 'react';
import {useEffect} from 'react';
import {View} from 'react-native';
import messaging from '@react-native-firebase/messaging';

const NotificationController = ({navigation}) => {
  useEffect(() => {
    const onNotificationOpenedApp = messaging().onNotificationOpenedApp(
      remoteMessage => {
        notificationHandler(remoteMessage);
      },
    );
    const getInitialNotification = messaging().getInitialNotification(
      remoteMessage => {
        notificationHandler(remoteMessage);
      },
    );
    const onOpenApp = messaging().onMessage(remoteMessage => {
      notificationHandler(remoteMessage);
    });
    return onNotificationOpenedApp && getInitialNotification && onOpenApp;
  }, []);

  const notificationHandler = remoteMessage => {
    if (remoteMessage) {
      const message = remoteMessage.data;
      if (message.type == 1) {
        navigation.push('MapScreen', {orderId: message.orderid});
      }
    }
  }; 

  return <View />;
};

export default NotificationController;
