import React from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { Card, ListItem, Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { getFullOrder } from "../../Utilities/Utility";

export default class ReviewOrderComponent extends React.Component {
  constructor() {
    super();

    this.state = {
      order: getFullOrder()
    }
  }

  submitOrder(data) {
    //change to select floor
    this.setState({ floorSelected: data });
  }

  updateIndex(item, index) {
    let menuList = Object.assign([], this.state.menuItems);
    let itemIndex = menuList.indexOf(item);
    if (index == 0 && menuList[itemIndex].quantity > 0) menuList[itemIndex].quantity = parseInt(menuList[itemIndex].quantity) - 1;
    else if (index == 1) menuList[itemIndex].quantity = parseInt(menuList[itemIndex].quantity) + 1;
    this.setState({ menuItems: menuList });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ backgroundColor: 'skyblue', flex: 5 }} >
          <FlatList
            data={this.state.order}
            renderItem={({ item }) => (
              <Card>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <Text style={{ flex: 7, textAlign: 'left' }}>
                    {item.itemName}
                  </Text>
                  <View style={{ flex: 4, flexDirection: 'row' }}>
                    <View style={{ flex: 4, flexDirection: 'row' }}>
                      <TouchableHighlight onPress={() => this.updateIndex(item, 0)} style={{ backgroundColor: 'green', borderWidth: 1, padding: 10 }}><Icon name="minus" size={15} color="red" /></TouchableHighlight>
                      <TouchableHighlight onPress={() => this.updateIndex(item, 1)} style={{ backgroundColor: 'green', borderWidth: 1, padding: 10 }}><Icon name="plus" size={15} color="red" /></TouchableHighlight>
                    </View>
                    <View style={{ flex: 2 }}>
                      <Text>{item.quantity}</Text>
                    </View>
                  </View>
                </View>
              </Card>
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
