import React from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { Card, ListItem, Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { setMenuItems, getFloors, getFloorList } from "../../Utilities/Utility";

export default class FloorsAndTables extends React.Component {
  constructor(){
    super();
    this.state = {
      floors: getFloors(),
      floorSelected: null,
      floorDetails:[],
      floorList: getFloorList()
    }
  }
 

  fillTable() {
    Actions.OrderMenu();
  }

  changeFloor(val){
    //change to select floor  
    console.log(this.state.floors);    
    let selectedValue=val.match(/\d+/)[0];    
    let FloorDetails;
     this.state.floors.forEach((element,index) => {
      if(element.floorID==selectedValue){             
        FloorDetails= this.state.floors[index].tables;
        console.log(FloorDetails);   
      }      
    });
    this.setState({floorSelected: val, floorDetails: FloorDetails});    
  }

  render() {
let tables = this.state.floorDetails;
console.log(tables);
    if(this.state.floorDetails){
    for (let index = 1; index <= tables; index++) {
      tables.push("Table " + index);
    }
  }
    return (
      <View style={styles.container}>
        <View style={{ height: 100, backgroundColor: 'skyblue', flex: 1 }}>
          <Dropdown style={{ justifyContent: 'flex-start' }} onChangeText={this.changeFloor.bind(this)}
            label='Select Floor'
            data={this.state.floorList}
          />
        </View>
        <View style={{ backgroundColor: 'skyblue', flex: 5 }} >
          <FlatList
            data={this.state.floorDetails}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={this.fillTable.bind(this)} style={{ justifyContent: 'center' }}>
                <Card>
                  <View style={{ flex: 1, flexDirection: 'row' }}>
                    <Text style={{ flex: 8, textAlign: 'center' }}>
                      Table {item.tableID}
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
