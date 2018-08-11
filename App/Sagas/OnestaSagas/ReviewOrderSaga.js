import { call, put } from 'redux-saga/effects';
import { getReviewOrder } from '../../Services/OnestaApi';
import ReduxActions from "../../Redux/ActionTypes/Action";

export const ReviewOrderDetails = function * (action) {
  const {orderID}=action;
  
  // make the call to the api
  const response = yield call(getReviewOrder, orderID);
  if (response) {
    // do data conversion here if needed
    yield put(
      {type: ReduxActions.GOT_REVIEW_ORDER_DETAILS, response }
    );
    
  } else {
    yield put({type: ReduxActions.FAILED_REVIEW_ORDER_DETAILS});
  }
}