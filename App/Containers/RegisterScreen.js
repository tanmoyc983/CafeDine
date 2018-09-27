import React, { Component } from 'react';
import SagaActions from "../Sagas/ActionTypes/Action";
import ReduxActions from "../Redux/ActionTypes/Action";
import { ScrollView,Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Card, View, Right, Container, Content, CardItem, Button, Item, Input } from "native-base";
import Styles from './Styles/LaunchScreenStyles';
import TextBoxMaterial from "../Components/TextboxMaterial";
import { connect } from 'react-redux';
import { KeyboardAvoidingView } from 'react-native';
import { Header } from 'react-navigation';

class RegisterScreen extends Component{
    constructor(){
        super()
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
                        this.props.dispatch({type: SagaActions.CREATE_CAPTAIN, loginId: this.props.captainDetails})
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
    
    render(){
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
        return(
            <Container>
            
            <Content style={{ marginLeft: 2 + '%', marginRight: 2 + '%' }}>    
            
                <TextBoxMaterial tintColor={captainIdColor} baseColor={this.props.captainIdValid?"#039be5":"#D50000"} keyboardTextType="numeric"  value= {this.props.captainDetails.MobileNumber} changeField = {this.changeCaptainId.bind(this)} placeholder='Mobile Number'/>
               
                <TextBoxMaterial tintColor={"#039be5"} baseColor={this.props.nameValid?"#039be5":"#D50000"}keyboardTextType="default" value= {this.props.captainDetails.Name} changeField = {this.changeName.bind(this)} placeholder='Name'/>
                
                
                <TextBoxMaterial tintColor={this.props.passValid?passColor:"#D50000"} baseColor={this.props.passValid?passColor:"#D50000"} value= {this.props.captainDetails.Password} changeField = {this.changePassword.bind(this)} placeholder='Password' secureTextEntry={true}
                />
                
                <TextBoxMaterial tintColor={this.props.confPassValid?confPassColor:"#D50000"} baseColor={this.props.confPassValid?confPassColor:"#D50000"} value= {this.props.captainDetails} changeField = {this.changeConfirmPassword.bind(this)} placeholder='Confirm Password' secureTextEntry={true}/>

                <TouchableOpacity style={styles.buttonContainer}
                onPress={this.registerCaptain.bind(this)}>
                <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
                </Content>
            </Container>
        )
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

const mapStateToProps = (state) =>{
    return{
        captainDetails: state.loginReducer.captainDetails,
        confPass:state.loginReducer.confPass,
        captainIdValid:state.loginReducer.captainIdValid,
        nameValid:state.loginReducer.nameValid,
        passValid:state.loginReducer.passValid,
        confPassValid:state.loginReducer.confPassValid        
    };
}

export default connect(mapStateToProps, null)(RegisterScreen)