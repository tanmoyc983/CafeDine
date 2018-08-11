import Immutable from 'seamless-immutable';
import ReduxActions from "../ActionTypes/Action";

const INITIAL_STATE = Immutable({
SearchedText:'',
RadiobuttonSelected:'',
customers: null,
selectedCustomer: {},
DeleteCustomer:false,
EditCustomer:false,
isUserDeleted: false
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
      console.log("CUSTOMER_DETAILS_MODIFIED");
      return Object.assign({}, state);
      
      
      case ReduxActions.FAILED_TO_DELETE_USER_DETAILS:
      console.log("FAILED_TO_DELETE_USER_DETAILS");
      return Object.assign({}, state); 

    default:
      return Object.assign({}, state);
  }
}
