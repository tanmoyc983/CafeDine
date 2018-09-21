import React, { Component } from 'react';
import { Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Styles from './Styles/LaunchScreenStyles';
import { Card, View, Right, Container, Content, CardItem, Button, Item, Input } from "native-base";
import TextBoxMaterial from "../Components/TextBox";
import ReduxActions from "../Redux/ActionTypes/Action";
import { NavigationActions } from 'react-navigation';
import { SSL_OP_SINGLE_DH_USE } from 'constants';

class LoginPageComponent extends Component {
    constructor() {
        super();
    }
    changeField(changedText, type) {
        if (type === "userid") {
            this.props.dispatch({ type: ReduxActions.SETADMIN_USERID, userID: changedText });
        }
        else if (type === "password") {
            this.props.dispatch({ type: ReduxActions.SETADMIN_PASSWORD, adminPassword: changedText });
        }
    }
    onButtonPress() {  
        this.props.navigation.navigate("AppSettingsScreen");
    }
    onRegister(){
        this.props.navigation.navigate("RegisterScreen");
    }
    render() {
        return (
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
                        <TouchableOpacity>
                            <Text style={styles.buttonText}>Forgot Password?</Text>
                        </TouchableOpacity>
                    </Content>
                </View>
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
const mapStateToProps = (state) => {
    return {
        userID: state.DashBoardReducer.userID,
        adminPassword: state.DashBoardReducer.adminPassword
    };
}

export default connect(mapStateToProps, null)(LoginPageComponent)