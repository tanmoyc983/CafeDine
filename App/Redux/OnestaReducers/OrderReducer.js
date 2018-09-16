import ReduxActions from "../ActionTypes/Action";
import {Toast} from 'native-base';

const INITIAL_STATE ={
    Order:{
            orderID: "",
            customer: {
            customerID: 0
            },
            tableID:0,
            finalCheckout: false,
            subOrder: []
         },
    subOrderNumber:0,
    OrderID:'',
    OrderedItems:[],
    SelectedMenuItems:{},
    ReviewOrderDetails:{},
    CheckOrderDetails:{},
    isCheckedOut: false,
    isModalOpen: false  
};

export const OrderReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ReduxActions.SELECTED_MENU_ITEMS:
        return Object.assign({},state,{SelectedMenuItems:action.MenuItems})
        break;

        case ReduxActions.UPDATED_MENU_ITEMS:
        let arrindex=0;
        let menuList =Object.assign({},state.SelectedMenuItems);
        menuList.category.forEach((element,index) => {
            if(element.categoryName==action.categoryId){
                arrindex=index;
            }
        });
        let indexMain = menuList.category[arrindex].items.indexOf(action.item);
        if (!action.toAdd && menuList.category[arrindex].items[indexMain].quantity > 0) {
            menuList.category[arrindex].items[indexMain].quantity = menuList.category[arrindex].items[indexMain].quantity - 1;
        }
        else if (action.toAdd) {            
            menuList.category[arrindex].items[indexMain].quantity = menuList.category[arrindex].items[indexMain].quantity + 1;
        }
        return Object.assign({},state,{SelectedMenuItems:menuList})
        break;
        
        case ReduxActions.UPDATE_ORDER :
         let SelectedMenuList =Object.assign({},state.SelectedMenuItems);
         let orders=[];
         state.OrderedItems.forEach(element => {
            orders.push(element);
         });
         let modeDetails={
            defaultItemID:SelectedMenuList.defaultItemID,
            defaultItemPrice:SelectedMenuList.defaultItemPrice,
            modeName:SelectedMenuList.modeName,
            modeType:SelectedMenuList.modeType,
            orders:[],
            quantity:SelectedMenuList.quantity
         }
         SelectedMenuList.category.forEach((element) => {
            element.items.forEach(item => {
                if(item.quantity>0){
                    let isPresent=false;
                    modeDetails.orders.forEach(previousItem => {
                        if(previousItem.itemID===item.itemID){
                            previousItem.quantity=item.quantity;
                            isPresent=true;
                        }
                    });
                    if(!isPresent){modeDetails.orders.push(item);}                    
                }
            });
        });
        orders.push(modeDetails);
        return Object.assign({},state,{OrderedItems:orders});
        break;

        case ReduxActions.UPDATE_SUBORDER_NUMBER:
        let UpdatedSubOrderNumber=state.subOrderNumber+1;
        return Object.assign({},state,{subOrderNumber:UpdatedSubOrderNumber})
        break;

        case ReduxActions.UPDATE_ORDER_DETAILS:
        
        return Object.assign({},state); 
        break; 

        case ReduxActions.ORDER_SAVED:
        let resetSelectedMenuList =Object.assign({},state.SelectedMenuItems);
        resetSelectedMenuList.category.forEach((element) => {
            element.items.forEach(item => {
                item.quantity=0;
            })
        });       
        if(action.response){
            Toast.show({
                        text: 'Order placed successfully for the order id : '+action.response,
                        textStyle: { fontSize: 25, fontFamily:'Avenir-Black',fontWeight:'bold' },
                        duration: 2000,
                        buttonTextStyle:{fontSize: 20, fontFamily:'Avenir-Black'},
                        buttonText: "Okay",
                        type: "success"
                   })
        }         
        return Object.assign({},state,{OrderID:action.response,Order:INITIAL_STATE.Order,OrderedItems:INITIAL_STATE.OrderedItems,SelectedMenuItems:resetSelectedMenuList});
        break;
         
        case ReduxActions.GOT_REVIEW_ORDER_DETAILS:
        return Object.assign({},state,{ReviewOrderDetails:action.response})
        break;

        case ReduxActions.GOT_CHECKOUT_ORDER_DETAILS:
        return Object.assign({},state,{CheckOrderDetails:action.response})
        break;

        case ReduxActions.SUCCESSFULLY_CHECKOUT_ORDER:
        let resetSelectedMenu =Object.assign({},state.SelectedMenuItems);
        let orderCheckedOut=false;
        if(action.response !=="Order not yet approved"){
            orderCheckedOut=true;
            if(resetSelectedMenu.category){
            resetSelectedMenu.category.forEach((element) => {
                element.items.forEach(item => {
                    item.quantity=0;
                })
            })}
            Toast.show({
                        text: 'Order ID : '+action.response+', Checkedout successfully.'+"\n"+ 'Visit us again .',
                        textStyle: { fontSize: 25, fontFamily:'Avenir-Black',fontWeight:'bold' },
                        duration: 2000,
                        buttonTextStyle:{fontSize: 20, fontFamily:'Avenir-Black'},
                        buttonText: "Okay",
                        type: "success"
                    })
        } 
        return Object.assign({},state,{OrderID:action.response,SelectedMenuItems:resetSelectedMenu, isCheckedOut:orderCheckedOut})
        break;

        case ReduxActions.RESET_ORDER_DATA:
        return Object.assign({}, state,INITIAL_STATE);
        break;

        case ReduxActions.SET_ORDER_ID:
        return Object.assign({},state,{OrderID:action.orderID})
        break;

        case ReduxActions.UPDATE_MODAL:
        let modalstate=state.isModalOpen?false:true;
        return Object.assign({},state,{isModalOpen:modalstate})
        break;

        default:
        return Object.assign({},state);
    }
}