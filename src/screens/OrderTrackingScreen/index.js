// import React, { useEffect, useState } from 'react';
// import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
// import MapView from 'react-native-maps';
// import axios from 'axios';
// import Geolocation from 'react-native-geolocation-service';

// const MapScreen = ({ navigation }) => {

//     useEffect(() => {
//         const intervalId = setInterval(() => {
//             setLocation();
//         }, 1000);
//         return () => clearInterval(intervalId);
//     }, []);

//     const setLocation = async () => {
//         Geolocation.getCurrentPosition(
//             async (position) => {
//                 axios.post('http://tuketuke.azurewebsites.net/api/OrderDetails/UpdateDriverLatLngInOrder', {
//                     "order_No": 10051,
//                     "driverLat": position.coords.latitude,
//                     "driverLng": position.coords.longitude
//                 })
//                     .then(function (response) {
//                         console.log(response.data);
//                     })
//                     .catch(function (error) {
//                         console.log(error);
//                     });
//             },
//             (error) => {
//                 // See error code charts below.
//                 console.log(error.code, error.message);
//             },
//             { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
//         );
//     };

//     return (
//         <View style={styles.container}>
//             <MapView
//                 style={styles.container}
//                 initialRegion={{
//                     latitude: 37.78825,
//                     longitude: -122.4324,
//                     latitudeDelta: 0.0922,
//                     longitudeDelta: 0.0421,
//                 }}
//                 region={{
//                     latitude: 37.78825,
//                     longitude: -122.4324,
//                     latitudeDelta: 0.0922,
//                     longitudeDelta: 0.0421,
//                 }}
//             />
//         </View>
//     );
// };
// export default MapScreen;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1
//     },
// })

import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  Platform,
} from 'react-native';
import MapView, {Marker, AnimatedRegion} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Loader from '../../components/Loader';
import Geolocation from 'react-native-geolocation-service';
import {locationPermission} from '../../utils/helperFunction/locationPermission';

const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const OrderTrackingScreen = ({navigation}) => {
  const getCurrentLocation = () =>
    new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        position => {
          const cords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            heading: position?.coords?.heading,
          };

          resolve(cords);
        },
        error => {
          reject(error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    });

  const mapRef = useRef();
  const markerRef = useRef();

  const [state, setState] = useState({
    curLoc: {
      latitude: 30.7046,
      longitude: 77.1025,
    },
    destinationCords: {
      latitude: 22.6111,
      longitude: 75.6773,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    },
    isLoading: false,
    coordinate: new AnimatedRegion({
      latitude: 30.7046,
      longitude: 77.1025,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    }),
    time: 0,
    distance: 0,
    heading: 0,
  });

  const {
    curLoc,
    time,
    distance,
    destinationCords,
    isLoading,
    coordinate,
    heading,
  } = state;
  const updateState = data => setState(state => ({...state, ...data}));

  useEffect(() => {
    getLiveLocation();
  }, []);

  const getLiveLocation = async () => {
    const locPermissionDenied = await locationPermission();
    if (locPermissionDenied) {
      const {latitude, longitude, heading} = await getCurrentLocation();
      console.log('get live location after 4 second', heading);
      animate(latitude, longitude);
      updateState({
        heading: heading,
        curLoc: {latitude, longitude},
        coordinate: new AnimatedRegion({
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }),
      });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getLiveLocation();
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const animate = (latitude, longitude) => {
    const newCoordinate = {latitude, longitude};
    if (Platform.OS == 'android') {
      if (markerRef.current) {
        markerRef.current.animateMarkerToCoordinate(newCoordinate, 7000);
      }
    } else {
      coordinate.timing(newCoordinate).start();
    }
  };

  const onCenter = () => {
    mapRef.current.animateToRegion({
      latitude: curLoc.latitude,
      longitude: curLoc.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    });
  };

  const fetchTime = (d, t) => {
    updateState({
      distance: d,
      time: t,
    });
  };

  return (
    <View style={styles.container}>
      {distance !== 0 && time !== 0 && (
        <View style={{alignItems: 'center', marginVertical: 16}}>
          <Text>Time left: {time.toFixed(0)} </Text>
          <Text>Distance left: {distance.toFixed(0)}</Text>
        </View>
      )}
      <View style={{flex: 1}}>
        <MapView
           
          ref={mapRef}
          style={StyleSheet.absoluteFill}
          initialRegion={{
            ...curLoc,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}>
          <Marker.Animated ref={markerRef} coordinate={coordinate}>
            <Image
              source={require('../../assets/images/bike.png')}
              style={{
                width: 40,
                height: 40,
                transform: [{rotate: `${heading}deg`}],
                alignSelf:'center',
                justifyContent:"center",
                alignItems:'center'
              }}
              resizeMode="contain"
            />
          </Marker.Animated>

          {Object.keys(destinationCords).length > 0 && (
            <Marker
              coordinate={destinationCords}
              source={require('../../assets/images/greenMarker.png')}
            />
          )}

          {/* {Object.keys(destinationCords).length > 0 && ( */}
            <MapViewDirections
              origin={curLoc}
              destination={destinationCords}
              apikey={'AIzaSyBzhsIqqHLkDrRiSqt94pxHJCdHHXgA464'}
              strokeWidth={6}
              strokeColor="red"
              optimizeWaypoints={true}
              onStart={params => {
                console.log(
                  `Started routing between "${params.origin}" and "${params.destination}"`,
                );
              }}
              onReady={result => {
                console.log(`Distance: ${result.distance} km`);
                console.log(`Duration: ${result.duration} min.`);
                fetchTime(result.distance, result.duration),
                  mapRef.current.fitToCoordinates(result.coordinates, {
                    edgePadding: {
                      // right: 30,
                      // bottom: 300,
                      // left: 30,
                      // top: 100,
                    },
                  });
              }}
              onError={errorMessage => {
                // console.log('GOT AN ERROR');
              }}
            />
          {/* )} */}
        </MapView>
        <TouchableOpacity
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
          }}
          onPress={onCenter}>
          <Image source={require('../../assets/images/greenIndicator.png')} />
        </TouchableOpacity>
      </View>

      <Loader isLoading={isLoading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomCard: {
    backgroundColor: 'white',
    width: '100%',
    padding: 30,
    borderTopEndRadius: 24,
    borderTopStartRadius: 24,
  },
  inpuStyle: {
    backgroundColor: 'white',
    borderRadius: 4,
    borderWidth: 1,
    alignItems: 'center',
    height: 48,
    justifyContent: 'center',
    marginTop: 16,
  },
});

export default OrderTrackingScreen;
