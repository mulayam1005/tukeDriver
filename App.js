// import {StyleSheet, Alert} from 'react-native';
// import React, {useEffect} from 'react';
// import StackNavigation from './src/navigation/StackNavigation';
// import {Provider} from 'react-redux';
// import {store} from './src/redux/store/store';
// import FlashMessage from 'react-native-flash-message';
// import {
//   ApplicationProvider,
//   OrderProvider,
//   UserProvider,
// } from './src/utils/context';
// import messaging from '@react-native-firebase/messaging';
// import Geolocation from 'react-native-geolocation-service';
// import EncryptedStorage from 'react-native-encrypted-storage';
// import * as RootNavigation from './src/navigation/RootNavigation';
// import PushNotification from 'react-native-push-notification';

// const App = props => {
//   useEffect(() => {
//     requestUserPermission();
//   }, []);
//   useEffect(() => {
//     createChannels();
//   }, []);

//   useEffect(() => {
//     const unsubscribe = messaging().onMessage(async remoteMessage => {
//       console.log('notify', JSON.stringify(remoteMessage));
//     });
//     return unsubscribe;
//   }, []);

//   Geolocation.requestAuthorization('always');
//   async function requestUserPermission() {
//     const authStatus = await messaging().requestPermission();
//     const enabled =
//       authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//       authStatus === messaging.AuthorizationStatus.PROVISIONAL;
//     if (enabled) {
//       messaging()
//         .getToken()
//         .then(async res => {
//           console.log('fcm: ', res);
//           try {
//             const fcm = await EncryptedStorage.setItem(
//               'fcm_id',
//               JSON.stringify({
//                 fcm_id: res,
//               }),
//             );
//           } catch (err) {
//             showMessage({
//               message: `${err.response.status} ${err.response.statusText}`,
//               type: 'warning',
//             });
//           }
//         })
//         .catch(error => {
//           showMessage({
//             message: `${err.response.status} ${err.response.statusText}`,
//             type: 'warning',
//           });
//         });
//     }
//   }

//   // useEffect(() => {
//   //   const unsubscribe = messaging().onMessage(async remoteMessage => {
//   //     // console.log(
//   //     //   'remoteMessage-===>>',
//   //     //   JSON.parse(remoteMessage.data.Order).OrderId,
//   //     // );
//   //     // RootNavigation.navigate('MapScreen', {remoteMessage});
//   //   });

//   //   return unsubscribe;
//   // }, []);

//   const createChannels = () => {
//     PushNotification.createChannel({
//       channelId: 'test123',
//       channelName: 'my_channel',
//     });
//   };

//   return (
//     <Provider store={store}>
//       <UserProvider>
//         <OrderProvider>
//           <ApplicationProvider>
//             <StackNavigation />
//             <FlashMessage position="top" />
//           </ApplicationProvider>
//         </OrderProvider>
//       </UserProvider>
//     </Provider>
//   );
// };

// export default App;
// const styles = StyleSheet.create({});



import { Button, StyleSheet, Text, View } from 'react-native'
import React,{useEffect} from 'react'
import PushNotification from 'react-native-push-notification';



const App = () => {
  useEffect(() => {
     
  }, [])
  

  // const createChannel = () => {
  //   PushNotification.createChannel({
  //     channelId:'test123',
  //     channelName : 'test Channel'
  //   })
  // }

  

  return (
    <View>
      <Text>App</Text>
      <Button title="notifiy"  />
    </View>
  )
}

export default App

const styles = StyleSheet.create({})