
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';
import axios from 'axios';
import Geolocation from 'react-native-geolocation-service';

const MapScreen = ({ navigation }) => {

    useEffect(() => {
        const intervalId = setInterval(() => {
            setLocation();
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);

    const setLocation = async () => {
        Geolocation.getCurrentPosition(
            async (position) => {
                axios.post('http://tuketuke.azurewebsites.net/api/OrderDetails/UpdateDriverLatLngInOrder', {
                    "order_No": 10051,
                    "driverLat": position.coords.latitude,
                    "driverLng": position.coords.longitude
                })
                    .then(function (response) {
                        console.log(response.data);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            (error) => {
                // See error code charts below.
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    };

    return (
        <View style={styles.container}>
            <MapView
                style={styles.container}
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                region={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            />
        </View>
    );
};
export default MapScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
})