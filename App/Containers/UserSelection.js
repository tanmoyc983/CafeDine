import React, { Component } from 'react';
import ImageSlider from 'react-native-image-slider';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { Images } from '../Themes';
import { connect } from 'react-redux'
import AppSettingsScreen from "../Containers/AppSettings";
import Icon from 'react-native-vector-icons/Entypo';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import comStyles, { plusMinusIconColor } from './Styles/CommonStyles';

class UserSelection extends Component {
  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'row', height: 100 + '%',
       width: 100 + '%', justifyContent: 'space-evenly', alignContent: 'center', marginTop: 15 + '%' }}>
        <TouchableOpacity style={{
          width: 300, height: 370, flexDirection: 'column',
          borderWidth: 0.5, borderColor: 'black', backgroundColor: plusMinusIconColor,
          alignContent: 'center', padding: 10, borderRadius: 10, shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.8,
          shadowRadius: 2,
          elevation: 1
        }} onPress={this.userDashboard.bind(this)}>
          <Icon name='users' style={{ fontSize: 300, color: '#FFFFFF', borderWidth: 0.5, borderColor: 'black', }}></Icon>
          <View style={{ justifyContent: 'center', alignContent: 'center', width: 100 + '%' }}>
            <Text style={comStyles.whiteTxtStyle}>Use as a User</Text></View>
        </TouchableOpacity>
        <TouchableOpacity style={{
          width: 300, height: 370, flexDirection: 'column', borderWidth: 0.5,
          borderColor: 'black', backgroundColor: plusMinusIconColor,
          alignContent: 'center', padding: 10, borderRadius: 10,
          shadowColor: '#000',
          shadowOffset: { width: 2, height: 2 },
          shadowOpacity: 1,
          shadowRadius: 2,
          elevation: 1
        }} onPress={this.captianDashboard.bind(this)}>
          <Icon1 name='account-settings-variant' style={{ fontSize: 300, color: '#FFFFFF', borderWidth: 0.5, borderColor: 'black', }}></Icon1>
          <View style={{ justifyContent: 'center', alignContent: 'center' }}>
            <Text style={comStyles.whiteTxtStyle}>Use as a Captain</Text>
          </View>
        </TouchableOpacity>
        {/* <View style={{width: 400,height: 400, flexDirection: 'column',backgroundImage: 'url(Images.onestaSelected.png)'}}></View> */}
      </View>
    );
    // setTimeout(this.props.navigation.navigate('ExistingOrderStack'), 2000);
  }
  captianDashboard() {
    this.props.navigation.navigate("CaptainDashboardScreen");
  }
  userDashboard() {
    this.props.navigation.navigate('BeforeModeSelectionStack');
  }
}

const mapDispatchToProps = (dispatch) => ({
  // startup: () => dispatch(StartupActions.startup())
})

export default connect(null, mapDispatchToProps)(UserSelection)

