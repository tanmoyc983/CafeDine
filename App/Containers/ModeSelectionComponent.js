import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList, TouchableOpacity,Button, TouchableHighlight, Image, Alert } from 'react-native';
import { setSelectedModes,getMenuItems,setmodifiedMenuItems,setCurrentOrder,setPreviousOrder} from "../Utilities/Utility";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CheckBox from 'react-native-check-box'

import { Images } from '../Themes';
import styles from './Styles/LaunchScreenStyles';

export default class ModeSelectionComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modeDetails:[]
        };

        this.updateIndex = this.updateIndex.bind(this);
    };

    _onClick(){
        this.setState({alacarteMode: !this.state.alacarteMode});
    }

    updateIndex(item, index, categoryId) {
        let menuList = Object.assign([], this.state.modeDetails);
        let indexMain = menuList.indexOf(item);
        if(index === 0 && menuList[indexMain].quantity > 0){
            menuList[indexMain].quantity = menuList[indexMain].quantity -1;
        }
        else if(index === 1){
            menuList[indexMain].quantity = menuList[indexMain].quantity +1;
        }
        this.setState(Object.assign({},{ modeDetails: menuList }));        
    }

    submitModes(data){ 
        this.state.modeDetails.forEach(element => {
            if(element.quantity>0){
               var orderObject={
                   "modeType":element.modeType,
                   "quantity":element.quantity,
                   "defaultItemID":element.defaultItemID,
                   "defaultItemPrice":element.defaultItemPrice,
                   "orders":[]
               } 
               setCurrentOrder(orderObject);
               //setPreviousOrder(orderObject);
            }
        });
        setmodifiedMenuItems(this.state.modeDetails);
        this.props.navigation.navigate('OrderScreen');
    }
    componentWillMount(){
        this.setState({modeDetails:getMenuItems()});
    }
    render() {
        return (
            <View style={styles.mainContainer}>
                <Image source={Images.background} style={styles.backgroundImage} resizeMode='cover' />
                <FlatList
                    data={this.state.modeDetails}
                    extraData={this.state}
                    renderItem={({ item }) => (
                        <View style={stylesMode.btnStyle}>
                            <View style={{ flex: 1, flexDirection: 'row' }}> 
                                <View style={{flex: 9,flexDirection: 'row', justifyContent:'flex-start',alignItems:'flex-start'}}>                           
                                <Text style={{ marginVertical: 18, fontSize: 30, marginLeft: 5 }}>
                                    {item.modeName}
                                </Text>
                                </View>
                                <View style={{ flex: 1,flexDirection: 'row',justifyContent:'flex-start',alignItems:'flex-end'}}>
                                  <Text style={{ marginVertical: 18, fontSize: 25, color: 'black' }}>Rs. {item.defaultItemPrice}</Text>
                                </View>
                                <View style={{ flex: 4,flexDirection: 'row',justifyContent:'flex-start',alignItems:'flex-end'}}>
                                        <TouchableHighlight onPress={() => this.updateIndex(item, 0)} style={{ padding: 10 }}>
                                            <Icon name="minus-circle" size={45} color="#2196f3" /></TouchableHighlight>
                                        <Text style={{ marginVertical: 18, fontSize: 25, color: 'black' }}>{item.quantity}</Text>
                                        <TouchableHighlight onPress={() => this.updateIndex(item, 1)} style={{ padding: 10 }}>
                                            <Icon name="plus-circle" size={45} color="#2196f3" /></TouchableHighlight>                                        
                                </View>
                            </View>
                        </View>
                    )}
                />
                <Button title='Submit Selections' style={{ marginTop: 10 }} backgroundColor='#2196F3' onPress={this.submitModes.bind(this)}></Button>
            </View>
        )
    }
};

const stylesMode = StyleSheet.create({
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