import React, { Component } from 'react';
import { Container, Header, Tab, Tabs, TabHeading, Icon, Text, StyleSheet } from 'native-base';
import LoginPageComponent from './LoginTab';
import RegisterScreen from './RegisterScreen';

class LoginRegisterTab extends Component {
    constructor() {
        super();
    }
  render() {
    return (
      <Container>
        <Header hasTabs/>
        <Tabs>
          <Tab heading={ <TabHeading><Text style={{fontSize: 20}}>Login</Text></TabHeading>}>
            <LoginPageComponent />
          </Tab>
          <Tab heading={ <TabHeading><Text style={{fontSize: 20}}>Register</Text></TabHeading>}>
            <RegisterScreen />
          </Tab>
          
        </Tabs>
      </Container>
    );
  }
}
export default LoginRegisterTab;