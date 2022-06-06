// import {
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   ScrollView,
//   Dimensions,
// } from 'react-native';
// import React, {useState, useEffect, useRef} from 'react';
// import CustomHeader from '../../components/CustomHeader';
// import {fs, h, w} from '../../config';
// import CommonBtn from '../../components/CommonBtn';
// import MapView, {Marker} from 'react-native-maps';
// import {colors} from '../../constants';
// import axios from 'axios';
// import MapViewDirections from 'react-native-maps-directions';

// var screenWidth = Dimensions.get('window').width;

// const MapScreen = ({navigation}) => {
//   const [driverStatus, setDriverStatus] = useState(false);
//   const [isOrderExist, setIsOrderExist] = useState(false);
//   const [confirmDriverStatus, setConfirmDriverStatus] = useState(false);
//   const [bgColorOn, setbgColorOn] = useState(true);
//   const [bgColorOff, setbgColorOff] = useState(false);

//   const [mapLocation, setmapLocation] = useState({
//     pickupcords: {
//       latitude: 22.7244,
//       longitude: 75.8839,
//       latitudeDelta: 0.015,
//       longitudeDelta: 0.0121,
//     },
//     droplocationcords: {
//       latitude: 22.7377,
//       longitude: 75.8788,
//       latitudeDelta: 0.015,
//       longitudeDelta: 0.0121,
//     },
//   });

//   useEffect(() => {
//     setInterval(() => {
//       axios
//       .post(
//         'http://tuketuke.azurewebsites.net/api/OrderDetails/UpdateDriverLatLngInOrder',
//         {
//           order_No: 10001,
//           driverLat: 22.785,
//           driverLng: 75.345,
//         },
//       )
//       .then(function (response) {
//         console.log('...response...false', response.data);
//         // props.navigation.navigate('MapScreen');
//       })
//       .catch(function (error) {
//         console.log('error===>>', error);
//       });
//   };
//      }, 10000)
//     return clearTimeout();
//   }, []);

//   const mapRef = useRef();
//   console.log('mapRef====>>>', mapRef);
//   const {pickupcords, droplocationcords} = mapLocation;

//   const onClickBtn = () => {
//     setbgColorOn(!bgColorOn);
//     setbgColorOff(bgColorOn);

//     // axios
//     //   .post(
//     //     'http://192.168.0.178:5001/api/DriverDetails/UpdateDriver_IsAvailable',
//     //     {
//     //       mobile_No: '9977106335',
//     //       isAvailable: true,
//     //     },
//     //   )
//     //   .then(function (response) {
//     //     console.log('...response...', response);
//     //    props.navigation.navigate('OrderScreen');
//     //   })
//     //   .catch(function (error) {
//     //     console.log('error===>>', error);
//     //   });
//     // navigation.navigate('OrderScreen');
//   };

//   const ofClickBtn = () => {
//     setbgColorOff(!bgColorOff);
//     setbgColorOn(bgColorOff);


//   console.log(
//     'driverStatus ',
//     driverStatus ? '90%' : confirmDriverStatus ? '60%' : '90%',
//   );

