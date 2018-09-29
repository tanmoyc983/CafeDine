import Immutable from 'seamless-immutable';
import ReduxActions from "../ActionTypes/Action";
import {Toast } from 'native-base';

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
    confPassValid:true,
    captainRegisteredSuccessfully:false,
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

        case ReduxActions.CAPTAIN_REGISTERED_SUCCESSFULLY:
        let newcaptain =  Object.assign({}, state.customer,{
            MobileNumber:'',
            Name:'',
            Password:''
        });
            Toast.show({
                text: 'Register Successfully, Please login with your registered ID & Password.',
                textStyle: { fontSize: 25, fontFamily:'Avenir-Black',fontWeight:'bold' },
                duration: 2000,
                buttonTextStyle:{fontSize: 20, fontFamily:'Avenir-Black'},
                buttonText: "Okay",
                type: "success"
        })
        return Object.assign({},state,{captainDetails:newcaptain,captainRegisteredSuccessfully:true});

        default:
        return Object.assign({},state);
    }
}