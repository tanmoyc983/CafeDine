import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { GithubTypes } from '../Redux/GithubRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { getUserAvatar } from './GithubSagas'
import { getCustomerDetailsByMobileNumber } from './OnestaSagas/UserSaga';
import { saveCustomer } from './OnestaSagas/SaveUserSaga';
import { GetMenuDetails } from './OnestaSagas/MenuItemsSaga';
import { GetFloorDetails } from './OnestaSagas/FloorSaga';
import { SaveOrder } from './OnestaSagas/SaveOrderSaga';
import { getCustomersByName } from './OnestaSagas/FetchUsers';
import { ReviewOrderDetails } from './OnestaSagas/ReviewOrderSaga';
import { CheckoutOrderDetails } from './OnestaSagas/CheckoutOrderDetailsSaga';
import { DeleteCustomerDetails } from './OnestaSagas/DeleteUserSaga';
import { ModifyCustomerDetails } from './OnestaSagas/ModifyUserSaga';
import {getTableDetails} from './OnestaSagas/TableSaga';
import { CheckoutOrder } from './OnestaSagas/CheckOutOrderSaga';
import { ApproveOrder } from "./OnestaSagas/ApproveOrderSaga";
import {BookTable} from "./OnestaSagas/BookTableSaga";
import {ReleaseTable} from "./OnestaSagas/ReleaseTableSaga";
import {registerCaptain} from "./OnestaSagas/LoginSaga";
/* ------------- Action Types ------------- */
import SagaActions from './ActionTypes/Action'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),

    // some sagas receive extra parameters in addition to an action
    takeLatest(GithubTypes.USER_REQUEST, getUserAvatar, api),
    takeLatest(SagaActions.FETCH_USER_DETAILS, getCustomerDetailsByMobileNumber),
    takeLatest(SagaActions.SAVE_USER,saveCustomer),
    takeLatest(SagaActions.GET_MENU_ITEMS,GetMenuDetails),
    takeLatest(SagaActions.GET_FLOOR_DETAILS,GetFloorDetails),
    takeLatest(SagaActions.SAVE_ORDER_DETAILS,SaveOrder),
    takeLatest(SagaActions.FETCH_USERS_BY_NAME, getCustomersByName),
    takeLatest(SagaActions.GET_ORDER_REVIEW_DETAILS,ReviewOrderDetails),
    takeLatest(SagaActions.GET_ORDER_CHECKOUT_DETAILS,CheckoutOrderDetails),
    takeLatest(SagaActions.MODIFY_USER_DETAILS, ModifyCustomerDetails),
    takeLatest(SagaActions.DELETE_USER_DETAILS, DeleteCustomerDetails),
    takeLatest(SagaActions.GET_TABLE_DETAILS, getTableDetails),
    takeLatest(SagaActions.CHECKOUT_FINAL_ORDER, CheckoutOrder),
    takeLatest(SagaActions.APPROVE_THE_ORDER, ApproveOrder),
    takeLatest(SagaActions.BOOK_TABLE, BookTable),
    takeLatest(SagaActions.RELEASE_TABLE, ReleaseTable),
    takeLatest(SagaActions.CREATE_CAPTAIN, registerCaptain)    
  ])
}
