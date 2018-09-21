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
import { Toast } from 'native-base';
import comStyles, {dropdownColor, defaultTxtColor} from './Styles/CommonStyles';

class FloorsAndTables extends React.Component {
  constructor() {
    super();
  }
  componentWillMount() {
    if (this.props.floorDetails.length === 0) {
      this.props.dispatch({ type: SagaActions.GET_FLOOR_DETAILS });
    }
  }
  fillTable(tableData) {
    if (this.props.NoOfPerson > 0 && this.props.NoOfPerson <= tableData.capacity) {
      this.props.dispatch({ type: ReduxActions.SELECTED_TABLE, tableData });
      this.props.navigation.navigate('ModeSelectionScreen');
    }
    else {
      Toast.show({
        text: "Number of person cannot be blank or more than the table capacity!",
        textStyle: { fontSize: 25, fontFamily: 'Avenir-Black' },
        duration: 2000,
        position: "bottom",
        buttonTextStyle: { fontSize: 20, fontFamily: 'Avenir-Black' },
        buttonText: "Ok",
        type: "danger"
      })
    }
  }

  changeFloor(val) {
    let selectedValue = val.match(/\d+/)[0];
    if (this.props.floorDetails.length > 0) {
      this.props.floorDetails.forEach((floordata, index) => {
        if (floordata.floorID == selectedValue) {
          this.props.dispatch({ type: ReduxActions.SELECTED_FLOOR, floordata });
        }
      });
    }
  }
  changeField(noofperson) {
    this.props.dispatch({ type: ReduxActions.SET_NOOFPERSON, noofperson })
  }

  render() {
    let tableArray = []
    if (this.props.selectedFloor.length > 0) {
      this.props.selectedFloor[0].tables.map((tableNo) => {

        tableArray.push(
          <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
            <TouchableOpacity onPress={() => this.fillTable(tableNo)} disabled={tableNo.isOccupied}>

              <Card containerStyle={comStyles.xsCardStyle}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'column', justifyContent: 'space-between', width:68 + '%', paddingButtom: 10, marginBottom: 10}}>
                      <Text style={comStyles.tableTxtStyle}>Table: {tableNo.tableID}</Text>
                      <Text style={comStyles.tableTxtStyle}>Capacity: {tableNo.capacity}</Text>
                    </View>
                    <View style={{ flexDirection: 'column', justifyContent: 'space-between', width:30 + '%'}}>
                        <Text style={tableNo.isOccupied ? comStyles.circleOccupied : comStyles.circleFree}></Text>
                    </View>
                </View>
              </Card>
            </TouchableOpacity>
          </View>
        )
      })
    }

    let floors = [];
    this.props.floorDetails.forEach(element => {
      floors.push({
        value: 'Floor ' + element.floorID
      });
    });
    return (

      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='cover' />
        <View style={{ flexDirection: 'row', flex: 2, marginLeft: 10, alignItems: 'baseline' }}>
          <View style={{ flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
            <Dropdown style={{ justifyContent: 'flex-start' }}
              dropdownPosition={0}
              textColor={defaultTxtColor}
              itemColor={dropdownColor}
              baseColor={dropdownColor}
              containerStyle={{ color: dropdownColor }}
              overlayStyle={{ color: dropdownColor }}
              labelFontSize={25}
              fontSize={25}
              onChangeText={this.changeFloor.bind(this)}
              label='Select floor' baseColor={dropdownColor}
              data={floors}/>
          </View>
          <View style={{flexDirection:'column',flex:2,marginLeft:100, justifyContent:'space-between', fontSize: 25}}>
            <TextBoxMaterial tintColor="#039be5" keyboardTextType="numeric" label="No. of guests"   labelFontSize={25}
              fontSize={25} changeField = {this.changeField.bind(this)}/>
          </View>
        </View>
           <View style={{flex: 8, padding: 0 }} >
            <ScrollView>
              <View style={{flex: 1, flexWrap:'wrap',flexDirection: 'row', justifyContent:'flex-start',alignContent:'space-around', paddingTop: 50, marginTop: 50 }} > 
                {tableArray}
              </View>
            </ScrollView>
          </View>
      </View>

    );
  }
}

const stylesFloor = StyleSheet.create({
  
});


const mapStateToProps = (state) => {
  return {
    loginSuccess: state.userReducer.loginDetails.loginSuccess,
    floorDetails: state.floorReducer.floorList,
    selectedFloor: state.floorReducer.selectedFloor,
    selectedtable: state.floorReducer.selectedtable,
    NoOfPerson: state.tableReducer.NoOfPerson
  };
}

export default connect(mapStateToProps, null)(FloorsAndTables)
