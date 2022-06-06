import React, { createContext, useState} from 'react';

export const AuthContext = createContext();

export const ApplicationContext = React.createContext();
export const ApplicationProvider = props => {
  const [appData, setAppData] = useState({
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    mobile_No: 'string',
    driver_Photo: 'string',
    vehicle_Photo: 'string',
    licences_Photo: 'string',
    vehicle_Id: 'string',
    vehicle_No: 'string',
    isAvailable: true,
    vehiclePhotoBase64: 'string',
    driverPhotoBase64: 'string',
    licencesPhotoBase64: 'string',
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
