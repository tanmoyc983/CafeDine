import Immutable from 'seamless-immutable';
import ReduxActions from "../ActionTypes/Action";
import {Toast } from 'native-base';

const INITIAL_STATE = Immutable({   
    captainDetails:{
        MobileNumber:'',
        Name:'',
        Password:''
    },
    captainloginDetils:{
        mobileNo:"",
        loggedInUserName:""
    },
    tabSettings:'',
    confPass:'',
    captainIdValid:true,
    nameValid:true,
    passValid:true,
    confPassValid:true,
    captainRegisteredSuccessfully:false,
    loginSuccessfully:false
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
        let newcaptain =  Object.assign({}, state.captainDetails,{
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

        case ReduxActions.SUCCESSFULLY_LOGIN:
        let loggedIncaptain =  Object.assign({}, state.captainloginDetils,{
            mobileNo:action.captainID,
            loggedInUserName:action.captainName
        });
        return Object.assign({},state,{captainloginDetils:loggedIncaptain,loginSuccessfully:true});

        case ReduxActions.FAILED_TO_LOGIN:
        return Object.assign({},state,{loginSuccessfully:false});

        case ReduxActions.SET_TAB_SETTINGS:
        return Object.assign({}, state, {tabSettings: action.TabSettings})

        default:
        return Object.assign({},state);
    }
}