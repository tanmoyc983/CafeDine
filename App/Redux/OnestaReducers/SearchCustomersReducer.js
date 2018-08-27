import Immutable from 'seamless-immutable';
import ReduxActions from "../ActionTypes/Action";
import { Toast } from 'native-base';

const INITIAL_STATE = Immutable({
SearchedText:'',
RadiobuttonSelected:'',
customers: [],
selectedCustomer: {},
DeleteCustomer:false,
EditCustomer:false,
isUserDeleted: false,
customerModified: false
});

export const SearchCustomersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case ReduxActions.SET_SEARCHED_TEXT:
      return Object.assign({}, state, {SearchedText: action.event});
      break;

    case ReduxActions.GOT_USERS_BY_NAME:
      let searchedCustomer=[];
      action.response.forEach(element => {
        searchedCustomer.push(element);
      });      
      return Object.assign({}, state, {customers: searchedCustomer});

    case ReduxActions.FAILED_TO_GET_USERS_BY_NAME:
      console.log("failed to get customers by name");
      return Object.assign({}, state);

    case ReduxActions.RADIOBUTTON_SELECTED:
      return Object.assign({}, state, {RadiobuttonSelected: action.selectedvalue,SearchedText:''});

    case ReduxActions.EDIT_CUSTOMER:
      return Object.assign({}, state, {selectedCustomer: action.customer,EditCustomer:true,DeleteCustomer:false })

    case ReduxActions.DELETE_CUSTOMER:
      return Object.assign({}, state,{selectedCustomer: action.customer,DeleteCustomer:true,EditCustomer:false} );
    
    case ReduxActions.CUSTOMER_DELETED:
      return Object.assign({}, state, {isUserDeleted: action.response});
      
    case ReduxActions.FAILED_TO_EDIT_USER_DETAILS:
      console.log("FAILED_TO_EDIT_USER_DETAILS");
      return Object.assign({}, state);

    case ReduxActions.CUSTOMER_DETAILS_MODIFIED:
      Toast.show({
        text: "Customer details modified successfully.",
        textStyle: { fontSize: 25, fontFamily:'Avenir-Black' },
        duration: 2000,
        position: "top",
        buttonTextStyle:{fontSize: 20, fontFamily:'Avenir-Black'},
        buttonText: "Ok",
        type: "success"
      });
      return Object.assign({}, state, {customerModified:true});
      
      
      case ReduxActions.FAILED_TO_DELETE_USER_DETAILS:
      console.log("FAILED_TO_DELETE_USER_DETAILS");
      return Object.assign({}, state);
      
      case ReduxActions.RESET_CUSTOMER_DATA:
        return Object.assign({}, state,INITIAL_STATE);
        break;

    default:
      return Object.assign({}, state);
  }
}
