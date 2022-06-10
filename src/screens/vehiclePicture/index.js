import {StyleSheet, Text, View,SafeAreaView} from 'react-native';
import React, {useState, useContext} from 'react';
import CustomHeader from '../../components/CustomHeader';
import {fs, h, w} from '../../config';
import CommonImagePicker from '../../components/CommonImagePicker';
import {ApplicationContext} from '../../utils/context';


const VehiclePicture = props => {
  const [appData, setAppData] = useContext(ApplicationContext);

  const takeVehicleImageHandler = () => {
    props.navigation.navigate('LicenseScreen');
  };


  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader onPress={() => props.navigation.goBack()} />
      <Text style={styles.textStyle}>Take photo of your vehicle</Text>

      <Text
        style={
          styles.subheading
        }>{`Please make sure the license plate of your\nvehicle is showing clearly in this photo`}</Text>

      <CommonImagePicker
        isFilled={true}
        onPress={takeVehicleImageHandler}
        getImage={img => setAppData({...appData, vehicle_Photo: img.path})}
        image={appData.vehicle_Photo}
        // disabled={appData.vehicle_Photo == '' ? true : false}
        // bgColor={appData.vehicle_Photo == '' ? false : true}
      />
    </SafeAreaView>
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
