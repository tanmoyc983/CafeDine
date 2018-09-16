import Immutable from 'seamless-immutable';
import ReduxActions from "../ActionTypes/Action";
import { reducer } from '../GithubRedux';

const INITIAL_STATE = Immutable({
    getipAddress: '',
    getport: '',
    setipAddress: '',
    setPort: '',
    userID: '',
    adminPassword: ''
});


export const DashBoardReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case ReduxActions.SET_IP_ADDRESS:
            return Object.assign({}, state, { setipAddress: action.IP });
            break;

        case ReduxActions.SET_PORT:
            return Object.assign({}, state, { setPort: action.PortAddress });
            break;

        case ReduxActions.GET_IP_ADDRESS:
            return Object.assign({}, state, { getipAddress: action.IP });
            break;
        case ReduxActions.GET_PORT:
            return Object.assign({}, state, { getport: action.PortAddress });
            break;

        case ReduxActions.SETADMIN_USERID:
            return Object.assign({}, state, { userID: action.userID });
            break;
        case ReduxActions.SETADMIN_PASSWORD:
            return Object.assign({}, state, { adminPassword: action.adminPassword });
            break;
        default:
            return Object.assign({}, state);
    }
}