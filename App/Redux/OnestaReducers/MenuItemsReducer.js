import Immutable from 'seamless-immutable';
import ReduxActions from "../ActionTypes/Action";

const INITIAL_STATE = Immutable({
    menuItems:[],
    selectedModes:[],
    tableBooked:false
});

export const menuItemsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ReduxActions.MENU_ITEMS:
        return  Object.assign({}, state, {menuItems: action.response});
        break;

        case ReduxActions.ERROR_MENU_ITEMS:
        console.log('Error on fetching menu details');
        break;
        
        case ReduxActions.UPDATE_MODE_QUANTIRY:
        return  Object.assign({}, state, {menuItems:action.updateModeQuantity});
        break;

        case ReduxActions.SELECTED_MODE:
        return  Object.assign({}, state, {selectedModes:action.selectedMode});
        break;

        case ReduxActions.RESET_MODE_DATA:
        return Object.assign({}, state,INITIAL_STATE);
        break;

        case ReduxActions.BOOKED_TABLE:
        let isBooked=false;
         if(action.response =="Successfully booked the table."){
            isBooked=true;
         }
        return Object.assign({}, state,{tableBooked:isBooked});

        case ReduxActions.FAILED_TO_BOOK_TABLE:
        return Object.assign({},state);
        default:
        return Object.assign({}, state);
    }
    }