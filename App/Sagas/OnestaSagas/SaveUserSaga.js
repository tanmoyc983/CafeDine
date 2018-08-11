import { call, put } from 'redux-saga/effects';
import {saveNewCustomer} from '../../Services/OnestaApi'
import ReduxActions from "../../Redux/ActionTypes/Action";

export const saveCustomer = function * (action) {
  const newCustomer = action.newCustomer;
  // make the call to the api
  const response = yield call(saveNewCustomer, newCustomer);
  if (response) {
    // do data conversion here if needed
    yield put({type: ReduxActions.SAVED_NEW_USER_DETAILS, response });
  } else {
    yield put({type: ReduxActions.FAILED_TO_SAVE_NEW_USER_DETAILS});
  }
}