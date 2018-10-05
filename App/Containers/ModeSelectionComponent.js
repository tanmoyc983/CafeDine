import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList, TouchableOpacity, TouchableHighlight, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SagaActions from "../Sagas/ActionTypes/Action";
import ReduxActions from "../Redux/ActionTypes/Action";
import { Images } from '../Themes';
import styles from './Styles/LaunchScreenStyles';
import { connect } from 'react-redux';
import {Button } from 'native-base';
import {Toast} from 'native-base';
import CommonStyles, {plusMinusIconColor, defaultTxtColor, customerIconColor} from './Styles/CommonStyles';

class ModeSelectionComponent extends Component {
    constructor(props) {
        super(props)
    };

    componentWillMount(){
      if(this.props.modeDetails.length==0){
          this.props.dispatch({type:SagaActions.GET_MENU_ITEMS});
      }
    }

    updateIndex(item, index) {
       let updateModeQuantity = Object.assign([], this.props.modeDetails);
        let indexMain = this.props.modeDetails.indexOf(item);
        if(index === 0 && updateModeQuantity[indexMain].quantity > 0){
            updateModeQuantity[indexMain].quantity = updateModeQuantity[indexMain].quantity -1;
        }
        else if(index === 1){
            updateModeQuantity[indexMain].quantity = updateModeQuantity[indexMain].quantity +1;
        }
        this.props.dispatch({type:ReduxActions.UPDATE_MODE_QUANTIRY,updateModeQuantity});        
    }

    componentDidUpdate(prevProps, prevState){
            if (this.props.tableBooked){
                Toast.show({
                    text: 'Table booked, Please place your order .',
                    textStyle: { fontSize: 25, fontFamily:'Avenir-Black',fontWeight:'bold' },
                    duration: 2000,
                    buttonTextStyle:{fontSize: 20, fontFamily:'Avenir-Black'},
                    buttonText: "Okay",
                    type: "success"
               })
                this.props.navigation.navigate('AfterModeSelectionStack');
            }
        }

    submitModes(){ 
        let selectedMode=[];
        this.props.modeDetails.forEach(element => {
            if(element.modeName==="Ala Carte"&&element.quantity===0){
                selectedMode.push(element);
            }
            if(element.quantity>0){
                selectedMode.push(element);
            }
        });
        if(selectedMode.length>0){
            this.props.dispatch({type:ReduxActions.SELECTED_MODE,selectedMode});   
            this.props.dispatch({type: SagaActions.BOOK_TABLE,TableID:this.props.selectedtable.tableID}); 
        }else{
            Toast.show({
                text: 'Please select food items!',
                textStyle: { fontSize: 25, fontFamily:'Avenir-Black',fontWeight:'bold' },
                duration: 2000,
                buttonTextStyle:{fontSize: 20, fontFamily:'Avenir-Black'},
                buttonText: "Okay",
                type: "danger"
           })
        }
                     
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <Image source={Images.background} style={styles.backgroundImage} resizeMode='cover' />
                <FlatList
                    data={this.props.modeDetails}
                    renderItem={({ item }) => (
                        <View style={CommonStyles.customButtonStyle}>
                            <View style={{ flex: 1, flexDirection: 'row' }}> 
                                <View style={{flexDirection: 'row', justifyContent:'flex-start',alignItems:'flex-start', width: 60 + '%'}}>                           
                                    <Text style={{ marginVertical: 18, fontSize: 25, marginLeft: 5,  color: defaultTxtColor }}>
                                        {item.modeName}
                                    </Text>
                                </View>
                                <View style={{ flexDirection: 'row',justifyContent:'flex-start',alignItems:'flex-end', width: 15 + '%'}}>
                                    <Text style={{ marginVertical: 18, fontSize: 25, color: defaultTxtColor, width: 100 }}>Rs. {item.defaultItemPrice}</Text>
                                </View>
                                <View style={{ flexDirection: 'row',justifyContent:'flex-start',alignItems:'flex-end', width: 20 + '%'}}>
                                        <TouchableHighlight onPress={() => this.updateIndex(item, 0)} style={{ padding: 10 }}>
                                        <Icon name="minus-circle" size={45} color={plusMinusIconColor} /></TouchableHighlight>
                                        <Text style={{ marginVertical: 18, fontSize: 25, color: defaultTxtColor }}>{item.quantity}</Text>
                                        <TouchableHighlight onPress={() => this.updateIndex(item, 1)} style={{ padding: 10 }}>
                                        <Icon name="plus-circle" size={45} color={plusMinusIconColor} /></TouchableHighlight>                                        
                                </View>
                            </View>
                        </View>
                    )}
                />
                <View style={{flex:1,flexDirection:'row',marginRight:10,alignItems:'flex-end',justifyContent:'flex-end'}}>
                <Button style={CommonStyles.smButtonStyle} onPress={this.submitModes.bind(this)}>
                    <Icon active name="skip-next" size={24} color={customerIconColor} />
                    <Text style={CommonStyles.whiteTxtStyle}>Submit</Text>
                </Button>
            </View>
            </View>
        )
    }
};

const mapStateToProps=(state)=>{
    return {
        modeDetails: state.menuitemsReducer.menuItems,
        tableBooked: state.menuitemsReducer.tableBooked,
        selectedtable:state.floorReducer.selectedtable,
    }
}

export default connect(mapStateToProps, null)(ModeSelectionComponent)