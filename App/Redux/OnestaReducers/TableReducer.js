import Immutable from 'seamless-immutable';
import ReduxActions from "../ActionTypes/Action";
import {Toast} from 'native-base';

const INITIAL_STATE = Immutable({   
    allTableArray:[],
    OrderDetails:{},
    TablesonSelectedFloor:[],
    tableWithOrderDetails:{},
    NoOfPerson:0,
    tableReleased:false,
    approvedOrders:[],
    isOrderApproved:false
});

export const tableReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ReduxActions.GOT_TABLE_DETAILS:
        let dummyArray=[];
        action.response.forEach(element => {
            dummyArray.push(element);
        });           
        return  Object.assign({}, state, {allTableArray: dummyArray});
    
        case ReduxActions.FAILED_TO_GET_TABLE_DETAILS:
        console.log('FAILED_TO_GET_TABLE_DETAILS')
        return Object.assign({}, state);

        case ReduxActions.SET_NOOFPERSON:
        return Object.assign({}, state, {NoOfPerson: action.noofperson})

        case ReduxActions.ORDER_APPROVED:
        debugger;
        let roundApproved=[];        
        if (action.response.isroundApproved){
            roundApproved.push(action.response.round);
            Toast.show({
                text: "Round : "+action.response.round+" Approved" ,
                textStyle: { fontSize: 25, fontFamily:'Avenir-Black' },
                duration: 2000,
                position: "bottom",
                buttonTextStyle:{fontSize: 20, fontFamily:'Avenir-Black'},
                buttonText: "Ok",
                type: "success"
                });
        }
        else{
            Toast.show({
                text: "Failed to approve order",
                textStyle: { fontSize: 25, fontFamily:'Avenir-Black' },
                duration: 2000,
                position: "bottom",
                buttonTextStyle:{fontSize: 20, fontFamily:'Avenir-Black'},
                buttonText: "Ok",
                type: "danger"
                })
        }
        return Object.assign({}, state, {approvedOrders:roundApproved,isOrderApproved:action.response.isOrderApproved});

        case ReduxActions.FAILED_TO_APPROVE_ORDER:
        console.log('FAILED_TO_APPROVE_ORDER_RESPONSE_NOT_VALID')
        return Object.assign({}, state);    


        case ReduxActions.RELEASED_TABLE:
        let isReleased=false;
         if(action.response =="Successfully released the table."){
            isReleased=true;
         }
        return Object.assign({}, state,{tableReleased:isReleased});

        case ReduxActions.FAILED_TO_RELEASE_TABLE:
        return Object.assign({},state);

        case ReduxActions.GET_ORDER_DETAILS_FOR_CAPTAIN:
        let tempRounds=[]
        action.selectedTable.orderDetails.subOrder.map((element) =>{
            tempRounds.push(element.subOrderNumber)
        })
        return Object.assign({}, state, {tableWithOrderDetails: action.selectedTable})

        case ReduxActions.UPDATE_QUANTITY:
        let ModifiedOrder= Object.assign({}, state.tableWithOrderDetails)
        ModifiedOrder.orderDetails.subOrder[action.subOrderIndex-1].modes[action.modeIndex].orders[action.itemIndex].quantity+=action.changeByQuantity;
        return Object.assign({}, state, {tableWithOrderDetails: ModifiedOrder});

        case ReduxActions.CAPTAIN_SELECTED_FLOOR:
        let tempTablesonSelectedFloor=[]; 
        state.allTableArray.forEach((floordata) => {
        if (floordata.floorID == action.selectedValue) {      
            tempTablesonSelectedFloor=floordata.tables;          
        }})
        return Object.assign({},state,{TablesonSelectedFloor:tempTablesonSelectedFloor})

        case ReduxActions.RESET_TABLE_DATA:
        return Object.assign({}, state, INITIAL_STATE)

        default:
        return Object.assign({},state);
    
    }
}