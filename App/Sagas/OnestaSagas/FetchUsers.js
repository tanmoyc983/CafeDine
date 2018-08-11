import { call, put } from 'redux-saga/effects';
import { getCustomersbyName } from '../../Services/OnestaApi';
import ReduxActions from "../../Redux/ActionTypes/Action";

export const getCustomersByName = function * (action) {
  const {name}=action;
  
  // make the call to the api
  const response = yield call(getCustomersbyName, name);
  if (response) {
    // do data conversion here if needed
    yield put(
      {type: ReduxActions.GOT_USERS_BY_NAME, response }
    );
    
  } else {
    yield put({type: ReduxActions.FAILED_TO_GET_USERS_BY_NAME});
  }
}