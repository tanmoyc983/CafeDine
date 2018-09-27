import React from 'react';
import { Container,Content, Header, Tab, Tabs, TabHeading, View } from 'native-base';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import TextBoxMaterial from "../Components/TextboxMaterial";
import { connect } from "react-redux";
import Styles from './Styles/LaunchScreenStyles';
import comStyles from './Styles/CommonStyles';

class LoginRegisterTab extends React.Component {
   
  changeField(changedText, type) {
    // if (type === "userid") {
    //     this.props.dispatch({ type: ReduxActions.SETADMIN_USERID, userID: changedText });
    // }
    // else if (type === "password") {
    //     this.props.dispatch({ type: ReduxActions.SETADMIN_PASSWORD, adminPassword: changedText });
    // }
}
onButtonPress() {  
    this.props.navigation.navigate("AppSettingsScreen");
}
onRegister(){
    this.props.navigation.navigate("RegisterScreen");
}

changeCaptainId(input){
  // if(this.props.captainDetails.MobileNumber.length === 10 && /^[0-9]{1,10}$/.test(this.props.captainDetails.MobileNumber)){
  //     this.props.dispatch({type: ReduxActions.SET_COLOR_ID, color: "#039be5"})  
  // }
  // let tempObj=Object.assign({},this.props.captainDetails);
  // tempObj.MobileNumber=input;
  // this.props.dispatch({type: ReduxActions.SET_LOGIN_ID, tempObj: tempObj})
}
changeName(input){
  // let tempObj=Object.assign({},this.props.captainDetails);
  // tempObj.Name=input;
  //this.props.dispatch({type: ReduxActions.SET_LOGIN_ID, tempObj: tempObj})
}
registerCaptain(){
  // if(this.props.captainDetails.MobileNumber.length === 10 && /^[0-9]{1,10}$/.test(this.props.captainDetails.MobileNumber)){
  //     if(this.props.captainDetails.Name.length>0){
  //         if(this.props.captainDetails.Password.length>=8){
  //             if(this.props.confPass===this.props.captainDetails.Password){
  //                 this.props.dispatch({type: SagaActions.CREATE_CAPTAIN, loginId: this.props.captainDetails})
  //             }else{this.props.dispatch({type:ReduxActions.SET_COLOR_CONFPASS, isCorrect: false})}
  //         }else{this.props.dispatch({type:ReduxActions.SET_COLOR_PASS, isCorrect: false})}
  //     }else{this.props.dispatch({type:ReduxActions.SET_COLOR_NAME, isCorrect: false})}
  // }else{this.props.dispatch({type:ReduxActions.SET_COLOR_ID, isCorrect: false})}
  
}
changePassword(input){

  let tempObj=Object.assign({},this.props.captainDetails);
  tempObj.Password=input;
  //this.props.dispatch({type: ReduxActions.SET_LOGIN_ID, tempObj: tempObj})
}
changeConfirmPassword(input){
  //this.props.dispatch({type:ReduxActions.SET_CONFIRM_PASS, input: input })
}
  render() {
    return (
      <Container>
        <Header hasTabs/>
        <Tabs>
          <Tab heading={ <TabHeading><Text style={comStyles.whiteTxtStyle}>Login</Text></TabHeading>}>
          <Container>
                <View style={Styles.mainContainer}>
                    <Content style={{ marginLeft: 2 + '%', marginRight: 2 + '%' }}>
                        <TextBoxMaterial tintColor="#039be5"
                            label="User ID"
                            value={'Test'}
                            changeField={this.changeField.bind(this)}
                            type="userid" />
                        <TextBoxMaterial tintColor="#039be5"
                            label="Password"
                            value={'Test'}
                            changeField={this.changeField.bind(this)}
                            type="password" 
                            secureTextEntry={true}/>

                        <TouchableOpacity style={styles.buttonContainer}
                            onPress={this.onButtonPress.bind(this)}>
                            <Text style={styles.buttonText}>LOGIN</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{justifyContent:'center', paddingVertical: 25}}>
                            <Text style={{fontsize:25, textAlign:'center'}}>Forgot Password?</Text>
                        </TouchableOpacity>
                    </Content>
                </View>
            </Container>
          </Tab>
          <Tab heading={ <TabHeading><Text style={comStyles.whiteTxtStyle}>Register</Text></TabHeading>}>
          <Container>            
            <Content style={{ marginLeft: 2 + '%', marginRight: 2 + '%' }}>               
                <TextBoxMaterial tintColor={"#039be5"} baseColor={"#039be5"} label="User ID" keyboardTextType="numeric"  value= {'Test'} changeField = {this.changeCaptainId.bind(this)} placeholder='Mobile Number'/>
                <TextBoxMaterial tintColor={"#039be5"} baseColor={"#039be5"} label="User Name"keyboardTextType="default" value= {'Test'} changeField = {this.changeName.bind(this)} placeholder='Name'/>
                <TextBoxMaterial tintColor={"#D50000"} baseColor={"#D50000"} label="Password" value= {'Test'} changeField = {this.changePassword.bind(this)} placeholder='Password' secureTextEntry={true}/>                
                <TextBoxMaterial tintColor={"#D50000"} baseColor={"#D50000"} label="Confirm Password" value= {'Test'} changeField = {this.changeConfirmPassword.bind(this)} placeholder='Confirm Password' secureTextEntry={true}/>
                <TouchableOpacity style={styles.buttonContainer}
                onPress={this.registerCaptain.bind(this)}>
                <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
                </Content>
            </Container>
          </Tab>
          
        </Tabs>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      padding: 20
  },
  input: {
      height: 40,
      backgroundColor: 'rgba(225,225,225,0.2)',
      marginBottom: 10,
      padding: 10,
      color: '#fff'
  },
  buttonContainer: {
      backgroundColor: '#2980b6',
      paddingVertical: 15
  },
  buttonText: {
      color: '#fff',
      textAlign: 'center',
      fontWeight: '700'
  }
})

const mapStateToProps = (state) => {
  return {
  }
}
export default connect(mapStateToProps, null)(LoginRegisterTab)
//export default LoginRegisterTab;