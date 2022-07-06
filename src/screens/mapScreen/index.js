import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import MapView from 'react-native-maps';
import {fs, h, w} from '../../config';
import CommonBtn from '../../components/CommonBtn';
import {colors} from '../../constants';
import {OrderContext, UserContext} from '../../utils/context';
import axios from 'axios';
import {showMessage} from 'react-native-flash-message';
import NotificationController from '../../utils/helperFunction/notificationController';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {loader} from '../../redux/actions/loader';
import ForegroundHandler from '../../utils/helperFunction/ForegroundHandler';
import PushNotification from 'react-native-push-notification';

const MapScreen = props => {
  const [userData, setUserData] = useContext(UserContext);
  const [driverStatus, setDriverStatus] = useState(false);
  const [confirmDriverStatus, setConfirmDriverStatus] = useState(false);
  const [isOrderExist, setIsOrderExist] = useState(false);
  const [orderList, setorderList] = useState([]);
  const [orderData, setOrderData] = useContext(OrderContext);
  const [orderId, setOrderId] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    // getOrderDetails();
    if (props.route.params) {
      const {orderId} = props.route.params;
      console.log('orderId: ', orderId);
      setOrderId(orderId);
      getOrderDetails(orderId);
    }
    if (userData) {
      getDriverStatus();
    }
  }, [userData, useIsFocused()]);

  // useEffect(() => {
  //   if (driverStatus) {
  //     // if (!isOrderExist) {
  //     //   setInterval(() => {
  //     //     // setIsOrderExist(true)
  //     //     getOrder();
  //     //   }, 5000);
  //     // }
  //   }
  //   return clearInterval();
  // }, [driverStatus]);

  const updateOrderStatus = (num, status) => {
    console.log(num, status);
    dispatch(loader(true));
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
        dispatch(loader(false));
        console.log('order Accepted data--->>', data);
        if (data) {
          if (data.data.order_Status == 'Order Accepted') {
            props.navigation.navigate('OrderTrackingScreen', {
              orderId: orderId,
            });
          } else {
            setOrderData('');
            setIsOrderExist(false);
          }
        }
      })
      .catch(function (err) {
        dispatch(loader(true));
        showMessage({
          message: `${err.response.status} ${err.response.statusText} AAA`,
          type: 'warning',
        });
      });
  };

  const getOrder = () => {
    const id = 1;
    axios
      .get(
        `http://tuketuke.azurewebsites.net/api/OrderDetails/GetOrderListbyStatus?Status_Id=${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then(({data}) => {
        if (data.status == 'Success') {
          setIsOrderExist(true);
          setorderList(data.data[0]);
        } else {
          showMessage({
            message: data.message,
            type: 'warning',
          });
        }
      })
      .catch(err => {
        showMessage({
          message: `${err.response.status} ${err.response.statusText}`,
          type: 'warning',
        });
      });
  };

  const getDriverStatus = () => {
    axios
      .get(
        `http://tuketuke.azurewebsites.net/api/DriverDetails/GetDriverAvailableOrNot?Driver_MobileNo=${userData.mobile_No}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then(({data}) => {
        if (data.status == 'Success') {
          setDriverStatus(data.data.isAvailable);
        } else {
          showMessage({
            message: data.message,
            type: 'warning',
          });
        }
      })
      .catch(err => {
        showMessage({
          message: `${err.response.status} ${err.response.statusText}`,
          type: 'warning',
        });
      });
  };

  const updateDriverStatus = status => {
    axios
      .post(
        'http://tuketuke.azurewebsites.net/api/DriverDetails/UpdateDriver_IsAvailable',
        {
          mobile_No: userData.mobile_No,
          isAvailable: status,
        },
      )
      .then(function ({data}) {
        if (data.status == 'Success') {
          if (status == false) {
            setConfirmDriverStatus(false);
            setDriverStatus(false);
          } else {
            if (confirmDriverStatus) {
              setConfirmDriverStatus(false);
              setDriverStatus(true);
            } else {
              setConfirmDriverStatus(true);
            }
          }
        }
      })
      .catch(function (err) {
        showMessage({
          message: `${err.response.status} ${err.response.statusText}`,
          type: 'warning',
        });
      });
  };

  const getOrderDetails = id => {
    let OrderId = id ? id : orderId;
    axios
      .get(
        `http://tuketuke.azurewebsites.net/api/OrderDetails/GetOrderDetailbyOrderNo?Order_No=${OrderId}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then(({data}) => {
        if (data.status == 'Success') {
          setOrderData(data.data);
          setIsOrderExist(true);
          // setDriverStatus(data.data.isAvailable);
        }
      })
      .catch(err => {
        showMessage({
          message: `${err.response.status} ${err.response.statusText}`,
          type: 'warning',
        });
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ForegroundHandler  />
      <NotificationController navigation={props.navigation}  />
      <View style={{backgroundColor: '#fff', flex: 0.2}}></View>
      <MapView
        style={{
          flex:
            isOrderExist && driverStatus
              ? 3.6
              : driverStatus
              ? 5.3
              : confirmDriverStatus
              ? 4.3
              : 5.3,
        }} // 5.3
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
      <View
        style={{
          flex:
            isOrderExist && driverStatus
              ? 2.2
              : confirmDriverStatus
              ? 1.5
              : 0.5,
        }}>
        {isOrderExist && driverStatus && (
          <View
            style={{
              flex: 4.5,
              padding: 10,
              paddingHorizontal: 20,
            }}>
            <Text
              style={{
                fontSize: fs(18),
                color: colors.hex_000000,
                fontWeight: 'bold',
                marginBottom: w(1),
              }}>
              {`Congratulations! You have 1 order`}
            </Text>
            <View
              style={{
                backgroundColor: colors.hex_f66820,
                //  justifyContent: 'space-between',
                height: h(12),
                paddingVertical: h(1),
                paddingHorizontal: w(3),
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: fs(14),
                  fontWeight: 'bold',
                }}>
                A customer wants to move goods from :
              </Text>
              <View>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: fs(14),
                    fontWeight: 'bold',
                  }}>
                  {/* General Hospital to{' '} */}
                  {`${orderData.pick_Location} ${orderData.pick_Address} to`}
                </Text>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: fs(14),
                    fontWeight: 'bold',
                  }}>
                  {`${orderData.destination_Address} ${orderData.destination_Location}`}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => updateOrderStatus(2, 'Order Accepted')}
              //  onPress={() => handleNotification()}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: h(5),
                backgroundColor: 'limegreen',
                marginTop: 4,
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontWeight: 'bold',
                }}>
                Confirm and Go
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setIsOrderExist(false);
                updateOrderStatus(8, 'Order Canceled by Driver');
              }}
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color: '#000'}}>Cancel Order</Text>
            </TouchableOpacity>
          </View>
        )}
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
        <View
          style={[
            styles.btnContainer,
            {flex: driverStatus && isOrderExist ? 1.5 : 1},
          ]}>
          <View
            style={{
              backgroundColor: '#989898',
              flexDirection: 'row',
              borderRadius: 10,
            }}>
            {driverStatus ? (
              <TouchableOpacity
                onPress={() => {
                  updateDriverStatus(false);
                }}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: w(88),
                  height: h(6),
                }}>
                <Text style={{fontWeight: 'bold', color: '#fff'}}>
                  Turn availablity to to OFF
                </Text>
              </TouchableOpacity>
            ) : (
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  onPress={() => {
                    updateDriverStatus(true);
                  }}
                  style={{
                    height: h(6),
                    width: w(44),
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: driverStatus
                      ? colors.hex_f66820
                      : '#989898',
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: driverStatus ? '#fff' : '#000',
                    }}>
                    ON
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    // setConfirmDriverStatus(false);
                    // setDriverStatus(false);
                    updateDriverStatus(false);
                  }}
                  style={{
                    height: h(6),
                    width: w(44),
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: driverStatus
                      ? '#989898'
                      : colors.hex_f66820,
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: driverStatus ? '#000' : '#fff',
                    }}>
                    OFF
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    flex: 1,
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
});
