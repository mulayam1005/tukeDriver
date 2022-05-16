import {StyleSheet, Text, View, Alert} from 'react-native';
import React,{useState} from 'react';
import CustomHeader from '../../components/CustomHeader';
import {fs, h, w} from '../../config';
import CommonImagePicker from '../../components/CommonImagePicker';
import axios from 'axios';
import {useSelector} from 'react-redux';

import ImgToBase64 from 'react-native-image-base64';
import { loader } from '../../redux/actions/loader';

const ProfileScreen = props => {
  // const dispatch = useDispatch();
  const [vbase64, setvbase64] = useState("")
  const [lbase64, setlbase64] = useState("")
  const [pbase64, setpbase64] = useState("")
  // const currentUser = useSelector(state => console.log('state0000>', state));
  const [profileImage, setprofileImage] = useState("")
  const licenseImage = props.route.params.licenseImage;
  const vehicleImage = props.route.params.vehicleImage;
 
  // ImgToBase64.getBase64String(licenseImage)
  // .then(base64String => setlbase64(base64String) )
  // .catch(err => console.error(err));

  // ImgToBase64.getBase64String(vehicleImage)
  // .then(base64String => setvbase64(base64String) )
  // .catch(err => console.error(err));

  // const _uploadProfileImage = (val) => {
  //   setprofileImage(val)
  //   ImgToBase64.getBase64String(profileImage)
  //   .then(base64String => setpbase64(base64String) )
  //  .catch(err => console.error(err));
  // };

  const vehicleId = props.route.params.vehicleId;
  
  // const mobile_number = props.route.params.mobile_number
  const onDoneHandler = () => {
    
    axios
      .post('http://192.168.0.178:5001/api/DriverDetails/UpdateDriverDetails', {
        mobile_No: '9977106335',
        driver_Photo: profileImage,
        vehicle_Photo: vehicleImage,
        licences_Photo: licenseImage,
        vehicle_Id: vehicleId,
      })
      .then(function (response) {
        console.log('response...',response)
        props.navigation.navigate('MapScreen');
      })
      .catch(function (error) {
        console.log('error===>>', error);
      });
  };

  

  return (
    <View style={{backgroundColor: 'lightgrey'}}>
      <CustomHeader onPress={() => props.navigation.goBack()} />
      <Text style={styles.heading}>Take your profile photo</Text>
      <View style={styles.textStyle}>
        <Text>{`Your profile photo helps people recognize you\n1. Face the camera directly with your eyes\nand mouth clearly visible\n\n2. Make sure the photo is not dark and is in focus.`}</Text>
      </View>
      <CommonImagePicker
        imageStyle={styles.image}
        onPress={onDoneHandler}
        getImage={img => setprofileImage(img.path)}
      
        disabled = { profileImage =="" ? true: false}
        bgColor = { profileImage =="" ?  false : true}
      />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  heading: {
    fontSize: fs(20),
    color: 'black',
    marginTop: h(2),
    fontWeight: 'bold',
    marginBottom: w(3),
    marginLeft: w(10),
  },
  textStyle: {
    marginTop: 30,
    alignItems: 'center',
    marginBottom: h(4),
  },
  image: {
    width: w(85),
    height: h(30),
    alignSelf: 'center',
  },
});
