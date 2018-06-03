import React from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList, TouchableOpacity, TouchableHighlight, Button, Image, Alert } from 'react-native';
import { getMenuItems, setFullOrders } from "../Utilities/Utility";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Accordion from 'react-native-collapsible/Accordion';

import { Images } from '../Themes';

import styles from './Styles/LaunchScreenStyles';
export default class OrderComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            menuItems: getMenuItems(),
        }
    }

    reviewOrder() {
        setFullOrders(this.state.menuItems);
        this.props.navigation.navigate('ReviewOrderScreen');
    }


    _renderHeader(section) {
        return (
            <View>
                <Text style={{ color: 'white', marginLeft: 10, fontSize: 30, borderWidth: 1 }}>{section.categoryName}</Text>
            </View>
        );
    }
    
    updateIndex(item, index, categoryId) {
        let menuList = Object.assign([], this.state.menuItems);
        menuList.forEach(temp => {
            let itemIndex = temp.items.indexOf(item);
            if (itemIndex > -1) {
                if (index == 0 && temp.items[itemIndex].quantity > 0) temp.items[itemIndex].quantity = parseInt(temp.items[itemIndex].quantity) - 1;
                else if (index == 1) temp.items[itemIndex].quantity = parseInt(temp.items[itemIndex].quantity) + 1;
            }
        });

        this.setState(Object.assign({},{ menuItems: menuList }));
    }

    _renderContent(section) {
        return (
            <FlatList
                data={section.items}
                extraData= {this.state}
                renderItem={({ item }) => (
                    <View style={stylesFloor.btnStyle}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Text style={{ flex: 7, textAlign: 'left', marginVertical: 18, fontSize: 20, marginLeft: 5 }}>
                                {item.itemName}-- Rs. {item.price}
                            </Text>
                            <View style={{ flex: 4, flexDirection: 'row' }}>
                                <View style={{ flex: 4, flexDirection: 'row' }}>
                                    <TouchableHighlight onPress={() => this.updateIndex(item, 0)} style={{ padding: 10 }}>
                                        <Icon name="minus-circle" size={40} color="#2196f3" /></TouchableHighlight>
                                    <Text style={{ marginVertical: 18, fontSize: 20, color: 'black' }}>{item.quantity}</Text>

                                    <TouchableHighlight onPress={() => this.updateIndex(item, 1)} style={{ padding: 10 }}>
                                        <Icon name="plus-circle" size={40} color="#2196f3" /></TouchableHighlight>
                                </View>

                            </View>
                        </View>
                    </View>
                )}
            />
        );
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
                <View>
                    <Accordion
                        sections={this.state.menuItems}
                        renderHeader={this._renderHeader.bind(this)}
                        renderContent={this._renderContent.bind(this)}
                    />
                </View>
                <Button title='Review Order' backgroundColor='#2196F3' onPress={this.reviewOrder.bind(this)}></Button>

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
        height: 60,
        borderBottomWidth: 1,
        marginHorizontal: 10
    }
});