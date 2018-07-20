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
import ModeSelectionScreen from '../Containers/ModeSelectionComponent';
import MenuItemsScreen from '../Containers/MenuItems';
import CheckoutOrderScreen from "../Containers/CheckoutOrder";
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

const BeforeModeSelectionStack = StackNavigator({
  LaunchScreen: {
    screen: LaunchScreen,
    navigationOptions: ({ navigation }) => ({
      headerStyle: { backgroundColor: 'rgba(30, 30, 29, 0.95)',height:80 },
      headerTitle: 'Customer',
      headerTitleStyle: { alignSelf: 'flex-end', color: 'white', marginBottom: 19,fontWeight: 'bold',
      fontSize: 30 },
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
      headerTitleStyle: { alignSelf: 'flex-end', color: 'white', marginBottom: 14,fontWeight: 'bold',fontSize: 30 },
      headerTintColor: 'white',
    })
  },
  FloorScreen: {
    screen: FloorScreen,
    navigationOptions: ({ navigation }) => ({
      headerStyle: { backgroundColor: 'rgba(30, 30, 29, 0.95)' },
      headerTitle: 'Tables',
      headerTitleStyle: { alignSelf: 'flex-end', color: 'white', marginBottom: 14,fontWeight: 'bold',fontSize: 30 },
      headerTintColor: 'white',
    })
  },
  ModeSelectionScreen: {
    screen: ModeSelectionScreen,
    navigationOptions: ({ navigation }) => ({
      headerStyle: { backgroundColor: 'rgba(30, 30, 29, 0.95)' },
      headerTitle: 'Select Modes',
      headerTitleStyle: { alignSelf: 'flex-end', color: 'white', marginBottom: 14,fontWeight: 'bold',fontSize: 30 },
      headerTintColor: 'white',
    })
  }},{
    initialRouteName: 'LaunchScreen',

  });

  const AfterModeSelectionStack = StackNavigator({
  OrderScreen: {
    screen: OrderScreen,
    navigationOptions: ({ navigation }) => ({
      headerStyle: { backgroundColor: 'rgba(30, 30, 29, 0.95)' },
      headerTitle: 'Order Details',
      headerTitleStyle: { alignSelf: 'flex-end', color: 'white', marginBottom: 14,fontWeight: 'bold',fontSize: 30 },
      headerTintColor: 'white',
    })
  },
  MenuItemsScreen: {
    screen: MenuItemsScreen,
    navigationOptions: ({ navigation }) => ({
      headerStyle: { backgroundColor: 'rgba(30, 30, 29, 0.95)' },
      headerTitle: 'Menu Items',
      headerTitleStyle: { alignSelf: 'flex-end', color: 'white', marginBottom: 14,fontWeight: 'bold',fontSize: 30 },
      headerTintColor: 'white',
    })
  },
  ReviewOrderScreen: {
    screen: ReviewOrderScreen,
    navigationOptions: ({ navigation }) => ({
      headerStyle: { backgroundColor: 'rgba(30, 30, 29, 0.95)' },
      headerTitle: 'Review Order',
      headerTitleStyle: { alignSelf: 'flex-end', color: 'white', marginBottom: 14,fontWeight: 'bold',fontSize: 30 },
      headerTintColor: 'white',
    })
  },
  CheckoutOrderScreen: {
    screen: CheckoutOrderScreen,
    navigationOptions: ({ navigation }) => ({
      headerStyle: { backgroundColor: 'rgba(30, 30, 29, 0.95)' },
      headerTitle: 'Checkout Order',
      headerTitleStyle: { alignSelf: 'flex-end', color: 'white', marginBottom: 14,fontWeight: 'bold',fontSize: 30 },
      headerTintColor: 'white',
    })
  }
});

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
  BeforeModeSelectionStack: { screen: BeforeModeSelectionStack },
  AfterModeSelectionStack: { screen: AfterModeSelectionStack },
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
