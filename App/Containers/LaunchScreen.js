import React, { Component } from 'react';
import { ScrollView,Text, Image, View, TouchableOpacity, StyleSheet } from 'react-native'
import { Images } from '../Themes';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TextBoxMaterial from "../Components/TextBox";
import { TextField } from 'react-native-material-textfield';
import styles from './Styles/LaunchScreenStyles';
import { connect } from 'react-redux'
import SagaActions from "../Sagas/ActionTypes/Action";
import ReduxActions from "../Redux/ActionTypes/Action";

class LaunchScreen extends Component {
  constructor(){
    super();
  }

  fetchUser(event){
    if(this.props.customerID===""){
    this.props.dispatch({type: SagaActions.FETCH_USER_DETAILS, mobileNumber: this.props.PhoneNumber});
    }
    if(this.props.customerID!=='' && this.props.PhoneNumber!='' && this.props.PhoneNumber!==this.props.customerID) {
      this.props.dispatch({type:ReduxActions.RESET_USER_DATA});
      if(this.props.PhoneNumber.length === 10){
        this.props.dispatch({type: ReduxActions.SET_MOBILE_NUMBER, mobileNumber: this.props.PhoneNumber});
      }
    }
    this.props.navigation.navigate('CustomerScreen');
  }

  changeField(event){
    if(event.length === 10){
      this.props.dispatch({type: ReduxActions.SET_MOBILE_NUMBER, mobileNumber: event});
    }
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='cover' />
        <View style={{zIndex: 999}}>
        </View>
        <ScrollView style={{flex:1, flexDirection: 'column',marginLeft:10}}>
            <Text style={[styles.sectionText]}>
              Search Customer
            </Text>
            <TextBoxMaterial keyboardTextType="numeric"  label="Phone Number" value= {this.props.PhoneNumber} changeField = {this.changeField.bind(this)}/>
              
            <TouchableOpacity onPress={this.fetchUser.bind(this)} style={stylesDrawer.buttonStyle} disabled={this.props.searchDisabled} >
              <Icon name='search' size= {25} color="white" />
              <Text style={stylesDrawer.textStyle}>Search</Text>
            </TouchableOpacity>
        </ScrollView>
      </View>
    )
  }
}

const stylesDrawer = StyleSheet.create({
  textStyle: {
    fontSize:20,
    color: 'white',
  },
  
  buttonStyle: {
    flex:1, 
    flexDirection: 'row', 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#64B5F6',
    borderRadius:5,
    width: 150,
    height: 50
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    zIndex: 999
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
})

const mapStateToProps = (state) => {
  return{
    customerID: state.userReducer.customer.customerID,
    loginSuccess: state.userReducer.loginDetails.loginSuccess,
    PhoneNumber: state.userReducer.loginDetails.PhoneNumber,
    searchDisabled:state.userReducer.loginDetails.searchDisabled,
    apicalling:state.userReducer.apicalling
  };
}

export default connect(mapStateToProps, null)(LaunchScreen)