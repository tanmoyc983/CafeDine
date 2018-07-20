import React from 'react';
import { StyleSheet, Text, ScrollView, View, Image, TouchableOpacity, ActivityIndicator,Alert } from 'react-native';
import CheckoutModes from "./Checkout/CheckOutModes";
import Accordion from 'react-native-collapsible/Accordion';
import { h1, Card, Button } from 'react-native-elements';
import { Images } from '../Themes';
import { getFinalOrder, getFullOrder, CheckoutFinalOrder, setFullOrders, getcurrOrderNumber, clearData } from "../Utilities/Utility";
import styles from './Styles/LaunchScreenStyles';
import Toast, { DURATION } from 'react-native-easy-toast';
import { Item } from 'native-base';
export default class CheckoutOrderComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            finalOrder: [],
            fullOrder: []
        };

    }

    checkoutConfirmation() {
        Alert.alert('Confirmation', 'Do you want to proceed to checkout?',
            [{ text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
            { text: 'Yes', onPress: this.checkoutOrder.bind(this) }],
            { cancelable: false });
    }

    checkoutOrder() {        
        let finalOrderData = this.state.fullOrder;
        finalOrderData.finalCheckout = true;
        CheckoutFinalOrder(finalOrderData)
            .then(response => {
                this.refs.toast.show('Order Number : ' + response + '\n' + 'Checked out successfully !', 1000);
                clearData();
                this.setState({ showIndicator: false });
                setTimeout(() => {
                    this.props.navigation.navigate('LaunchScreen');
                  }, 1000);                
            })
            .catch(err => alert('error'));
        this.setState({ showIndicator: true });
    }
    componentWillMount() {
        let currOrderNumber = getcurrOrderNumber();
        this.setState({ finalOrder: getFinalOrder() });
        if (getFullOrder() === undefined) {
            setFullOrders(currOrderNumber)
                .then(response => {
                    this.setState({ fullOrder: getFullOrder(), showIndicator: false });
                })
                .catch(err => alert('error'));
            this.setState({ showIndicator: true });
        }
        else {
            this.setState({ fullOrder: getFullOrder() });
        }
    }
    render() {
        let order = this.state.finalOrder;
        let TotalPrice = order.totalPrice;
        let userName = order.customer.customerName + " ( " + order.customer.customerID + " ) " + "\n" + "Order Number: " + order.orderID;
        let myOrders = [];
        let mode = this.state.finalOrder.modes.map((data, i) => {
            myOrders.push(<CheckoutModes mode={data} />);
        });

        return (
            <View style={styles.mainContainer}>
                <Image source={Images.background} style={styles.backgroundImage} resizeMode='cover' />
                {!this.state.showIndicator && <View style={{ flex: 1, flexDirection: 'column' }}>
                    <ScrollView>
                        <Card title={userName} textStyle={{fontsize:25}}>
                            {myOrders}
                            <View style={{ borderWidth: 0.5, borderColor: 'black', margin: 10 }} />
                            <Text h1 style={{ alignItems: 'flex-end', ontWeight: 'bold', fontSize: 25 }}>Total Price: {TotalPrice} Rs.</Text>
                        </Card>
                    </ScrollView>
                    <TouchableOpacity  >
                        <Button large icon={{ name: 'envira', type: 'font-awesome' }} onPress={this.checkoutConfirmation.bind(this)}
                            backgroundColor='#03A9F4' fontFamily='Lato' buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                            title='Checkout Order' />
                    </TouchableOpacity>
                    {/* <TouchableOpacity>
                <Button  large raised='true' disabled='false' icon={{name: 'envira', type: 'font-awesome'}} onPress={this.checkoutOrder.bind(this)}  title='Checkout Order' />
                </TouchableOpacity> */}
                </View>}
                <Toast
                    ref="toast"
                    style={{ backgroundColor: 'white' }}
                    position='bottom'
                    positionValue={200}
                    fadeInDuration={750}
                    fadeOutDuration={1000}
                    //opacity={0.8}
                    textStyle={{ color: 'orange',fontWeight: 'bold',fontSize: 14 }}
                />
                {this.state.showIndicator && <View style={[stylesFloor.container, stylesFloor.horizontal]}>
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