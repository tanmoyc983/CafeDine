import React from 'react';
import { Container,Content, Header, Tab, Tabs, TabHeading, View } from 'native-base';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import TextBoxMaterial from "../Components/TextboxMaterial";
import { connect } from "react-redux";
import Styles from './Styles/LaunchScreenStyles';
import comStyles from './Styles/CommonStyles';
import sha256 from 'crypto-js/sha256';
import SagaActions from "../Sagas/ActionTypes/Action";
import hmacSHA512  from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';
import ReduxActions from "../Redux/ActionTypes/Action";
import Icon from 'react-native-vector-icons/Entypo';

class LoginRegisterTab extends React.Component {
   
  changeField(changedText, type) {
    if (type === "userid") {
        this.props.dispatch({ type: ReduxActions.SETADMIN_USERID, userID: changedText });
    }
    else if (type === "password") {
        this.props.dispatch({ type: ReduxActions.SETADMIN_PASSWORD, adminPassword: changedText });
    }
}
onButtonPress() {  
    this.props.navigation.navigate("UserSelectionStack");
}
onRegister(){
    this.props.navigation.navigate("LoginStack");
}

changeCaptainId(input){
  if(this.props.captainDetails.MobileNumber.length === 10 && /^[0-9]{1,10}$/.test(this.props.captainDetails.MobileNumber)){
      this.props.dispatch({type: ReduxActions.SET_COLOR_ID, color: "#039be5"})  
  }
  let tempObj=Object.assign({},this.props.captainDetails);
  tempObj.MobileNumber=input;
  this.props.dispatch({type: ReduxActions.SET_LOGIN_ID, tempObj: tempObj})
}
changeName(input){
  let tempObj=Object.assign({},this.props.captainDetails);
  tempObj.Name=input;
  this.props.dispatch({type: ReduxActions.SET_LOGIN_ID, tempObj: tempObj})
}
registerCaptain(){
  if(this.props.captainDetails.MobileNumber.length === 10 && /^[0-9]{1,10}$/.test(this.props.captainDetails.MobileNumber)){
      if(this.props.captainDetails.Name.length>0){
          if(this.props.captainDetails.Password.length>=8){
              if(this.props.confPass===this.props.captainDetails.Password){
                debugger;
                  let tempObj=Object.assign({},this.props.captainDetails);
                  tempObj.Password=Base64.stringify(hmacSHA512(sha256(tempObj.Password), "thanos"));
                  this.props.dispatch({type: SagaActions.CREATE_CAPTAIN, captainDetails: tempObj})
              }else{this.props.dispatch({type:ReduxActions.SET_COLOR_CONFPASS, isCorrect: false})}
          }else{this.props.dispatch({type:ReduxActions.SET_COLOR_PASS, isCorrect: false})}
      }else{this.props.dispatch({type:ReduxActions.SET_COLOR_NAME, isCorrect: false})}
  }else{this.props.dispatch({type:ReduxActions.SET_COLOR_ID, isCorrect: false})}  
}

changePassword(input){
  let tempObj=Object.assign({},this.props.captainDetails);
  tempObj.Password=input;
  this.props.dispatch({type: ReduxActions.SET_LOGIN_ID, tempObj: tempObj})
}
changeConfirmPassword(input){
  this.props.dispatch({type:ReduxActions.SET_CONFIRM_PASS, input: input })
}
  render() {
    if(this.props.captainDetails.MobileNumber.length === 10 && /^[0-9]{1,10}$/.test(this.props.captainDetails.MobileNumber)){
      captainIdColor="#039be5";
  }
  else if(this.props.captainDetails.MobileNumber.length ===0){
      captainIdColor="#039be5";
  }
  else{
      captainIdColor='#D50000';
  }
  if(this.props.captainDetails.Password.length===0 || this.props.captainDetails.Password.length>=8){
      passColor="#039be5";
  }
  else{
      passColor="#D50000";
  }
  if (this.props.confPass.length===0 || this.props.captainDetails.Password===this.props.confPass){
      confPassColor="#039be5";
  }
  else{
      confPassColor="#D50000";
  }

    return (
      <Container>
        <Header hasTabs/>
        <Tabs>
          <Tab heading={ <TabHeading><Icon name="login" size={30} style={{color:comStyles.customerIconColor}} /><Text style={comStyles.whiteTxtStyle}>Login</Text></TabHeading>}>
          <Container>
                <View style={Styles.mainContainer}>
                    <Content style={{ marginLeft: 2 + '%', marginRight: 2 + '%' }}>
                    <TextBoxMaterial tintColor="#039be5"
                            label="User ID"
                            value={this.props.userID}
                            changeField={this.changeField.bind(this)}
                            type="userid" />
                        <TextBoxMaterial tintColor="#039be5"
                            label="Password"
                            value={this.props.adminPassword}
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
          <Tab  heading={ <TabHeading><Icon name="add-user" size={30} style={{color:comStyles.customerIconColor}} /><Text style={comStyles.whiteTxtStyle}>Register</Text></TabHeading>}>
          <Container>
           <Content style={{ marginLeft: 2 + '%', marginRight: 2 + '%' }}>   
              <TextBoxMaterial label="Mobile Number" tintColor={captainIdColor} baseColor={this.props.captainIdValid?"#039be5":"#D50000"} keyboardTextType="numeric"  value= {this.props.captainDetails.MobileNumber} changeField = {this.changeCaptainId.bind(this)} />
              <TextBoxMaterial label="Name" tintColor={"#039be5"} baseColor={this.props.nameValid?"#039be5":"#D50000"}keyboardTextType="default" value= {this.props.captainDetails.Name} changeField = {this.changeName.bind(this)} />
              <TextBoxMaterial label="Password" tintColor={this.props.passValid?passColor:"#D50000"} baseColor={this.props.passValid?passColor:"#D50000"} value= {this.props.captainDetails.Password} changeField = {this.changePassword.bind(this)}  secureTextEntry={true}/>
              <TextBoxMaterial label="Confirm Password" tintColor={this.props.confPassValid?confPassColor:"#D50000"} baseColor={this.props.confPassValid?confPassColor:"#D50000"} value= {this.props.captainDetails} changeField = {this.changeConfirmPassword.bind(this)} secureTextEntry={true}/>
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
    userID: state.DashBoardReducer.userID,
    adminPassword: state.DashBoardReducer.adminPassword,
    captainDetails: state.loginReducer.captainDetails,
    confPass:state.loginReducer.confPass,
    captainIdValid:state.loginReducer.captainIdValid,
    nameValid:state.loginReducer.nameValid,
    passValid:state.loginReducer.passValid,
    confPassValid:state.loginReducer.confPassValid
  }
}
export default connect(mapStateToProps, null)(LoginRegisterTab)
//export default LoginRegisterTab;