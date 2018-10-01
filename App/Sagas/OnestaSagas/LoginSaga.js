import { call, put } from 'redux-saga/effects';
import {LoginCaptain} from '../../Services/OnestaApi';
import ReduxActions from "../../Redux/ActionTypes/Action";

export const loginCaptain = function * (action) {
  const  loginId  = action.loginDetails;
  // make the call to the api
  const response = yield call(LoginCaptain, loginId);
  if (response) {
   
    // do data conversion here if needed
    yield put({type: ReduxActions.SUCCESSFULLY_LOGIN});
  } else {
    yield put({type: ReduxActions.FAILED_TO_LOGIN});
  }
}