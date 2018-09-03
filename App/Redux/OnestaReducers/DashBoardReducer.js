import Immutable from 'seamless-immutable';
import ReduxActions from "../ActionTypes/Action";
import { reducer } from '../GithubRedux';

const INITIAL_STATE = Immutable({
     ipAddress:'',
     port:''
});


export const DashBoardReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

    case ReduxActions.SET_IP_ADDRESS:
    return Object.assign({},state,{ipAddress:action.IP});
    break;

    case ReduxActions.SET_PORT:
    return Object.assign({},state,{port:action.Port});
    break;

    default:
    return Object.assign({},state);
    }
}