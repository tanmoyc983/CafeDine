import React, { Component } from 'react';
import { Text, View, Image, AsyncStorage,Alert } from 'react-native';
import { Images } from '../Themes';
import { connect } from 'react-redux';
import { isNullOrUndefined } from "util";
import ReduxActions from "../Redux/ActionTypes/Action";
import signalr from 'react-native-signalr';
import {Toast} from 'native-base';

class WelcomeOnesta extends Component {

startRealTimeNotification(ipAddress,port){
  if(ipAddress && port) {
    let baseUrl='http://'+ipAddress+':'+ port+'/signalr/hubs';
    //'http://10.31.101.118:8080/signalr/hubs'
    const connection = signalr.hubConnection('http://10.31.101.118:8080/signalr/hubs');
    connection.logging = true;

  const proxy = connection.createHubProxy('PushNotificationHub');
  //receives broadcast messages from a hub function, called "helloApp"    
  proxy.on('OrderPlaced', (response) => {
    this.props.dispatch({ type: ReduxActions.UPDATE_NOTIFICATON_COUNT, count: this.props.notificationCount+1});  
    let currentPage=this.props.nav.routes[this.props.nav.routes.length-1].routes[this.props.nav.routes[this.props.nav.routes.length-1].routes.length-1].routeName;
    let routeNames=['LaunchScreen','CustomerScreen','FloorScreen','ModeSelectionScreen','SearchCustomerScreen',
    'ModifyCustomerScreen','ExistingOrderDashboard','CaptainOrderView','UserSelection'];

    if(routeNames.includes(currentPage)){
      Toast.show({
        text: 'OrderNumber :' + response.OrderNumber +"\t"+"Submitted On"+response.CreatedDateTime,
        textStyle: { fontSize: 25, fontFamily:'Avenir-Black',fontWeight:'bold' },
        duration: 2000,
        buttonTextStyle:{fontSize: 20, fontFamily:'Avenir-Black'},
        buttonText: "Okay",
        type: "success"
    })
  }
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
    //Alert.alert('Failed');
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
    //Alert.alert('SignalR error: ' + errorMessage, detailedError)
  });
}
}


  async GetIP_Port() {
    try {
      const IPAddress = await AsyncStorage.getItem('IP');
      const Port = await AsyncStorage.getItem('Port');
      const tabSettings = await AsyncStorage.getItem('USED_FOR');
      this.props.dispatch({ type: ReduxActions.SET_TAB_SETTINGS, TabSettings: isNullOrUndefined(tabSettings) ? "" : tabSettings });
      this.props.dispatch({ type: ReduxActions.GET_IP_ADDRESS, IP: isNullOrUndefined(IPAddress) ? "" : IPAddress });
      this.props.dispatch({ type: ReduxActions.GET_PORT, PortAddress: isNullOrUndefined(Port) ? "" : Port });      
      return true;
    } 
    catch (error) {
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
  
   componentWillMount() {
    this.GetIP_Port(); 
  }
  componentDidMount(){ 
       this.timerID = setTimeout(      
      () =>{
        if(this.props.ipAddress && this.props.port) {
          this.startRealTimeNotification(this.props.ipAddress, this.props.port);
      this.props.navigation.navigate('LoginStack');
    } else{
      this.props.navigation.navigate('AppSettingsStack');
    }},3000
  )
  }

}
const mapStateToProps = (state) => ({
  nav: state.nav ,
  notificationCount: state.RealtimeReducer.notificatioCount,
  ipAddress: state.DashBoardReducer.getipAddress,
  port: state.DashBoardReducer.getport
})

export default connect(mapStateToProps, null)(WelcomeOnesta)

