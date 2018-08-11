import { call, put } from 'redux-saga/effects';
import { saveOrder } from '../../Services/OnestaApi';
import ReduxActions from "../../Redux/ActionTypes/Action";

export const CheckoutOrder = function * (action) {
  debugger;
    const checkoutOrder=action.checkoutOrder; 
  // make the call to the api
  const response = yield call(saveOrder, checkoutOrder);
  if (response) {
    // do data conversion here if needed
    yield put(
      {type: ReduxActions.SUCCESSFULLY_CHECKOUT_ORDER, response }
    );
    
  } else {
    yield put({type: ReduxActions.FAILED_CHECKOUT_ORDER});
  }
}