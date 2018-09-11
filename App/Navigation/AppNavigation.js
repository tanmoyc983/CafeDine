import {Animated, Easing } from 'react-native';
import { StackNavigator} from 'react-navigation';
import LaunchScreen from '../Containers/LaunchScreen';
import CustomerScreen from '../Containers/CustomerScreen';
import FloorScreen from '../Containers/FloorComponent';
import OrderScreen from '../Containers/OrderScreen';
import ReviewOrderScreen from '../Containers/ReviewOrder';
import ModeSelectionScreen from '../Containers/ModeSelectionComponent';
import MenuItemsScreen from '../Containers/MenuItems';
import CheckoutOrderScreen from "../Containers/CheckoutOrder";
import CaptainDashboardScreen from '../Containers/CaptainDashboard';
import SearchCustomerScreen from '../Containers/SearchCustomerScreen';
import ModifyCustomerScreen from '../Containers/ModifyCustomerScreen';
import ExistingOrderDashboard from '../Containers/ExistingOrderDashboard';
import CaptainOrderView from '../Containers/CaptainOrderView';
import AppSettingsScreen from "../Containers/AppSettings";
import LoginScreen from "../Containers/LoginScreen";
const transitionConfig = () => {
  return {
    transitionSpec: {
      duration: 750,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: sceneProps => {
        const { position, layout, scene, index, scenes } = sceneProps
        const toIndex = index
        const thisSceneIndex = scene.index
        const height = layout.initHeight
        const width = layout.initWidth
  
        const translateX = position.interpolate({
          inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
          outputRange: [width, 0, 0]
        })
  
        // Since we want the card to take the same amount of time
        // to animate downwards no matter if it's 3rd on the stack
        // or 53rd, we interpolate over the entire range from 0 - thisSceneIndex
        const translateY = position.interpolate({
          inputRange: [0, thisSceneIndex],
          outputRange: [height, 0]
        })
  
        const slideFromRight = { transform: [{ translateX }] }
        const slideFromBottom = { transform: [{ translateY }] }
  
        const lastSceneIndex = scenes[scenes.length - 1].index
  
        // Test whether we're skipping back more than one screen
        if (lastSceneIndex - toIndex > 1) {
          // Do not transoform the screen being navigated to
          if (scene.index === toIndex) return
          // Hide all screens in between
          if (scene.index !== lastSceneIndex) return { opacity: 0 }
          // Slide top screen down
          return slideFromBottom
        }
  
        return slideFromRight
      },
  }}

const BeforeModeSelectionStack = StackNavigator({
  LaunchScreen: {
    screen: LaunchScreen,
    navigationOptions: ({ navigation }) => ({
      headerStyle: { backgroundColor: '#3949ab',shadowColor:'#000',
      shadowOffset:{width: 0, height: 3},
      shadowOpacity: 0.3 },
      headerTitle: 'Search Customer',
      headerTitleStyle: { alignSelf: 'flex-end', color: 'white', marginBottom: 14, fontWeight: 'bold', fontSize: 30 },
      headerTintColor: 'white',
      headerLeft: null
})
  },
  CustomerScreen: {
    screen: CustomerScreen,
    navigationOptions: ({ navigation }) => ({
      headerStyle: { backgroundColor: '#3949ab',shadowColor:'#000',
      shadowOffset:{width: 0, height: 3},
      shadowOpacity: 0.3 },
      headerTitle: 'Customer Details',
      headerTitleStyle: { alignSelf: 'flex-end', color: 'white', marginBottom: 14, fontWeight: 'bold', fontSize: 30 },
      headerTintColor: 'white'
})
  },
  FloorScreen: {
    screen: FloorScreen,
    navigationOptions: ({ navigation }) => ({
      headerStyle: { backgroundColor: '#3949ab',shadowColor:'#000',
      shadowOffset:{width: 0, height: 3},
      shadowOpacity: 0.3 },
      headerTitle: 'Floors',
      headerTitleStyle: { alignSelf: 'flex-end', color: 'white', marginBottom: 14, fontWeight: 'bold', fontSize: 30 },
      headerTintColor: 'white',
    })
  },
  ModeSelectionScreen: {
    screen: ModeSelectionScreen,
    navigationOptions: ({ navigation }) => ({
      headerStyle: { backgroundColor: '#3949ab',shadowColor:'#000',
      shadowOffset:{width: 0, height: 3},
      shadowOpacity: 0.3 },
      headerTitle: 'Select Modes',
      headerTitleStyle: { alignSelf: 'flex-end', color: 'white', marginBottom: 14, fontWeight: 'bold', fontSize: 30 },
      headerTintColor: 'white',
    })
  }
}, {
    initialRouteName: 'LaunchScreen',
    transitionConfig
  });

const AfterModeSelectionStack = StackNavigator({
  OrderScreen: {
    screen: OrderScreen,
    navigationOptions: ({ navigation }) => ({
      headerStyle: { backgroundColor: '#3949ab',shadowColor:'#000',
      shadowOffset:{width: 0, height: 3},
      shadowOpacity: 0.3 },
      headerTitle: 'Order Details',
      headerTitleStyle: { alignSelf: 'flex-end', color: 'white', marginBottom: 14, fontWeight: 'bold', fontSize: 30 },
      headerTintColor: 'white',
      headerLeft: null
    })
  },
  MenuItemsScreen: {
    screen: MenuItemsScreen,
    navigationOptions: ({ navigation }) => ({
      headerStyle: { backgroundColor: '#3949ab',shadowColor:'#000',
      shadowOffset:{width: 0, height: 3},
      shadowOpacity: 0.3 },
      headerTitle: 'Menu Items',
      headerTitleStyle: { alignSelf: 'flex-end', color: 'white', marginBottom: 14, fontWeight: 'bold', fontSize: 30 },
      headerTintColor: 'white',
    })
  },
  ReviewOrderScreen: {
    screen: ReviewOrderScreen,
    navigationOptions: ({ navigation }) => ({
      headerStyle: { backgroundColor: '#3949ab',shadowColor:'#000',
      shadowOffset:{width: 0, height: 3},
      shadowOpacity: 0.3 },
      headerTitle: 'Review Order',
      headerTitleStyle: { alignSelf: 'flex-end', color: 'white', marginBottom: 14, fontWeight: 'bold', fontSize: 30 },
      headerTintColor: 'white',
    })
  },
  CheckoutOrderScreen: {
    screen: CheckoutOrderScreen,
    navigationOptions: ({ navigation }) => ({
      headerStyle: { backgroundColor: '#3949ab',shadowColor:'#000',
      shadowOffset:{width: 0, height: 3},
      shadowOpacity: 0.3 },
      headerTitle: 'Checkout Order',
      headerTitleStyle: { alignSelf: 'flex-end', color: 'white', marginBottom: 14, fontWeight: 'bold', fontSize: 30 },
      headerTintColor: 'white'
    })
  }
},{initialRouteName: 'OrderScreen',transitionConfig});

const CaptainStack = StackNavigator({
  SearchCustomerScreen: {
    screen: SearchCustomerScreen,
    navigationOptions: ({ navigation }) => ({
      headerStyle: { backgroundColor: '#3949ab',shadowColor:'#000',
      shadowOffset:{width: 0, height: 3},
      shadowOpacity: 0.3 },
      headerTitle: 'Search Customer',
      headerTitleStyle: { alignSelf: 'flex-end', color: 'white', marginBottom: 14, fontWeight: 'bold', fontSize: 30 },
      headerTintColor: 'white',
      headerLeft: null
    })
  },
      ModifyCustomerScreen: {
      screen: ModifyCustomerScreen,
      navigationOptions: ({ navigation }) => ({
        headerStyle: { backgroundColor: '#3949ab',shadowColor:'#000',
        shadowOffset:{width: 0, height: 3},
        shadowOpacity: 0.3 },
        headerTitle: 'Modify Customer',
        headerTitleStyle: { alignSelf: 'flex-end', color: 'white', marginBottom: 14, fontWeight: 'bold', fontSize: 30 },
        headerTintColor: 'white'
      })
    }
  },
  {
    initialRouteName: 'SearchCustomerScreen',
    transitionConfig
  });

  const ExistingOrderStack= StackNavigator({
    ExistingOrderDashboard:{
      screen: ExistingOrderDashboard,
      navigationOptions: ({ navigation }) => ({
        headerStyle: { backgroundColor: '#3949ab',shadowColor:'#000',
        shadowOffset:{width: 0, height: 3},
        shadowOpacity: 0.3 },
        headerTitle: 'Existing Order Details',
        headerTitleStyle: { alignSelf: 'flex-end', color: 'white', marginBottom: 14, fontWeight: 'bold', fontSize: 30 },
        headerTintColor: 'white',
        headerLeft: null
      })
    },
    CaptainOrderView:{
      screen: CaptainOrderView,
      navigationOptions: ({ navigation }) => ({
        headerStyle: { backgroundColor: '#3949ab',shadowColor:'#000',
        shadowOffset:{width: 0, height: 3},
        shadowOpacity: 0.3 },
        headerTitle: 'Order Details',
        headerTitleStyle: { alignSelf: 'flex-end', color: 'white', marginBottom: 14, fontWeight: 'bold', fontSize: 30 },
        headerTintColor: 'white',
      })
    }},
    {
      initialRouteName: 'ExistingOrderDashboard',
      transitionConfig
    }
  );

  const LoginStack= StackNavigator({
    LoginScreen: {
      screen: LoginScreen,
      navigationOptions: ({ navigation }) => ({
        headerStyle: { backgroundColor: '#3949ab',shadowColor:'#000',
        shadowOffset:{width: 0, height: 3},
        shadowOpacity: 0.3 },
        headerTitle: 'Log in',
        headerTitleStyle: { alignSelf: 'flex-end', color: 'white', marginBottom: 14, fontWeight: 'bold', fontSize: 30 },
        headerTintColor: 'white',
      })
    },
    AppSettingsScreen:{
      screen: AppSettingsScreen,
      navigationOptions: ({ navigation }) => ({
        headerStyle: { backgroundColor: '#3949ab',shadowColor:'#000',
        shadowOffset:{width: 0, height: 3},
        shadowOpacity: 0.3 },
        headerTitle: 'Set IP address and Port',
        headerTitleStyle: { alignSelf: 'flex-end', color: 'white', marginBottom: 14, fontWeight: 'bold', fontSize: 30 },
        headerTintColor: 'white',
        headerLeft: null
      })
    }
  },{
    initialRouteName: 'LoginScreen',
    transitionConfig
  })

const DrawerStack = StackNavigator({
  CaptainDashboardScreen: {
    screen: CaptainDashboardScreen,
    navigationOptions: ({ navigation }) => ({
            headerStyle: { backgroundColor: '#3949ab',shadowColor:'#000',
            shadowOffset:{width: 0, height: 3},
            shadowOpacity: 0.3 },
            headerTitle: 'Dashboard',
            headerTitleStyle: { alignSelf: 'flex-end', color: 'white', marginBottom: 14, fontWeight: 'bold', fontSize: 30 },
        headerTintColor: 'white'
    })
  },
  BeforeModeSelectionStack: { screen: BeforeModeSelectionStack },
  AfterModeSelectionStack: { screen: AfterModeSelectionStack },
  CaptainStack: { screen: CaptainStack },
  ExistingOrderStack: {screen: ExistingOrderStack},
  LoginStack: { screen: LoginStack}
}, {
    initialRouteName: "CaptainDashboardScreen",
    transitionConfig,
    headerMode:'none'
  });
// const DrawerStack = SwitchNavigator({
//     CaptainDashboardScreen: {
//       screen: CaptainDashboardScreen,
//       navigationOptions: ({ navigation }) => ({
//               headerStyle: { backgroundColor: '#3949ab',shadowColor:'#000',
//               shadowOffset:{width: 0, height: 3},
//               shadowOpacity: 0.3 },
//               headerTitle: 'Dashboard',
//               headerTitleStyle: { alignSelf: 'flex-end', color: 'white', marginBottom: 14, fontWeight: 'bold', fontSize: 30 },
//           headerTintColor: 'white'
//       })
//     },
//     BeforeModeSelectionStack: { screen: BeforeModeSelectionStack },
//     AfterModeSelectionStack: { screen: AfterModeSelectionStack },
//     CaptainStack: { screen: CaptainStack },
//     ExistingOrderStack: {screen: ExistingOrderStack}
//   }, {
//       initialRouteName: "CaptainDashboardScreen",
//       transitionConfig,
//       headerMode:'none'
//     });

export default DrawerStack;
