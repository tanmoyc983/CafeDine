import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { getImageonType } from "../../Utilities/Utility";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Card } from 'react-native-elements';
import ReduxActions from "../../Redux/ActionTypes/Action";
import comStyles, {plusMinusIconColor, defaultTxtColor} from '../Styles/CommonStyles';

export default class OrderItem extends React.Component {
    constructor() {
        super();
    }

    updateQuantity(subOrderIndex, modeIndex, itemIndex, changeByQuantity){
        this.props.dispatch({type: ReduxActions.UPDATE_QUANTITY,subOrderIndex, modeIndex, itemIndex, changeByQuantity});
    }

    render() {
        return (
            // <View style={{flex:1, flexWrap:'wrap', flexDirection:'row'}}>
                     <Card containerStyle={comStyles.cardStyle} title={this.props.orders.itemName} image={getImageonType('ULNVP')}>
                      <View style={{ flexDirection: 'row', justifyContent:'flex-end',alignItems:'flex-end' }}>                     
                            <TouchableHighlight onPress={()=>this.props.updateQuantity(this.props.suborderNo,this.props.modeIndex,this.props.itemIndex,-1)} style={{ padding: 10 }}>
                            <Icon name="minus-circle" size={40} color={plusMinusIconColor} /></TouchableHighlight>
                            <Text style={{ marginVertical: 18, fontSize: 20, color: defaultTxtColor }}>{this.props.orders.quantity}</Text>
                            <TouchableHighlight onPress={()=>this.props.updateQuantity(this.props.suborderNo,this.props.modeIndex,this.props.itemIndex,1)} style={{ padding: 10 }}>
                            <Icon name="plus-circle" size={40} color={plusMinusIconColor} /></TouchableHighlight>
                        </View>                        
                    </Card>                   
            // </View>
        )
        
    }
}