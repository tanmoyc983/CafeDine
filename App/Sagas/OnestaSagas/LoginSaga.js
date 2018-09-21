import { call, put } from 'redux-saga/effects';
import {} from '../../Services/OnestaApi';
import ReduxActions from "../../Redux/ActionTypes/Action";

export const registerCaptain = function * (action) {
  const  loginId  = action.loginId;
  console.log("login-->", loginId)
  // make the call to the api
  const response = yield call(RegisterCaptain, loginId);
  if (response) {
   
    // do data conversion here if needed
    yield put({type: ReduxActions.FAILED_TO_EDIT_USER_DETAILS});
  } else {
    yield put({type: ReduxActions.FAILED_TO_EDIT_USER_DETAILS});
  }
}