import React from 'react';
import { StyleSheet, Text, ScrollView, View, Image, TouchableOpacity, ActivityIndicator,Alert } from 'react-native';
import CheckoutModes from "./Checkout/CheckOutModes";
import { h1, Card, Button } from 'react-native-elements';
import { Images } from '../Themes';
import styles from './Styles/LaunchScreenStyles';
import { connect } from 'react-redux';
import ReduxActions from "../Redux/ActionTypes/Action";
import SagaActions from "../Sagas/ActionTypes/Action";
import __  from "lodash";
import Icon from 'react-native-vector-icons/FontAwesome';
import {NavigationActions } from 'react-navigation';

class CheckoutOrderComponent extends React.Component {
    constructor() {
        super();
    }

    componentDidUpdate(prevProps, prevState){
        if (this.props.isCheckedOut){
            this.props.dispatch({type:ReduxActions.RESET_TABLE_DATA});
            this.props.dispatch({type:ReduxActions.RESET_FLOOR_DATA});
            this.props.dispatch({type:ReduxActions.RESET_MODE_DATA});
            this.props.dispatch({type:ReduxActions.RESET_USER_DATA});
            this.props.dispatch({type:ReduxActions.RESET_CUSTOMER_DATA});
            this.props.dispatch({type:ReduxActions.RESET_ORDER_DATA});
            const resetAction = NavigationActions.reset({
                index: 0,
                key: null,
                actions: [
                    NavigationActions.navigate({routeName: 'CaptainDashboardScreen'})
                ]
            });
            this.props.navigation.dispatch(resetAction);
        }
    }
    checkoutConfirmation() {
        Alert.alert('Confirmation', 'Do you want to proceed to checkout?',
            [{ text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
            { text: 'Yes', onPress: this.checkoutOrder.bind(this) }],
            { cancelable: false });
    }

    checkoutOrder() { 
        let checkoutOrder=Object.assign({},this.props.CheckOrderDetails);
        checkoutOrder.finalCheckout=true;
        this.props.dispatch({type:SagaActions.CHECKOUT_FINAL_ORDER,checkoutOrder:checkoutOrder});;
    }

    componentWillMount() {
        this.props.dispatch({type:SagaActions.GET_ORDER_CHECKOUT_DETAILS,orderID:this.props.OrderID})           
    }

    render() {
        let myOrders = [];
        let TotalPrice = 0;
        let userName ='';
        if(!__.isEmpty(this.props.CheckOrderDetails))
        {  
        let order = Object.assign({},this.props.CheckOrderDetails);
        TotalPrice = order.totalPrice;
        userName = order.customer.customerName + " ( " + order.customer.customerID + " ) " + "\n" + "Order Number: " + order.orderID;
        
        let mode = this.props.CheckOrderDetails.modes.map((data, i) => {
            myOrders.push(<CheckoutModes mode={data} />);
        });
    }
        return (
            <View style={styles.mainContainer}>
                <Image source={Images.background} style={styles.backgroundImage} resizeMode='cover' />
                {!__.isEmpty(this.props.CheckOrderDetails) && <View style={{ flex: 1, flexDirection: 'column' }}>
                    <ScrollView>
                        <Card title={userName} textStyle={{fontsize:25}}>
                            {myOrders}
                            <View style={{ borderWidth: 0.5, borderColor: 'black', margin: 10 }} />
                            <View style={{flex:1,flexDirection: 'row',alignItems: 'baseline',paddingLeft: 20}}>
                                <Text h1 style={{ justifyContent:'flex-start', fontWeight: 'bold', fontSize: 25, width: 20 + '%' }}>Total Price:</Text>
                                <Icon name="rupee" style={{justifyContent:'flex-start', fontWeight: 'bold', fontSize: 25, width: 10 + '%' }}>
                                <Text style={{justifyContent:'flex-end', fontWeight: 'bold', fontSize: 25, width: 20 + '%' }}> {TotalPrice}</Text>
                                </Icon>
                            </View>
                        </Card>
                    </ScrollView>
                    <TouchableOpacity>
                        <Button large icon={{ name: 'envira', type: 'font-awesome' }} onPress={this.checkoutConfirmation.bind(this)}
                            backgroundColor='#03A9F4' fontFamily='Lato' buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                            title='Checkout Order' />
                    </TouchableOpacity>
                </View>}
                {__.isEmpty(this.props.CheckOrderDetails) && <View style={[stylesFloor.container, stylesFloor.horizontal]}>
                    <ActivityIndicator size="large" color="red" /></View>}
            </View>
        )
    }
}

const stylesFloor = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        zIndex: 999,
        flexDirection: 'row'
      },
      horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
      }
});

const mapStateToProps=(state)=>{
    return{
        OrderID:state.OrderReducer.OrderID,
        CheckOrderDetails:state.OrderReducer.CheckOrderDetails,
        isCheckedOut:state.OrderReducer.isCheckedOut
    }
}
export default connect(mapStateToProps,null) (CheckoutOrderComponent);