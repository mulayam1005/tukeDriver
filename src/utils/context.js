import React, { createContext, useState} from 'react';

export const AuthContext = createContext();

export const ApplicationContext = React.createContext();
export const ApplicationProvider = props => {
  const [appData, setAppData] = useState({
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
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
