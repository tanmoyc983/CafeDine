import React, { Component } from "react";
import { ScrollView, Image, View, TouchableOpacity, StyleSheet, Alert,ListView  } from 'react-native'
import { Images } from '../Themes';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button';
import styles from './Styles/LaunchScreenStyles';
import { connect } from 'react-redux'
import SagaActions from "../Sagas/ActionTypes/Action";
import ReduxActions from "../Redux/ActionTypes/Action";
import { setCustomer, setMenuItems, saveFloors } from '../Utilities/Utility';
import TextBoxMaterial from "../Components/TextBox";
import {List,ListItem,Text,Button,Icon,SwipeRow,H1,Toast } from 'native-base';
import __ from "lodash";
import comStyles, {dradioColor, customerIconColor, orderColor} from './Styles/CommonStyles';

class SearchCustomerScreen extends Component {
    constructor(){
        super();
      }
    
      onSelect(index,selectedvalue){
        this.props.dispatch({type: ReduxActions.RADIOBUTTON_SELECTED, selectedvalue });        
      }
      fetchUser(event){
         if(this.props.RadiobuttonSelected==="Number"){
            this.props.dispatch({type: SagaActions.FETCH_USER_DETAILS, mobileNumber: this.props.SearchedText});
            }
         if(this.props.RadiobuttonSelected==="Name"){
            this.props.dispatch({type: SagaActions.FETCH_USERS_BY_NAME, name: this.props.SearchedText});
             }  
        if(this.props.customers && this.props.customers.length===0 && !__.isNumber(this.props.customer.customerID) && this.props.SearchedText!=='')
          {
            Toast.show({
            text: "No user found !",
            textStyle: { fontSize: 25, fontFamily:'Avenir-Black' },
            duration: 2000,
            position: "top",
            buttonTextStyle:{fontSize: 20, fontFamily:'Avenir-Black'},
            buttonText: "Okay",
            type: "danger"
          })   
        }         
      }

      NavigatetoEdit(customer,data){
        
        this.props.dispatch({type: ReduxActions.EDIT_CUSTOMER, customer});
        this.props.navigation.navigate('ModifyCustomerScreen');
        
      }

      NavigatetoDelete(customer, data){
        
        this.props.dispatch({type: ReduxActions.DELETE_CUSTOMER, customer});
        this.props.navigation.navigate('ModifyCustomerScreen');
      }
      
      changeField(event){
        if(event.length = 10 && this.props.RadiobuttonSelected=="Number"){
          this.props.dispatch({type: ReduxActions.SET_SEARCHED_TEXT, event});
        }
        if(this.props.RadiobuttonSelected=='Name')
      {
            this.props.dispatch({type: ReduxActions.SET_SEARCHED_TEXT, event});
        }
    }
    textInputComponents() { customers.map((type)=> console.log(type))}
   
  render() {
    let searchedusers=[];
    if(this.props.RadiobuttonSelected==="Name"){
    this.props.customers.map((data)=>{
      searchedusers.push(<SwipeRow
        leftOpenValue={75}
        rightOpenValue={-75}
        left={
          <Button success onPress={this.NavigatetoEdit.bind(this,data)}>
          
            <Icon active name="information-circle" />
          </Button>
        }
        body={
          <View style={{flexDirection:"row",height:60,width:1250,justifyContent:'center',alignItems:'center'}}>
            <Text style={stylesDrawer.textStyle}>{data.customerName+'\t'+'-' +'\t'+data.customerID}</Text>
          </View>
        }
        // right={
        //   <Button danger onPress={this.NavigatetoDelete.bind(this,data)}>
        //     <Icon active name="trash" />
        //   </Button>
        // }
      />);
    })}
    
    if(this.props.RadiobuttonSelected==="Number" && __.isNumber(this.props.customer.customerID)) {
      searchedusers.push(<SwipeRow
        leftOpenValue={75}
        rightOpenValue={-75}
        left={
          <Button success onPress={this.NavigatetoEdit.bind(this, this.props.customer)}>
            <Icon active name="information-circle" />
          </Button>
        }
        body={
          <View style={{flexDirection:"row",height:60,width:1250,justifyContent:'center',alignItems:'center'}}>
            <Text style={stylesDrawer.textStyle}>{this.props.customer.customerName+'\t'+'-' +'\t'+this.props.customer.customerID}</Text>
          </View>
        }
        // right={
        //   <Button danger onPress={this.NavigatetoDelete.bind(this, this.props.customer)}>
        //     <Icon active name="trash" />
        //   </Button>
        // }
      />)
    }
    let isUsersFound=true;
    if(searchedusers.length===0 && !__.isNumber(this.props.customer.customerID) && this.props.SearchedText!=='')
    {
      isUsersFound=false;
    }

    return (
        
        <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='cover' />
         <View style={{flex:3,flexDirection:'row'}}>
         <View style={{flex:1,flexDirection:'column'}}>
          <RadioGroup size={28} thickness={4} color={radioColor} onSelect= {this.onSelect.bind(this)}>          
          <RadioButton  value={'Name'} >
            <Text style={styles.subtitle} size= {20}>Search by name</Text>
          </RadioButton>
          <RadioButton value={'Number'}>
          <Text style={styles.subtitle} size= {20}>Search by number</Text>
          </RadioButton>
          </RadioGroup>
          </View>          
          <View style={{flex:1,flexDirection: 'column'}}>
            <TextBoxMaterial keyboardTextType={this.props.RadiobuttonSelected=="Name"?"default":"numeric"} value={this.props.SearchedText}  label={this.props.RadiobuttonSelected} changeField = {this.changeField.bind(this)}/>
           
            <Button iconLeft rounded success style={comStyles.smButtonStyle} onPress={this.fetchUser.bind(this)}>
            <Icon name='search' size= {25} style={{color: customerIconColor}}  />
            <Text style={comStyles.txtStyle}>Search</Text>
            </Button>
        </View>
        </View>
        
        <View style={{flex:10}}>
        {searchedusers.length>0 &&
        <H1 style={{alignItems:'flex-start',justifyContent:'flex-start',color: orderColor[1],fontSize:30}}>Searched Results</H1>}
        <ScrollView>
        <View style={{flex:8,flexDirection:'row',flexWrap:'wrap'}}>
        {isUsersFound && searchedusers}
        </View>
        </ScrollView>
          </View> 
        </View>
    );
  }
}

  
  const mapStateToProps = (state) => {  
    return{
        SearchedText: state.SearchCustomersReducer.SearchedText,
        RadiobuttonSelected: state.SearchCustomersReducer.RadiobuttonSelected,
        customers: state.SearchCustomersReducer.customers,
        customer: state.userReducer.customer
    };
  }
  
  export default connect(mapStateToProps, null)(SearchCustomerScreen)