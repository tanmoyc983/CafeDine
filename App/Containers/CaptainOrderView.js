import React from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList, TouchableOpacity, TouchableHighlight, Image, Alert } from 'react-native';
import { getImageonType } from "../Utilities/Utility";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Accordion from 'react-native-collapsible/Accordion';
import { Card } from 'react-native-elements';
import { connect } from "react-redux";
import { Images } from '../Themes';
import styles from './Styles/LaunchScreenStyles';
import {Button, Toast } from 'native-base';
import ReduxActions from "../Redux/ActionTypes/Action";
import SagaActions from "../Sagas/ActionTypes/Action";
import OrderMode from "./EditOrder/OrderMode";

class MenuItemsComponent extends React.Component {
    constructor() {
        super();
    }
    updateQuantity(subOrderIndex, modeIndex, itemIndex, changeByQuantity) {
        this.props.dispatch({type: ReduxActions.UPDATE_QUANTITY,subOrderIndex, modeIndex, itemIndex, changeByQuantity});
    }
    approveOrder(){
        this.props.dispatch({type: SagaActions.APPROVE_THE_ORDER, approvedOrder: this.props.tableWithOrderDetails.orderDetails})
        this.props.navigation.navigate('CaptainDashboardScreen');
    }

    checkoutOrder(){        
        let checkoutOrder=Object.assign({},this.props.tableWithOrderDetails);
        checkoutOrder.finalCheckout=true; 
        this.props.dispatch({type:SagaActions.CHECKOUT_FINAL_ORDER,checkoutOrder});
        this.props.navigation.navigate('CaptainDashboardScreen');
            }
    _renderHeader(section) {
        return (
            <View>
                <Text style={{ color: '#3949ab', marginLeft: 10, fontSize: 30, borderWidth: 0.5,borderColor:'#BDBDBD' }}>Round {section.subOrderNumber}</Text>
            </View>
        );
    }

    _renderContent(section) {
        let myOrders = [];
        section.modes.map((item, index1) => {
            myOrders.push(<OrderMode mode={item}/>);
                     
                })           
        return (myOrders);            
    }

    render() {
        if (this.props.orderStatus==='true'){
            Toast.show({
            text: "Order is approved",
            textStyle: { fontSize: 25, fontFamily:'Avenir-Black' },
            duration: 2000,
            position: "bottom",
            buttonTextStyle:{fontSize: 20, fontFamily:'Avenir-Black'},
            buttonText: "Ok",
            type: "success"
            })}
            if (this.props.orderStatus==='false'){
                Toast.show({
                text: "Failed to approve order",
                textStyle: { fontSize: 25, fontFamily:'Avenir-Black' },
                duration: 2000,
                position: "bottom",
                buttonTextStyle:{fontSize: 20, fontFamily:'Avenir-Black'},
                buttonText: "Ok",
                type: "success"
                })}
        
        return (
            <View style={styles.mainContainer}>
                <Image source={Images.background} style={styles.backgroundImage} resizeMode='cover' />
                <ScrollView>
                    <Accordion 
                        sections={this.props.tableWithOrderDetails.orderDetails.subOrder}
                        renderHeader={this._renderHeader.bind(this)}
                        renderContent={this._renderContent.bind(this)}
                    />
                    <View style={{flex:1,flexDirection:'row',marginRight:10,alignItems:'flex-end',justifyContent:'flex-end'}}>
                    <Button style={{height:50,width:200,justifyContent:'center'}} onPress={()=>this.approveOrder()}>
                    <Icon active name="skip-next" size={24} color="#FAFAFA" />
                    <Text style={stylesFloor.textStyle}>Approve</Text>
                    </Button>
                    <Button style={{height:50,width:200,justifyContent:'center'}} onPress={()=>this.checkoutOrder()}>
                    <Icon active name="skip-next" size={24} color="#FAFAFA" />
                    <Text style={stylesFloor.textStyle}>Checkout</Text>
                    </Button>
                    </View>
                </ScrollView>
                

            </View>
    
        );
    }
}

const stylesFloor = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        flexWrap: 'wrap'
    },
    cardStyle:{
        height:300,
        width:350,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2
    },
    textStyle: {
        fontSize:24,
        color:'white',
        fontFamily:'Avenir-Book'
      }
});

const mapStateToProps=(state)=>{
  return {
    tableWithOrderDetails: state.tableReducer.tableWithOrderDetails,
    orderStatus: state.tableReducer.orderStatus
  }
}

export default connect(mapStateToProps,null)(MenuItemsComponent)