//   return (
//     <View style={{flex: 1}}>
//       <View style={styles.container}>
//         <CustomHeader onPress={() => navigation.goBack()} />
//         <Text style={styles.headerHeading}>Select vehicle</Text>
//         <View />
//       </View>
//       <View
//         style={[
//           styles.mapContainer,
//           {
//             // height: driverStatus ? '90%' : confirmDriverStatus ? '60%' : '90%',
//           },
//         ]}>
//         <MapView
//           // provider='AIzaSyBzhsIqqHLkDrRiSqt94pxHJCdHHXgA464' // remove if not using Google Maps
//           ref={mapRef}
//           style={styles.map}
//           region={pickupcords}>
//           <Marker coordinate={pickupcords} />
//           <Marker coordinate={droplocationcords} />
//           <MapViewDirections
//             origin={pickupcords}
//             destination={droplocationcords}
//             apikey={'AIzaSyBzhsIqqHLkDrRiSqt94pxHJCdHHXgA464'}
//             strokeWidth={8}
//             strokeColor="red"
//             optimizeWaypoints={true}
//             onReady={result => {
//               mapRef.current.fitToCoordinates(result.coordinate, {
//                 edgePadding: {
//                   right: 30,
//                   bottom: 300,
//                   left: 30,
//                   top: 100,
//                 },
//               });
//             }}
//           />
//         </MapView>
//       </View>
//       {confirmDriverStatus && (
//         <View style={styles.orderView}>
//           <Text
//             style={
//               styles.orderText
//             }>{`Are you available to recieve\norders Now?`}</Text>
//           <Text
//             style={
//               styles.automatic
//             }>{`Available orders will be pushed to you\nautomatically`}</Text>
//         </View>
//       )}
//       <View style={styles.availablity} />
//       <View style={{flex: 1, justifyContent: 'flex-end'}}>
//         {/* <Text style={styles.slideTurn}> Slide to turn on Availablity</Text> */}
//         <View style={styles.btnContainer}>
//           <View style={styles.btnBackground}>
//             <CommonBtn
//               text="ON"
//               customBtnStyle={[
//                 styles.btnStyle,
//                 {backgroundColor: driverStatus ? colors.hex_f66820 : '#989898'},
//               ]}
// onPress={() => {
//   // if (confirmDriverStatus) {
//   //   setConfirmDriverStatus(false);
//   //   setDriverStatus(true);
//   // } else {
//   //   setConfirmDriverStatus(true);
//   // }
// }}
//             />
//             <CommonBtn
//               text="OFF"
//               customBtnStyle={[
//                 styles.btnStyle,
//                 {backgroundColor: driverStatus ? '#989898' : colors.hex_f66820},
//               ]}
//               onPress={ofClickBtn}
//             />
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// };

// export default MapScreen;

