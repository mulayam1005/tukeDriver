import React, { createContext, useState} from 'react';

export const AuthContext = createContext();

export const ApplicationContext = React.createContext();
export const ApplicationProvider = props => {
  const [appData, setAppData] = useState({
    id: '',
    mobile_No: '',
    driver_Photo: '',
    vehicle_Photo: '',
    licences_Photo: '',
    vehicle_Id: '',
    vehicle_No: '',
    isAvailable: true,
    vehiclePhotoBase64: '',
    driverPhotoBase64: '',
    licencesPhotoBase64: '',
    fcm_id:'',
    driver_Name: '',
    licences_No :'',
  });
  return (
    <ApplicationContext.Provider value={[appData, setAppData]}>
      {props.children}
    </ApplicationContext.Provider>
  );
};

export const UserContext = React.createContext();
export const UserProvider = props => {
  const [userData, setUserData] = useState({});
  return (
    <UserContext.Provider value={[userData, setUserData]}>
      {props.children}
    </UserContext.Provider>
  );
};

export const OrderContext = React.createContext();
export const OrderProvider = props => {
  const [orderData, setOrderData] = useState({});
  return (
    <OrderContext.Provider value={[orderData, setOrderData]}>
      {props.children}
    </OrderContext.Provider>
  );
};