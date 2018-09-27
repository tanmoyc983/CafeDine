import React from 'react';
import { StyleSheet, Text, Image, View, ActivityIndicator } from 'react-native';
import TextBoxMaterial from "../Components/TextBox";
import { Images } from '../Themes';
import { connect } from 'react-redux';
import styles from './Styles/LaunchScreenStyles';
import { Button, Toast, Content, DatePicker } from 'native-base';
import SagaActions from "../Sagas/ActionTypes/Action";
import ReduxActions from "../Redux/ActionTypes/Action";
import Icon from 'react-native-vector-icons/MaterialIcons';
import comStyles, { customerIconColor, dropdownColor, defaultTxtColor } from './Styles/CommonStyles';
import { Dropdown } from 'react-native-material-dropdown';
class Customer extends React.Component {

  constructor(props) {
    super(props);

    this.state = { chosenDate: new Date() };
    this.setDate = this.setDate.bind(this);
  }
  setDate(newDate) {
    this.setState({ chosenDate: newDate });
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
      { label: "Gender", value: this.props.customer.gender, type: "gender" },
      { label: "Date of Birth", value: this.props.customer.dob, type: "dob" },
      { label: "Address", value: this.props.customer.address, type: "address" },
      { label: "City", value: this.props.customer.city, type: "city" },
      { label: "State", value: this.props.customer.state, type: "state" }
    ];
    let genderList = [
      { value: 'Male' },
      { value: 'Female' },
      { value: 'Others' }
    ];

    let children = [];

    customerInfoFields.forEach(element => {
      if (element.label == 'Gender') {
        children.push(
          // <TextBoxMaterial
          //   label={element.label}
          //   value={element.value}
          //   isDisabled={this.props.loginSuccess === 'success' ? true : false}
          //   changeField={this.changeField.bind(this, element.type)}
          //   type={element.type}
          // />
          <View style={{ flex: 1, flexDirection: 'row', padding: 5 }}>
            <View style={[comStyles.customerView, comStyles.customerBorderLeft]}>
              <TextBoxMaterial style={comStyles.customerTxtStyle} label={element.label} isDisabled='true' />
            </View>
            <View style={[comStyles.customerView, comStyles.customerBorderRight]}>
              <Dropdown style={{ justifyContent: 'flex-start' }}
                dropdownPosition={0}
                textColor={defaultTxtColor}
                itemColor={dropdownColor}
                isDisabled={this.props.loginSuccess === 'success' ? true : false}
                baseColor={dropdownColor}
                containerStyle={{ color: dropdownColor }}
                overlayStyle={{ color: dropdownColor }}
                labelFontSize={25}
                fontSize={25}
                value={element.value}
                type={element.type}
                onChangeText={this.changeField.bind(this, element.type)}
                baseColor={dropdownColor}
                data={genderList} />
            </View>
          </View>
        )

      } else if (element.label == "Date of Birth") {
        children.push(
          <View style={{ flex: 1, flexDirection: 'row', padding: 5 }}>
            <View style={[comStyles.customerView, comStyles.customerBorderLeft]}>
              <TextBoxMaterial style={comStyles.customerTxtStyle} label={element.label} isDisabled='true' />
            </View>
            <View style={[comStyles.customerView, comStyles.customerBorderRight]}>
              <DatePicker style={{flex: 1, justifyContent: 'flex-start' }}
                minimumDate={new Date(1900, 1, 1)}
                maximumDate={new Date()}
                locale={"en"}
                placeHolderText="DD/MM/YYYY"
                timeZoneOffsetInMinutes={undefined}
                modalTransparent={false}
                animationType={"fade"}
                androidMode={"default"}
                // placeHolderIcon={<Icon active name="save" size={24} color={customerIconColor} />}
                textStyle={{ color: defaultTxtColor, fontSize: 25,  marginTop: 30, marginLeft: -10, paddingLeft: -10 }}
                placeHolderTextStyle={{ color: "#d3d3d3", fontSize: 25, marginTop: 30, marginLeft: -10, paddingLeft: -10  }}
                onDateChange={this.setDate}
                labelFontSize={25}
                fontSize={25}
                type={element.type}
                isDisabled={this.props.loginSuccess === 'success' ? true : false}
              />
              {/* <Text>
                Date: {this.state.chosenDate.toString().substr(4, 12)}
              </Text> */}
            </View>
          </View>
        )
      }
      else {
        children.push(
          // <TextBoxMaterial
          //   label={element.label}
          //   value={element.value}
          //   isDisabled={this.props.loginSuccess === 'success' ? true : false}
          //   changeField={this.changeField.bind(this, element.type)}
          //   type={element.type}
          // />
          <View style={{ flex: 1, flexDirection: 'row', padding: 5 }}>
            <View style={[comStyles.customerView, comStyles.customerBorderLeft]}>
              <TextBoxMaterial style={comStyles.customerTxtStyle} label={element.label} isDisabled='true' />
            </View>
            <View style={[comStyles.customerView, comStyles.customerBorderRight]}>
              <TextBoxMaterial style={comStyles.customerTxtStyle} tintColor='#EEEEEE' value={element.value} isDisabled={this.props.loginSuccess === 'success' ? true : false}
                changeField={this.changeField.bind(this, element.type)} type={element.type} />
            </View>
          </View>
        )
      }
    });
    if (this.props.customer.customerName !== "" && this.props.PhoneNumber !== "" && this.props.gender !== "" && this.props.dob !== "") {
      inputValidation = false;
    }
    let button;
    if (this.props.loginSuccess === 'failed') {
      button =
        <Button style={comStyles.smButtonStyle} disabled={inputValidation} onPress={this.saveUser.bind(this)}>
          <Icon active name="save" size={24} color={customerIconColor} />
          <Text style={comStyles.whiteTxtStyle}>Save</Text>
        </Button>;
    } else {
      button = <Button style={comStyles.smButtonStyle} onPress={this.navigateToFLoor.bind(this)}>
        <Icon active name="navigate-next" size={24} color={customerIconColor} />
        <Text style={comStyles.whiteTxtStyle}>Select</Text>
      </Button>
    }

    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='cover' />
        {this.props.loginSuccess === 'searching' && <View style={[comStyles.rowContainer, comStyles.horizontal]}>
          <ActivityIndicator size="large" color="red" /></View>}
        {this.props.loginSuccess !== 'searching' &&
          <React.Fragment>
            <Content style={{ paddingBottom: 5 }}>
              {children}
            </Content>
            <View style={comStyles.flexEnd}>
              {button}</View></React.Fragment>}
      </View >
    );
  }
}


const mapStateToProps = (state) => {
  return {
    customer: state.userReducer.customer,
    PhoneNumber: state.userReducer.loginDetails.PhoneNumber,
    loginSuccess: state.userReducer.loginDetails.loginSuccess,
    userRegistered: state.userReducer.userRegisteredSuccessfully
  };
}
export default connect(mapStateToProps, null)(Customer)
