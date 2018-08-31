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
        debugger;
        this.props.modeDetails.forEach(element => {
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
                <View style={{flex:1,flexDirection:'row',marginRight:10,alignItems:'flex-end',justifyContent:'flex-end'}}>
                <Button style={{height:50,width:350,justifyContent:'center'}} onPress={this.submitModes.bind(this)}>
                    <Icon active name="skip-next" size={24} color="#FAFAFA" />
                    <Text style={stylesMode.textStyle}>Submit Selections</Text>
                </Button>
            </View>
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
    },
    textStyle: {
        fontSize:24,
        color:'white',
        fontFamily:'Avenir-Book'
      }
});

const mapStateToProps=(state)=>{
    return {
        modeDetails: state.menuitemsReducer.menuItems,
        tableBooked: state.menuitemsReducer.tableBooked,
        selectedtable:state.floorReducer.selectedtable,
    }
}

export default connect(mapStateToProps, null)(ModeSelectionComponent)