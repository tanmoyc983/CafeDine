import { call, put } from 'redux-saga/effects';
import {RegisterCaptain} from '../../Services/OnestaApi';
import ReduxActions from "../../Redux/ActionTypes/Action";

export const registerCaptain = function * (action) {
  debugger;
  const  captainDetails  = action.captainDetails;
  // make the call to the api
  const response = yield call(RegisterCaptain, captainDetails);
  if (response) {
    // do data conversion here if needed
    yield put({type: ReduxActions.CAPTAIN_REGISTERED_SUCCESSFULLY});
  } else {
    yield put({type: ReduxActions.FAILED_TO_REGISTER_CAPTAIN});
  }
}