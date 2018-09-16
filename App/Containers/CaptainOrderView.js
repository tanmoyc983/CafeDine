import React from 'react';
import { StyleSheet, View, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Accordion from 'react-native-collapsible/Accordion';
import { connect } from "react-redux";
import { Images } from '../Themes';
import styles from './Styles/LaunchScreenStyles';
import { Button, Content, Card, CardItem, Text,H1,H2, H3 } from 'native-base';
import ReduxActions from "../Redux/ActionTypes/Action";
import SagaActions from "../Sagas/ActionTypes/Action";
import OrderMode from "./EditOrder/OrderMode";
import { NavigationActions } from 'react-navigation';
import {Toast} from 'native-base';
import __  from "lodash";
import comStyles, {customerIconColor, borderColor, orderColor, dropdownColor, accountStarIconColor} from './Styles/CommonStyles';
import Icon2 from 'react-native-vector-icons/FontAwesome';

class MenuItemsComponent extends React.Component {
    constructor() {
        super();
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.isCheckedOut || this.props.isOrderApproved) {
        if(this.props.isOrderApproved){
            Toast.show({
                text: "All round for this order has been approved. Redirecting to DashBoard." ,
                textStyle: { fontSize: 25, fontFamily:'Avenir-Black' },
                duration: 4000,
                position: "bottom",
                buttonTextStyle:{fontSize: 20, fontFamily:'Avenir-Black'},
                buttonText: "Ok",
                type: "success"
                });
        }        
        this.props.dispatch({ type: ReduxActions.RESET_FLOOR_DATA });
        this.props.dispatch({ type: ReduxActions.RESET_MODE_DATA });
        this.props.dispatch({ type: ReduxActions.RESET_USER_DATA });
        this.props.dispatch({ type: ReduxActions.RESET_CUSTOMER_DATA });
        this.props.dispatch({ type: ReduxActions.RESET_ORDER_DATA });
        this.props.dispatch({ type: ReduxActions.RESET_TABLE_DATA });
        const resetAction = NavigationActions.reset({
            index: 0,
            key: null,
            actions: [
                NavigationActions.navigate({ routeName: 'CaptainDashboardScreen' })
            ]
        });
        this.props.navigation.dispatch(resetAction);
    }
}

    updateQuantity(subOrderIndex, modeIndex, itemIndex, changeByQuantity) {
        this.props.dispatch({ type: ReduxActions.UPDATE_QUANTITY, subOrderIndex, modeIndex, itemIndex, changeByQuantity });
    }

    approveOrder(subOrderNumber) {
        let orderDetails = Object.assign({}, this.props.tableWithOrderDetails.orderDetails);
        var suborder=[];
        if(orderDetails){
            if(orderDetails.subOrder.length>0){
                suborder.push( orderDetails.subOrder.find((element) => {
                    if(element.subOrderNumber==subOrderNumber){
                        return element;
                    }
                })); 
            }
        }
        orderDetails.subOrder=suborder;
        this.props.dispatch({type: SagaActions.APPROVE_THE_ORDER, approvedOrder: orderDetails});
       
    }

    checkoutOrder() {
        let checkoutOrder;
        if (this.props.tableWithOrderDetails.orderDetails) {
            checkoutOrder = Object.assign({}, this.props.tableWithOrderDetails.orderDetails);
            checkoutOrder.finalCheckout = true;
        }
        this.props.dispatch({ type: SagaActions.CHECKOUT_FINAL_ORDER, checkoutOrder });
    }
    _renderHeader(section, index, isActive) {
        let test = [];
        if (!isActive) {
            test.push(<Icon active name="arrow-up-drop-circle-outline" size={42} style={comStyles.subOrderStyle}  />);
        }
        else if (isActive) {
            test.push(<Icon active name="arrow-down-drop-circle-outline" size={42} style={comStyles.subOrderStyle} />);
        }
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'center', backgroundColor: customerIconColor, marginTop: 5, height: 60, borderWidth: 1, borderColor: borderColor }} >
                <View style={{ flexGrow: 1 }}>
                    <Text style={{ color: comStyles.subOrderStyle.color, marginLeft: 10, fontSize: 30 }}>Round {section.subOrderNumber}</Text>
                </View>
                <View>{test}</View>
            </View>
        );
    }

        isSubOrderApproved(round){
            if(!this.props.isOrderApproved){
                 if(!round.isApproved && this.props.approvedOrders.indexOf(round.subOrderNumber)==-1 ){
                     return true;
                 }
                 else{
                    return false;
                }       
            }
            else{
                return false;
            }
        }

    _renderContent(section) {
        let myOrders = [];
        section.modes.map((item, modeIndex) => {
            myOrders.push(
            <React.Fragment>
            <View style={{flex:6,flexDirection:'row', justifyContent:'flex-start',alignItems:'flex-start'}}>
                <OrderMode mode={item} updateQuantity={this.updateQuantity.bind(this)} suborderNumber={section.subOrderNumber} modeIndex ={modeIndex}/>
            </View>           
            </React.Fragment>);                     
                })
                myOrders.push( <View style={{flex:1,flexDirection:'row', justifyContent:'flex-end',alignItems:'flex-end'}}>
               {this.isSubOrderApproved(section) && 
               <Button onPress={()=>this.approveOrder(section.subOrderNumber)} 
               style={comStyles.smButtonStyle}>
                    <Icon active name="approval" size={25} color= {customerIconColor} />
                    <Text style={comStyles.whiteTxtStyle}>Approve</Text>
                </Button>}
            </View>)           
        return (myOrders);            
    }

    isOrderApproved(orderapproved){
      if(orderapproved){
          return true;
      }
      else{
          if(this.props.isOrderApproved){
              return true;
          }
          return false;
      }
    }

    render() {
        let orderDetails = '';
        if(!__.isEmpty(this.props.tableWithOrderDetails)){
        orderDetails = "Order Number: " + this.props.tableWithOrderDetails.orderDetails.orderID + " Customer Details: " + this.props.tableWithOrderDetails.orderDetails.customer.customerName + " ( " + this.props.tableWithOrderDetails.orderDetails.customer.customerID + " ) ";
        }
        return (
            <View style={styles.mainContainer}>
                <Image source={Images.background} style={styles.backgroundImage} resizeMode='cover' />
                {this.props.tableWithOrderDetails.orderDetails !== undefined && 
                <ScrollView>
                    <Content padder>
                        <Card>
                            <CardItem header bordered>
                                <View style={{flexDirection: 'row', width: 50 + '%'}}>
                                    <Icon active name="bowl" size={30} style={{  color: orderColor[1] }} />
                                    <H3 style={{textAlign:'center', color: dropdownColor}}> Order Number: {this.props.tableWithOrderDetails.orderDetails.orderID}</H3>
                                </View>
                                <View style={{flexDirection: 'row', width: 50 + '%', justifyContent: 'flex-end'}}>
                                    <H3 style={{textAlign:'center', color: dropdownColor}}> Total Price: <Icon2 active name="rupee"  size={20} style={{  color: dropdownColor, marginRight: 10}}/>{this.props.tableWithOrderDetails.orderDetails.totalPrice}</H3>
                                </View>
                            </CardItem>
                            <CardItem footer bordered>
                                <Icon active name="account-star" size={42} style={{  color: accountStarIconColor }} />
                                <H2 style={{textAlign:'center', color: dropdownColor}}> Customer Details: {this.props.tableWithOrderDetails.orderDetails.customer.customerName} ( {this.props.tableWithOrderDetails.orderDetails.customer.customerID} )</H2>
                            </CardItem>
                       </Card>
                    </Content>
                    {/* <H1 style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center' }}>{orderDetails}</H1> */}
                    <Accordion underlayColor={borderColor}
                        sections={this.props.tableWithOrderDetails.orderDetails.subOrder}
                        renderHeader={this._renderHeader.bind(this)}
                        renderContent={this._renderContent.bind(this)} />
                </ScrollView>}

                <View style={{ flex: 1, flexDirection: 'row', marginRight: 10, alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                  {this.isOrderApproved(this.props.tableWithOrderDetails.isApproved) && <Button style={{ height: 50, width: 200, justifyContent: 'center' }} onPress={() => this.checkoutOrder()}>
                        <Icon active name="check-all" size={24} color= {customerIconColor} />
                        <Text style={comStyles.whiteTxtStyle}>Checkout</Text>
                    </Button>}
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        tableWithOrderDetails: state.tableReducer.tableWithOrderDetails,
        orderStatus: state.tableReducer.orderStatus,
        isCheckedOut: state.OrderReducer.isCheckedOut,
        isOrderApproved:state.tableReducer.isOrderApproved,
        approvedOrders: state.tableReducer.approvedOrders
    }
}

export default connect(mapStateToProps, null)(MenuItemsComponent)