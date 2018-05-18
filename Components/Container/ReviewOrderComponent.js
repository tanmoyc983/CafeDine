import React from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList, TouchableOpacity, TouchableHighlight } from 'react-native';
import { Card, ListItem, Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { getFullOrder, getCustomer, getSelectedTable } from "../../Utilities/Utility";
import Icon from 'react-native-vector-icons/FontAwesome';

export default class ReviewOrderComponent extends React.Component {
  constructor() {
    super();

    this.state = {
      order: getFullOrder()
    }
  }

  submitOrder(data) {
    let Customer = getCustomer();
    let selectedTable = getSelectedTable();
    let allItems = {
      items: this.state.order,
      tableID: selectedTable,
      customerID: Customer.customerID
    }
  }

  updateIndex(item, index) {
    let menuList = Object.assign([], this.state.order);
    let itemIndex = menuList.indexOf(item);
    if (index == 0 && menuList[itemIndex].quantity > 0) menuList[itemIndex].quantity = parseInt(menuList[itemIndex].quantity) - 1;
    else if (index == 1) menuList[itemIndex].quantity = parseInt(menuList[itemIndex].quantity) + 1;
    this.setState({ menuItems: menuList });
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
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
        <Button title='Submit Order' style={{ marginTop: 10 }} backgroundColor='#2196F3' onPress={this.submitOrder.bind(this)}></Button>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
    backgroundColor: '#EEEEEE'
  },
});
