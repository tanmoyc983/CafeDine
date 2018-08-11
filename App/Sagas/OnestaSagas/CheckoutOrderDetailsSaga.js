import { call, put } from 'redux-saga/effects';
import { getFinalOrder } from '../../Services/OnestaApi';
import ReduxActions from "../../Redux/ActionTypes/Action";

export const CheckoutOrderDetails = function * (action) {
  const {orderID}=action;  
  // make the call to the api
  const response = yield call(getFinalOrder, orderID);
  if (response) {
    // do data conversion here if needed
    yield put(
      {type: ReduxActions.GOT_CHECKOUT_ORDER_DETAILS, response }
    );
    
  } else {
    yield put({type: ReduxActions.FAILED_CHECKOUT_ORDER_DETAILS});
  }
}