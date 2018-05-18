import React from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList, TouchableOpacity, TouchableHighlight } from 'react-native';
import { Card, ListItem, Button, ButtonGroup } from 'react-native-elements';
import { getMenuItems, setFullOrders } from "../../Utilities/Utility";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';

export default class OrderComponent extends React.Component {
    constructor() {
        super();

        this.state = {
            menuItems: getMenuItems(),
            selectedIndex: 0
        }
    }

    reviewOrder(){
        setFullOrders();
        Actions.ReviewOrder();
    }

    updateIndex(item, index) {
        let menuList = Object.assign([], this.state.menuItems);
        let itemIndex = menuList.indexOf(item);
        if (index == 0 && menuList[itemIndex].quantity > 0) menuList[itemIndex].quantity = parseInt(menuList[itemIndex].quantity) - 1;
        else if (index == 1) menuList[itemIndex].quantity = parseInt(menuList[itemIndex].quantity) + 1;
        this.setState({ menuItems: menuList });
    }

    render() {
        let selectedIndex = this.state.selectedIndex;
        return (
            <View style={styles.container}>
                <View>
                    <FlatList
                        data={this.state.menuItems}
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
                <Button title='Review Order' style={{ backgroundColor: 'red'}} backgroundColor= 'blue' onPress={this.reviewOrder.bind(this)}></Button>

            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        flexWrap: 'wrap',
        backgroundColor: 'skyblue'
    },
});
