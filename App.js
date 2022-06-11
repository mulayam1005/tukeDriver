// import {
//   StyleSheet,
//   Alert,
// } from 'react-native';
// import React, {useEffect} from 'react';
// import StackNavigation from './src/navigation/StackNavigation';
// import {Provider} from 'react-redux';
// import {store} from './src/redux/store/store';
// import FlashMessage from 'react-native-flash-message';
// import {ApplicationProvider, UserProvider} from './src/utils/context';
// import messaging from '@react-native-firebase/messaging';
// import Geolocation from 'react-native-geolocation-service';
// import EncryptedStorage from 'react-native-encrypted-storage';

// const App = () => {
//   useEffect(() => {
//     requestUserPermission();
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

//   useEffect(() => {
//     const unsubscribe = messaging().onMessage(async remoteMessage => {
//       Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
//     });

//     return unsubscribe;
//   }, []);

//   return (
//     <Provider store={store}>
//       <UserProvider>
//         <ApplicationProvider>
//           <StackNavigation />
//           <FlashMessage position="top" />
//         </ApplicationProvider>
//       </UserProvider>
//     </Provider>
//   );
// };

// export default App;

// const styles = StyleSheet.create({});


import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const App = () => {
  return (
    <View>
      <Text>App</Text>
    </View>
  )
}

export default App

const styles = StyleSheet.create({})
