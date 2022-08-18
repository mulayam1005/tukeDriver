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

  // console.log('appdata in profiscree', appData);

  const dispatch = useDispatch();

  const onDoneHandler = async () => {
    dispatch(loader(true));
    const params = {
      Id: appData.id,
      Mobile_No: appData.mobile_No,
      Driver_Photo: appData.driver_Photo,
      Vehicle_Photo: appData.vehicle_Photo,
      Licences_Photo: appData.licences_Photo,
      Vehicle_Id: appData.vehicle_Id,
      Vehicle_No: appData.vehicle_No,
      IsAvailable: appData.isAvailable,
      VehiclePhotoBase64: appData.vehiclePhotoBase64,
      DriverPhotoBase64: appData.driverPhotoBase64,
      LicencesPhotoBase64: appData.licencesPhotoBase64,
      FCM_ID: appData.FCM_ID,
    };
    let formdata = new FormData();

    console.log(
      ': ',
      appData.licences_Photo,
      appData.licences_Photo,

      appData.licences_Photo.path.substring(
        appData.licences_Photo.path.lastIndexOf('/') + 1,
      ),
    );
    formdata.append('Id', appData.id);
    formdata.append('Mobile_No', appData.mobile_No);
    formdata.append('Driver_Photo', {
      uri: appData.driver_Photo.path,
      type: appData.driver_Photo.mime,
      name: appData.driver_Photo.path.substring(
        appData.driver_Photo.path.lastIndexOf('/') + 1,
      ),
    });

    formdata.append('Vehicle_Photo', {
      uri: appData.vehicle_Photo.path,
      type: appData.vehicle_Photo.mime,
      name: appData.vehicle_Photo.path.substring(
        appData.vehicle_Photo.path.lastIndexOf('/') + 1,
      ),
    });
    formdata.append('Licences_Photo', {
      uri: appData.licences_Photo.path,
      type: appData.licences_Photo.mime,
      name: appData.licences_Photo.path.substring(
        appData.licences_Photo.path.lastIndexOf('/') + 1,
      ),
    });
    formdata.append('Vehicle_Id', appData.vehicle_Id);
    formdata.append('Vehicle_No', appData.vehicle_No);
    formdata.append('IsAvailable', appData.isAvailable);
    formdata.append('VehiclePhotoBase64', appData.vehiclePhotoBase64);
    formdata.append('DriverPhotoBase64', appData.driverPhotoBase64);
    formdata.append('LicencesPhotoBase64', appData.licencesPhotoBase64);
    formdata.append('FCM_ID', appData.fcm_id);
    axios
      .post(
        'https://tuketuke.com/api/DriverDetails/UpdateDriverDetails',
        formdata,
        {
          headers: {
            'Content-type': 'multipart/form-data',
          },
        },
      )
      .then(async function (response) {
        console.log('response---  >>>.', response.data);
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
        console.log('err: ', err);
        dispatch(loader(false));
        showMessage({
          message: `${err.response.status} ${err.response.statusText}`,
          type: 'warning',
        });
      });
  };

  return (
    <SafeAreaView style={{backgroundColor: 'lightgrey'}}>
      <CustomHeader onPress={() => props.navigation.goBack()} />
      <Text style={styles.heading}>Take your profile photo</Text>
      <View style={styles.textStyle}>
        <Text
          style={{
            color: '#000',
          }}>{`Your profile photo helps people recognize you\n1. Face the camera directly with your eyes\nand mouth clearly visible\n\n2. Make sure the photo is not dark and is in focus.`}</Text>
      </View>
      <CommonImagePicker
        imageStyle={styles.image}
        onPress={onDoneHandler}
        getImage={img => setAppData({...appData, driver_Photo: img})}
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
    color: 'red',
  },
  image: {
    width: w(85),
    height: h(30),
    alignSelf: 'center',
  },
});
