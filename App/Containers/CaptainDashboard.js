import React, { Component } from "react";
import { Card, CardItem, Body,Icon,Right } from "native-base";
import { ScrollView,Text, Image, View, TouchableOpacity, StyleSheet } from 'react-native'
import styles from './Styles/LaunchScreenStyles';
import { Images } from '../Themes';

export default class CaptainDashboardComponent extends Component {
  render() {
    return (
        <View style={styles.mainContainer}>
        <View style={stylesDrawer.viewStyle}>
            <Text style={stylesDrawer.textStyle}>Dashboard</Text>
        </View>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='cover' />
      <Card>
      <CardItem header bordered>
        <Text  style= {styles.sectionText}>Order</Text>
      </CardItem>
      <CardItem button bordered style={{cursor:'pointer'}} onPress={() =>this.props.navigation.navigate('LaunchScreen')}>
        <Icon active name="pizza" style={{  color: "#fbc02d" }} />
          <Text style={styles.subtitle}>
            New Order
          </Text>
          <Right>
                <Icon name="arrow-forward" />
              </Right>
      </CardItem>
      {/* <View style={{ borderWidth: 0.5, borderColor: 'black', margin: 10 }} /> */}
      <CardItem button bordered style={{cursor:'pointer'}} onPress={() => this.props.navigation.navigate('ExistingOrderDashboard')}>
      <Icon active name="nutrition" style={{  color: "#ff9800" }} />
          <Text style={styles.subtitle}>
            Existing Order
          </Text>
          <Right>
                <Icon name="arrow-forward" />
              </Right>
      </CardItem>
      {/* <View style={{ borderWidth: 1 , borderColor: 'black', margin: 10 }} /> */}
      <CardItem header bordered>
        <Text style= {styles.sectionText}>Customer</Text>
      </CardItem>
      <CardItem button bordered style={{cursor:'pointer'}} onPress={() => this.props.navigation.navigate('SearchCustomerScreen')}>
      <Icon active name="person" style={{  color: "#039be5" }} />
          <Text style={styles.subtitle}>
            Add/Modify/Delete
          </Text>
          <Right>
                <Icon name="arrow-forward" />
              </Right>
      </CardItem>
    </Card>
    </View>

    );
  }
}

const stylesDrawer = StyleSheet.create({
viewStyle:{
  backgroundColor: '#039be5',
  justifyContent: 'center',
  alignItems: 'center',
  height:60,
  paddingTop:15,
  elevation:2,
  position: 'relative'
},
textStyle:{
  fontSize:30,
  fontWeight: 'bold',
  fontFamily:'Avenir-Black',
  color:'white'
}
})