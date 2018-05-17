import React from 'react';
import { StyleSheet, Text, ScrollView, TextInput, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {Button} from "react-native-elements";
import { TextField } from 'react-native-material-textfield';
import TextBoxMaterial from "../Presentational/TextBox";
import StatusBarComp from "../Presentational/StatusBarComponent";
import {saveFloors} from "../../Utilities/Utility";


export default class Customer extends React.Component {

  constructor(){
    super();

    this.state = {
      mobileNumber: "",
      CustomerName: "",
      email: "",
      address: "",
      city: "",
      state: ""
    }
  }

  componentDidMount(){
    fetch('http://onestaapi.azurewebsites.net/api/Floor')
    .then(response => {return response.json()})
    .then(res => {
      console.log(res);
      saveFloors(res);
    })
  }

  changeField(value, type){
    if(type === "mobileNumber") {
      this.setState({ mobileNumber: value });
      if(value.length == 10){
        console.log("calling");
        console.log("http://onestaapi.azurewebsites.net/onesta/customer?mobile" + value);
        fetch('http://onestaapi.azurewebsites.net/onesta/customer?mobile=' + value
        ).then((response) => {
          return response.json();
        }).then(res => {
          console.log(res);
          this.setState({ CustomerName: res.customerName, email: res.email, state: res.state, city: res.city, address: res.address});
        })
    }
    }
    else if(type === "CustomerName") this.setState({ CustomerName: value });
    else if(type === "email") this.setState({ email: value });
    else if(type === "address") this.setState({ address: value });
    else if(type === "city") this.setState({ city: value });
    else if(type === "state") this.setState({ state: value });
  }

  saveUser(){
    fetch('http://onestaapi.azurewebsites.net/onesta/customer', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state),
    }).then(response => response.json())
    .then(
      response => {
        Actions.Floor();
      }
    ).catch(err => {
      Alert.alert('error', err);
    }) ;
  }

  render() {
    let customerInfoFields = [
      {label : "Phone Number", value: this.state.mobileNumber, type: "mobileNumber"},
      {label : "Customer Name", value: this.state.CustomerName, type: "CustomerName"},
      {label : "EmailID", value: this.state.email, type: "email"},
      {label : "Address", value: this.state.address, type: "address"},
      {label : "City", value: this.state.city, type: "city"},
      {label : "State", value: this.state.state, type: "state"}
    ]

    let children = [];
    
    customerInfoFields.forEach(element => {
      children.push(
      <TextBoxMaterial
        label={element.label}
        value={element.value}
        textColor = "#000"
        changeField={ this.changeField.bind(this)}
        type= {element.type}
      />
    )                                         
    });

    return (
      <ScrollView style={styles.container}>
        
      {children}
        <Button
          title='Submit' style= {{backgroundColor: 'blue'}}
          onPress= {this.saveUser.bind(this)}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10
  },
});
