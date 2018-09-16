import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import OrderItem from '../EditOrder/OrderItem';
import comStyles, {orderColor} from '../Styles/CommonStyles';

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
                
                <View style={{flexDirection: 'column',flexWrap: 'wrap'}}>
                        <View style={{ flexDirection: 'row', marginBottom: 20}}>   
                            <Text  style={{ color: orderColor[3],fontWeight: 'bold',fontSize: 20,flexDirection: 'column',  borderBottomWidth: 1, borderBottomColor: 'black'}}>{this.props.mode.modeName}</Text>
                            <Text h1 style={{color: orderColor[2], fontWeight: 'bold',fontSize: 18,flexDirection: 'column',  borderBottomWidth: 1, borderBottomColor: 'black'}}>{Modeinfo}</Text>                            
                        </View>   
                        <View style={{flex: 1, height: 10}}></View>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <ScrollView style={{paddingBottom: 20}}>
                                <View style={{ flex: 1,flexWrap:'wrap', flexDirection:"row", justifyContent: "flex-start"}}>                
                                    {ordersType}      
                                </View>   
                            </ScrollView>
                        </View>               
                </View>
            )
        }
    }