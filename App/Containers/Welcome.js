import React, { Component } from 'react';
import ImageSlider from 'react-native-image-slider';
import { Text, View, Image, AsyncStorage } from 'react-native';
import { Images } from '../Themes';
import { connect } from 'react-redux';
import AppSettingsScreen from "../Containers/AppSettings";
import { isNullOrUndefined } from "util";
import ReduxActions from "../Redux/ActionTypes/Action";

class WelcomeOnesta extends Component {
  async GetIP_Port() {
    try {
      const IPAddress = await AsyncStorage.getItem('IP');
      const Port = await AsyncStorage.getItem('Port');
      debugger;
      this.props.dispatch({ type: ReduxActions.GET_IP_ADDRESS, IP: isNullOrUndefined(IPAddress) ? "" : IPAddress });
      this.props.dispatch({ type: ReduxActions.GET_PORT, PortAddress: isNullOrUndefined(Port) ? "" : Port });
      // this.findIPStatus();
      return true;
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
      return false;
    }
  }

 
  render() {
   
    return (
      <View style={{ flex: 1, flexDirection: 'column', height: 100 + '%', width: 100 + '%' }}>
        <View style={{
          flex: 1, flexDirection: 'row', marginTop: 15 + '%',
          justifyContent: 'center',
          alignSelf: 'center',
        }}>
          <Image source={Images.onestaSelected}
            style={{
              width: 500, height: 300, flex: 1,
              position: 'absolute',
              borderBottomWidth: 2,
              borderColor: 'black',
              backgroundColor: '#EEEEEE'
            }}
          />
        </View>
        <View style={{
          flex: 1, flexDirection: 'row', justifyContent: 'center',
          alignContent: 'center', marginTop: 10 + '%',
        }}>
          <Text style={{ fontSize: 25, color: '#232020', fontWeight: 'bold', fontFamily: 'GujaratiSangamMN-Bold' }}>Welcome to Onesta</Text>
        </View>
      </View>
    );
      
   }
  //  findIPStatus() {
  //    debugger;
  //    // this.GetIP_Port();
    

  //   // if (this.GetIP_Port() === true) {
      
  //   // } else {
  //   //   this.props.navigation.navigate('AppSettingsStack');
  //   // }
  //  }
   componentWillMount() {
    this.GetIP_Port();
    if(this.props.ipAddress && this.props.port) {
      this.props.navigation.navigate('LoginStack');
    } else{
      this.props.navigation.navigate('AppSettingsStack');
    }
    // this.timerID = setTimeout(
    //   () => this.GetIP_Port(),
    //   1000
    // );
  }
  componentWillUnmount() {
   
  }
}
const mapStateToProps = (state) => ({
  // startup: () => dispatch(StartupActions.startup())
  ipAddress: state.DashBoardReducer.getipAddress,
  port: state.DashBoardReducer.getport
})

export default connect(mapStateToProps, null)(WelcomeOnesta)

