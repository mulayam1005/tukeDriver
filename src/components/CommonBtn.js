import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../constants';

const CommonBtn = props => {
  const {image, disabled, bgColor} = props;

  const {text, onPress, customBtnStyle, customTextStyle} = props;

  return (
    <View>
      <TouchableOpacity
        style={[styles.btnContainer(bgColor), customBtnStyle]}
        onPress={onPress}
        disabled={disabled}>
        <Text style={[styles.btnText, customTextStyle]}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CommonBtn;

const styles = StyleSheet.create({
  btnContainer: item => ({
    backgroundColor: item ? colors.hex_f56725 : 'grey',
    padding: 8,
    borderRadius: 8,
    width: 320,
    alignSelf: 'center',
  }),
  btnText: {
    alignSelf: 'center',
    color: colors.hex_f2f2f2,
    fontWeight: 'bold',
    fontSize: 16,
  },
});
