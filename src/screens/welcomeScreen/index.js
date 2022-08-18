import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { colors, images } from '../../constants';
import CommonBtn from '../../components/CommonBtn';
import { fs, h, w, width } from '../../config';
import { fontfamily } from '../../constants';
import Geolocation from 'react-native-geolocation-service';
import CheckBox from '@react-native-community/checkbox';

const WelcomeScreen = ({ navigation }) => {
  const [notification, setnotification] = useState(false);
  const [location, setlocation] = useState(false);


  useEffect(() => {
    if (location) {
      locationPermission();
    }
  }, [location]);

  const locationPermission = () =>
    new Promise(async (resolve, reject) => {
      if (Platform.ios === 'ios') {
        try {
          const permissionStatus = await Geolocation.requestAuthorization(
            'whenInUse',
          );
          if (permissionStatus === 'granted') {
            return resolve('granted');
          }
          reject('permission not granted');
        } catch (error) {
          return reject(error);
        }
      }
      return PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      )
        .then(granted => {
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            resolve('granted');
          }

          return reject('Location Permission denied');
        })
        .catch(error => {
          console.log('Ask Location permission error: ', error);
          return reject(error);
        });
    });

  return (
    <ScrollView style={styles.container}>
      <Image source={images.commonLogo} style={styles.appLogo} />
      <Text style={styles.heading}>Welcome to Tuketuke</Text>
      <View style={{ marginLeft: w(2) }}>
        <Text style={{ fontSize: fs(12),color:'black' }}>
          By clicking Agree below , you concent to and accept
        </Text>
        <Text style={{ fontSize: fs(12),color: 'black', }}>our terms and conditions</Text>
      </View>

      <View style={styles.servicesContainer}>
        <View style={{ flex: 0.5 }}>
          <Image source={images.locationLogo} style={styles.horizontalImages} />
        </View>
        <View style={{ flex: 4 }}>
          <Text style={{ fontSize: 16,color: 'black', }}>Location Services</Text>
          <Text
            style={
              styles.locationText
            }>{`Location accuracy allows us to better provide you\nwith more convenient and better services `}</Text>
        </View>

        <View style={{ marginTop: h(2) }}>
          <CheckBox
            disabled={false}
            value={location}
            onValueChange={newValue => setlocation(newValue)}
            tintColors={{
              true: colors.hex_f56725
            }}
            onTintColor= {colors.hex_f56725}
            onCheckColor={colors.hex_f56725}
          />
        </View>
      </View>
      <View style={styles.notification}>
        <View style={{ flex: 0.5 }}>
          <Image
            source={images.notificationLogo}
            style={styles.horizontalImages}
          />
        </View>
        <View style={{ flex: 4 }}>
          <Text style={{ fontSize: 16,color: '#000', }}>Notifications</Text>
          <Text
            style={
              styles.locationText
            }>{`Location accuracy allows us to better provide you\nwith more convenient and better services `}</Text>
        </View>
        <View style={{ marginTop: h(2) }}>
          <CheckBox
            disabled={false}
            value={notification}
            onValueChange={newValue => setnotification(newValue)}
            tintColors={{
              true: colors.hex_f56725
            }}
            onTintColor= {colors.hex_f56725}
            onCheckColor={colors.hex_f56725}
          />
        </View>
      </View>
      <View style={{ marginTop: '40%' }}>
        <View style={{ marginLeft: 18 }}>
          <Text style={{ fontSize: 12,color:'#000' }}>
            I have read and accepted your terms and condition
          </Text>
          <TouchableOpacity>
            <Text style={styles.condition}>Terms & Conditions</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 10 }}>
          <CommonBtn
            text="Agree"
            onPress={() => navigation.navigate('LoginScreen')}
            bgColor
            customBtnStyle={{width:w(85),padding:w(3)}}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  appLogo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  horizontalImages: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  container: {
    flex: 1,
    padding: 25,
    marginTop: '16%',
  },
  heading: {
    fontSize: 22,
    color: 'black',
    fontWeight: 'bold',
    marginTop: 14,
    alignSelf: 'center',
    fontFamily: Platform.OS == 'android' ? fontfamily.myriad_pro_semibold : null,
  },
  servicesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: '20%',
  },
  notification: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: '14%',
  },
  condition: {
    color: colors.hex_f56725,
    fontWeight: 'bold',
    marginTop: 6,
    fontSize: 12,
  },
  locationText: {
    marginTop: 2,
    fontSize: fs(11),
    color: '#000', 
  },
  textStyle: {
    marginTop: 10,
    alignSelf: 'center',
  },
});
