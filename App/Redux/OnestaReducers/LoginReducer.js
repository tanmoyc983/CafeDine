import Immutable from 'seamless-immutable';
import ReduxActions from "../ActionTypes/Action";

const INITIAL_STATE = Immutable({   
    captainDetails:{
        MobileNumber:'',
        Name:'',
        Password:''
    },
    confPass:'',
    captainIdValid:true,
    nameValid:true,
    passValid:true,
    confPassValid:true
});

export const loginReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ReduxActions.SET_LOGIN_ID:
        return Object.assign({}, state, {captainDetails: action.tempObj, captainIdValid: true, nameValid:true, passValid: true});

        case ReduxActions.SET_CONFIRM_PASS:
        return Object.assign({}, state, {confPass: action.input, confPassValid: true})

        case ReduxActions.SET_COLOR_ID:
        return Object.assign({}, state, {captainIdValid: action.isCorrect})

        case ReduxActions.SET_COLOR_NAME:
        return Object.assign({}, state, {nameValid: action.isCorrect})

        case ReduxActions.SET_COLOR_PASS:
        return Object.assign({}, state, {passValid: action.isCorrect})

        case ReduxActions.SET_COLOR_CONFPASS:
        return Object.assign({}, state, {confPassValid: action.isCorrect})

        default:
        return Object.assign({},state);
    }
}