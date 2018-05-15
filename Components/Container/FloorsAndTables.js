import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { Card, ListItem, Button } from 'react-native-elements';

export default class FloorsAndTables extends React.Component {
  render() {
    let data = [{
      value: 'Floor 1',
    }, {
      value: 'Floor 2',
    }, {
      value: 'Floor 3',
    }];
    let tables = [];
    for (let index = 0; index < 10; index++) {
      tables.push(<Card style={ {height: "30px"}}>
        <Text>Table {index}</Text>
      </Card>);
      
    }
    return (
      <ScrollView style={styles.container}>
      <View>
        <Dropdown
          label='Select Floor'
          data={data}
        />
      <Text />
      {tables}</View>
        
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
});
