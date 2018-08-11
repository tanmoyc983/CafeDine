import Immutable from 'seamless-immutable';
import ReduxActions from "../ActionTypes/Action";
import {Toast} from 'native-base';

const INITIAL_STATE = Immutable({   
    allTableArray:[],
    OrderDetails:{},
    TablesonSelectedFloor:[],
    tableWithOrderDetails:{},
    orderStatus:'',
    NoOfPerson:0
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

        let Status=''
        if (action.response===true){
            Status='true'
            Toast.show({
                text: "Order is approved",
                textStyle: { fontSize: 25, fontFamily:'Avenir-Black' },
                duration: 2000,
                position: "bottom",
                buttonTextStyle:{fontSize: 20, fontFamily:'Avenir-Black'},
                buttonText: "Ok",
                type: "success"
                })
        }
        if (action.response===false){
            Status='false'
            Toast.show({
                text: "Failed to approve order",
                textStyle: { fontSize: 25, fontFamily:'Avenir-Black' },
                duration: 2000,
                position: "bottom",
                buttonTextStyle:{fontSize: 20, fontFamily:'Avenir-Black'},
                buttonText: "Ok",
                type: "success"
                })
        }
        return Object.assign({}, state, {orderStatus: Status});

        case ReduxActions.FAILED_TO_APPROVE_ORDER:
        console.log('FAILED_TO_APPROVE_ORDER_RESPONSE_NOT_VALID')
        return Object.assign({}, state);    


        case ReduxActions.GET_ORDER_DETAILS_FOR_CAPTAIN:
        let tempRounds=[]
        action.selectedTable.orderDetails.subOrder.map((element) =>{
            tempRounds.push(element.subOrderNumber)
        })
        return Object.assign({}, state, {tableWithOrderDetails: action.selectedTable})

        case ReduxActions.UPDATE_QUANTITY:
        let ModifiedOrder= Object.assign({}, state.tableWithOrderDetails)
        ModifiedOrder.orderDetails.subOrder[action.subOrderIndex-1].modes[action.modeIndex].orders[action.itemIndex].quantity+=action.changeQuantityBy
        return Object.assign({}, state, {tableWithOrderDetails: ModifiedOrder});

        case ReduxActions.CAPTAIN_SELECTED_FLOOR:
        let tempTablesonSelectedFloor=[]; 
        state.allTableArray.forEach((floordata) => {
        if (floordata.floorID == action.selectedValue) {      
            tempTablesonSelectedFloor=floordata.tables;          
        }})
        return Object.assign({},state,{TablesonSelectedFloor:tempTablesonSelectedFloor})

        default:
        return Object.assign({},state);
    
    }
}