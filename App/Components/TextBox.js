import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { TextField } from 'react-native-material-textfield';


export default class Customer extends React.Component {

   txtChange(event){
    this.props.changeField(event.nativeEvent.text, this.props.type);
   }

  render() {
    return (
        <TextField
              label={this.props.label}
              value={this.props.value}
              onChange={this.txtChange.bind(this) }
              baseColor= "white"
              textColor	="white"
              autoFocus = {this.props.shouldFocus}
              keyboardType={this.props.keyboardTextType}
            />
    );
  }
}

const styles = StyleSheet.create({
  container: {

  },
});