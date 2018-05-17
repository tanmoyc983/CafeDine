import React from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { Card, ListItem, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

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
    for (let index = 0; index < 20; index++) {
      tables.push("Table "+ index);
      
    }
    return (
      <View style={styles.container}>
        <View style={{height: 100, backgroundColor: 'skyblue', flex : 1}}>
          <Dropdown style={{justifyContent: 'flex-start'}}
              label='Select Floor'
              data={data}
            />
        </View>

        <View style={{backgroundColor: 'skyblue', flex: 5}} >
          <FlatList
            data={tables}
            renderItem={({ item }) => (
              <View style={{justifyContent: 'center'}}>
                <Card >
                  <View style={{flex:1, flexDirection: 'row'}}>
                    <Text style={{flex:8}}>
                      {item}
                    </Text>
                    <Icon style={{flex:1}} name="bars" size={30} color="#900" />
                  </View>
                </Card>
              </View>
            )}
          />     
        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap'
  },
});
