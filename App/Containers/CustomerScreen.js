import React from 'react';
import { StyleSheet, Text, Image, View, ActivityIndicator } from 'react-native';
import TextBoxMaterial from "../Components/TextBox";
import { Images } from '../Themes';
import { connect } from 'react-redux';
import styles from './Styles/LaunchScreenStyles';
import {Button,Toast,Content } from 'native-base';
import SagaActions from "../Sagas/ActionTypes/Action";
import ReduxActions from "../Redux/ActionTypes/Action";
import Icon from 'react-native-vector-icons/MaterialIcons';

class Customer extends React.Component {

  constructor() {
    super();
  }

  componentWillMount() {
    if (this.props.loginSuccess === 'searching') { }
  }

  changeField(changedLabel, changedText) {
    if (changedLabel === 'customerID') {
      if (/^[0-9]{1,10}$/.test(changedText)) {
        this.props.dispatch({ type: ReduxActions.SET_MOBILE_NUMBER, mobileNumber: changedText });
        let customer = Object.assign({}, this.props.customer);
        customer[changedLabel] = changedText;
        this.props.dispatch({ type: ReduxActions.NEW_CUSTOMER_DETAILS, customer: customer });
      }
      else {
        Toast.show({
          text: "Not a valid mobile number",
          textStyle: { fontSize: 25, fontFamily: 'Avenir-Black' },
          duration: 2000,
          position: "top",
          buttonTextStyle: { fontSize: 20, fontFamily: 'Avenir-Black' },
          buttonText: "Ok",
          type: "danger"
        });
      }
    }
    else {
      let customer = Object.assign({}, this.props.customer);
      customer[changedLabel] = changedText;
      this.props.dispatch({ type: ReduxActions.NEW_CUSTOMER_DETAILS, customer: customer });
    }
  }

  navigateToFLoor() {
    this.props.navigation.navigate("FloorScreen");
  }
  saveUser() {
    if (this.props.loginSuccess === 'failed') {
      let newCustomer = Object.assign({}, this.props.customer);
      newCustomer.customerID = this.props.PhoneNumber;
      if (!newCustomer.address) newCustomer.address = '';
      if (!newCustomer.city) newCustomer.city = '';
      if (!newCustomer.state) newCustomer.state = '';
      this.props.dispatch({ type: SagaActions.SAVE_USER, newCustomer });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.userRegistered) {
      Toast.show({
        text: "Customer details saved successfully.",
        textStyle: { fontSize: 25, fontFamily: 'Avenir-Black' },
        duration: 2000,
        position: "bottom",
        buttonTextStyle: { fontSize: 20, fontFamily: 'Avenir-Black' },
        buttonText: "Ok",
        type: "success"
      })
      this.props.navigation.navigate('FloorScreen');
    }
  }

  // displayCustomer(){
  //   if (this.props.loginSuccess==='searching'){<ActivityIndicator size="large" color="red" />}
  // else{<View><Content style={{marginLeft:10}}>
  //        {children}         
  //         </Content>
  //         <View style={{flex:1,flexDirection:'row',marginRight:10,alignItems:'flex-end',justifyContent:'flex-end'}}>
  //         {button}</View></View>}}

  render() {
    let inputValidation = true;
    let customerInfoFields = [
      // { label: "Phone Number", value:this.props.loginSuccess==='success'? this.props.customer.customerID.toString():this.props.PhoneNumber.toString(), type: "customerID" },
      { label: "Phone Number", value: this.props.PhoneNumber.toString(), type: "customerID" },
      { label: "Customer Name", value: this.props.customer.customerName, type: "customerName" },
      { label: "EmailID", value: this.props.customer.email, type: "email" },
      { label: "Address", value: this.props.customer.address, type: "address" },
      { label: "City", value: this.props.customer.city, type: "city" },
      { label: "State", value: this.props.customer.state, type: "state" }
    ]

    let children = [];

    customerInfoFields.forEach(element => {
      children.push(
        <TextBoxMaterial
          label={element.label}
          value={element.value}
          isDisabled={this.props.loginSuccess === 'success' ? true : false}
          changeField={this.changeField.bind(this, element.type)}
          type={element.type}
        />
      )
    });
    if (this.props.customer.customerName !== "" && this.props.customer.email !== "") {
      inputValidation = false;
    }
    let button;
    if (this.props.loginSuccess === 'failed') {
      button =
        <Button style={{ height: 50, width: 200, justifyContent: 'center' }} disabled={inputValidation} onPress={this.saveUser.bind(this)}>
          <Icon active name="save" size={24} color="#FAFAFA" />
          <Text style={stylesDrawer.textStyle}>Save</Text>
        </Button>;
    } else {
      button = <Button style={{ height: 50, width: 200, justifyContent: 'center' }} onPress = {this.navigateToFLoor.bind(this)}>
        <Icon active name="navigate-next" size={24} color="#FAFAFA" />
        <Text style={stylesDrawer.textStyle}>Select</Text>
      </Button>
    }

    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='cover' />
        {this.props.loginSuccess === 'searching' && <View style={[stylesDrawer.container, stylesDrawer.horizontal]}>
          <ActivityIndicator size="large" color="red" /></View>}
        {this.props.loginSuccess !== 'searching' &&
          <React.Fragment>
            <Content>
              {children}
            </Content>
            <View style={{ flex: 1, flexDirection: 'row', marginRight: 10, alignItems: 'flex-end', justifyContent: 'flex-end' }}>
              {button}</View></React.Fragment>}
      </View >
    );
  }
}

const stylesDrawer = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    zIndex: 999,
    marginLeft: 10
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  },
  textStyle: {
    fontSize: 24,
    color: 'white',
    fontFamily: 'Avenir-Book'
  }
});

const mapStateToProps = (state) => {
  return {
    customer: state.userReducer.customer,
    PhoneNumber: state.userReducer.loginDetails.PhoneNumber,
    loginSuccess: state.userReducer.loginDetails.loginSuccess,
    userRegistered: state.userReducer.userRegisteredSuccessfully
  };
}
export default connect(mapStateToProps, null)(Customer)
