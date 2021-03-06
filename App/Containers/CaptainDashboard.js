import React, { Component } from "react";
import { Card, CardItem,Right } from "native-base";
import { Text, Image, View, StyleSheet } from 'react-native'
import styles from './Styles/LaunchScreenStyles';
import { Images } from '../Themes';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
      <CardItem button bordered style={{cursor:'pointer'}} onPress={() =>this.props.navigation.navigate('BeforeModeSelectionStack')}>
      <Icon active name="local-dining" size={42} style={{  color: "#fbc02d" }} />
          <Text style={styles.subtitle}>
            New Order
          </Text>
          <Right>
                <Icon active size={42} name="arrow-forward" />
          </Right>
      </CardItem>
      {/* <View style={{ borderWidth: 0.5, borderColor: 'black', margin: 10 }} /> */}
      <CardItem button bordered style={{cursor:'pointer'}} onPress={() => this.props.navigation.navigate('ExistingOrderStack')}>
      <Icon active name="local-grocery-store" size={42} style={{  color: "#ff9800" }} />
          <Text style={styles.subtitle}>
            Existing Order
          </Text>
          <Right>
                <Icon active size={42} name="arrow-forward" />
          </Right>
      </CardItem>
      {/* <View style={{ borderWidth: 1 , borderColor: 'black', margin: 10 }} /> */}
      <CardItem header bordered>
        <Text style= {styles.sectionText}>Customer</Text>
      </CardItem>
      <CardItem button bordered style={{cursor:'pointer'}} onPress={() => this.props.navigation.navigate('CaptainStack')}>
      <Icon active name="person" size={42} style={{  color: "#039be5" }} />
          <Text style={styles.subtitle}>
            Modify
          </Text>
          <Right>
                <Icon active size={42} name="arrow-forward" />
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