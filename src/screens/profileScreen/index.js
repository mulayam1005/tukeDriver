import {StyleSheet, Text, View, Alert, SafeAreaView} from 'react-native';
import React, {useState, useContext} from 'react';
import CustomHeader from '../../components/CustomHeader';
import {fs, h, w} from '../../config';
import CommonImagePicker from '../../components/CommonImagePicker';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import ImgToBase64 from 'react-native-image-base64';
import {loader} from '../../redux/actions/loader';
import {ApplicationContext, AuthContext} from '../../utils/context';
import EncryptedStorage from 'react-native-encrypted-storage';
import {showMessage} from 'react-native-flash-message';

const ProfileScreen = props => {
  const [appData, setAppData] = useContext(ApplicationContext);
  const {signIn} = useContext(AuthContext);


  console.log('appdata in profiscree',appData);

  const dispatch = useDispatch();

  const onDoneHandler = async () => {
    axios
      .post(
        'http://tuketuke.azurewebsites.net/api/DriverDetails/UpdateDriverDetails',
        {
          id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          mobile_No: appData.mobile_No,
          driver_Photo: appData.driver_Photo,
          vehicle_Photo: appData.vehicle_Photo,
          licences_Photo: appData.licences_Photo,
          vehicle_Id: appData.vehicle_Id,
          vehicle_No: "1",
          isAvailable: true,
          vehiclePhotoBase64: '',
          driverPhotoBase64: '',
          licencesPhotoBase64: '',
        },
      )
      .then(async function (response) {
        console.log('response---  >>>.',response.data);
        if (response.status == 200) {
          const {data} = response;
          if (data.status == 'Success') {
            dispatch(loader(false));
            const session = await EncryptedStorage.getItem('user_signin');
            const sessionData = JSON.parse(session);
            signIn(sessionData.signData);
          } else {
            dispatch(loader(false));
            showMessage({message: data.message});
          }
        }
      })
      .catch(function (err) {
        dispatch(loader(false));
        showMessage({
          message: `${err.response.status} ${err.response.statusText}`,
          type: 'warning',
        });
      });
    // const session = await EncryptedStorage.getItem('user_signin');
    // const data = JSON.parse(session);
    // signIn(data.signData);
  };

  return (
    <SafeAreaView style={{backgroundColor: 'lightgrey'}}>
      <CustomHeader onPress={() => props.navigation.goBack()} />
      <Text style={styles.heading}>Take your profile photo</Text>
      <View style={styles.textStyle}>
        <Text>{`Your profile photo helps people recognize you\n1. Face the camera directly with your eyes\nand mouth clearly visible\n\n2. Make sure the photo is not dark and is in focus.`}</Text>
      </View>
      <CommonImagePicker
        imageStyle={styles.image}
        onPress={onDoneHandler}
        getImage={img => setAppData({...appData, driver_Photo: img.path})}
        disabled={appData.driver_Photo == '' ? true : false}
        bgColor={appData.driver_Photo == '' ? false : true}
        image={appData.driver_Photo}
      />
    </SafeAreaView>
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
