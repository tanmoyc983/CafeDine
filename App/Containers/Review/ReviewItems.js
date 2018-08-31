import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {h1} from 'react-native-elements';

export default class ReviewItems extends React.Component {
    constructor() {
        super();
    }

    render() { 
        return (
            <View style={{flex:1, flexDirection: 'column', alignItems: 'baseline'}}>
                    <View style={{flex:1,flexDirection: 'row',alignItems: 'baseline', paddingLeft:20}}>
                        <Text style={{justifyContent:'flex-start',fontWeight: 'bold',fontSize: 18, width: 85 + '%'}}>{this.props.orders.itemName}</Text>
                        <Text style={{justifyContent:'flex-end' ,fontWeight: 'bold',fontSize: 18, width: 15 + '%' }}>Price:{this.props.orders.itemPrice}X{this.props.orders.quantity}={this.props.orders.itemPrice*this.props.orders.quantity}</Text>
                    </View>
                    <View style={{borderBottomColor: 'black', borderBottomWidth: 0.5}}/>                    
            </View>
        )
        
    }
}
//paddingLeft:5
//<View style={{flex:1, flexDirection: 'row', flexWrap: 'nowrap'}}>
//<View style={{flex:7, flexDirection: 'row', flexWrap: 'nowrap'}}>
//alignItems:'flex-start',
//alignSelf:'flex-end',