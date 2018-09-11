import React, { Component } from "react";
import { Card, CardItem,Right } from "native-base";
import { Text, Image, View, StyleSheet,Alert} from 'react-native'
import styles from './Styles/LaunchScreenStyles';
import { Images } from '../Themes';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import ReduxActions from "../Redux/ActionTypes/Action";
import comStyles from './Styles/CommonStyles';

class CaptainDashboardComponent extends Component {

// componentWillMount(){
//   getIP();
//   getPort();
// }
// async getIP () {
//         try {
//           const IPAddress = await AsyncStorage.getItem('IP');
//           return IPAddress;
//         }
//         catch(ex){}
//       }
//       async getPort () {
//         try {
//       const Port = await AsyncStorage.getItem('Port');
//       return Port;
//     }
//     catch(ex){}
//   }


render() {
    return (
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

    );
  }
}

const mapStateToProps = (state) => {
  return{
    ipAddress : state.DashBoardReducer.ipAddress,
    port: state.DashBoardReducer.port
  };
}
export default connect(mapStateToProps, null)(CaptainDashboardComponent)