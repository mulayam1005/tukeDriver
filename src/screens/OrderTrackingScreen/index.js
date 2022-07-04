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
import {OrderContext, UserContext} from '../../utils/context';
import {useContext} from 'react';
import axios from 'axios';
import {fs, h, w} from '../../config';
import {showMessage} from 'react-native-flash-message';

const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const OrderTrackingScreen = ({navigation, route}) => {
  const [orderData, setOrderData] = useContext(OrderContext);
  const [userData, setUserData] = useContext(UserContext);
  console.log('orderData: ', orderData);

  const mapRef = useRef();
  const markerRef = useRef();

  const [state, setState] = useState({
    curLoc: {
      latitude: 30.7046,
      longitude: 77.1025,
    },
    destinationCords: {
      latitude: orderData.pick_Late,
      longitude: orderData.pick_Long,
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

  useEffect(() => {
    const interval = setInterval(() => {
      getLiveLocation();
    }, 6000);
    return () => clearInterval(interval);
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

      axios
        .post(
          'http://tuketuke.azurewebsites.net/api/OrderDetails/UpdateDriverLatLngInOrder',
          {
            order_No: orderData.order_No,
            driverLat: latitude,
            driverLng: longitude,
          },
        )
        .then(function ({data}) {
          if (data.status == 'Success') {
            // console.log('location updated', data);
          } else {
            console.log('location not updated', data);
          }
        })
        .catch(function (error) {
          console.log('error', error);
        });
    }
  };

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

  const onCancelOrder = (num, status) => {
    axios
      .post(
        'http://tuketuke.azurewebsites.net/api/OrderDetails/UpdateOrderStatus',
        {
          order_No: orderData.order_No,
          order_StatusId: num,
          order_Status: status,
          driver_MobileNo: userData.mobile_No,
        },
      )
      .then(function ({data}) {
        console.log('dataa--->>',data)
         console.log(data.data.order_Status)
        if (data) {
          if (data.data.order_Status == 'Order Canceled by Driver') {
           
            navigation.navigate('MapScreen',{
              isOrderExits : false
            });
          } else {
            // setOrderData('');
            // setIsOrderExist(false);
          }
        }
      })
      .catch(function (err) {
        // showMessage({
        //   message: `${err.response.status} ${err.response.statusText}`,
        //   type: 'warning',
        // });
      });
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          marginVertical: 16,
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}>
        <TouchableOpacity
          style={{}}
          onPress={() => onCancelOrder(8, 'Order Canceled by Driver')}>
          <View style={{padding: w(2)}}>
            <Text>Cancel order</Text>
          </View>
        </TouchableOpacity>
      </View>
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
              source={require('../../assets/images/bike.jpg')}
              style={{
                width: 40,
                height: 40,
                transform: [{rotate: `${heading}deg`}],
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
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
