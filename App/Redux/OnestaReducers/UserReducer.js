import Immutable from 'seamless-immutable';
import ReduxActions from "../ActionTypes/Action";
import {Toast } from 'native-base';

const INITIAL_STATE = Immutable({
  customer: {
    customerID: '',
    customerName: '',
    address: "",
    city: "",
    state: "",
    email: ""
  },
  loginDetails: {
    loginSuccess: '',
    PhoneNumber: "",
    searchDisabled: true
  },
  userRegisteredSuccessfully:false
});

export const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ReduxActions.SET_MOBILE_NUMBER:
    let validMobile=true;
    if(action.mobileNumber.length === 10 && /^[0-9]{1,10}$/.test(action.mobileNumber)){
      validMobile=false;
    }
      let setMobile = Object.assign({}, state.loginDetails, {PhoneNumber: action.mobileNumber,searchDisabled: validMobile})
      return Object.assign({}, state, {loginDetails: setMobile});
      break;

      case ReduxActions.GOT_USER_DETAILS:
      let updatedCustomer= Object.assign({},INITIAL_STATE.customer);
      if(action.response!=="Mobile number is not registered !")
      {
      updatedCustomer = Object.assign({}, state.customer,{
      customerID: action.response.customerID,
      customerName: action.response.customerName,
      address: action.response.address,
      city: action.response.city,
      state: action.response.state,
      email: action.response.email
      });
      }
      let UpdatedloginDetails = Object.assign({}, state.loginDetails,{loginSuccess: action.response.customerID ? 'success' : 'failed'});
      return Object.assign({}, state, {customer: updatedCustomer,loginDetails: UpdatedloginDetails});
      break;
    
      case ReduxActions.CHANGE_LOGIN_STATUS:
      let modifyloginDetails = Object.assign({}, state.loginDetails,{loginSuccess: action.loginStatus});
      return Object.assign({}, state, {loginDetails: modifyloginDetails});
      break;   
      
    case ReduxActions.NEW_CUSTOMER_DETAILS:
    return Object.assign({},state,{customer:action.customer});
    break;

    case ReduxActions.SAVED_NEW_USER_DETAILS:
    debugger;
    let newCustomer =  Object.assign({}, state.customer,{
      customerID: action.response,
      customerName: '',
      address: '',
      city: '',
      state: '',
      email: ''
    });
    return Object.assign({},state,{customer: newCustomer,userRegisteredSuccessfully:true})
    break;

    case ReduxActions.FAILED_TO_SAVE_NEW_USER_DETAILS:
    return Object.assign({},state,{userRegisteredSuccessfully:false})
      break;

    case ReduxActions.RESET_USER_DATA:
    return Object.assign({},state,INITIAL_STATE);
    break;

    default:
      return Object.assign({}, state);
  }
}
