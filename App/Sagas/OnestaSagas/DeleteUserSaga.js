import { call, put } from 'redux-saga/effects';
import {DeleteCustomer} from '../../Services/OnestaApi'
import ReduxActions from "../../Redux/ActionTypes/Action";

export const DeleteCustomerDetails = function * (action) {
  const { userData } = action;
  // make the call to the api
  const response = yield call(DeleteCustomer, userData);
  if (response) {
   
    // do data conversion here if needed
    yield put({type: ReduxActions.CUSTOMER_DELETED, response });
  } else {
    yield put({type: ReduxActions.FAILED_TO_DELETE_USER_DETAILS});
  }
}