import { call, put } from 'redux-saga/effects';
import { saveOrder } from '../../Services/OnestaApi';
import ReduxActions from "../../Redux/ActionTypes/Action";

export const SaveOrder = function * (action) {
  const UpdatedOrder=action.FullOrderDetails;
  // make the call to the api
  const response = yield call(saveOrder, UpdatedOrder);
  if (response) {
    // do data conversion here if needed
    yield put(
      {type: ReduxActions.ORDER_SAVED, response }
    );
  } else {
    yield put({type: ReduxActions.FAILED_ORDER_SAVED});
  }
}