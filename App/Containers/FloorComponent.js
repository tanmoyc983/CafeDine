import React from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { setMenuItems, getFloors, setFullOrders, getFloorList, setSelectedTable, getStackParam } from "../Utilities/Utility";

import { Images } from '../Themes';

import styles from './Styles/LaunchScreenStyles';

export default class FloorsAndTables extends React.Component {
  constructor() {
    super();
    this.state = {
      floors: getFloors(),
      floorSelected: null,
      floorDetails: [],
      floorList: getFloorList(),
      customerStack: getStackParam()
    }
  }

  fillTable(data) {
    setSelectedTable(data);
    if (this.state.customerStack) {
      this.props.navigation.navigate('OrderScreen');
    }
    else {
      this.props.navigation.navigate('ReviewOrderScreen');
    }
  }

  changeFloor(val) {
    //change to select floor  
    let selectedValue = val.match(/\d+/)[0];
    let FloorDetails;
    if (this.state.floors) {
      this.state.floors.forEach((element, index) => {
        if (element.floorID == selectedValue) {
          FloorDetails = this.state.floors[index].tables;
        }
      });
    }
    this.setState({ floorSelected: val, floorDetails: FloorDetails });
  }

  render() {
    let tables = this.state.floorDetails;
    if (this.state.floorDetails) {
      for (let index = 1; index <= tables; index++) {
        tables.push("Table " + index);
      }
    }

    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <View style={{ height: 100, flex: 1 }}>
          <Dropdown style={{ justifyContent: 'flex-start', color: 'white' }} onChangeText={this.changeFloor.bind(this)}
            label='Select Floor' baseColor='white'
            data={this.state.floorList}
          />
        </View>
        <View style={{ flex: 5 }} >
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ flex: 8, textAlign: 'center', color: 'white' }}>
              Table Number
              </Text>
            <Text style={{ flex: 8, textAlign: 'center', color: 'white' }}>
              Capacity
              </Text>
          </View>
          <FlatList
            data={this.state.floorDetails}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => this.fillTable(item)} style={[stylesFloor.btnStyle,item.isOccupied ? stylesFloor.filled : stylesFloor.empty]} disabled={item.isOccupied}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <Text style={{ flex: 8, textAlign: 'center', color: 'black' }}>
                    Table {item.tableID}
                  </Text>
                  <Text style={{ flex: 8, textAlign: 'center', color: 'black' }}>
                    {item.capacity}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>

    );
  }
}

const stylesFloor = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap'
  },
  btnStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    height: 50,
    marginVertical: 10
  },
  filled: {
    backgroundColor: 'red',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    height: 50,
    marginVertical: 10
  },
  empty: {
    backgroundColor: '#4DB6AC',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    height: 50,
    marginVertical: 10
  }
});