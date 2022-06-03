import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import CustomHeader from '../../components/CustomHeader';
import {fs, h, w} from '../../config';
import CommonBtn from '../../components/CommonBtn';
import MapView, {Marker} from 'react-native-maps';
import {colors} from '../../constants';
import axios from 'axios';
import MapViewDirections from 'react-native-maps-directions';

var screenWidth = Dimensions.get('window').width;

const MapScreen = ({navigation}) => {
  const [driverStatus, setDriverStatus] = useState(false);
  const [isOrderExist, setIsOrderExist] = useState(false);
  const [confirmDriverStatus, setConfirmDriverStatus] = useState(false);
  const [bgColorOn, setbgColorOn] = useState(true);
  const [bgColorOff, setbgColorOff] = useState(false);

  const [mapLocation, setmapLocation] = useState({
    pickupcords: {
      latitude: 22.7244,
      longitude: 75.8839,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
    },
    droplocationcords: {
      latitude: 22.7377,
      longitude: 75.8788,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
    },
  });

  useEffect(() => {
    if (driverStatus) {
      setTimeout(() => {
        setIsOrderExist(true);
      }, 10000);
    }
    return clearTimeout();
  }, [driverStatus]);

  const mapRef = useRef();
  console.log('mapRef====>>>', mapRef);
  const {pickupcords, droplocationcords} = mapLocation;

  const onClickBtn = () => {
    setbgColorOn(!bgColorOn);
    setbgColorOff(bgColorOn);

    // axios
    //   .post(
    //     'http://192.168.0.178:5001/api/DriverDetails/UpdateDriver_IsAvailable',
    //     {
    //       mobile_No: '9977106335',
    //       isAvailable: true,
    //     },
    //   )
    //   .then(function (response) {
    //     console.log('...response...', response);
    //    props.navigation.navigate('OrderScreen');
    //   })
    //   .catch(function (error) {
    //     console.log('error===>>', error);
    //   });
    // navigation.navigate('OrderScreen');
  };

  const ofClickBtn = () => {
    setbgColorOff(!bgColorOff);
    setbgColorOn(bgColorOff);

    axios
      .post(
        'http://tuketuke.azurewebsites.net/api/OrderDetails/UpdateDriverLatLngInOrder',
        {
          order_No: 10001,
          driverLat: '22.785',
          driverLng: '75.345',
        },
      )
      .then(function (response) {
        console.log('...response...false', response.data);
        // props.navigation.navigate('MapScreen');
      })
      .catch(function (error) {
        console.log('error===>>', error);
      });
  };
  console.log(
    'driverStatus ',
    driverStatus ? '90%' : confirmDriverStatus ? '60%' : '90%',
  );

  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
        <CustomHeader onPress={() => navigation.goBack()} />
        <Text style={styles.headerHeading}>Select vehicle</Text>
        <View />
      </View>
      <View
        style={[
          styles.mapContainer,
          {
            // height: driverStatus ? '90%' : confirmDriverStatus ? '60%' : '90%',
          },
        ]}>
        <MapView
          // provider='AIzaSyBzhsIqqHLkDrRiSqt94pxHJCdHHXgA464' // remove if not using Google Maps
          ref={mapRef}
          style={styles.map}
          region={pickupcords}>
          <Marker coordinate={pickupcords} />
          <Marker coordinate={droplocationcords} />
          <MapViewDirections
            origin={pickupcords}
            destination={droplocationcords}
            apikey={'AIzaSyBzhsIqqHLkDrRiSqt94pxHJCdHHXgA464'}
            strokeWidth={8}
            strokeColor="red"
            optimizeWaypoints={true}
            onReady={result => {
              mapRef.current.fitToCoordinates(result.coordinate, {
                edgePadding: {
                  right: 30,
                  bottom: 300,
                  left: 30,
                  top: 100,
                },
              });
            }}
          />
        </MapView>
      </View>
      {confirmDriverStatus && (
        <View style={styles.orderView}>
          <Text
            style={
              styles.orderText
            }>{`Are you available to recieve\norders Now?`}</Text>
          <Text
            style={
              styles.automatic
            }>{`Available orders will be pushed to you\nautomatically`}</Text>
        </View>
      )}
      <View style={styles.availablity} />
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        {/* <Text style={styles.slideTurn}> Slide to turn on Availablity</Text> */}
        <View style={styles.btnContainer}>
          <View style={styles.btnBackground}>
            <CommonBtn
              text="ON"
              customBtnStyle={[
                styles.btnStyle,
                {backgroundColor: driverStatus ? colors.hex_f66820 : '#989898'},
              ]}
              onPress={() => {
                // if (confirmDriverStatus) {
                //   setConfirmDriverStatus(false);
                //   setDriverStatus(true);
                // } else {
                //   setConfirmDriverStatus(true);
                // }
              }}
            />
            <CommonBtn
              text="OFF"
              customBtnStyle={[
                styles.btnStyle,
                {backgroundColor: driverStatus ? '#989898' : colors.hex_f66820},
              ]}
              onPress={ofClickBtn}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerHeading: {
    marginTop: h(1),
    marginRight: h(7),
    color: 'black',
    fontSize: fs(15),
  },
  mapContainer: {
    width: '100%',
    height: '60%',
    marginTop: h(1),
  },
  orderView: {
    marginLeft: w(10),
    marginTop: h(4),
  },
  orderText: {
    fontSize: fs(22),
    color: '#414042',
    fontWeight: 'bold',
  },
  availablity: {
    borderBottomWidth: w(1),
    borderBottomColor: 'lightgrey',
    marginTop: h(4),
  },
  automatic: {
    fontSize: fs(16),
    marginTop: h(1),
  },
  btnContainer: {
    flexDirection: 'row',
    backgroundColor: 'lightgrey',
    height: h(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnStyle: {
    width: w(44),
    height: h(6),
    justifyContent: 'center',
  },
  slideTurn: {
    alignSelf: 'center',
    fontSize: 18,
    color: 'black',
    marginBottom: h(1),
  },
  btnBackground: {
    backgroundColor: '#989898',
    flexDirection: 'row',
    borderRadius: 12,
  },
});
