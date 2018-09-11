import React, { Component } from "react";
import { Card, CardItem, Right } from "native-base";
import { Text, Image, View, StyleSheet, Alert, AsyncStorage } from 'react-native'
import styles from './Styles/LaunchScreenStyles';
import { Images } from '../Themes';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import ReduxActions from "../Redux/ActionTypes/Action";
<<<<<<< HEAD
import comStyles from './Styles/CommonStyles';
=======
import { isNullOrUndefined } from "util";
import { Toast } from 'native-base';
>>>>>>> develop

class CaptainDashboardComponent extends Component {

  // componentWillMount() {
  //   debugger;
  //this.GetIP_Port();
  // AsyncStorage.getItem('IP').then((value) => {
  //   if (isNullOrUndefined(value) && value !== "") {
  //     debugger;
  //     this.props.dispatch({ type: ReduxActions.SET_IP_ADDRESS, IP: isNullOrUndefined(value) ? "" : value });
  //   }
  // });
  // AsyncStorage.getItem('Port').then((value) => {
  //   if (isNullOrUndefined(value) && value !== "") {
  //     debugger;
  //     this.props.dispatch({ type: ReduxActions.SET_PORT, PortAddress: isNullOrUndefined(value) ? "" : value });
  //   }
  // });
  //}

  async GetIP_Port() {
    try {
      debugger;
      const IPAddress = await AsyncStorage.getItem('IP');
      const Port = await AsyncStorage.getItem('Port');
      this.props.dispatch({ type: ReduxActions.GET_IP_ADDRESS, IP: isNullOrUndefined(IPAddress) ? "" : IPAddress });
      this.props.dispatch({ type: ReduxActions.GET_PORT, PortAddress: isNullOrUndefined(Port) ? "" : Port });
      return true;
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
      return false;
    }
  }

  ValidateAPIEndpoint(event, val) {
    if (isNullOrUndefined(this.props.ipAddress) || isNullOrUndefined(this.props.port)
      || this.props.ipAddress === "" || this.props.port === "") {
      Toast.show({
        text: "Please provide ip details before proceeding!",
        textStyle: { fontSize: 25, fontFamily: 'Avenir-Black' },
        duration: 2000,
        position: "bottom",
        buttonTextStyle: { fontSize: 20, fontFamily: 'Avenir-Black' },
        buttonText: "Ok",
        type: "danger"
      });
    } else {
      if (val === "NewUser") {
        this.props.navigation.navigate('BeforeModeSelectionStack');
      }
      else if (val === "ExistingUser") {
        this.props.navigation.navigate('ExistingOrderStack')
      }
      else if (val === "ModifyUser") {
        this.props.navigation.navigate('CaptainStack')
      }
    }
  }


