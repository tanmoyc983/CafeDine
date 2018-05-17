import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, FlatList, ViewPropTypes, Button } from 'react-native';
import { Actions } from 'react-native-router-flux';

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'transparent',
//     borderWidth: 2,
//     borderColor: 'red',
//   },
// });

class DrawerContent extends React.Component {

  render() {
    let navData = ['Customer', 'Tables'];
      
    return (
      <FlatList
      data={navData}
      renderItem={({ item }) => (
        <Button onPress={Actions.Floor} style = {{backgroundColor : 'red', color: 'red'}} title={item}>{item}</Button>
      )}
    /> 
    );
  }
}

export default DrawerContent;