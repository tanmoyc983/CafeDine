import { call, put } from 'redux-saga/effects';
import {saveFloors} from '../../Services/OnestaApi';
import ReduxActions from "../../Redux/ActionTypes/Action";

export const GetFloorDetails = function * (action) {
  //yield put({type: ReduxActions.SET_API_CALL});
  // make the call to the api
  const response = yield call(saveFloors);
  if (response) {
   
    // do data conversion here if needed
    yield put({type: ReduxActions.FLOOR_DETAILS, response });
  } else {
    yield put({type: ReduxActions.ERROR_FLOOR_DETAILS});
  }
}