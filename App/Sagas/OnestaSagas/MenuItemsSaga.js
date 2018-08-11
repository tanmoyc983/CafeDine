import { call, put } from 'redux-saga/effects';
import {setMenuItems} from '../../Services/OnestaApi'
import ReduxActions from "../../Redux/ActionTypes/Action";

export const GetMenuDetails = function * (action) {
  // make the call to the api
  const response = yield call(setMenuItems);
  if (response) {
   
    // do data conversion here if needed
    yield put({type: ReduxActions.MENU_ITEMS, response });
  } else {
    yield put({type: ReduxActions.ERROR_MENU_ITEMS});
  }
}