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

class CheckoutOrderComponent extends React.Component {
    constructor() {
        super();
    }

    checkoutConfirmation() {
        Alert.alert('Confirmation', 'Do you want to proceed to checkout?',
            [{ text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
            { text: 'Yes', onPress: this.checkoutOrder.bind(this) }],
            { cancelable: false });
    }

    checkoutOrder() { 
        this.props.dispatch({type:ReduxActions.RESET_USER_DATA});
        this.props.dispatch({type:ReduxActions.RESET_FLOOR_DATA});
        this.props.dispatch({type:ReduxActions.RESET_MODE_DATA});
        let checkoutOrder=Object.assign({},this.props.CheckOrderDetails);
        checkoutOrder.finalCheckout=true;       
        this.props.dispatch({type:SagaActions.CHECKOUT_FINAL_ORDER,checkoutOrder});        
        this.props.navigation.navigate('CaptainDashboardScreen');
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
        let order = this.props.CheckOrderDetails;
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
                            <Text h1 style={{ alignItems: 'flex-end', fontWeight: 'bold', fontSize: 25,justifyContent:'flex-end',alignItems:'flex-end' }}>Total Price:</Text>
                            <Icon name="rupee" style={{fontWeight: 'bold', fontSize: 25}}>
                             <Text style={{fontWeight: 'bold', fontSize: 25}}> {TotalPrice}</Text>
                             </Icon>
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
        CheckOrderDetails:state.OrderReducer.CheckOrderDetails
    }
}
export default connect(mapStateToProps,null) (CheckoutOrderComponent);