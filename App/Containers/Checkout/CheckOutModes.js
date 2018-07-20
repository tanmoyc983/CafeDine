import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {h1,Badge} from 'react-native-elements';
import CheckoutItems from './CheckOutItems';

export default class CheckoutModes extends React.Component {
    constructor() {
        super();
    }

    render() { 
        let ordersType = [];
        let Modeinfo="  Price:"+this.props.mode.defaultItemPrice+"X"+this.props.mode.quantity+"="+
        this.props.mode.defaultItemPrice*this.props.mode.quantity;
        myOrder = this.props.mode.orders.map((data,i) =>{
            ordersType.push(<CheckoutItems orders={data}/>);
        });
        return (
            
            <View style={{flexDirection: 'column',flexWrap: 'wrap'}}>
                    <View style={{flexDirection: 'row',justifyContent:'space-between',alignItems:'baseline'}}>
                    <Badge value={this.props.mode.modeName}  textStyle={{ color: 'orange',fontWeight: 'bold',fontSize: 20 }}/>
                    <Text h1 style={{fontWeight: 'bold',fontSize: 18 }}>{Modeinfo}</Text>
                    </View>
                    <View style={{borderBottomColor: 'black', borderBottomWidth: 1, justifyContent:'space-between', alignItems:'baseline'}}/>  
                    {ordersType}   
            </View>
        )
        
    }
}