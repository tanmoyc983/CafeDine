import React from 'react';
import { StyleSheet, Text, ScrollView, TextInput, Alert, Image, KeyboardAvoidingView, Animated, Keyboard, Button, ActivityIndicator, View } from 'react-native';
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
      mobileNumber: getCustomer().mobileNumber,
      CustomerName: "",
      email: "",
      address: "",
      city: "",
      state: "",
      userAvailable: false,
      showIndicator: false
    }
  }

  changeField(value, type) {
    if (type === "mobileNumber") {
      this.setState({ mobileNumber: value });
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
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        {this.state.showIndicator && <View style={[stylesDrawer.container, stylesDrawer.horizontal]}>
        <ActivityIndicator size="large" color="red" /></View>}
        {!this.state.showIndicator && <View>{children}
        <Button
          title='Submit' backgroundColor='#2196F3'
          onPress={this.saveUser.bind(this)}
        /></View>}
      </View>
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