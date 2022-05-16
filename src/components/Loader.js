import { StyleSheet, Text, View,ActivityIndicator,Dimensions } from 'react-native'
import React from 'react'


const Loader = () => {
  return (
    <View>
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
    </View>
  )
}

export default Loader

const styles = StyleSheet.create({})