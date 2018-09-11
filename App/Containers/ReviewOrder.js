import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TouchableHighlight,Image,ActivityIndicator } from 'react-native';
import { getFullOrder } from "../Utilities/Utility";
import ReviewModes from "./Review/ReviewMode";
import moment from "moment";
import { Card, h1, Header,Badge } from 'react-native-elements';
import Accordion from 'react-native-collapsible/Accordion';
import { Images } from '../Themes';
import { connect } from 'react-redux';
import ReduxActions from "../Redux/ActionTypes/Action";
import SagaActions from "../Sagas/ActionTypes/Action";
import styles from './Styles/LaunchScreenStyles';
import __  from "lodash";
import Icon from 'react-native-vector-icons/FontAwesome';
import comStyles, {dropdownColor, orderColor, customerIconColor} from './Styles/CommonStyles';

class ReviewOrderComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            fullOrder: getFullOrder()
        }
    }
    componentWillMount(){
     this.props.dispatch({type:SagaActions.GET_ORDER_REVIEW_DETAILS,orderID:this.props.OrderID});
    }

    render() {
        let btns = [];
        if(!__.isEmpty(this.props.ReviewOrderDetails))
        {         
        let order=Object.assign({},this.props.ReviewOrderDetails);
        let OrderNumber="OrderNumber:"+order.orderID;                
        order.subOrder.map((item) => { 
            let myOrders = [];  
            let mode = item.modes.map((data) => {
                myOrders.push(<ReviewModes mode={data}/>);
              });
            var submittedTime = moment(item.submittedTime).format('MMM DD h:mm A');
            let roundTitle=' Round: '+ item.subOrderNumber +"   "+submittedTime;
                btns.push(                   
                <Card title={OrderNumber} textStyle={{fontSize:25}}>
                    <Badge value={roundTitle} textStyle={{ color: orderColor[3], fontSize:25 }}/>
                    {myOrders}               
                </Card>
                );
        });
    }
        return (
            <View style={styles.mainContainer}>
                {__.isEmpty(this.props.ReviewOrderDetails) && <View>
                   <ActivityIndicator size="large" color= { orderColor[2] } /></View>}
                <Image source={Images.background} style={styles.backgroundImage} resizeMode='cover' />                
                {!__.isEmpty(this.props.ReviewOrderDetails) && <View style={{flex:1, flexDirection: 'column'}}>
                    <ScrollView>{btns}</ScrollView> 
                    <Badge containerStyle={{ backgroundColor: orderColor[3], height: 40}}>
                        <View style={{ flexDirection: 'row',alignItems: 'baseline',paddingLeft: 20, width: 95 + '%', alignItems:'center', justifyContent:'center' }}>
                            <Text h1 style={{justifyContent:'flex-start', fontWeight: 'bold', fontSize: 25,color: customerIconColor , float: 'left'}}>Total Price: </Text>
                            <Icon name="rupee" style={{justifyContent:'flex-end', fontWeight: 'bold', fontSize: 25, color: customerIconColor, float: 'left'}}>
                                <Text h1 style={comStyles.whiteTxtStyle}> {this.props.ReviewOrderDetails.totalPrice}</Text>
                            </Icon>
                        </View>
                    </Badge>    
                </View>}
            </View>
        )
    }
}


const mapStateToProps=(state)=>{
    return{
        OrderID:state.OrderReducer.OrderID,
        ReviewOrderDetails:state.OrderReducer.ReviewOrderDetails
    }
}    

export default connect(mapStateToProps,null)(ReviewOrderComponent);