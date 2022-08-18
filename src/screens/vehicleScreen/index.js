import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {h, w} from '../../config';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {loader} from '../../redux/actions/loader';
import {ApplicationContext} from '../../utils/context';
import { showMessage } from 'react-native-flash-message';


const VehicleScreen = props => {
  const [vehicle, setvehicle] = useState('');
  const [appData, setAppData] = useContext(ApplicationContext);

  const dispatch = useDispatch();

  useEffect(() => {
    vehicleList();
  }, []);

  const vehicleList = () => {
    dispatch(loader(true));
    axios
      .get('https://tuketuke.com/api/VehicleList/VehicleList')
       .then(({data}) => {
        if (data.status == 'Success') {
        
          dispatch(loader(false));
          setvehicle(data.data);
        } else {
          showMessage({
            message: data.message,
            type: 'warning',
          });
        }
      })
      .catch(function (error) {
        showMessage({
          message: `${error.response.status} ${error.response.statusText}`,
          type: 'warning',
        });
        dispatch(loader(false));
      });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{marginTop: 13}}>
        <View style={[{marginBottom: 13}, styles.containerHeader]}>
          {/* <CustomHeader  /> */}
          <Text style={styles.titleText}>
            What kind of Vehicle do you have?
          </Text>
          <View />
        </View>
        <View style={styles.horizontalLine} />
        <FlatList
          contentContainerStyle={{paddingBottom: h(10)}}
          data={vehicle}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setAppData({
                    ...appData,
                    vehicle_Id: item.id,
                    vehicle_No: index ,

                  });
                  props.navigation.navigate('VehiclePicture');
                }}>
                <View style={styles.horizontalItem}>
                  <Image
                    source={{
                      uri: `${item.image_Url}`,
                    }}
                    style={styles.imageStyle}
                  />
                  <View style={styles.container}>
                    <View>
                      <Text>{item.vehicle_Type}</Text>
                      <Text>{item.other_Specification}</Text>
                      <Text>{item.vehicle_Weight}</Text>
                    </View>
                    <View style={{marginLeft: w(5)}}>
                      <Ionicons
                        name="chevron-forward-outline"
                        size={25}
                        color="grey"
                      />
                    </View>
                  </View>
                </View>
                <View style={styles.horizontalLine} />
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default VehicleScreen;

const styles = StyleSheet.create({
  horizontalLine: {
    borderBottomColor: '#414042',
    borderBottomWidth: 0.5,
  },
  horizontalItem: {
    width: '100%',
    height: 130,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  imageStyle: {
    width: 200,
    height: 110,
    resizeMode: 'cover',
  },
  vehicleArea: {
    marginTop: 3,
    marginBottom: 3,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 12,
    marginLeft: 12,
  },
  titleText: {
    fontSize: 18,
    color: '#414042',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
