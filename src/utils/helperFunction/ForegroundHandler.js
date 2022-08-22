
// import React, { useEffect } from 'react';
// import messaging from '@react-native-firebase/messaging';
// import { Platform } from 'react-native';
// import PushNotification from "react-native-push-notification";
// import PushNotificationIOS from "@react-native-community/push-notification-ios";

// const ForegroundHandler = () => {
//     useEffect(() => {
//         const unsubscribe = messaging().onMessage((remoteMessage) => {
//             console.log("handle in foreground ooo", remoteMessage)
//             const {notification,messageId} = remoteMessage

//             if(Platform.OS == 'ios'){
//             PushNotificationIOS.addNotificationRequest({
//                 id: messageId,
//                 body: notification.body,
//                 title: notification.title,
//                 sound: 'default'
//             });
//         }else {
//             PushNotification.localNotification({
//                 channelId: "euc0tfNMQdC4yCgt8YR6gt:APA91bE-0mKRRGh78j6N5CWs_Dobpmzo-kof22H-ANybi_nNNxuiC_M2Zr0X2pY0nWhhXIECLmPo_j7MTZTRG9634egwov1suGwyXuJardZ8-sEIWHqv_IsS7OWooU6neFVc6JE0JDV2",
//                 id: messageId,
//                 body: 'android body',
//                 title: 'meri new app',
//                 soundName: 'default',
//                 vibrate: true,
//                 playSound: true
//             })
//         }
//         })
//         return unsubscribe
//     }, [])
//     return null
// }

// export default ForegroundHandler