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
              fontSize={30}
              labelFontSize={30}
              titleFontSize={38}
              disabled={this.props.isDisabled}
              label={this.props.label}
              value={this.props.value}
              onChange={this.txtChange.bind(this) }
              tintColor= "#039be5"
              baseColor= "#039be5"
              textColor	="#424242"
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