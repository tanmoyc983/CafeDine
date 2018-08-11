import React from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList, TouchableOpacity, TouchableHighlight, Image, Alert } from 'react-native';
import { getImageonType } from "../Utilities/Utility";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Accordion from 'react-native-collapsible/Accordion';
import { Card } from 'react-native-elements';
import { connect } from "react-redux";
import { Images } from '../Themes';
import styles from './Styles/LaunchScreenStyles';
import {Button } from 'native-base';
import ReduxActions from "../Redux/ActionTypes/Action";

class MenuItemsComponent extends React.Component {
    constructor() {
        super();
    }
    addOrder(selectedItem) { 
        this.props.dispatch({type:ReduxActions.UPDATE_ORDER});
        this.props.navigation.navigate('OrderScreen');
    }

    updateIndex(item, toAdd, categoryId) {
        this.props.dispatch({type: ReduxActions.UPDATED_MENU_ITEMS,item, toAdd, categoryId});
    }

    _renderHeader(section) {
        return (
            <View>
                <Text style={{ color: '#3949ab', marginLeft: 10, fontSize: 30, borderWidth: 0.5,borderColor:'#BDBDBD' }}>{section.categoryName}</Text>
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
        debugger;
        return (
            <View style={styles.mainContainer}>
                <Image source={Images.background} style={styles.backgroundImage} resizeMode='cover' />
                <ScrollView>
                    <Accordion 
                        sections={this.props.selectedMenuItems.category==null?[]:this.props.selectedMenuItems.category}
                        renderHeader={this._renderHeader.bind(this)}
                        renderContent={this._renderContent.bind(this)}
                    />
                </ScrollView>
                <View style={{flex:1,flexDirection:'row',marginRight:10,alignItems:'flex-end',justifyContent:'flex-end'}}>
                <Button style={{height:50,width:200,justifyContent:'center'}} onPress={this.addOrder.bind(this)}>
                    <Icon active name="skip-next" size={24} color="#FAFAFA" />
                    <Text style={stylesFloor.textStyle}>Add</Text>
                </Button>
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
    cardStyle:{
        height:300,
        width:350,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2
    },
    textStyle: {
        fontSize:24,
        color:'white',
        fontFamily:'Avenir-Book'
      }
});

const mapStateToProps=(state)=>{
  return {
       selectedMenuItems:state.OrderReducer.SelectedMenuItems
  }
}

export default connect(mapStateToProps,null)(MenuItemsComponent)