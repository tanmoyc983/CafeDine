import React from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import SagaActions from "../Sagas/ActionTypes/Action";
import comStyles, { backgroundColor } from './Styles/CommonStyles';
import Icon from 'react-native-vector-icons/Entypo';
import ReduxActions from "../Redux/ActionTypes/Action";

class PendingOrder extends React.Component {

  constructor(props) {
    super(props);

    this.state = { chosenDate: new Date() };
    this.setDate = this.setDate.bind(this);
  }
  componentWillMount() {
    this.props.dispatch({ type: SagaActions.GET_TABLE_DETAILS })
  }
  setDate(newDate) {
    this.setState({ chosenDate: newDate });
  }

  navigateToFLoor() {
    this.props.navigation.navigate("FloorScreen");
  }

  OrderDetails(selectedTable){
    let visible=false;
    this.props.dispatch({ type: ReduxActions.SHOW_ALERT, visible: visible });
    this.props.dispatch({type:ReduxActions.GET_ORDER_DETAILS_FOR_CAPTAIN, selectedTable});
    this.props.navigation.navigate('CaptainOrderView')
  }

  render() {
    let floorsArr = [];
    let orderIDArr = [];
    let counter = 0 ;
    this.props.allTableArray.forEach(floors => {   
      counter = 0;
      floors.tables.forEach(table => {    
          if(table.orderDetails) { 
            counter = 1;
            orderIDArr.push(
              <View style={[comStyles.contextgroundStyle, comStyles.borderStyle]}>
                <View style={{justifyContent: 'flex-start', alignContent: 'flex-start', flexDirection: 'row'}}>
                  <View style={{marginLeft: 10}}>
                    <Text style={comStyles.tableTxtStyle}>tableId: {table.tableID}</Text>
                  </View>
                  <View style={{marginLeft: 10}}>
                    <Text style={comStyles.tableTxtStyle}>OrderId: {table.orderDetails.orderID}</Text>
                  </View>
                  <View style={{marginLeft: 10}}>
                    <Text style={comStyles.tableTxtStyle}>Customer: {table.orderDetails.customer.customerName}</Text>
                  </View>
                </View>
                <View style={{justifyContent: 'flex-end', alignContent: 'flex-end', flexDirection: 'row'}}>
                  <View>
                  {/* <Button style={comStyles.smButtonStyle} onPress={this.OrderDetails.bind(this,table)}>
                  <Icon active name="arrow-with-circle-right"></Icon> */}
                  <Icon onPress={this.OrderDetails.bind(this,table)} style={{fontSize: 35, color: '#1C227E'}} name="arrow-with-circle-right"></Icon>
                    {/* <Text style={comStyles.whiteTxtStyle}>View Orderdetails</Text>*/}
                     {/* </Button> */}
                  </View>
                </View>
              </View>
            )
          }
      });
      if(counter === 1) {
      floorsArr.push(
        <View >
          <View style={{flex: 1, height: 10}}></View>
          <View style={comStyles.headerBackgroundStyle}>
            <Text style={comStyles.headerWhitetxtStyle}>Floor Number: {floors.floorID}</Text>
          </View>
          <View style={{flex: 1, flexDirection: 'column', backgroundColor: backgroundColor}}>
          { orderIDArr}
          </View>
        </View>
        
        );
      }
        orderIDArr = [];
    });
  
    return (
      <View style={{ flex: 1, padding: 20}}>
        <ScrollView height={80 + '%'}>
          <View style={{ flex: 1, flexWrap: 'wrap', flexDirection: "column", borderColor: '#1A237E', borderWidth: 1 }}>
            {floorsArr}
          </View>
        </ScrollView>
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    allTableArray: state.tableReducer.allTableArray,
  };
}
export default connect(mapStateToProps, null)(PendingOrder)
