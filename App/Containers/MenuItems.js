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
import comStyles ,{arrowDropdownIconColor, plusMinusIconColor, defaultTxtColor, customerIconColor} from './Styles/CommonStyles';

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

    _renderHeader(section, index, isActive) {
        let test=[];
        if(!isActive)
        {
            test.push(<Icon active name="arrow-up-drop-circle-outline" size={42} color= {arrowDropdownIconColor} />);
        }
        else if(isActive)
        {
            test.push(<Icon active name="arrow-down-drop-circle-outline" size={42} color={arrowDropdownIconColor} />);
        }
        return (
            <View style={comStyles.catagoryStyle} >
                <View style={{flexGrow:1}}>
                    <Text style={{ color: arrowDropdownIconColor, marginLeft: 10, fontSize: 30}}>
                         {section.categoryName}
                    </Text>
                </View>
                <View>{test}</View>
            </View>

        );
    }

    _renderContent(section) {
        return (
            <View style={{flex:1, flexWrap:'wrap', flexDirection:"row"}}>
                {section.items.map((item) => {
                    return (
                    <Card containerStyle={comStyles.cardStyle} title={item.itemName} image={getImageonType('ULNVP')}>
                        <View style={{ flexDirection: 'row', justifyContent:'flex-start',alignItems:'flex-start' }}>
                            <Text style={comStyles.smTxtStyle}>
                                Rs. {item.itemPrice}
                            </Text>  
                        </View> 
                        <View style={{ flexDirection: 'row', justifyContent:'flex-end',alignItems:'flex-end' }}>                     
                            <TouchableHighlight onPress={() => this.updateIndex(item,false,section.categoryName)} style={{ padding: 10 }}>
                                <Icon name="minus-circle" size={40} color={plusMinusIconColor} />
                            </TouchableHighlight>
                            <Text style={{ marginVertical: 18, fontSize: 20, color: defaultTxtColor }}>{item.quantity}</Text>
                            <TouchableHighlight onPress={() => this.updateIndex(item,true,section.categoryName)} style={{ padding: 10 }}>
                                 <Icon name="plus-circle" size={40} color={plusMinusIconColor} />
                            </TouchableHighlight>
                        </View>                        
                    </Card>)
                })}
            </View>);
    }

    render() {
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
                <Button style={comStyles.smButtonStyle} onPress={this.addOrder.bind(this)}>
                    <Icon active name="skip-next" size={24} color={customerIconColor} />
                    <Text style={comStyles.whiteTxtStyle}>Add</Text>
                </Button>
            </View>
            </View>
    
        );
    }
}

const mapStateToProps=(state)=>{
  return {
       selectedMenuItems:state.OrderReducer.SelectedMenuItems
  }
}

export default connect(mapStateToProps,null)(MenuItemsComponent)