  render() {
    debugger;
    this.GetIP_Port();
    console.log(this.props.ipAddress, this.props.port);
    let CheckIP = '';
    debugger;
    if (this.props.ipAddress === null || this.props.ipAddress === "" || this.props.port === null || this.props.port === "") {
      CheckIP = 'IP Configuration';
    } else {
      CheckIP = 'Change IP';
    }
    return (
<<<<<<< HEAD
        <View style={styles.mainContainer}>
       <View style= {comStyles.headerBackgroundStyle}>
            <Text style={comStyles.headerWhitetxtStyle}>Dashboard</Text>
        </View>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='cover' />
      <Card style={{flex:10}}>
      <CardItem header bordered>
        <Text  style= {styles.sectionText}>Order</Text>
      </CardItem>
      <CardItem button bordered style={{cursor:'pointer'}} onPress={() =>this.props.navigation.navigate('BeforeModeSelectionStack')}>
      <Icon active name="local-dining" size={42} style= {comStyles.localDiningIconStyle} />
      <View style={{width: 80 + '%' }}><Text style={styles.subtitle}>
            New Order
          </Text></View>
          <View style={{width: 10 + '%' }}>
                <Icon active size={42} name="arrow-forward" />
          </View>
      </CardItem>
      {/* <View style={{ borderWidth: 0.5, borderColor: 'black', margin: 10 }} /> */}
      <CardItem button bordered style={{cursor:'pointer'}} onPress={() => this.props.navigation.navigate('ExistingOrderStack')}>
      <Icon active name="local-grocery-store" size={42} style={comStyles.localGroceryStoreIconStyle} />
          <View style={{width: 80 + '%' }}><Text style={styles.subtitle}>
            Existing Order
          </Text></View>
          <View style={{width: 10 + '%' }}>
                <Icon active size={42} name="arrow-forward" />
          </View>
      </CardItem>
      {/* <View style={{ borderWidth: 1 , borderColor: 'black', margin: 10 }} /> */}
      <CardItem header bordered>
        <Text style= {styles.sectionText}>Customer</Text>
      </CardItem>
      <CardItem button bordered style={{cursor:'pointer'}} onPress={() => this.props.navigation.navigate('CaptainStack')}>
      <Icon active name="person" size={42} style={comStyles.personIconStyle } />
      <View style={{width: 80 + '%' }}><Text style={styles.subtitle}>
            Modify
          </Text></View>
          <View style={{width: 10 + '%' }}>
                <Icon active size={42} name="arrow-forward" />
          </View>
      </CardItem>
      <CardItem header bordered>
        <Text style= {styles.sectionText}>Settings</Text>
      </CardItem>
      <CardItem button bordered style={{cursor:'pointer'}} onPress={() => this.props.navigation.navigate('AppSettingStack')}>
      <Icon active name="settings" size={42} style={comStyles.settingIconStyle } />
      <View style={{width: 80 + '%' }}><Text style={styles.subtitle}>
            Set Api Endpoint
          </Text></View>
          <View style={{width: 10 + '%' }}>
                <Icon active size={42} name="arrow-forward" />
                </View>
      </CardItem>
    </Card>
    </View>
=======
      <View style={styles.mainContainer}>
        <View style={stylesDrawer.viewStyle}>
          <Text style={stylesDrawer.textStyle}>Dashboard</Text>
        </View>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='cover' />
        <Card style={{ flex: 10 }}>
          <CardItem header bordered>
            <Text style={styles.sectionText}>Order</Text>
          </CardItem>
          <CardItem button bordered style={{ cursor: 'pointer' }} onPress={(event) => this.ValidateAPIEndpoint(event, "NewUser")}>
            <Icon active name="local-dining" size={42} style={{ color: "#fbc02d" }} />
            <View style={{ width: 80 + '%' }}><Text style={styles.subtitle}>
              New Order
          </Text></View>
            <View style={{ width: 10 + '%' }}>
              <Icon active size={42} name="arrow-forward" />
            </View>
          </CardItem>
          {/* <View style={{ borderWidth: 0.5, borderColor: 'black', margin: 10 }} /> */}
          <CardItem button bordered style={{ cursor: 'pointer' }} onPress={(event) => this.ValidateAPIEndpoint(event, "ExistingUser")}>
            <Icon active name="local-grocery-store" size={42} style={{ color: "#ff9800" }} />
            <View style={{ width: 80 + '%' }}><Text style={styles.subtitle}>
              Existing Order
          </Text></View>
            <View style={{ width: 10 + '%' }}>
              <Icon active size={42} name="arrow-forward" />
            </View>
          </CardItem>
          {/* <View style={{ borderWidth: 1 , borderColor: 'black', margin: 10 }} /> */}
          <CardItem header bordered>
            <Text style={styles.sectionText}>Customer</Text>
          </CardItem>
          <CardItem button bordered style={{ cursor: 'pointer' }} onPress={(event) => this.ValidateAPIEndpoint(event, "ModifyUser")}>
            <Icon active name="person" size={42} style={{ color: "#039be5" }} />
            <View style={{ width: 80 + '%' }}><Text style={styles.subtitle}>
              Modify
          </Text></View>
            <View style={{ width: 10 + '%' }}>
              <Icon active size={42} name="arrow-forward" />
            </View>
          </CardItem>
          <CardItem header bordered>
            <Text style={styles.sectionText}>{CheckIP}</Text>
          </CardItem>
          <CardItem button bordered style={{ cursor: 'pointer' }} onPress={() => this.props.navigation.navigate('LoginStack')}>
            <Icon active name="settings" size={42} style={{ color: "#039be5" }} />
            <View style={{ width: 80 + '%' }}><Text style={styles.subtitle}>
              Log In
                </Text></View>
            <View style={{ width: 10 + '%' }}>
              <Icon active size={42} name="arrow-forward" />
            </View>
          </CardItem>
        </Card>
      </View>
>>>>>>> develop

    );
  }
}

<<<<<<< HEAD
=======
const stylesDrawer = StyleSheet.create({
  viewStyle: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#039be5',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    paddingTop: 15,
    elevation: 2
  },
  textStyle: {
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'Avenir-Black',
    color: 'white'
  }
})

>>>>>>> develop
const mapStateToProps = (state) => {
  return {
    ipAddress: state.DashBoardReducer.getipAddress,
    port: state.DashBoardReducer.getport
  };
}
export default connect(mapStateToProps, null)(CaptainDashboardComponent)