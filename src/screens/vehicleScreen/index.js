import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomHeader from '../../components/CustomHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {h, w} from '../../config';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { VEHICLE_ID } from '../../redux/constants/type';
import {loader} from '../../redux/actions/loader'


const VehicleScreen = (props) => {
  const [vehicle, setvehicle] = useState('');

  const dispatch = useDispatch()
  //  const mobile_number = props.route.params.mobile_number
  
  useEffect(() => {
     vehicleList()
  }, []);

  const vehicleList = () => {
   dispatch(loader(true))
    axios
    .get('http://tuketuke.azurewebsites.net/api/VehicleList/VehicleList')
    .then(function (response) {
       dispatch(loader(false))
      setvehicle(response.data.data);
    })
    .catch(function (error) {
      console.log('error===>>', error);
    
      dispatch(loader(false))
    });
    dispatch({type: VEHICLE_ID,
        vehicleId: vehicle,
        // mobile_number : mobile_number
      });

  }

  return (
    <View style={{flex: 1}}>
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
          renderItem={({item}) => {
           
            return (
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('VehiclePicture', {
                    vehicle_id: item.id,
                  
                  });
                }}>
                <View style={styles.horizontalItem}>
                  <Image
                    source={{
                      uri: `https://driverfiles.blob.core.windows.net/driverfiles/${item.image_Url}`,
                  }}
              
                    style={styles.imageStyle}
                  />
                  <View style={styles.container}>
                    <View>
                      <Text>{item.vehicle_Weight}</Text>
                      <Text style={styles.vehicleArea}>
                        {item.vehicle_length}
                      </Text>
                      <Text>{item.other_Specification}</Text>
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
    </View>
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
