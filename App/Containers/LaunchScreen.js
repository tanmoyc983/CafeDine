import React, { Component } from 'react';
import { ScrollView, Text, Image, View, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native'
import { Images } from '../Themes';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { setCustomer, setMenuItems, saveFloors } from '../Utilities/Utility';
import TextBoxMaterial from "../Components/TextBox";
import { TextField } from 'react-native-material-textfield';
import styles from './Styles/LaunchScreenStyles';

export default class LaunchScreen extends Component {
  constructor(){
    super();
    this.state={
      phone: '',
      searchDisabled: true,
      showIndicator: false
    }
  }

  componentDidMount() {
    setMenuItems();
    saveFloors();    
  }

  fetchUser(event){
    var url = 'http://10.31.101.118:8080/onesta/customer/MobileNumber?mobile=' + this.state.phone;
    fetch(url,{
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
      ).then((response) => {
         return response.json();
      }).then(responseJson => {  
        let res = responseJson;
          if(res==='Mobile number is not registered !')
          {
            setCustomer({customerID: this.state.phone});
            this.props.navigation.navigate('CustomerScreen');
          }
          else{
          setCustomer(res);
          this.setState({
            showIndicator: false
          });
          this.props.navigation.navigate('CustomerScreen');
          }       
      }).catch(err => {
          //setCustomer({customerID: this.state.phone});
          this.props.navigation.navigate('CustomerScreen');
      });
      this.setState({showIndicator: true})
  }
  
  changeField(event){
    if(this.state.phone.length = 10){
      this.setState({ phone: event, searchDisabled: false});
    }
    else{
      this.setState({ phone: event.nativeEvent.text, searchDisabled: true});

    }
  }

  render () {    
    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='cover' />
        {this.state.showIndicator && <View style={[stylesDrawer.container, stylesDrawer.horizontal]}>
        <ActivityIndicator size="large" color="red" /></View>}
        <View style={{zIndex: 999}}>
        </View>
        {!this.state.showIndicator && <ScrollView style={{flex:1, flexDirection: 'column'}}>
            <Text style={[styles.sectionText]}>
              Search Customer
            </Text>
            <TextBoxMaterial keyboardTextType="numeric"  label="Phone Number" value= {this.state.phone} changeField = {this.changeField.bind(this)}/>
              
            <TouchableOpacity onPress={this.fetchUser.bind(this)} style={stylesDrawer.buttonStyle} disabled={this.state.searchDisabled} >
              <Icon name='search' size= {25} color="white" />
              <Text style={stylesDrawer.textStyle}>Search</Text>
            </TouchableOpacity>
        </ScrollView>}
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