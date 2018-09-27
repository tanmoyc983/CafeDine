import React from 'react';
import { ActivityIndicator, Text, View, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { Button } from 'native-base';
import { getImageonType } from "../Utilities/Utility";
import { Card } from 'react-native-elements';
import Icon from "react-native-vector-icons/MaterialIcons";
import { Images } from '../Themes';
import styles from './Styles/LaunchScreenStyles';
import { connect } from 'react-redux';
import ReduxActions from "../Redux/ActionTypes/Action";
import SagaActions from "../Sagas/ActionTypes/Action";
import { NavigationActions } from 'react-navigation';
import comStyles, { customerIconColor, orderColor, backgroundColor } from './Styles/CommonStyles';
import Modal from "react-native-modal";

class OrderComponent extends React.Component {
    constructor() {
        super();
    }

    Confirmation() {
        Alert.alert('Confirmation', 'Did you mean to cancel the transaction?',
            [{ text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
            {
                text: 'Yes', onPress: () => {
                    this.props.dispatch({ type: ReduxActions.RESET_USER_DATA });
                    this.props.dispatch({ type: ReduxActions.RESET_FLOOR_DATA });
                    this.props.dispatch({ type: ReduxActions.RESET_MODE_DATA });
                    this.props.dispatch({ type: ReduxActions.RESET_CUSTOMER_DATA });
                    this.props.dispatch({ type: ReduxActions.RESET_ORDER_DATA });
                    this.props.dispatch({ type: ReduxActions.RESET_TABLE_DATA });
                    const resetAction = NavigationActions.reset({
                        index: 0,
                        key: null,
                        actions: [
                            NavigationActions.navigate({ routeName: 'CaptainDashboardScreen' })
                        ]
                    });
                    this.props.navigation.dispatch(resetAction);
                }
            }],
            { cancelable: false });
    }

    changeMode(MenuItems) {
        this.props.dispatch({ type: ReduxActions.SELECTED_MENU_ITEMS, MenuItems });
        this.props.navigation.navigate('MenuItemsScreen');
    }

    reviewOrder() {
        if (this.props.OrderID !== '') {
            this.props.navigation.navigate('ReviewOrderScreen');
        }
    }

    CheckoutOrder() {
        if (this.props.OrderID !== '') {
            this.props.navigation.navigate('CheckoutOrderScreen');
        }
        else {
            Alert.alert('Please Submit a order before checkout !')
        }
    }

    updateOrder() {
        this.props.dispatch({ type: ReduxActions.UPDATE_MODAL })
        // if(typeof this.props.OrderedItems !== 'undefined' && this.props.OrderedItems.length > 0){
        //     let FullOrderDetails= Object.assign({},this.props.Order);
        //         FullOrderDetails.orderID=this.props.OrderID;
        //         FullOrderDetails.noofPerson=this.props.NoOfPerson;
        //         FullOrderDetails.customer.customerID=this.props.customerID;
        //         FullOrderDetails.tableID=this.props.OrderID===""?this.props.selectedtable.tableID:0;      
        //         FullOrderDetails.subOrder.push({
        //             "subOrderNumber":this.props.subOrderNumber+1,
        //             "modes":this.props.OrderedItems
        //         });
        //     this.props.dispatch({type:SagaActions.SAVE_ORDER_DETAILS,FullOrderDetails});
        //     this.props.dispatch({type:ReduxActions.UPDATE_SUBORDER_NUMBER});                       
        //}        
    }
    placeOrder() {
            this.props.dispatch({ type: ReduxActions.UPDATE_MODAL })
            if(typeof this.props.OrderedItems !== 'undefined' && this.props.OrderedItems.length > 0){
                let FullOrderDetails= Object.assign({},this.props.Order);
                    FullOrderDetails.orderID=this.props.OrderID;
                    FullOrderDetails.noofPerson=this.props.NoOfPerson;
                    FullOrderDetails.customer.customerID=this.props.customerID;
                    FullOrderDetails.tableID=this.props.OrderID===""?this.props.selectedtable.tableID:0;      
                    FullOrderDetails.subOrder.push({
                        "subOrderNumber":this.props.subOrderNumber+1,
                        "modes":this.props.OrderedItems
                    });
                this.props.dispatch({type:SagaActions.SAVE_ORDER_DETAILS,FullOrderDetails});
                this.props.dispatch({type:ReduxActions.UPDATE_SUBORDER_NUMBER});                       
            }        
    }

    render() {
        let orderDetails=[];
        let itemDetails=[];
        if(this.props.OrderedItems !== undefined && this.props.OrderedItems !== '' && this.props.OrderedItems !== null) {
            
            this.props.OrderedItems.map((element)=>{
                itemDetails=[];
                element.orders.map((childElement)=>{                   
                    itemDetails.push(
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <Text style={[comStyles.blackTxtStyle, comStyles.width60]}>{childElement.itemName}</Text>
                            <Text style={[comStyles.blackTxtStyle, comStyles.width20]}>Quantity: {childElement.quantity}</Text>
                            <Text style={[comStyles.blackTxtStyle, comStyles.width15]}>Price: {childElement.itemPrice}</Text>
                        </View>
                    ) });
                    orderDetails.push(
                        <View style={{flex: 1, flexDirection: 'column',borderRadius: 5}}>
                            <View  style={{flex: 1, flexDirection: 'row', alignContent:'space-around',  justifyContent: 'center', alignItems: 'center', backgroundColor: 'green',  borderRadius: 5}} >
                                <View style={{justifyContent: 'flex-start', marginLeft: 10}}><Text style={comStyles.whiteTxtStyle}>{element.modeName}</Text></View>
                                {/* <View style={{justifyContent: 'flex-end', marginRight: 10}}><Text style={comStyles.whiteTxtStyle}>{element.modeType}</Text></View> */}
                            </View>
                            <View style={{flex: 1, flexDirection: 'column', backgroundColor: backgroundColor}}>{itemDetails}</View>
                        </View>
                    )
            })
            //orderDetails = this.props.OrderedItems;
        }
        let btns = [];
        // let ordersType = [];
        // this.props.isModalOpen = false;
        // let Modeinfo="  Price:"+this.props.mode.defaultItemPrice+"X"+this.props.mode.quantity+"="+
        // this.props.mode.defaultItemPrice*this.props.mode.quantity;
        // myOrder = this.props.mode.orders.map((data,i) =>{
        //     ordersType.push(<CheckoutItems orders={data}/>);
        // });
        this.props.modeDetails.map((element) => {
            if (element.quantity > 0) {
                btns.push(<Card title={element.modeName} containerStyle={comStyles.mdCardStyle} image={getImageonType(element.modeType)}>
                    <Text style={[comStyles.smTxtStyle, comStyles.marginBottom]}> Quantity: {element.quantity}</Text>
                    <Button style={comStyles.xsButtonStyle} onPress={() => this.changeMode(element)}>
                        <Icon active name="restaurant-menu" size={17} color={customerIconColor} />
                        <Text style={comStyles.smWhiteTxtStyle}>View Menu</Text>
                    </Button>
                </Card>);
            }
        })
        return (
            <View style={styles.mainContainer}>
                {this.props.modeDetails.length === 0 &&
                    <View style={[comStyles.rowContainer, comStyles.horizontal]}>
                        <ActivityIndicator size="largecomStyles" color="red" />
                    </View>}
                <Image source={Images.background} style={styles.backgroundImage} resizeMode='cover' />
                {
                    this.props.modeDetails.length > 0 &&
                    <ScrollView height={70 + '%'}>
                        <View style={{ flex: 1, flexWrap: 'wrap', flexDirection: "row" }}>
                            {btns}
                        </View>
                    </ScrollView>
                }
                {
                    this.props.modeDetails.length > 0 &&
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-around' }}>
                        <TouchableOpacity onPress={this.reviewOrder.bind(this)} style={comStyles.buttonStyle} disabled={this.props.OrderID === ''} >
                            <Icon name='assignment' size={25} color={customerIconColor} />
                            <Text style={comStyles.whiteTxtStyle}>Review</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.CheckoutOrder.bind(this)} style={comStyles.buttonStyle} disabled={this.props.OrderID === ''} >
                            <Icon name='input' size={25} color={customerIconColor} />
                            <Text style={comStyles.whiteTxtStyle}>Checkout</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={this.updateOrder.bind(this)} style={comStyles.buttonStyle} >
                            <Icon name='done-all' size={25} color={customerIconColor} />
                            <Text style={comStyles.whiteTxtStyle}>Submit</Text>
                        </TouchableOpacity>

                        {/* {this.props.OrderID =='' && <TouchableOpacity onPress={this.Confirmation.bind(this)} style={stylesFloor.buttonStyle} >
                        <Icon name='highlight-off' size= {25} color="white" />
                        <Text style={stylesFloor.textStyle}>Cancel</Text>
                        </TouchableOpacity>} */}
                    </View>
                }
                <Modal backdropColor="black" backdropOpacity="0.4" isVisible={this.props.isModalOpen} style={{backgroundColor: backgroundColor, borderRadius: 5}} >
                <ScrollView height={80 + '%'}>
                    <View style={{flex: 1, flexWrap: 'wrap', flexDirection: "column", borderColor: '#1A237E', borderWidth: 1 }}>
                        {orderDetails}
                    </View>
                    </ScrollView>
                    <View style={{flex: 1, flexDirection: "row", justifyContent: 'space-evenly', alignItems: 'center'}}>
                        <TouchableOpacity onPress={this.updateOrder.bind(this)} style={comStyles.smButtonStyle} >
                            <Text style={comStyles.whiteTxtStyle}>Cancle</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.placeOrder.bind(this)} style={comStyles.smButtonStyle} >
                            <Text style={comStyles.whiteTxtStyle}>Place order</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>

        );
    }
}


const mapStateToProps = (state) => {
    return {
        customerID: state.userReducer.customer.customerID,
        selectedtable: state.floorReducer.selectedtable,
        modeDetails: state.menuitemsReducer.selectedModes,
        subOrderNumber: state.OrderReducer.subOrderNumber,
        OrderedItems: state.OrderReducer.OrderedItems,
        Order: state.OrderReducer.Order,
        OrderID: state.OrderReducer.OrderID,
        NoOfPerson: state.tableReducer.NoOfPerson,
        isModalOpen: state.OrderReducer.isModalOpen,
    }
}

export default connect(mapStateToProps, null)(OrderComponent)