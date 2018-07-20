import React from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList, TouchableOpacity, TouchableHighlight, Button, Image, Alert } from 'react-native';
import { getmodifiedMenuItems,getSelectedMode,getSelectedMenuItems,updateCurrentOrder, getImageonType } from "../Utilities/Utility";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Accordion from 'react-native-collapsible/Accordion';
import { Card } from 'react-native-elements';

import { Images } from '../Themes';

import styles from './Styles/LaunchScreenStyles';
export default class MenuItemsComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            menuItems: [],
            selectedMode:getSelectedMode()
        }
    }
    componentWillMount(){
        this.setState(Object.assign({},this.state,{menuItems:getSelectedMenuItems(this.state.selectedMode)}));
    }

    addOrder(item) { 
        this.state.menuItems.forEach(element => {
            element.items.forEach(menuItem => {
                if(menuItem.quantity>0){
                    updateCurrentOrder(this.state.selectedMode,menuItem);
                }
            });
            
        });
        this.props.navigation.navigate('OrderScreen');
    }

    updateIndex(item, toAdd, categoryId) {
        let arrindex=0;
        let menuList = Object.assign([], this.state.menuItems);
        menuList.forEach((element,index) => {
            if(element.categoryName==categoryId){
                arrindex=index;
            }
        });
        let indexMain = menuList[arrindex].items.indexOf(item);
        if (!toAdd && menuList[arrindex].items[indexMain].quantity > 0) {
            menuList[arrindex].items[indexMain].quantity = menuList[arrindex].items[indexMain].quantity - 1;
        }
        else if (toAdd) {            
            menuList[arrindex].items[indexMain].quantity = menuList[arrindex].items[indexMain].quantity + 1;
        }
        this.setState(Object.assign({},this.state, { menuItems: menuList }));
    }

    _renderHeader(section) {
        return (
            <View>
                <Text style={{ color: 'white', marginLeft: 10, fontSize: 30, borderWidth: 1 }}>{section.categoryName}</Text>
            </View>
        );
    }

    _renderContent(section) {
        return (
            <View style={{flex:1, flexWrap:'wrap', flexDirection:"row"}}>
                {section.items.map((item) => {
                    return (
                    <Card containerStyle={stylesFloor.cardStyle} title={item.itemName} image={getImageonType('ULNVP')}>
                        <View style={{ flexDirection: 'row', justifyContent:'flex-start',alignItems:'flex-start' }}>
                         <Text style={{fontSize: 20,fontWeight: 'bold'}}>Rs. {item.itemPrice}</Text>  
                        </View> 
                        <View style={{ flexDirection: 'row', justifyContent:'flex-end',alignItems:'flex-end' }}>                     
                            <TouchableHighlight onPress={() => this.updateIndex(item,false,section.categoryName)} style={{ padding: 10 }}>
                                <Icon name="minus-circle" size={40} color="#2196f3" /></TouchableHighlight>
                            <Text style={{ marginVertical: 18, fontSize: 20, color: 'black' }}>{item.quantity}</Text>
                            <TouchableHighlight onPress={() => this.updateIndex(item,true,section.categoryName)} style={{ padding: 10 }}>
                            <Icon name="plus-circle" size={40} color="#2196f3" /></TouchableHighlight>
                        </View>                        
                    </Card>)
                })}
            </View>);
    }

    render() {
        console.log(this.state.menuItems);
        return (
            <View style={styles.mainContainer}>
                <Image source={Images.background} style={styles.backgroundImage} resizeMode='cover' />
                <ScrollView>
                    <Accordion
                        sections={this.state.menuItems}
                        renderHeader={this._renderHeader.bind(this)}
                        renderContent={this._renderContent.bind(this)}
                    />
                </ScrollView>
                <TouchableOpacity>
                <Button title='Add' backgroundColor='#2196F3' onPress={this.addOrder.bind(this)}></Button>
                </TouchableOpacity>
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
        // height: 60,
        borderBottomWidth: 1,
        // marginHorizontal: 10
    },
    cardStyle:{
        height:300,
        width:350
    },
});
