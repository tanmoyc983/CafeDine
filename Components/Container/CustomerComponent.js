import React from 'react';
import { StyleSheet, Text, View, TextInput, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {Button} from "react-native-elements";
import { TextField } from 'react-native-material-textfield';
import TextBoxMaterial from "../Presentational/TextBox";


export default class Customer extends React.Component {

  constructor(){
    super();

    this.state = {
      mobileNumber: "",
      CustomerName: "",
      email: "",
      address: "",
      city: "",
      state: "WB",
      NoofPerson: 0,
      CreatedOn: new Date()
    }
  }

  changeField(value, type){
    if(type === "mobileNumber") this.setState({ mobileNumber: value });
    else if(type === "CustomerName") this.setState({ CustomerName: value });
    else if(type === "email") this.setState({ email: value });
    else if(type === "address") this.setState({ address: value });
    else if(type === "city") this.setState({ city: value });
  }

  saveUser(){
    Actions.Floor();
    fetch('http://onestaapi.azurewebsites.net/onesta/customer', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state),
    }).then(response => response.json())
    .then().catch(err => {
      Alert.alert('error', err);
    }) ;
  }

  render() {
    let customerInfoFields = [
      {label : "Phone Number", value: this.state.mobileNumber, type: "mobileNumber"},
      {label : "Customer Name", value: this.state.CustomerName, type: "CustomerName"},
      {label : "email", value: this.state.email, type: "email"},
      {label : "Address", value: this.state.address, type: "address"},
      {label : "City", value: this.state.city, type: "city"}
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
      <View style={styles.container}>
        {children}
        <Button
          title='Submit'
          onPress= {this.saveUser.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {

  },
});
