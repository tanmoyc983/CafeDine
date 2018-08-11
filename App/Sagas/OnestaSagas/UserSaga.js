import { call, put } from 'redux-saga/effects';
import { getCustomer } from '../../Services/OnestaApi';
import ReduxActions from "../../Redux/ActionTypes/Action";

export const getCustomerDetailsByMobileNumber = function * (action) {
  const{mobileNumber}=action;
  // make the call to the api
  const response = yield call(getCustomer, mobileNumber);
  if (response) {
    // do data conversion here if needed
    yield put(
      {type: ReduxActions.GOT_USER_DETAILS, response }
    );
  } else {
    yield put({type: ReduxActions.FAILED_USER_DETAILS});
  }
}

