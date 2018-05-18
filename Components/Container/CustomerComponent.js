import React from 'react';
import { StyleSheet, Text, ScrollView, TextInput, Alert, KeyboardAvoidingView, Animated, Keyboard, Keyboardawa } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button } from "react-native-elements";
import { TextField } from 'react-native-material-textfield';
import TextBoxMaterial from "../Presentational/TextBox";
import StatusBarComp from "../Presentational/StatusBarComponent";
import { saveFloors, setMenuItems, setCustomer } from "../../Utilities/Utility";
import Spinner from 'react-native-loading-spinner-overlay';

export default class Customer extends React.Component {

  constructor() {
    super();
    this.paddingInput = new Animated.Value(0);
    this.state = {
      mobileNumber: "",
      CustomerName: "",
      email: "",
      address: "",
      city: "",
      state: "",
      userAvailable: false,
      showIndicator: false
    }
  }

  componentWillMount() {
    setMenuItems();
    saveFloors();
  }

  changeField(value, type) {
    if (type === "mobileNumber") {
      this.setState({ mobileNumber: value });
      if (value.length == 10) {
        this.setState({ showIndicator: true });
        fetch('http://onestaapi.azurewebsites.net/onesta/customer?mobile=' + value
        ).then((response) => {
          return response.json();
        }).then(responseJson => {
          if (responseJson[0]) {
            let res = responseJson[0];
            setCustomer(res);
            this.setState({
              CustomerName: res.customerName, email: res.email, state: res.state, city: res.city, address: res.address, userAvailable: true,
              showIndicator: false
            });
          }
          else {
            this.setState({ showIndicator: false });
          }
        })
      }
    }
    else if (type === "CustomerName") this.setState({ CustomerName: value });
    else if (type === "email") this.setState({ email: value });
    else if (type === "address") this.setState({ address: value });
    else if (type === "city") this.setState({ city: value });
    else if (type === "state") this.setState({ state: value });
  }

  saveUser() {
    if (!this.state.userAvailable) {
      this.setState({ showIndicator: true });
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
            this.setState({ showIndicator: false });
            Actions.Floor();
          }
        ).catch(err => {
          Alert.alert('error', err);
        });
    }
  }

  render() {
    let customerInfoFields = [
      { label: "Phone Number", value: this.state.mobileNumber, type: "mobileNumber" },
      { label: "Customer Name", value: this.state.CustomerName, type: "CustomerName" },
      { label: "EmailID", value: this.state.email, type: "email" },
      { label: "Address", value: this.state.address, type: "address" },
      { label: "City", value: this.state.city, type: "city" },
      { label: "State", value: this.state.state, type: "state" }
    ]

    let children = [];

    customerInfoFields.forEach(element => {
      children.push(
        <TextBoxMaterial
          label={element.label}
          value={element.value}
          textColor="#000"
          changeField={this.changeField.bind(this)}
          type={element.type}
        />
      )
    });

    return (
      <KeyboardAvoidingView style={styles.container} behavior='position' enabled>
        <Spinner visible={this.state.showIndicator} textContent={"Loading..."} textStyle={{ color: '#FFF' }} />
        {children}
        <Button
          title='Submit' style={{ backgroundColor: 'blue' }} backgroundColor='blue'
          onPress={this.saveUser.bind(this)}
        />
        <Animated.View style={{ marginBottom: this.paddingInput }}>
        </Animated.View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'skyblue',
    flex: 1
  },
});
