import React from 'react'
import { BackHandler, Platform,Alert } from 'react-native'
import { addNavigationHelpers,NavigationActions } from 'react-navigation'
import { createReduxBoundAddListener } from 'react-navigation-redux-helpers'
import { connect } from 'react-redux'
import AppNavigation from './AppNavigation'
import signalr from 'react-native-signalr';
import {Toast} from 'native-base';
import ReduxActions from "../Redux/ActionTypes/Action";

class ReduxNavigation extends React.Component {
  componentWillMount () {
    if (Platform.OS === 'ios') return
    BackHandler.addEventListener('hardwareBackPress', () => {
      const { dispatch, nav } = this.props;
      // change to whatever is your first screen, otherwise unpredictable results may occur
      if (nav.routes.length === 1 && (nav.routes[0].routeName === 'CaptainDashboardScreen')) {
          Alert.alert('Exit App','Do you want to exit?',
        [{text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Yes', onPress: () => {BackHandler.exitApp()}}],
        { cancelable: false });
        dispatch({ type: 'Navigation/BACK' })
        return true;
      }
      else if (nav.routes[nav.routes.length-1].routes[nav.routes[nav.routes.length-1].routes.length-1].routeName === 'OrderScreen') {
      return true;
    }
    else{
          // if (shouldCloseApp(nav)) return false
          dispatch({ type: 'Navigation/BACK' })
          return true
    }      
    })
  }
  componentDidMount(){
    const connection = signalr.hubConnection('http://10.31.101.118:8080/signalr/hubs');
    connection.logging = true;

    const proxy = connection.createHubProxy('PushNotificationHub');
    //receives broadcast messages from a hub function, called "helloApp"    
    proxy.on('OrderPlaced', (response) => {
      debugger;
      this.props.dispatch({ type: ReduxActions.UPDATE_NOTIFICATON_COUNT, count: this.props.notificationCount+1});  
      Toast.show({
        text: 'OrderNumber :' + response.OrderNumber +"\t"+"Submitted On"+response.CreatedDateTime,
        textStyle: { fontSize: 25, fontFamily:'Avenir-Black',fontWeight:'bold' },
        duration: 2000,
        buttonTextStyle:{fontSize: 20, fontFamily:'Avenir-Black'},
        buttonText: "Okay",
        type: "success"
     })
      //Alert.alert('OrderNumber :' + response.OrderNumber +"\t"+"Submitted On"+response.CreatedDateTime);
      //Here I could response by calling something else on the server...
    });

    // atempt connection, and handle errors
    connection.start().done(() => {
      //Alert.alert('Now connected, connection ID=' + connection.id);

      // proxy.invoke('helloServer', 'Hello Server, how are you?')
      //   .done((directResponse) => {
      //     console.log('direct-response-from-server', directResponse);
      //   }).fail(() => {
      //     console.warn('Something went wrong when calling server, it might not be up and running?')
      //   });

    }).fail(() => {
      Alert.alert('Failed');
    });

    //connection-handling
    connection.connectionSlow(() => {
      Alert.alert('Onesta currently experiencing difficulties with the connection.')
    });

    connection.error((error) => {
      const errorMessage = error.message;
      let detailedError = '';
      if (error.source && error.source._response) {
        detailedError = error.source._response;
      }
      if (detailedError === 'An SSL error has occurred and a secure connection to the server cannot be made.') {
        Alert.alert('When using react-native-signalr on ios with http remember to enable http in App Transport Security https://github.com/olofd/react-native-signalr/issues/14')
      }
      Alert.alert('SignalR error: ' + errorMessage, detailedError)
    });
    
  }

  componentWillUnmount () {
    if (Platform.OS === 'ios') return
    BackHandler.removeEventListener('hardwareBackPress')
  }

  render () {
    return <AppNavigation navigation={addNavigationHelpers({ dispatch: this.props.dispatch, state: this.props.nav, addListener: createReduxBoundAddListener('root') })} />
  }
}

const mapStateToProps = state => ({ nav: state.nav ,notificationCount: state.RealtimeReducer.notificatioCount})
export default connect(mapStateToProps)(ReduxNavigation)
