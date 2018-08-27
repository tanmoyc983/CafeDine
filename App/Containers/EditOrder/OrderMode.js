import React from 'react';
import { Text, View } from 'react-native';
import OrderItem from '../EditOrder/OrderItem';

export default class OrderMode extends React.Component {
    constructor() {
        super();
    }

    // getItemID(subOrderIndex, modeIndex,itemID,index){
    //   this.props.updateQuantity(subOrderIndex, modeIndex,itemID,index);
    // }
        render() { 
            let ordersType = [];
            let Modeinfo="  Price:"+this.props.mode.defaultItemPrice+"X"+this.props.mode.quantity+"="+
            this.props.mode.defaultItemPrice*this.props.mode.quantity;
            this.props.mode.orders.map((element,itemIndex)=>{
                ordersType.push(<OrderItem orders={element} itemIndex={itemIndex} updateQuantity={this.props.updateQuantity} suborderNo={this.props.suborderNumber} modeIndex ={this.props.modeIndex}/>);
            });
            return (
                
                <View style={{flexDirection: 'row',flexWrap: 'wrap'}}>
                        <View style={{flexDirection: 'column',paddingLeft:2+'%'}}>
                        <View style={{flexDirection: 'row'}}>   
                            <Text  style={{ color: 'orange',fontWeight: 'bold',fontSize: 20,flexDirection: 'column'}}>{this.props.mode.modeName}</Text>
                            <Text h1 style={{color: 'green', fontWeight: 'bold',fontSize: 18,flexDirection: 'column'}}>{Modeinfo}</Text>                            
                        </View>  
                         <View style={{flexDirection: 'row',borderBottomColor: 'black', borderBottomWidth: 1, flex:1,alignItems:'flex-start',justifyContent:'flex-start'}}/>   
                        </View>  
                        <View style={{flexDirection: 'row',flexWrap:'wrap', alignItems:'flex-start',justifyContent:'flex-start'}}>                      
                          {ordersType}          
                        </View>                  
                </View>
            )
            
        }
    }