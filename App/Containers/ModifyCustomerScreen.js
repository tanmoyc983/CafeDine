import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, Alert, Image, KeyboardAvoidingView, Animated, ActivityIndicator,View } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import TextBoxMaterial from "../Components/TextBox";
import { saveFloors, setMenuItems, setCustomer, getCustomer } from "../Utilities/Utility";
import { Images } from '../Themes';
import { connect } from 'react-redux';
import styles from './Styles/LaunchScreenStyles';
import SagaActions from "../Sagas/ActionTypes/Action";
import {Button,Icon,Toast,Content } from 'native-base';
import ReduxActions from "../Redux/ActionTypes/Action";

class ModifyCustomerScreen extends Component {

  constructor() {
    super();
  }  
  changeField (changedLabel, changedText){  
    let customer={};
    if (Object.keys(customer).length === 0 && customer.constructor === Object){
    customer=Object.assign({},this.props.selectedCustomer);
    }
    customer[changedLabel]=changedText
    this.props.dispatch({type: ReduxActions.EDIT_CUSTOMER, customer})    
   }

  saveUser() {
    this.props.dispatch({type: SagaActions.MODIFY_USER_DETAILS, userData: this.props.selectedCustomer});
    Toast.show({
      text: "Customer details modified successfully.",
      textStyle: { fontSize: 25, fontFamily:'Avenir-Black' },
      duration: 2000,
      position: "top",
      buttonTextStyle:{fontSize: 20, fontFamily:'Avenir-Black'},
      buttonText: "Ok",
      type: "success"
    });
    this.props.navigation.navigate('CaptainDashboardScreen');
  }

  deleteUser() {
    
    Alert.alert('Confirmation', 'Are you sure you want to delete the customer?',
            [{ text: 'No', onPress: () => console.log('Captain did not mean to delete'), style: 'cancel' },
            { text: 'Yes', onPress: ()=>{
              this.props.dispatch({type: SagaActions.DELETE_USER_DETAILS, userData: this.props.selectedCustomer.customerID})
              
            }  }],
            { cancelable: false });   
  }

  render() {
    if(this.props.isUserDeleted==true){
      Alert.alert('Customer deleted !')
     this.props.navigation.navigate('CaptainDashboardScreen')
    }
      let customerInfoFields = [
        { label: "Phone Number", value:this.props.selectedCustomer.customerID.toString(), type: "customerID" },
        { label: "Customer Name", value: this.props.selectedCustomer.customerName, type: "customerName" },
        { label: "EmailID", value: this.props.selectedCustomer.email, type: "email" },
        { label: "Address", value: this.props.selectedCustomer.address, type: "address" },
        { label: "City", value: this.props.selectedCustomer.city, type: "city" },
        { label: "State", value: this.props.selectedCustomer.state, type: "state" }
    ]
 
    let children = [];
    customerInfoFields.forEach(element => {
      children.push(
        <TextBoxMaterial
          label={element.label}
          value={element.value}
          isDisabled={element.type==='customerID'? true: this.props.deleteCustomer}
          changeField={this.changeField.bind(this, element.type)}
          type={element.type}
          keyboardTextType={element.type==='customerID'? 'numeric': 'default'}
        />
      )
    });
    
    let button;
    if (this.props.editCustomer===true) {
      
      button =<Button style={{height:50,width:200,justifyContent:'center'}}  onPress={this.saveUser.bind(this)}>
              <Icon active name="information-circle" />
              <Text style={stylesDrawer.textStyle}>Save</Text>
              </Button>;
     } 
     else if(this.props.deleteCustomer===true) {
      button = <Button style={{height:50,width:200,justifyContent:'center'}} danger onPress={this.deleteUser.bind(this)}>
               <Icon active name="trash" />
               <Text style={stylesDrawer.textStyle}>Delete</Text>
               </Button>;
    }
    
    return (
      <View  style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='cover' />
        <Content style={{marginLeft:10}}>
        {children}        
        </Content>
        <View style={{flex:1,flexDirection:'row',marginRight:10,alignItems:'flex-end',justifyContent:'flex-end'}}>
        {button}</View>
      </View >
    );
  }
}

const stylesDrawer = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    zIndex: 999
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  },
  textStyle: {
    fontSize:24,
    color:'white',
    fontFamily:'Avenir-Book'
  }
});

const mapStateToProps = (state) => {
  return{
    selectedCustomer: state.SearchCustomersReducer.selectedCustomer,
    editCustomer:state.SearchCustomersReducer.EditCustomer,
    deleteCustomer:state.SearchCustomersReducer.DeleteCustomer,
    isUserDeleted: state.SearchCustomersReducer.isUserDeleted
  };
}
export default connect(mapStateToProps, null)(ModifyCustomerScreen)
