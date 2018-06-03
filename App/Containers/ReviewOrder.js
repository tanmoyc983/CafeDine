import React from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList, Button, TouchableOpacity, TouchableHighlight, Image, ActivityIndicator } from 'react-native';
import { getFullOrder, getCustomer, getSelectedTable, setStackParam, clearData } from "../Utilities/Utility";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './Styles/LaunchScreenStyles';

import { Images } from '../Themes';

export default class ReviewOrderComponent extends React.Component {
    constructor() {
        super();

        this.state = {
            order: getFullOrder(),
            showIndicator: false
        }
    }

    submitOrder(data) {
        let Customer = getCustomer();
        let selectedTable = getSelectedTable().tableID;
        let allItems = {
            items: this.state.order,
            tableID: selectedTable,
            customerID: Customer.customerID,
            noofPerson: 0
        }
        console.log(allItems);
        this.setState({ showIndicator: true });
        fetch('http://onestaapi.azurewebsites.net/api/Order_Customer', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(allItems),
        }).then(response => response.json())
            .then(
                response => {
                    setStackParam(false);
                    clearData();
                    this.setState({ showIndicator: false });
                    this.props.navigation.navigate('LaunchScreen');
                }
            ).catch(err => {
                console.log(err);
            });
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
            <View style={styles.mainContainer}>
                <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
                {this.state.showIndicator && <View style={[stylesFloor.container, stylesFloor.horizontal]}>
                    <ActivityIndicator size="large" color="red" /></View>}
                {!this.state.showIndicator && <View>
                    <FlatList
                        data={this.state.order}
                        extraData= {this.state}
                        renderItem={({ item }) => (
                            <View style={stylesFloor.btnStyle}>
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <Text style={{ flex: 7, textAlign: 'left', marginVertical: 18, fontSize: 20, marginLeft: 5 }}>
                                        {item.itemName}
                                    </Text>
                                    <View style={{ flex: 4, flexDirection: 'row' }}>
                                        <View style={{ flex: 4, flexDirection: 'row' }}>
                                            <TouchableHighlight onPress={() => this.updateIndex(item, 0)} style={{ padding: 10 }}>
                                                <Icon name="minus-circle" size={40} color="#2196f3" /></TouchableHighlight>
                                            <Text style={{ marginVertical: 18, fontSize: 20 }}>{item.quantity}</Text>

                                            <TouchableHighlight onPress={() => this.updateIndex(item, 1)} style={{ padding: 10 }}>
                                                <Icon name="plus-circle" size={40} color="#2196f3" /></TouchableHighlight>
                                        </View>

                                    </View>
                                </View>
                            </View>
                        )}
                    />
                    <Button title='Submit Order' style={{ marginTop: 10 }} backgroundColor='#2196F3' onPress={this.submitOrder.bind(this)}></Button>
                </View>}
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
        backgroundColor: 'white',
        borderRadius: 5,
        height: 50,
        marginVertical: 10
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        zIndex: 999
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    }
});