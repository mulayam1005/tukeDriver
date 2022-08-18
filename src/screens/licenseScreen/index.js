import {StyleSheet, Text, View,SafeAreaView} from 'react-native';
import React, {useState, useContext} from 'react';
import CommonImagePicker from '../../components/CommonImagePicker';
import {fs, h, w} from '../../config';
import CustomHeader from '../../components/CustomHeader';
import {ApplicationContext} from '../../utils/context';

const LicenseScreen = props => {
  const [licenseImage, setlicenseImage] = useState('');
  const [appData, setAppData] = useContext(ApplicationContext);

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader onPress={() => props.navigation.goBack()} />
      <Text style={styles.textStyle}>
        {`Take photo of your\nDriving License`}
      </Text>
      <Text
        style={
          styles.text2Style
        }>{`Please make sure all the information is accurate\nand the whole driving license is clearly visible in\nthe picture with all 4 corners shown.`}</Text>
      <View style={{marginTop:h(5)}}>
      <CommonImagePicker
        isFilled={true}
        getImage={img => setAppData({...appData, licences_Photo: img})}
        onPress={() => props.navigation.navigate('ProfileScreen')}
        imageStyle={styles.image}
        image={appData.licences_Photo}
        disabled={appData.licences_Photo == '' ? true : false}
        bgColor={appData.licences_Photo == '' ? false : true}
      />
      </View>
    </SafeAreaView>
  );
};

export default LicenseScreen;

const styles = StyleSheet.create({
  textStyle: {
    fontSize: fs(20),
    color: 'black',
    marginTop: h(2),
    fontWeight: 'bold',
    marginBottom: w(3),
    marginLeft: w(10),
  },
  text2Style: {
    marginTop: h(4),
    alignSelf: 'center',
    marginBottom: h(4),
  },
  image: {
    width: w(70),
    height: h(25),
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'lightgrey',
  },
});