// const styles = StyleSheet.create({
//   map: {
//     width: '100%',
//     height: '100%',
//   },
//   container: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   headerHeading: {
//     marginTop: h(1),
//     marginRight: h(7),
//     color: 'black',
//     fontSize: fs(15),
//   },
//   mapContainer: {
//     width: '100%',
//     height: '60%',
//     marginTop: h(1),
//   },
//   orderView: {
//     marginLeft: w(10),
//     marginTop: h(4),
//   },
//   orderText: {
//     fontSize: fs(22),
//     color: '#414042',
//     fontWeight: 'bold',
//   },
//   availablity: {
//     borderBottomWidth: w(1),
//     borderBottomColor: 'lightgrey',
//     marginTop: h(4),
//   },
//   automatic: {
//     fontSize: fs(16),
//     marginTop: h(1),
//   },
//   btnContainer: {
//     flexDirection: 'row',
//     backgroundColor: 'lightgrey',
//     height: h(10),
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   btnStyle: {
//     width: w(44),
//     height: h(6),
//     justifyContent: 'center',
//   },
//   slideTurn: {
//     alignSelf: 'center',
//     fontSize: 18,
//     color: 'black',
//     marginBottom: h(1),
//   },
//   btnBackground: {
//     backgroundColor: '#989898',
//     flexDirection: 'row',
//     borderRadius: 12,
//   },
// });

import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';
import { fs, h, w } from '../../config';
import CommonBtn from '../../components/CommonBtn';
import { colors } from '../../constants';
import { UserContext } from '../../utils/context';
import axios from 'axios';

const MapScreen = ({ navigation }) => {
  const [userData, setUserData] = useContext(UserContext)
  console.log('userData: ', userData);
  const [driverStatus, setDriverStatus] = useState(false);
  const [confirmDriverStatus, setConfirmDriverStatus] = useState(false);
  const [isOrderExist, setIsOrderExist] = useState(false);

  useEffect(() => {
    if (userData) {
      getDriverStatus()
    }
  }, [userData])

  useEffect(() => {
    if (driverStatus) {
      setTimeout(() => {
        setIsOrderExist(true)
      }, 5000);
    };
    return clearTimeout()
  }, [driverStatus]);

  const getDriverStatus = () => {
    axios
      .get(`http://tuketuke.azurewebsites.net/api/DriverDetails/GetDriverAvailableOrNot?Driver_MobileNo=${userData.mobile_No}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then(({ data }) => {
        if (data.status == 'Success') {
          console.log('data.data.isAvailable: ', data.data.isAvailable);
          setDriverStatus(data.data.isAvailable)
        };
      })
      .catch((err) => {
        console.log('err: ', err);
      })
  }

  const updateDriverStatus = (status) => {
    axios.post('http://tuketuke.azurewebsites.net/api/DriverDetails/UpdateDriver_IsAvailable', {
      "mobile_No": userData.mobile_No,
      "isAvailable": status
    })
      .then(function ({ data }) {
        if (data.status == 'Success') {
          if (status == false) {
            setConfirmDriverStatus(false);
            setDriverStatus(false)
          } else {
            if (confirmDriverStatus) {
              setConfirmDriverStatus(false);
              setDriverStatus(true);
            } else {
              setConfirmDriverStatus(true);
            }
          };
        };
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: '#fff', flex: 0.2 }}>
      </View>
      <MapView
        style={{ flex: isOrderExist && driverStatus ? 3.6 : driverStatus ? 5.3 : confirmDriverStatus ? 4.3 : 5.3 }}// 5.3 
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
      <View style={{ flex: isOrderExist && driverStatus ? 2.2 : confirmDriverStatus ? 1.5 : 0.5 }}>
        {
          isOrderExist && driverStatus &&
          <View style={{
            flex: 4.5,
            padding: 10,
            paddingHorizontal: 20
          }}>
            <Text style={{
              fontSize: fs(18),
              color: colors.hex_000000,
              fontWeight: 'bold',
              marginBottom: w(1),
            }}>
              {`Congratulations! You have 1 order`}
            </Text>
            <View style={{
              backgroundColor: colors.hex_f66820,
              //  justifyContent: 'space-between',
              height: h(12),
              paddingVertical: h(1),
              paddingHorizontal: w(3),
            }}>
              <Text style={{
                color: "#fff",
                fontSize: fs(14),
                fontWeight: "bold"
              }}>
                A customer wants to move goods from :
              </Text>
              <View>
                <Text style={{
                  color: "#fff",
                  fontSize: fs(14),
                  fontWeight: "bold"
                }}>General Hospital to </Text>
                <Text style={{
                  color: "#fff",
                  fontSize: fs(14),
                  fontWeight: "bold"
                }}>Green Primary school</Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => { navigation.navigate('OrderTrackingScreen') }}
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: h(5),
                backgroundColor: "limegreen",
                marginTop: 4
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontWeight: "bold"
                }}
              >
                Confirm and Go
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              setIsOrderExist(false)
            }}
              style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <Text style={{ color: "#000" }}>
                Cancel Order
              </Text>
            </TouchableOpacity>
          </View>
        }
        {
          confirmDriverStatus &&
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
        }
        <View style={[styles.btnContainer, { flex: driverStatus && isOrderExist ? 1.5 : 1 }]}>
          <View style={{ backgroundColor: "#989898", flexDirection: "row", borderRadius: 10 }}>
            {
              driverStatus ?
                <TouchableOpacity
                  onPress={() => {
                    setConfirmDriverStatus(false);
                    setDriverStatus(false);
                  }}
                  style={{ justifyContent: "center", alignItems: "center", width: w(88), height: h(6) }}>
                  <Text style={{ fontWeight: "bold", color: '#fff' }}>
                    Turn availablity to to OFF
                  </Text>
                </TouchableOpacity>
                :
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity
                    onPress={() => {
                      updateDriverStatus(true)
                    }}
                    style={{
                      height: h(6),
                      width: w(44),
                      borderRadius: 10,
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: driverStatus ? colors.hex_f66820 : '#989898',
                    }}>
                    <Text style={{ fontWeight: "bold", color: driverStatus ? '#fff' : '#000' }}>
                      ON
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      // setConfirmDriverStatus(false);
                      // setDriverStatus(false);
                      updateDriverStatus(false)
                    }}
                    style={{
                      height: h(6),
                      width: w(44),
                      borderRadius: 10,
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: driverStatus ? '#989898' : colors.hex_f66820,

                    }}>
                    <Text style={{ fontWeight: "bold", color: driverStatus ? '#000' : '#fff' }}>
                      OFF
                    </Text>
                  </TouchableOpacity>
                </View>
            }

          </View>
        </View>
      </View>
    </View>
  );
};
export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
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
    marginTop: h(1),
  },
  orderText: {
    fontSize: fs(22),
    color: '#414042',
    fontWeight: 'bold',
  },
  availablity: {
    borderBottomWidth: w(1),
    borderBottomColor: 'lightgrey',
    flex: 1
  },
  automatic: {
    fontSize: fs(16),
  },
  btnContainer: {
    flexDirection: 'row',
    backgroundColor: 'lightgrey',
    flex: 1,
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
})