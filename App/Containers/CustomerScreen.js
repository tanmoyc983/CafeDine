import React from 'react';
import { StyleSheet, Text, TextInput, Alert, Image, KeyboardAvoidingView, Animated, Button, ActivityIndicator,View  } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import TextBoxMaterial from "../Components/TextBox";
import { saveFloors, setMenuItems, setCustomer, getCustomer } from "../Utilities/Utility";
import { Images } from '../Themes';

import styles from './Styles/LaunchScreenStyles';

export default class Customer extends React.Component {

  constructor() {
    super();
    this.paddingInput = new Animated.Value(0);
    this.state = {
      customerID: getCustomer().customerID,
      CustomerName:getCustomer().customerName==="" ? "" : getCustomer().customerName,
      email: getCustomer().email==="" ? "" : getCustomer().email,
      address: getCustomer().address==="" ? "" : getCustomer().address,
      city: getCustomer().city==="" ? "" : getCustomer().city,
      state: getCustomer().state==="" ? "" : getCustomer().state,
      userAvailable: false,
      showIndicator: false
    }
  }

  changeField(value, type) {
    if (type === "customerID") {
      this.setState({ customerID: value });
    }
    else if (type === "CustomerName") this.setState({ CustomerName: value });
    else if (type === "email") this.setState({ email: value });
    else if (type === "address") this.setState({ address: value });
    else if (type === "city") this.setState({ city: value });
    else if (type === "state") this.setState({ state: value });
  }

  navigateToFLoor(){
    this.props.navigation.navigate("FloorScreen");
  }
  saveUser() {
    if (!this.state.userAvailable) {
      this.setState({ showIndicator: true });
      fetch('http://10.31.101.118:8080/onesta/customer', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.state),
      }).then(response => response.json())
        .then(
          response => 
          {
            setCustomer({customerID: response});
            this.setState({ showIndicator: false });
            this.props.navigation.navigate('FloorScreen');
          }
        ).catch(err => {
          Alert.alert('err');
        });
    }
    else {
      this.setState({ showIndicator: false });
    }
  }

  render() {
    let customerInfoFields = [
      { label: "Phone Number", value: this.state.customerID, type: "customerID" },
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

    let button;
    if (this.state.CustomerName===undefined) {
      button = <Button
      title='Submit' backgroundColor='#2196F3'
      onPress={this.saveUser.bind(this)}
       />;
    } else {
      button = <Button
      title='Next' backgroundColor='#2196F3'
      onPress={this.navigateToFLoor.bind(this)}
      />
    }
    
    return (
      <View  style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='cover' />
        {this.state.showIndicator && <KeyboardAvoidingView style={[stylesDrawer.container, stylesDrawer.horizontal]}>
        <ActivityIndicator size="large" color="red" /></KeyboardAvoidingView>}
        {!this.state.showIndicator && <KeyboardAvoidingView>{children}
        {button}
          </KeyboardAvoidingView>}
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
  }
})