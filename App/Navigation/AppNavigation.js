import React from 'react';
import { TouchableHighlight, Button, View, Text, Animated, Easing, StyleSheet } from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import LaunchScreen from '../Containers/LaunchScreen';
import CustomerScreen from '../Containers/CustomerScreen';
import FloorScreen from '../Containers/FloorComponent';
import OrderScreen from '../Containers/OrderScreen';
import ReviewOrderScreen from '../Containers/ReviewOrder';
import TablesScreen from '../Containers/TablesComponent';
import PayBillComponent from '../Containers/PayBillComponent';
import Icon from 'react-native-vector-icons/FontAwesome';

import DrawerComponent from '../Components/DrawerButton';

import styles from './Styles/NavigationStyles';

const noTransitionConfig = () => ({
  transitionSpec: {
    duration: 0,
    timing: Animated.timing,
    easing: Easing.step0
  }
})

const orderStack = StackNavigator({
  LaunchScreen: {
    screen: LaunchScreen,
    navigationOptions: ({ navigation }) => ({
      headerStyle: { backgroundColor: 'rgba(30, 30, 29, 0.95)' },
      headerTitle: 'Customer',
      headerTitleStyle: { alignSelf: 'flex-end', color: 'white', marginBottom: 17 },
      gesturesEnabled: false,
      headerLeft: <Icon name="bars" size={30} color="white" style={{ paddingLeft: 15 }} onPress={() => {
        navigation.navigate('DrawerToggle')
      }} />
    })
  },
  CustomerScreen: {
    screen: CustomerScreen,
    navigationOptions: ({ navigation }) => ({
      headerStyle: { backgroundColor: 'rgba(30, 30, 29, 0.95)' },
      headerTitle: 'Customer Info',
      headerTitleStyle: { alignSelf: 'flex-end', color: 'white', marginBottom: 17 },
      headerTintColor: 'white',
    })
  },
  FloorScreen: {
    screen: FloorScreen,
    navigationOptions: ({ navigation }) => ({
      headerStyle: { backgroundColor: 'rgba(30, 30, 29, 0.95)' },
      headerTitle: 'Tables',
      headerTitleStyle: { alignSelf: 'flex-end', color: 'white', marginBottom: 17 },
      headerTintColor: 'white',
    })
  },
  OrderScreen: {
    screen: OrderScreen,
    navigationOptions: ({ navigation }) => ({
      headerStyle: { backgroundColor: 'rgba(30, 30, 29, 0.95)' },
      headerTitle: 'Menu',
      headerTitleStyle: { alignSelf: 'flex-end', color: 'white', marginBottom: 17 },
      headerTintColor: 'white',
    })
  },
  ReviewOrderScreen: {
    screen: ReviewOrderScreen,
    navigationOptions: ({ navigation }) => ({
      headerStyle: { backgroundColor: 'rgba(30, 30, 29, 0.95)' },
      headerTitle: 'Review Order',
      headerTitleStyle: { alignSelf: 'flex-end', color: 'white', marginBottom: 17 },
      headerTintColor: 'white',
    })
  }
}, {
    initialRouteName: 'LaunchScreen',

  })

const floorStack = StackNavigator({
  TablesScreen: {
    screen: TablesScreen,
    navigationOptions: ({ navigation }) => ({
      headerStyle: { backgroundColor: 'rgba(30, 30, 29, 0.95)' },
      headerTitle: 'Tables',
      headerTitleStyle: { alignSelf: 'flex-end', color: 'white', marginBottom: 17 },
      gesturesEnabled: false,
      headerLeft: <Icon name="bars" size={30} color="white" style={{ paddingLeft: 15 }} onPress={() => {
        navigation.navigate('DrawerToggle')
      }} />
    })
  },
  PayBillComponent: {
    screen: PayBillComponent,
    navigationOptions: ({ navigation }) => ({
      headerStyle: { backgroundColor: 'rgba(30, 30, 29, 0.95)' },
      headerTitle: 'Bill',
      headerTitleStyle: { alignSelf: 'flex-end', color: 'white', marginBottom: 17 },
      headerTintColor: 'white',
    })
  }
}, {
    initialRouteName: 'TablesScreen'
  })

const DrawerStack = DrawerNavigator({
  orderStack: { screen: orderStack },
  floorStack: { screen: floorStack }
}, {
    gesturesEnabled: false,
    contentComponent: (props) => <DrawerComponent {...props} />
  })

const stylesApp = StyleSheet.create({
  headerNav: {
    color: 'white'
  }
})

  export default DrawerStack;
