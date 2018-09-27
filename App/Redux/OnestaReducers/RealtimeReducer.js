import Immutable from 'seamless-immutable';
import ReduxActions from "../ActionTypes/Action";
import { reducer } from '../GithubRedux';

const INITIAL_STATE = Immutable({
    notificatioCount: 0
});

export const RealtimeReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ReduxActions.UPDATE_NOTIFICATON_COUNT:
        debugger;
        return Object.assign({}, state, { notificatioCount: action.count });

        case ReduxActions.RESET_NOTIFICATON_COUNT:
        return Object.assign({}, state, { notificatioCount: action.count });

        default:
        return Object.assign({}, state);
}
}