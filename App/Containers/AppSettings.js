import React from 'react';
import { StyleSheet, Text, View, Image,AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from "react-redux";
import styles from './Styles/LaunchScreenStyles';
import { Images } from '../Themes';
import {Button,Content } from 'native-base';
import ReduxActions from "../Redux/ActionTypes/Action";
import {NavigationActions } from 'react-navigation';
import TextBoxMaterial from "../Components/TextBox";
import {Toast} from 'native-base';

class AppSettingsComponent extends React.Component {
    constructor() {
        super();
    }

    componentWillMount(){
       this.getUserId();
    }
    async getUserId () {
        try {
          const IPAddress = await AsyncStorage.getItem('IP');
          const Port = await AsyncStorage.getItem('Port');
          this.props.dispatch({type:ReduxActions.SET_IP_ADDRESS,IP:IPAddress});
          this.props.dispatch({type:ReduxActions.SET_PORT,Port:Port});
          return true;
        } catch (error) {
          // Error retrieving data
          console.log(error.message);
          return false;
        }
    }

    changeField(changedText,type) {
        if(type==="ip"){
        if (/^(?=.*[^\.]$)((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.?){4}$/.test(changedText))
        {
         this.props.dispatch({type:ReduxActions.SET_IP_ADDRESS,IP:changedText});
        }
       }
     else if(type==="port"){
        this.props.dispatch({type:ReduxActions.SET_PORT,Port:changedText});
     }
    }

    async saveAppSettings(){
       await AsyncStorage.setItem('IP', this.props.ipAddress);
       await AsyncStorage.setItem('Port', this.props.port);
       Toast.show({
        text: 'IP Address & Port saved successfully',
        textStyle: { fontSize: 25, fontFamily:'Avenir-Black',fontWeight:'bold' },
        duration: 2000,
        buttonTextStyle:{fontSize: 20, fontFamily:'Avenir-Black'},
        buttonText: "Okay",
        type: "success"
        });
        const resetAction = NavigationActions.reset({
            index: 0,
            key: null,
            actions: [
                NavigationActions.navigate({routeName: 'CaptainDashboardScreen'})
            ]
        });
        this.props.navigation.dispatch(resetAction);
    }

    render() {
        console.log(this.props);
        return (
            <View style={styles.mainContainer}>
            <Image source={Images.background} style={styles.backgroundImage} resizeMode='cover' />
            <Content style={{marginLeft:2+'%'}}>
                <TextBoxMaterial
                            label="IP Address"
                            value={this.props.ipAddress}
                            changeField={this.changeField.bind(this)}
                            type="ip"/>
                    <TextBoxMaterial
                        label="Port"
                        value={this.props.port}
                        changeField={this.changeField.bind(this)}
                        type="port"/>        
             </Content>
                <View style={{flex:2,flexDirection:'row',marginRight:2+'%',alignItems:'flex-end',justifyContent:'flex-end'}}>
                 <Button style={{height:50,width:200,justifyContent:'center'}}  onPress={this.saveAppSettings.bind(this)}>
                        <Icon active name="content-save-all" size={24} color="#FAFAFA"/>
                        <Text style={stylesDrawer.textStyle}>Save</Text>                        
                        </Button>
                </View>
            </View>
        )
    }
}

const stylesDrawer = StyleSheet.create({
    textStyle:{
      fontSize:30,
      fontWeight: 'bold',
      fontFamily:'Avenir-Black',
      color:'white'
    }
})

    
const mapStateToProps=(state)=>{
    debugger;
    return {
        ipAddress : state.DashBoardReducer.ipAddress,
        port: state.DashBoardReducer.port
    }
  }
  
  export default connect(mapStateToProps,null)(AppSettingsComponent)