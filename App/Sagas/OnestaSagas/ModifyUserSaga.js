import { call, put } from 'redux-saga/effects';
import {ModifyCustomer} from '../../Services/OnestaApi'
import ReduxActions from "../../Redux/ActionTypes/Action";

export const ModifyCustomerDetails = function * (action) {
  const { userData } = action;
  // make the call to the api
  const response = yield call(ModifyCustomer, userData);
  if (response) {
   
    // do data conversion here if needed
    yield put({type: ReduxActions.CUSTOMER_DETAILS_MODIFIED});
  } else {
    yield put({type: ReduxActions.FAILED_TO_EDIT_USER_DETAILS});
  }
}