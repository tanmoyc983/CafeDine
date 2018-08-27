import { call, put } from 'redux-saga/effects';
import {releaseTable} from '../../Services/OnestaApi'
import ReduxActions from "../../Redux/ActionTypes/Action";

export const ReleaseTable = function * (action) {
  const TableID = action.TableID;
  // make the call to the api
  const response = yield call(releaseTable, TableID);

  if (response) {
    // do data conversion here if needed
    yield put({type: ReduxActions.RELEASED_TABLE, response});
  } else {
    yield put({type: ReduxActions.FAILED_TO_RELEASE_TABLE});
  }
}