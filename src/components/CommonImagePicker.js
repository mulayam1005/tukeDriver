import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import CommonBtn from './CommonBtn';
import ImagePicker from 'react-native-image-crop-picker';
import {fs, h, w} from '../config';
import {colors} from '../constants';

const CommonImagePicker = props => {
 
  const {
    isFilled = false,
    onPress,
    imageStyle,
    customBtnStyle,
    getImage=()=>{},
    image,
    disabled,
    bgColor
  } = props;
  const [cameraImage, setcameraImage] = useState();
  const [btndiable, setbtndiable] = useState(false)
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'TukeTuke',
          message: 'TukeTuke needs access to your camera',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    requestCameraPermission;
  }, []);

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 500,
      height: 500,
      cropping: true,
    }).then(image => {
     
      setcameraImage(image.path);
      getImage(image);
    });
  };

  return (
    <View style={styles.container}>
      <Image source={{uri: cameraImage}} style={[styles.image, imageStyle]} />
      <View style={{marginTop: h(18)}}>
        <CommonBtn
          text="Take Photo"
          customBtnStyle={styles.btn}
          customTextStyle={{color: '#414042'}}
          onPress={takePhotoFromCamera}
        />
        <CommonBtn text={isFilled ? 'Next' : 'Done'} onPress={onPress} image={image} disabled={disabled} bgColor={bgColor}  />
      </View>
    </View>
  );
};

export default CommonImagePicker;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: w(4),
    marginBottom: h(18),
  },
  btn: {
    backgroundColor: colors.hex_f2f2f2,
    marginBottom: h(4),
  },
  image: {
    height: h(35),
  },
});
