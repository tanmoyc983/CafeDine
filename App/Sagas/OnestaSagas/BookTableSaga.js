import { call, put } from 'redux-saga/effects';
import {bookTable} from '../../Services/OnestaApi'
import ReduxActions from "../../Redux/ActionTypes/Action";

export const BookTable = function * (action) {
  const TableID = action.TableID;
  // make the call to the api
  const response = yield call(bookTable, TableID);

  if (response) {
    // do data conversion here if needed
    yield put({type: ReduxActions.BOOKED_TABLE, response });
  } else {
    yield put({type: ReduxActions.FAILED_TO_BOOK_TABLE});
  }
}