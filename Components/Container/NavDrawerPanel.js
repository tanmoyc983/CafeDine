import React from 'react';
import {PropTypes} from "react";
import {
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Actions } from 'react-native-router-flux';

const NavDrawerPanel = (props, context) => {
  const drawer = context.drawer;
  return (
    <View style={styles.container}>
      <TouchableHighlight onPress={Actions.home}>
        <Text>Home Page</Text>
      </TouchableHighlight>
      <TouchableHighlight onPress={Actions.login}>
        <Text>Login Page</Text>
      </TouchableHighlight>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: 'black'
  },
})