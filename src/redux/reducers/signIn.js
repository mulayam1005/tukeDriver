import {
  MOBILE_NUMBER,
  RESTORE_TOKEN,
  SIGN_IN_FAILURE,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  VEHICLE_ID,
  VEHICLE_PHOTO,
} from '../constants/type';

const initialState = {
  isLoading: false,
  isError: false,
  isLoggedIn: false,
  error: null,
  access_token: null,
  loginSuccess: false,
  user: [],
  moblieNumber : null
};

const signInReducer = (state = initialState, action) => {
 
  switch (action.type) {
    case VEHICLE_PHOTO:
      return {
        vehicleImage : action.vehicleImage,
       
      };
    case VEHICLE_ID:
      return {
        vehicleId: action.vehicleId,
 
      };
    case MOBILE_NUMBER:
      return {
        moblieNumber: action.moblieNumber,
        isLoading: false,
      };
    case SIGN_IN_REQUEST:
      return {
        ...state,
      };
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        loginSuccess: true,
      };
    case SIGN_IN_FAILURE:
      return {
        ...state,
        isError: true,
        isLoading: false,
        error: action.Payload.error,
      };
    default:
      return state;
  }
};
export default signInReducer;
