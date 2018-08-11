import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {h1,Badge} from 'react-native-elements';
import OrderItem from '../EditOrder/OrderItem';

export default class OrderMode extends React.Component {
    constructor() {
        super();
    }
        render() { 
            let ordersType = [];
            let Modeinfo="  Price:"+this.props.mode.defaultItemPrice+"X"+this.props.mode.quantity+"="+
            this.props.mode.defaultItemPrice*this.props.mode.quantity;
            this.props.mode.orders.map((element, index2 )=>{
                ordersType.push(<OrderItem orders={element}/>);
            });
            return (
                
                <View style={{flexDirection: 'column',flexWrap: 'wrap'}}>
                        <View style={{flexDirection: 'row',flexWrap:'nowrap', alignItems:'baseline',justifyContent:'space-between'}}>
                        <Text  style={{ color: 'orange',fontWeight: 'bold',fontSize: 20 }}>
                        {this.props.mode.modeName}
                        </Text>
                        <Text h1 style={{color: 'green', fontWeight: 'bold',fontSize: 18 }}>{Modeinfo}</Text>
                        </View>
                        <View style={{borderBottomColor: 'black', borderBottomWidth: 1, flex:1, flexWrap:'wrap' ,flexDirection: 'row', justifyContent:'space-between', alignItems:'baseline'}}/>  
                        {ordersType} 
                            
                </View>
            )
            
        }
    }