import Immutable from 'seamless-immutable';
import ReduxActions from "../ActionTypes/Action";
import {Toast } from 'native-base';

const INITIAL_STATE = Immutable({   
    captainDetails:{
        MobileNumber:'',
        Name:'',
        Password:'',
        ConfirmPassword:''
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
    loginSuccessfully:false,
    userID: '',
    adminPassword: ''
});

export const loginReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ReduxActions.SETADMIN_USERID:
            return Object.assign({}, state, { userID: action.userID });
            break;
        case ReduxActions.SETADMIN_PASSWORD:
            return Object.assign({}, state, { adminPassword: action.adminPassword });
            break;

        case ReduxActions.SET_LOGIN_ID:
        return Object.assign({}, state, {captainDetails: action.tempObj, captainIdValid: true, nameValid:true, passValid: true});

        case ReduxActions.SET_CONFIRM_PASS:
        return Object.assign({}, state, {captainDetails: action.input, confPassValid: true})

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
            Password:'',
            ConfirmPassword:''
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
        let loggedIncaptain=Object.assign({}, state.captainloginDetils);
        let loginSuccess=false;
        if(!action.response.message)
        {
          loginSuccess=true;
          loggedIncaptain =  Object.assign({}, state.captainloginDetils,{
            mobileNo:action.response.captainID,
            loggedInUserName:action.response.captainName.trim()
        });
        }
        else if(action.response.message){
            Toast.show({
                text: action.response.message,
                textStyle: { fontSize: 25, fontFamily:'Avenir-Black',fontWeight:'bold' },
                duration: 2000,
                buttonTextStyle:{fontSize: 20, fontFamily:'Avenir-Black'},
                buttonText: "Okay",
                type: "danger"
            })
        }
        return Object.assign({},state,{captainloginDetils:loggedIncaptain,loginSuccessfully:loginSuccess,userID: '',adminPassword: ''});

        case ReduxActions.FAILED_TO_LOGIN:
        return Object.assign({},state,{loginSuccessfully:false});

        case ReduxActions.SET_TAB_SETTINGS:
        return Object.assign({}, state, {tabSettings: action.TabSettings})

        case ReduxActions.RESET_LOGIN_DATA:
        return Object.assign({}, state,INITIAL_STATE);

        default:
        return Object.assign({},state);
    }
}