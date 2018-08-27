import React from 'react';
import { ActivityIndicator, StyleSheet,FlatList, Text, View, ScrollView, TouchableOpacity, Button, Image, Alert } from 'react-native';
import {getImageonType } from "../Utilities/Utility";
import { Card } from 'react-native-elements';
import Icon from "react-native-vector-icons/MaterialIcons";
import { Images } from '../Themes';
import styles from './Styles/LaunchScreenStyles';
import { connect } from 'react-redux';
import ReduxActions from "../Redux/ActionTypes/Action";
import SagaActions from "../Sagas/ActionTypes/Action";
import {NavigationActions } from 'react-navigation';

class OrderComponent extends React.Component {
    constructor() {
        super();
    }

    Confirmation(){
        Alert.alert('Confirmation','Did you mean to cancel the transaction?',
        [{text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Yes', onPress: () => {
            this.props.dispatch({type:ReduxActions.RESET_USER_DATA});
            this.props.dispatch({type:ReduxActions.RESET_FLOOR_DATA});
            this.props.dispatch({type:ReduxActions.RESET_MODE_DATA});
            this.props.dispatch({type:ReduxActions.RESET_CUSTOMER_DATA});
            this.props.dispatch({type:ReduxActions.RESET_ORDER_DATA});
            this.props.dispatch({type:ReduxActions.RESET_TABLE_DATA});
            const resetAction = NavigationActions.reset({
                index: 0,
                key: null,
                actions: [
                    NavigationActions.navigate({routeName: 'CaptainDashboardScreen'})
                ]
            });
            this.props.navigation.dispatch(resetAction);
        }}],
        { cancelable: false });
    }

    changeMode(MenuItems) { 
        this.props.dispatch({type:ReduxActions.SELECTED_MENU_ITEMS,MenuItems});
        this.props.navigation.navigate('MenuItemsScreen');
    }

    reviewOrder() {
        if(this.props.OrderID !== '' )
        {
            this.props.navigation.navigate('ReviewOrderScreen');
        }
    }

    CheckoutOrder(){
        if(this.props.OrderID !== '' )
        {
            this.props.navigation.navigate('CheckoutOrderScreen');
        }
        else{
             Alert.alert('Please Submit a order before checkout !')
        }
    }
    
    updateOrder(){
        if(typeof this.props.OrderedItems !== 'undefined' && this.props.OrderedItems.length > 0){
            let FullOrderDetails= Object.assign({},this.props.Order);
                FullOrderDetails.orderID=this.props.OrderID;
                FullOrderDetails.noofPerson=this.props.NoOfPerson;
                FullOrderDetails.customer.customerID=this.props.customerID;
                FullOrderDetails.tableID=this.props.selectedtable.tableID;      
                FullOrderDetails.subOrder.push({
                    "subOrderNumber":this.props.subOrderNumber+1,
                    "modes":this.props.OrderedItems
                });
            this.props.dispatch({type:SagaActions.SAVE_ORDER_DETAILS,FullOrderDetails});
            this.props.dispatch({type:ReduxActions.UPDATE_SUBORDER_NUMBER});                       
        }        
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                 {this.props.modeDetails.length===0 && <View style={[stylesFloor.container, stylesFloor.horizontal]}>
                    <ActivityIndicator size="large" color="red" /></View>}
                <Image source={Images.background} style={styles.backgroundImage} resizeMode='cover' />
                {this.props.modeDetails.length>0 && <ScrollView style={{flex:8, flexWrap:'wrap', flexDirection:"row",alignContent:'flex-start'}}>
                 <FlatList                  
                 horizontal
                 data={this.props.modeDetails}
                 renderItem={({ item: rowData }) =>{ 
                    let btns = [];
                    if(rowData.quantity>0)
                    {
                      btns.push( <Card title={rowData.modeName} containerStyle={stylesFloor.cardStyle} image={getImageonType(rowData.modeType)}>
                      <Text style={{marginBottom: 10,fontSize: 20,fontWeight: 'bold'}}> Quantity: {rowData.quantity}</Text>
                      <Button icon={<Icon name='restaurant-menu'size= {25} color='white' />} onPress={() => this.changeMode(rowData)}
                        fontFamily='Lato' buttonStyle={stylesFloor.buttonStyle}
                        title='View Menu' /> 
                      </Card>);
                    }
                    return (btns
                   )}}/>
                </ScrollView>  }    
                {this.props.modeDetails.length>0 && <View style={{flex:1,flexDirection: 'row',alignItems:'flex-end',justifyContent:'space-around'}}>
            <TouchableOpacity onPress={this.reviewOrder.bind(this)} style={stylesFloor.buttonStyle} disabled={this.props.OrderID===''} >
              <Icon name='assignment' size= {25} color="white" />
              <Text style={stylesFloor.textStyle}>Review</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.CheckoutOrder.bind(this)} style={stylesFloor.buttonStyle} disabled={this.props.OrderID===''} >
              <Icon name='input' size= {25} color="white" />
              <Text style={stylesFloor.textStyle}>Checkout</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.updateOrder.bind(this)} style={stylesFloor.buttonStyle} >
              <Icon name='done-all' size= {25} color="white" />
              <Text style={stylesFloor.textStyle}>Submit</Text>
            </TouchableOpacity>

            {this.props.OrderID =='' && <TouchableOpacity onPress={this.Confirmation.bind(this)} style={stylesFloor.buttonStyle} >
              <Icon name='highlight-off' size= {25} color="white" />
              <Text style={stylesFloor.textStyle}>Cancel</Text>
            </TouchableOpacity>}
            
                </View>}
            </View>

        );
    }
}

const stylesFloor = StyleSheet.create({
    list: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignContent:'flex-start',        
    },
    btnStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        height: 60,
        borderBottomWidth: 1,
        marginHorizontal: 10
    },
    buttonStyle: {
        flex: 1,
        flexDirection: 'row',
        alignContent:'space-around',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#64B5F6',
        borderRadius: 5,
        width: 150,
        height: 50,
        marginHorizontal: 10,
    },
    cardStyle:{
        height:300,
        width:250,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2
    },
    textStyle: {
        fontSize:20,
        color: 'white',
      },
      horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
      }
});

const mapStateToProps=(state)=>{
    return {
        customerID: state.userReducer.customer.customerID,
        selectedtable:state.floorReducer.selectedtable,
        modeDetails: state.menuitemsReducer.selectedModes,
        subOrderNumber:state.OrderReducer.subOrderNumber,
        OrderedItems:state.OrderReducer.OrderedItems,
        Order:state.OrderReducer.Order,
        OrderID:state.OrderReducer.OrderID,
        NoOfPerson:state.tableReducer.NoOfPerson
    }
}

export default connect(mapStateToProps,null)(OrderComponent)