import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { fs, h, w } from '../config';
import { colors } from '../constants';


const NoInternet = () => {
    const {onPress} = props;
  return (
    <View style={styles.container}>
    <Text style={styles.heading}>{`OOPS! \nNO INTERNET`}</Text>
    <Text style={styles.subheading}>{`Please check your internet`}</Text>
    <TouchableOpacity style={styles.btnTryAgain} onPress={onPress} >
      <Text style={styles.textTryAgain}>{`Try again`}</Text>
    </TouchableOpacity>
  </View>
  )
}

export default NoInternet

const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: h(30),
    },
    heading: {fontSize: 20, fontWeight: '900', color: colors.hex_000000},
    subheading: {marginLeft: w(5), fontSize: 12, color: colors.hex_000000},
    btnTryAgain: {
      marginTop: h(20),
      borderRadius: 5,
      backgroundColor: colors.hex_54D0FD,
      height: h(8),
      width: w(40),
      alignItems: 'center',
      justifyContent: 'center',
    },
    textTryAgain: {color: colors.hex_FFFFFF, textTransform: 'uppercase'},
  });