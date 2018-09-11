import React, { Component } from "react";
import { View, StyleSheet, ScrollView ,Image,Button,ActivityIndicator } from 'react-native'
import { Card } from 'react-native-elements';
import { connect } from 'react-redux'
import SagaActions from "../Sagas/ActionTypes/Action";
import ReduxActions from "../Redux/ActionTypes/Action";
import {Text } from 'native-base';
import { Dropdown } from 'react-native-material-dropdown';
import styles from './Styles/LaunchScreenStyles';
import Icon from "react-native-vector-icons/MaterialIcons";
import { Images } from '../Themes';
import {NavigationActions } from 'react-navigation';
import {Toast} from 'native-base';
import comStyles, {orderColor, customerIconColor, dropdownColor, defaultTxtColor} from './Styles/CommonStyles';

class ExistingOrderDashboard extends Component{
    constructor(){
        super();
    }
    componentWillMount(){        
       this.props.dispatch({type: SagaActions.GET_TABLE_DETAILS})
    }

    getOrderDetails(selectedTable, data){
        this.props.dispatch({type:ReduxActions.GET_ORDER_DETAILS_FOR_CAPTAIN, selectedTable})
        this.props.navigation.navigate('CaptainOrderView')
    }

    continueOrder(selectedTable){
      this.props.dispatch({type:ReduxActions.SELECTED_MODE,selectedMode:selectedTable.selectedModeDetails});  
      this.props.dispatch({type:ReduxActions.UPDATE_SUBORDER_NUMBER}); 
      this.props.dispatch({type: ReduxActions.SAVED_NEW_USER_DETAILS, response: selectedTable.orderDetails.customer.customerID});
      this.props.dispatch({ type: ReduxActions.SET_ORDER_ID, orderID:selectedTable.orderDetails.orderID });
      this.props.navigation.navigate('AfterModeSelectionStack');
    }

    changeFloor(val, index){        
        let selectedValue = val.match(/\d+/)[0];
        this.props.dispatch({type: ReduxActions.CAPTAIN_SELECTED_FLOOR, selectedValue})
        }
    
    releaseTable(selectedTable){
            this.props.dispatch({type: SagaActions.RELEASE_TABLE,TableID:selectedTable.tableID}) 
        }
    componentDidUpdate(prevProps, prevState){
            if (this.props.tableReleased){
                Toast.show({
                    text: 'Table released successfully .',
                    textStyle: { fontSize: 25, fontFamily:'Avenir-Black',fontWeight:'bold' },
                    duration: 2000,
                    buttonTextStyle:{fontSize: 20, fontFamily:'Avenir-Black'},
                    buttonText: "Okay",
                    type: "success"
               });
                this.props.dispatch({type:ReduxActions.RESET_TABLE_DATA});
                const resetAction = NavigationActions.reset({
                    index: 0,
                    key: null,
                    actions: [
                        NavigationActions.navigate({routeName: 'CaptainDashboardScreen'})
                    ]
                });
                this.props.navigation.dispatch(resetAction);
            }
        }

    render(){
        
        let floors=[];
        this.props.allTableArray.forEach(element => {   
          floors.push({
            value: 'Floor ' + element.floorID
          });
        });    
        let tcards=[];
    
        this.props.TablesonSelectedFloor.map((rowData)=>{
            let btn=[];
            let cardStyle = comStyles.smCardStyle;
            let titleColor= orderColor[0];
            if(rowData.isOccupied===true && rowData.orderDetails!==null){
                titleColor= orderColor[1];
                btn.push(<Button icon={<Icon name='restaurant-menu'size= {25} color='white' />} onPress={this.getOrderDetails.bind(this,rowData)} 
                fontFamily='Lato' buttonStyle={comStyles.smCustButtonStyle} title='View Order Details' />);
                btn.push(<View style={{height: 20, width: 250}}></View>);
                btn.push(<Button icon={<Icon name='restaurant-menu'size= {25} color='white' />} onPress={this.continueOrder.bind(this,rowData)} 
                fontFamily='Lato' buttonStyle={comStyles.smCustButtonStyle} title='Continue Order' />);
                btn.push(<View style={{height: 20, width: 250}}></View>);
                btn.push(<Button icon={<Icon name='restaurant-menu'size= {25} color='white' />} onPress={this.releaseTable.bind(this,rowData)} 
                fontFamily='Lato' buttonStyle={comStyles.smCustButtonStyle} title='Release Table' />);
            } 
            if(rowData.isOccupied && rowData.isApproved===true && rowData.orderDetails!==null){
                titleColor= orderColor[2];
                // btn.push(<Button icon={<Icon name='restaurant-menu'size= {25} color='white' />} onPress={this.getOrderDetails.bind(this,rowData)} 
                // fontFamily='Lato' buttonStyle={stylesFloor.buttonStyle} title='View Order Details' />);
            } 
            if(rowData.isOccupied && (rowData.isOccupiedWithoutOrder || rowData.orderDetails===null )){
                titleColor=orderColor[3];
                cardStyle = comStyles.smCardCustStyle;
                btn.push(<Button icon={<Icon name='restaurant-menu'size= {25} color='white' />} onPress={this.releaseTable.bind(this,rowData)} 
                fontFamily='Lato' buttonStyle={comStyles.smCustButtonStyle} title='Release Table' />);
            } 
            tcards.push(     
                <Card title={'Table No.'+rowData.tableID} titleStyle={{fontSize:20, backgroundColor: titleColor, color: customerIconColor}} containerStyle={cardStyle}>
                 <Text style={{marginBottom: 10,fontSize: 20,fontWeight: 'bold'}}> Capacity: {rowData.capacity}</Text>
                 <Text style={{marginBottom: 10,fontSize: 20,fontWeight: 'bold'}}>{rowData.orderDetails===null?'Customer: ' : 'Customer: '+ rowData.orderDetails.customer.customerName.toString()}</Text>
                 <Text style={{marginBottom: 10,fontSize: 20,fontWeight: 'bold'}}> No. of Persons: {rowData.orderDetails===null?0:rowData.orderDetails.noofPerson}</Text>
                 <View style={{ borderWidth: 0.5, borderColor: 'black', margin: 10 }} />
                 {btn}
            </Card>);
        })
                   
        return(
            <View style={styles.mainContainer}>
             <Image source={Images.background} style={styles.backgroundImage} resizeMode='cover' />
             {floors.length===0 && <View style={[comStyles.colContainer, comStyles.horizontal]}>
                    <ActivityIndicator size="large" color="red" /></View>}
             {floors.length>0 &&  
              <View>
              <Dropdown style={{ justifyContent:'center'}}
              dropdownPosition={0}
              textColor={defaultTxtColor}
              itemColor={dropdownColor}
              baseColor={dropdownColor}
              containerStyle={{color: dropdownColor}}
              overlayStyle={{color: dropdownColor}}
              labelFontSize={25}
              fontSize={25}
              onChangeText={this.changeFloor.bind(this)}
              label='Select Floor' baseColor={dropdownColor}
              data={floors}/>
                 <ScrollView style={{height: 80 + '%'}}>
                 {this.props.TablesonSelectedFloor.length>0 && <View style={{flex:8,flexDirection:'row',flexWrap:'wrap'}}>{tcards}</View>}
                </ScrollView>
                </View>}
            </View>
        );

    }
}

const mapStateToProps = (state) =>{
    return{
        allTableArray: state.tableReducer.allTableArray,
        TablesonSelectedFloor: state.tableReducer.TablesonSelectedFloor,
        tableReleased: state.tableReducer.tableReleased
    };
}
export default connect(mapStateToProps, null)(ExistingOrderDashboard)
