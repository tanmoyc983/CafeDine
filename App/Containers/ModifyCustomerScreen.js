import React, { Component } from 'react';
import { StyleSheet, Text, Alert, Image, View } from 'react-native';
import TextBoxMaterial from "../Components/TextBox";
import { Images } from '../Themes';
import { connect } from 'react-redux';
import styles from './Styles/LaunchScreenStyles';
import SagaActions from "../Sagas/ActionTypes/Action";
import { Button, Icon, Content } from 'native-base';
import ReduxActions from "../Redux/ActionTypes/Action";
import { NavigationActions } from 'react-navigation';
import comStyles , {dropdownColor, defaultTxtColor} from './Styles/CommonStyles';
import { Dropdown } from 'react-native-material-dropdown';

class ModifyCustomerScreen extends Component {
  constructor() {
    super();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.customerModified) {
      this.props.dispatch({ type: ReduxActions.RESET_TABLE_DATA });
      this.props.dispatch({ type: ReduxActions.RESET_FLOOR_DATA });
      this.props.dispatch({ type: ReduxActions.RESET_MODE_DATA });
      this.props.dispatch({ type: ReduxActions.RESET_USER_DATA });
      this.props.dispatch({ type: ReduxActions.RESET_CUSTOMER_DATA });
      this.props.dispatch({ type: ReduxActions.RESET_ORDER_DATA });
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

  changeField(changedLabel, changedText) {
    let customer = {};
    if (Object.keys(customer).length === 0 && customer.constructor === Object) {
      customer = Object.assign({}, this.props.selectedCustomer);
    }
    customer[changedLabel] = changedText
    this.props.dispatch({ type: ReduxActions.EDIT_CUSTOMER, customer })
  }

  saveUser() {
    this.props.dispatch({ type: SagaActions.MODIFY_USER_DETAILS, userData: this.props.selectedCustomer });
    // Toast.show({
    //   text: "Customer details modified successfully.",
    //   textStyle: { fontSize: 25, fontFamily:'Avenir-Black' },
    //   duration: 2000,
    //   position: "top",
    //   buttonTextStyle:{fontSize: 20, fontFamily:'Avenir-Black'},
    //   buttonText: "Ok",
    //   type: "success"
    // });
  }

  deleteUser() {

    Alert.alert('Confirmation', 'Are you sure you want to delete the customer?',
      [{ text: 'No', onPress: () => console.log('Captain did not mean to delete'), style: 'cancel' },
      {
        text: 'Yes', onPress: () => {
          this.props.dispatch({ type: SagaActions.DELETE_USER_DETAILS, userData: this.props.selectedCustomer.customerID })

        }
      }],
      { cancelable: false });
  }

  render() {
    if (this.props.isUserDeleted == true) {
      Alert.alert('Customer deleted !')
      this.props.navigation.navigate('CaptainDashboardScreen')
    }
    let children = [];
    if (this.props.selectedCustomer.customerID) {
      let customerInfoFields = [
        { label: "Phone Number", value: this.props.selectedCustomer.customerID.toString(), type: "customerID" },
        { label: "Customer Name", value: this.props.selectedCustomer.customerName, type: "customerName" },
        { label: "EmailID", value: this.props.selectedCustomer.email, type: "email" },
        { label: "Gender", value: this.props.selectedCustomer.gender, type: "gender" },
        { label: "Address", value: this.props.selectedCustomer.address, type: "address" },
        { label: "City", value: this.props.selectedCustomer.city, type: "city" },
        { label: "State", value: this.props.selectedCustomer.state, type: "state" }
      ];
      let genderList = [{
        value: 'Male',
      }, {
        value: 'Female',
      }, {
        value: 'Others',
      }];


      customerInfoFields.forEach(element => {
        if (element.label !== 'Gender') {
          children.push(
            <TextBoxMaterial
              label={element.label}
              value={element.value}
              isDisabled={element.type === 'customerID' ? true : this.props.deleteCustomer}
              changeField={this.changeField.bind(this, element.type)}
              type={element.type}
              keyboardTextType={element.type === 'customerID' ? 'numeric' : 'default'}
            />
          )
        } else {
          children.push(<Dropdown style={{ justifyContent: 'flex-start' }}
            dropdownPosition={0}
            textColor={defaultTxtColor}
            itemColor={dropdownColor}
            isDisabled={element.type === 'customerID' ? true : this.props.deleteCustomer}
            baseColor={dropdownColor}
            containerStyle={{ color: dropdownColor }}
            overlayStyle={{ color: dropdownColor }}
            labelFontSize={25}
            fontSize={25}
            value={element.value}
            type={element.type}
            onChangeText={this.changeField.bind(this, element.type)}
            label='Select Gender' baseColor={dropdownColor}
            data={genderList} />
        )
        }
      });
    }

    let button;
    if (this.props.editCustomer === true) {

      button = <Button style={comStyles.smButtonStyle} onPress={this.saveUser.bind(this)}>
        <Icon active name="information-circle" />
        <Text style={comStyles.whiteTxtStyle}>Save</Text>
      </Button>;
    }
    else if (this.props.deleteCustomer === true) {
      button = <Button style={comStyles.smButtonStyle} danger onPress={this.deleteUser.bind(this)}>
        <Icon active name="trash" />
        <Text style={comStyles.whiteTxtStyle}>Delete</Text>
      </Button>;
    }

    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='cover' />
        <Content style={{ marginLeft: 10 }}>
          {children}
        </Content>
        <View style={{ flex: 1, flexDirection: 'row', marginRight: 10, alignItems: 'flex-end', justifyContent: 'flex-end' }}>
          {button}</View>
      </View >
    );
  }
}


const mapStateToProps = (state) => {
  return {
    selectedCustomer: state.SearchCustomersReducer.selectedCustomer,
    editCustomer: state.SearchCustomersReducer.EditCustomer,
    deleteCustomer: state.SearchCustomersReducer.DeleteCustomer,
    isUserDeleted: state.SearchCustomersReducer.isUserDeleted,
    customerModified: state.SearchCustomersReducer.customerModified
  };
}
export default connect(mapStateToProps, null)(ModifyCustomerScreen)
