import {StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';
import {w, h, fs, padding} from '../config/index';
import {colors} from '../constants';
const OtpField = props => {
  const {placeholder,maxLength,value,onChangeText,onFocus} = props;
  return (
    <View>
      <TextInput
        style={styles.inputField}
        keyboardType="number-pad"
        selectionColor={colors.hex_f66820}
        placeholder={placeholder}
        maxLength={maxLength}
        value = {value}
        onChangeText={onChangeText}
        onFocus = {onFocus}
      />
    </View>
  );
};

export default OtpField;

const styles = StyleSheet.create({
  inputField: {
    backgroundColor: 'white',
    borderRadius: 8,
    fontSize:20,
    textAlign:'center',
     width:w(13)
  },
});
