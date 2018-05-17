import React from 'react';
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native';
import { Router, Scene, Drawer } from 'react-native-router-flux';

import CustomerComponent from "./Components/Container/CustomerComponent";
import FloorsAndTables from "./Components/Container/FloorsAndTables";
import DrawerComponent from "./Components/Container/DrawerComponent";
import OrderComponent from "./Components/Container/OrderComponent";
import ReviewOrderComponent from "./Components/Container/ReviewOrderComponent";
import "expo";

const App = () => {

  return (
    <Router>
      <Scene key="root">
        <Scene key="drawer" contentComponent={DrawerComponent} initial drawer={true} drawerPosition="left" hideNavBar drawerWidth={200} drawerLabel="Open">
          <Scene key="main">
            <Scene key="Customer" component={CustomerComponent} title={'Customer'} style={{ paddingTop: 10 }} />
            <Scene key="Floor" component={FloorsAndTables} title={'Floor'} style={{ paddingTop: 10 }} />
            <Scene key="OrderMenu" component={OrderComponent} title={'Order'} style={{ paddingTop: 10 }} />
            {/* <Scene key="ReviewOrder" component={ReviewOrderComponent} title={'Review Order'} style={{ paddingTop: 10 }} /> */}
          </Scene>
        </Scene>
        <Scene key="Customer"
          component={CustomerComponent}
          title="Customer Info"
        />
        <Scene
          key="Floor"
          component={FloorsAndTables}
          title="Floor Schema"
        />
         <Scene key="OrderMenu" component={OrderComponent} title={'Order'} style={{ paddingTop: 10 }} />
         <Scene key="ReviewOrder" component={ReviewOrderComponent} title={'Review Order'} style={{ paddingTop: 10 }} /> 
      </Scene>
    </Router>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;