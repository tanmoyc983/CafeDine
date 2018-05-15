import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { TextField } from 'react-native-material-textfield';


export default class Customer extends React.Component {

   txtChange(event){
    this.props.changeField(event.nativeEvent.value, this.props.type);
   }

  render() {
    return (
        <TextField
          label={this.props.label}
          value={this.props.value}
          textColor ={this.props.textColor}
          onChange={ this.txtChange.bind(this) }
        />
    );
  }
}

const styles = StyleSheet.create({
  container: {

  },
});
