import { call, put } from 'redux-saga/effects';
import { tableDetails } from '../../Services/OnestaApi';
import ReduxActions from "../../Redux/ActionTypes/Action";

export const getTableDetails = function * (action) {
    // make the call to the api
    const response = yield call(tableDetails);
    if (response) {
      // do data conversion here if needed
      yield put(
        {type: ReduxActions.GOT_TABLE_DETAILS, response }
      );
    } else {
      yield put({type: ReduxActions.FAILED_TO_GET_TABLE_DETAILS});
    }
  }