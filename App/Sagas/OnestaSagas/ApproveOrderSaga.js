import { call, put } from 'redux-saga/effects';
import {approveOrder} from '../../Services/OnestaApi'
import ReduxActions from "../../Redux/ActionTypes/Action";

export const ApproveOrderSaga = function * (action) {

  const finalOrder = action.approvedOrder;
  // make the call to the api
  const response = yield call(approveOrder, finalOrder);

  if (response) {
    // do data conversion here if needed
    yield put({type: ReduxActions.ORDER_APPROVED, response });
  } else {
    yield put({type: ReduxActions.FAILED_TO_APPROVE_ORDER});
  }
}