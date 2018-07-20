import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TouchableHighlight,Image } from 'react-native';
import { getFullOrder } from "../Utilities/Utility";
import ReviewModes from "./Review/ReviewMode";
import moment from "moment";
import { Card, h1, Header,Badge } from 'react-native-elements';
import Accordion from 'react-native-collapsible/Accordion';

import { Images } from '../Themes';

import styles from './Styles/LaunchScreenStyles';
import { Item } from 'native-base';
export default class ReviewOrderComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            fullOrder: getFullOrder()
        }
    }

    render() {
        let btns = [];
        let order=this.state.fullOrder;
        let OrderNumber="OrderNumber:"+order.orderID;                
        order.subOrder.forEach((item) => { 
            let myOrders = [];  
            let mode = item.modes.map((data) => {
                myOrders.push(<ReviewModes mode={data}/>);
              });
            var submittedTime = moment(item.submittedTime).format('MMM DD h:mm A');
            let roundTitle=' Round: '+ item.subOrderNumber +"   "+submittedTime;
                btns.push(                   
                <Card title={OrderNumber} textStyle={{fontSize:25}}>
                    <Badge value={roundTitle} textStyle={{ color: 'orange', fontSize:25 }}/>
                    {myOrders}               
                </Card>
                );
        });
        return (
            <View style={styles.mainContainer}>
                {this.state.showIndicator && <View>
                   <ActivityIndicator size="large" color="green" /></View>}
                <Image source={Images.background} style={styles.backgroundImage} resizeMode='cover' />                
                {!this.state.showIndicator && <View style={{flex:1, flexDirection: 'column'}}>
                    <ScrollView>{btns}</ScrollView> 
                    <View style={{ borderWidth: 0.5, borderColor: 'black', margin: 10 }} />
                    <Badge containerStyle={{ backgroundColor: 'orange'}}>
                    <Text h1 style={{fontWeight: 'bold', fontSize: 25,color:'white' }}>Total Price: {order.totalPrice} Rs.</Text>
                    </Badge>    
                </View>      }
            </View>
        )
    }
}

const stylesFloor = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flexWrap: 'wrap',
        height:100
    }});