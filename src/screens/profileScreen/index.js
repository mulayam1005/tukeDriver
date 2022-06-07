import {StyleSheet, Text, View, Alert} from 'react-native';
import React, {useState,useContext} from 'react';
import CustomHeader from '../../components/CustomHeader';
import {fs, h, w} from '../../config';
import CommonImagePicker from '../../components/CommonImagePicker';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import ImgToBase64 from 'react-native-image-base64';
import {loader} from '../../redux/actions/loader';
import { ApplicationContext, AuthContext } from '../../utils/context';
import EncryptedStorage from 'react-native-encrypted-storage';



const ProfileScreen = props => {
  const [appData, setAppData] = useContext(ApplicationContext);
  const {signIn} = useContext(AuthContext);

  const dispatch = useDispatch();

  const onDoneHandler =async () => {
    // dispatch(loader(true));
    // axios
    //   .post(
    //     'http://tuketuke.azurewebsites.net/api/DriverDetails/UpdateDriverDetails',
    //     {
    //       id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    //       mobile_No: 'string',
    //       driver_Photo: appData.driver_Photo,
    //       vehicle_Photo: appData.vehicle_Photo,
    //       licences_Photo: appData.licences_Photo,
    //       vehicle_Id: 'string',
    //       vehicle_No: 'string',
    //       isAvailable: true,
    //       vehiclePhotoBase64: 'string',
    //       driverPhotoBase64: 'string',
    //       licencesPhotoBase64: 'string',
    //     },
    //   )
    //   .then( async function (response) {
    //     console.log('response...', response);
    //     if (response.status == 200) {
    //       dispatch(loader(false));
    //       try {   
    //         const session = await EncryptedStorage.getItem("user_signin");
    //         console.log('session---9999---___>>',session)
    //         signIn(session.signData.id)
    //         if (session !== undefined) {
    //             // Congrats! You've just retrieved your first value!
    //         }
    //     } catch (error) {
    //         // There was an error on the native side
    //     }
    //       // props.navigation.navigate('MapScreen');
    //     }
    //   })
    //   .catch(function (error) {
    //     console.log('error===>>', error);
    //     dispatch(loader(false));
    //   });
    const session =await  EncryptedStorage.getItem("user_signin");
    const  data = JSON.parse(session)
    signIn(data.signData)
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
        getImage={img => setAppData({...appData, driver_Photo:img.path})}
        disabled={appData.driver_Photo == '' ? true : false}
        bgColor={appData.driver_Photo == '' ? false : true}
        image={appData.driver_Photo}
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
