import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useRef} from 'react';
import PhoneInput from 'react-native-phone-number-input';
import { fs, h, w } from '../config';


const CountryCode = props => {
    const {num}  = props
  const [number, setnumber] = useState(num);
  const [formattedValue, setFormattedValue] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const phoneInput = useRef(null);

  return (
    <PhoneInput
      ref={phoneInput}
      defaultValue={number}
      layout="second"
      onChangeText={text => {
        setnumber(text);
      }}
      onChangeFormattedText={text => {
        setFormattedValue(text);
        setCountryCode(phoneInput.current?.state.code || '');
      }}
      countryPickerProps={{withAlphaFilter: true}}
      // disabled={disabled}

      withDarkTheme
      withShadow
      autoFocus
      containerStyle={{
        height: h(7),
        width: w(90),
        alignSelf: 'center',
      }}
      textInputStyle={{
        height: h(5),
        marginTop: h(1),
        marginLeft: w(-3),
        fontSize: fs(16),
      }}
    />
  );
};

export default CountryCode;

const styles = StyleSheet.create({});
