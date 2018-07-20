import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {h1} from 'react-native-elements';

export default class CheckoutItems extends React.Component {
    constructor() {
        super();
    }

    render() { 
        return (
            <View style={{flexDirection: 'column', alignItems:'baseline'}}>
                    <View style={{flex:1,flexDirection: 'row',alignItems: 'baseline', paddingLeft:20}}>
                        <Text h1 style={{flex:15,justifyContent:'flex-start',fontWeight: 'bold',fontSize: 18 }}>{this.props.orders.itemName}</Text>
                        <Text h1 style={{flex:2,justifyContent:'flex-end' ,fontWeight: 'bold',fontSize: 18}}>Price:{this.props.orders.itemPrice}X{this.props.orders.quantity}={this.props.orders.itemPrice*this.props.orders.quantity}</Text>
                    </View>
                    <View style={{borderBottomColor: 'black', borderBottomWidth: 1}}/>                    
            </View>
        )
        
    }
}