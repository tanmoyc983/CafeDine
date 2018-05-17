import React from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { Card, ListItem, Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { setMenuItems, getFloors } from "../../Utilities/Utility";

export default class FloorsAndTables extends React.Component {
  constructor(){
    super();

    this.state = {
      floors: getFloors(),
      floorSelected: null
    }
  }
  componentWillMount(){
    ///For hussey da, manipulate data here
  }

  fillTable() {
    console.log('Sumant');
    Actions.OrderMenu();
  }

  changeFloor(data){
    //change to select floor
    this.setState({floorSelected: data});
  }

  render() {
//use below loop for pushing data
    // let tables = [];
    // for (let index = 0; index < 20; index++) {
    //   tables.push("Table " + index);
    // }
    return (
      <View style={styles.container}>
        <View style={{ height: 100, backgroundColor: 'skyblue', flex: 1 }}>
          <Dropdown style={{ justifyContent: 'flex-start' }} onChange={() => this.changeFloor(index)}
            label='Select Floor'
            data={data}
          />
        </View>

        <View style={{ backgroundColor: 'skyblue', flex: 5 }} >
          <FlatList
            data={tables}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={this.fillTable.bind(this)} style={{ justifyContent: 'center' }}>
                <Card  >
                  <View style={{ flex: 1, flexDirection: 'row' }}>
                    <Text style={{ flex: 8, textAlign: 'center' }}>
                      {item}
                    </Text>
                  </View>
                </Card>
              </TouchableOpacity>
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
