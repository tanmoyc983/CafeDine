import React from 'react';
import { connect } from 'react-redux';
import ReduxActions from "../Redux/ActionTypes/Action";
import SagaActions from "../Sagas/ActionTypes/Action";
import { StyleSheet, Text, View, ScrollView, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import { Card } from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';
import { setMenuItems, getFloors, setFullOrders, getFloorList, setSelectedTable, getStackParam } from "../Utilities/Utility";
import { Images } from '../Themes';
import styles from './Styles/LaunchScreenStyles';
import TextBoxMaterial from "../Components/TextBox";
import {Toast} from 'native-base';

class FloorsAndTables extends React.Component {
  constructor() {
    super();
  }
  componentWillMount(){
    if(this.props.floorDetails.length===0){
      this.props.dispatch({type:SagaActions.GET_FLOOR_DETAILS});
    }
  }
  fillTable(tableData) {
    if (this.props.NoOfPerson>0){
      this.props.dispatch({type:ReduxActions.SELECTED_TABLE,tableData});
      this.props.navigation.navigate('ModeSelectionScreen');
    }
    else{ Toast.show({
      text: "Please enter the number of person",
      textStyle: { fontSize: 25, fontFamily:'Avenir-Black' },
      duration: 2000,
      position: "bottom",
      buttonTextStyle:{fontSize: 20, fontFamily:'Avenir-Black'},
      buttonText: "Ok",
      type: "danger"
      }) }  
  }

  changeFloor(val) {
    let selectedValue = val.match(/\d+/)[0];
    if (this.props.floorDetails.length>0) {
      this.props.floorDetails.forEach((floordata, index) => {
        if (floordata.floorID == selectedValue) {
        this.props.dispatch({type:ReduxActions.SELECTED_FLOOR,floordata});
        }
      });
    }
  }
  changeField(noofperson){
    this.props.dispatch({type: ReduxActions.SET_NOOFPERSON, noofperson})
  }

  render() {
    let tableArray=[]
    if(this.props.selectedFloor.length>0){this.props.selectedFloor[0].tables.map((tableNo)=>{

      tableArray.push(
    <View style={{ flexDirection: 'row', justifyContent:'flex-start' }}>  
      <TouchableOpacity onPress={() => this.fillTable(tableNo)} disabled={tableNo.isOccupied}> 
      
      <Card containerStyle={stylesFloor.cardStyle}>
        <View style={{ flexDirection: 'row', justifyContent:'space-between', alignContent: 'space-between', marginTop: 10 }}>
          <Text style={{fontSize: 25,fontWeight: 'bold'}}>Table {tableNo.tableID}</Text>  
          <Text style={tableNo.isOccupied ?stylesFloor.circleOccupied:stylesFloor.circleFree}>
            {tableNo.capacity}
          </Text> 
        </View>
      </Card>
      </TouchableOpacity>
  </View>
)})
}

    let floors=[];
    this.props.floorDetails.forEach(element => {   
      floors.push({
        value: 'Floor ' + element.floorID
      });
    });
    return (
      
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='cover' />
        <View style={{ flexDirection:'row',flex: 2,marginLeft:10, alignItems:'baseline' }}>
          <View style={{flexDirection:'column', flex:1,justifyContent:'space-between'}}>
            <Dropdown style={{ justifyContent: 'flex-start' }}
              dropdownPosition={0}
              textColor='#424242'
              itemColor='#039be5'
              baseColor='#039be5'
              containerStyle={{color:'#039be5'}}
              overlayStyle={{color:'#039be5'}}
              labelFontSize={25}
              fontSize={25}
              onChangeText={this.changeFloor.bind(this)}
              label='Select Floor' baseColor='#039be5'
              data={floors}/>
          </View>
          <View style={{flexDirection:'column',flex:2,marginLeft:100, justifyContent:'space-between'}}>
            <TextBoxMaterial keyboardTextType="numeric"   label="No. of persons" changeField = {this.changeField.bind(this)}/>
          </View>
        </View>
           <View style={{flex: 8, padding: 0 }} >
            <ScrollView>
              <View style={{flex: 1, flexWrap:'wrap',flexDirection: 'row', justifyContent:'flex-start',alignContent:'space-around', padding: 0 }} > 
                {tableArray}
              </View>
            </ScrollView>
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
  btnStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    height: 50,
    // marginVertical: 10
  },
  filled: {
    backgroundColor: '#ff8080',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    height: 50
    // marginVertical: 10
  },
  cardStyle:{
    height:80,
    width:250,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    paddingTop: 10
},
  empty: {
    backgroundColor: '#a5dad5',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    height: 50,
    marginVertical: 10
  },
  circleOccupied:
    {
    width:60,
    height:60,
    borderRadius:250,
    alignItems:'center',
    fontSize:30,
    color:'#fff',
    lineHeight:50,
    textAlign:'center',
    backgroundColor:'#ff8080',
    marginTop: -3 + '%'
    },
    circleFree:
    {
    width:60,
    height:60,
    borderRadius:250,
    alignItems:'center',
    fontSize:30,
    color:'#fff',
    lineHeight:50,
    textAlign:'center',
    backgroundColor:'#2196f3',
    marginTop: -3 + '%'
    }
});


const mapStateToProps = (state) => {
  return{
    loginSuccess: state.userReducer.loginDetails.loginSuccess,
    floorDetails:state.floorReducer.floorList,
    selectedFloor:state.floorReducer.selectedFloor,
    selectedtable:state.floorReducer.selectedtable,
    NoOfPerson: state.tableReducer.NoOfPerson
  };
}

export default connect(mapStateToProps, null)(FloorsAndTables)
