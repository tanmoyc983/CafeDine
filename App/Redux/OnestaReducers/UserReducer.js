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
    loginSuccess: false,
    PhoneNumber: "",
    searchDisabled: true
  },
  userRegisteredSuccessfully:false
});

export const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ReduxActions.SET_MOBILE_NUMBER:
      let setMobile = Object.assign({}, state.loginDetails, {PhoneNumber: action.mobileNumber,searchDisabled: false})
      return Object.assign({}, state, {loginDetails: setMobile});
      break;

    case ReduxActions.GOT_USER_DETAILS:
      let updatedCustomer =  Object.assign({}, state.customer,{
        customerID: action.response.customerID,
        customerName: action.response.customerName,
        address: action.response.address,
        city: action.response.city,
        state: action.response.state,
        email: action.response.email
      });
      let UpdatedloginDetails =  Object.assign({}, state.loginDetails,{
        loginSuccess: action.response.customerID ? true : false,
        showIndicator: action.response.customerID ? true : false
      });
      return Object.assign({}, state, {customer: updatedCustomer,loginDetails: UpdatedloginDetails});
      break;

    case ReduxActions.NEW_CUSTOMER_DETAILS:
    return Object.assign({},state,{customer:action.customer});
    break;

    case ReduxActions.SAVED_NEW_USER_DETAILS:
    if(action.response){
      Toast.show({
        text: "Customer details saved successfully.",
        textStyle: { fontSize: 25, fontFamily:'Avenir-Black' },
        duration: 2000,
        position: "top",
        buttonTextStyle:{fontSize: 20, fontFamily:'Avenir-Black'},
        buttonText: "Ok",
        type: "success"
      });
    }
    return Object.assign({},state,{userRegisteredSuccessfully:true})
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
