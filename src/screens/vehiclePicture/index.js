import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import CustomHeader from '../../components/CustomHeader';
import {fs, h, w} from '../../config';
import CommonImagePicker from '../../components/CommonImagePicker';

import {VEHICLE_PHOTO} from '../../redux/constants/type';

const VehiclePicture = props => {
   const [vehicleImage, setvehicleImage] = useState("")
  const vehicleId = props.route.params.vehicle_id;
  // const mobile_number = props.route.params.mobile_number


  const takeVehicleImageHandler = () => {
    props.navigation.navigate('LicenseScreen', {
      vehicleId: vehicleId,
      vehicleImage : vehicleImage,
    });
    // dispatch({
    //   type: VEHICLE_PHOTO,
    //   // vehicleImage: vehicle
    // });
  };

  console.log('vehicleImage',vehicleImage)

  return (
    <View style={styles.container}>
      <CustomHeader onPress={() => props.navigation.goBack()} />
      <Text style={styles.textStyle}>Take photo of your vehicle</Text>

      <Text
        style={
          styles.subheading
        }>{`Please make sure the license plate of your\nvehicle is showing clearly in this photo`}</Text>

      <CommonImagePicker
        isFilled={true}
        onPress={takeVehicleImageHandler}
        getImage={img => setvehicleImage(img.path)}
        image = {vehicleImage}
        disabled = { vehicleImage =="" ? true: false}
        bgColor = { vehicleImage =="" ?  false : true}
      />
    </View>
  );
};

export default VehiclePicture;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgrey',
  },
  textStyle: {
    fontSize: fs(22),
    color: '#414042',
    alignSelf: 'center',
    marginTop: h(2),
    fontWeight: 'bold',
    marginBottom: w(3),
  },
  subheading: {
    marginTop: 33,
    alignSelf: 'center',
    marginBottom: h(5),
  },
});
