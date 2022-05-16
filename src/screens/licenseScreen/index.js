import {StyleSheet, Text, View} from 'react-native';
import React,{useState} from 'react';
import CommonImagePicker from '../../components/CommonImagePicker';
import {fs, h, w} from '../../config';
import CustomHeader from '../../components/CustomHeader';
const LicenseScreen = (props) => {
  const [licenseImage, setlicenseImage] = useState("")

   const vehicleId = props.route.params.vehicleId
  // const mobile_number = props.route.params.mobile_number

   const vehicleImage = props.route.params.vehicleImage



  return (
    <View style={styles.container}>
      <CustomHeader onPress={() => props.navigation.goBack()} />
      <Text style={styles.textStyle}>
        {`Take photo of your\nDriving License`}
      </Text>
      <Text
        style={
          styles.text2Style
        }>{`Please make sure all the information is accurate\nand the whole driving license is clearly visible in\nthe picture with all 4 corners shown.`}</Text>

      <CommonImagePicker
        isFilled={true}
        getImage={img => setlicenseImage(img.path)}
        onPress={() => props.navigation.navigate('ProfileScreen',{
           vehicleId : vehicleId,
           licenseImage : licenseImage,
           vehicleImage : vehicleImage
        })}
        imageStyle={styles.image}
        image = {licenseImage}
        disabled = { licenseImage =="" ? true: false}
        bgColor = { licenseImage =="" ?  false : true}
      />
    </View>
  );
};

export default LicenseScreen;

const styles = StyleSheet.create({
  textStyle: {
    fontSize: fs(20),
    color: 'black',
    marginTop: h(2),
    fontWeight: 'bold',
    marginBottom: w(3),
    marginLeft: w(10),
  },
  text2Style: {
    marginTop: h(4),
    alignSelf: 'center',
    marginBottom: h(4),
  },
  image: {
    width: w(70),
    height: h(25),
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'lightgrey',
  },
});
