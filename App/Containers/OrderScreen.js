import React from 'react';
import { ActivityIndicator, StyleSheet,FlatList, Text, View, ScrollView, TouchableOpacity, Button, Image, Alert } from 'react-native';
import { getmodifiedMenuItems, setSelectedMode, setSelectedMenuItems,setFullOrders,setFinalOrder,
    getCurrentOrder,updatePreviousOrder,setOrder,ClearCurrentOrder,
    getPreviousOrder, setCurrSubOrderNumber, getCurrSubOrderNumber, getImageonType, clearData } from "../Utilities/Utility";
import { Card, ListItem } from 'react-native-elements';
import Icon from "react-native-vector-icons/MaterialIcons";
import Toast, {DURATION} from 'react-native-easy-toast';
import Accordion from 'react-native-collapsible/Accordion';
import { Images } from '../Themes';

import styles from './Styles/LaunchScreenStyles';
export default class OrderComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            modeDetails: [],
            currentSelectedMode:'',
            showIndicator: false,
            currentOrderNumber:''
        }
    }

    Confirmation(){
        Alert.alert('Confirmation','Did you mean to cancel the transaction?',
        [{text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Yes', onPress: () => {
            clearData();
            this.props.navigation.navigate('LaunchScreen');
        }}],
        { cancelable: false });
    }

    changeMode(item) {
        this.setState({currentSelectedMode:item.modeType});
        setSelectedMode(item.modeType);
        setSelectedMenuItems(item.modeType);
        this.props.navigation.navigate('MenuItemsScreen');
    }

    reviewOrder() {
        if(this.state.currentOrderNumber !== '' )
        {
            setFullOrders(this.state.currentOrderNumber)
            .then(response => {
                this.setState({showIndicator: false});
                this.props.navigation.navigate('ReviewOrderScreen');
              })
            .catch(err => alert('error')); 
            this.setState({showIndicator: true});
         }
    }

    CheckoutOrder(){
        if(this.state.currentOrderNumber !== '' )
        {
            setFinalOrder(this.state.currentOrderNumber)
            .then(response => {
                this.props.navigation.navigate('CheckoutOrderScreen');
              })
            .catch(err => alert('error'));           
         }
         else{
             alert('Please Submit a order before checkout !')
         }
    }

    updateOrder(){
        let currentOrder=getCurrentOrder();
        if(typeof currentOrder !== 'undefined' && currentOrder.length > 0){
            let jsonObj={};
            //previous values
            setCurrSubOrderNumber();
            jsonObj.subOrderNumber = getCurrSubOrderNumber();
            jsonObj.modes = [];
            currentOrder.forEach(element => {
                if(element.orders.length>0)
                {
                    jsonObj.modes.push(element);
                }
           });
           this.setState({ showIndicator: true });
           setOrder(jsonObj)
              .then(response => {
                  this.setState({ showIndicator: false });
                  this.refs.toast.show('Order Updated'+"\n"+response,1000);                  
                  this.setState({ currentOrderNumber: response });
                  ClearCurrentOrder();
                })
              .catch(err => alert('error'));
        }        
    }

    componentWillMount(){
        this.setState({modeDetails:getmodifiedMenuItems()});
    }
    render() {
        return (
            <View style={styles.mainContainer}>
                 {this.state.showIndicator && <View style={[stylesFloor.container, stylesFloor.horizontal]}>
                    <ActivityIndicator size="large" color="red" /></View>}
                <Image source={Images.background} style={styles.backgroundImage} resizeMode='cover' />
                {!this.state.showIndicator && <ScrollView style={{flex:8, flexWrap:'wrap', flexDirection:"row",alignContent:'flex-start'}}>
                 <FlatList                  
                 horizontal
                 data={this.state.modeDetails}
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
                {!this.state.showIndicator && <View style={{flex:1,flexDirection: 'row',alignItems:'flex-end',justifyContent:'space-around'}}>
            <TouchableOpacity onPress={this.reviewOrder.bind(this)} style={stylesFloor.buttonStyle} disabled={this.state.searchDisabled} >
              <Icon name='assignment' size= {25} color="white" />
              <Text style={stylesFloor.textStyle}>Review</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.CheckoutOrder.bind(this)} style={stylesFloor.buttonStyle} disabled={this.state.searchDisabled} >
              <Icon name='input' size= {25} color="white" />
              <Text style={stylesFloor.textStyle}>Checkout</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.updateOrder.bind(this)} style={stylesFloor.buttonStyle} disabled={this.state.searchDisabled} >
              <Icon name='done-all' size= {25} color="white" />
              <Text style={stylesFloor.textStyle}>Submit</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.Confirmation.bind(this)} style={stylesFloor.buttonStyle} disabled={this.state.searchDisabled} >
              <Icon name='highlight-off' size= {25} color="white" />
              <Text style={stylesFloor.textStyle}>Cancel</Text>
            </TouchableOpacity>
            
                </View>}
                <Toast 
                        ref="toast"
                        style={{backgroundColor:'orange',width:200}}
                        position='bottom'
                        positionValue={200}
                        fadeInDuration={750}
                        fadeOutDuration={1000}
                        //opacity={0.8}
                        textStyle={{color:'white',fontWeight: 'bold',fontSize: 14}}
                        /> 
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
        width:250
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