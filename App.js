// import {StyleSheet, Text, View} from 'react-native';
// import React from 'react';
// import StackNavigation from './src/navigation/StackNavigation';
// import {Provider} from 'react-redux';
// import {store} from './src/redux/store/store';

// const App = () => {
//   return (
//     <Provider store={store}>
//       <StackNavigation />
//     </Provider>
//   );
// };
 
// export default App;

// const styles = StyleSheet.create({});

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MapScreen from './src/screens/mapScreen/index'

const App = () => {

  return (
    <View style={{flex:1}}>
     <MapScreen />
    </View>
  )
}

export default App

const styles = StyleSheet.create({})
