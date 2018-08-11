import Immutable from 'seamless-immutable';
import ReduxActions from "../ActionTypes/Action";
import { reducer } from '../GithubRedux';

const INITIAL_STATE = Immutable({
     floorList:[],
     selectedFloor:[],
     selectedtable:[]
});


export const floorReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
    case ReduxActions.FLOOR_DETAILS:
    return Object.assign({},state,{floorList:action.response})

    case ReduxActions.ERROR_FLOOR_DETAILS:
    return console.log('Error on fetching floor details')

    case ReduxActions.SELECTED_FLOOR:
    let updatedSelectedFloor=[];
    
    if(action.floordata)updatedSelectedFloor.push(action.floordata);
    return Object.assign({},state,{selectedFloor:updatedSelectedFloor})

    case ReduxActions.SELECTED_TABLE:
    let updatedSelectedTable=[];    
    if(action.tableData)updatedSelectedTable.push(action.tableData);
    return Object.assign({},state,{selectedtable:action.tableData})

    case ReduxActions.RESET_FLOOR_DATA:
    return Object.assign({},state,INITIAL_STATE);
    break;

    default:
    return Object.assign({},state);
    }
}