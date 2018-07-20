import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity, View, Image, StyleSheet, FlatList } from 'react-native';
import styles from './Styles/DrawerButtonStyles';
import ExamplesRegistry from '../Services/ExamplesRegistry';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { clearData } from '../Utilities/Utility';

class DrawerButton extends Component {
  constructor(){
    super();

    this.state = {
      list: [{key: 'Customer', icon: 'person', screen: 'BeforeModeSelectionStack'}, {key: 'Floors', icon: 'restaurant', screen: 'TablesScreen'}]
    }
  }

  render () {
    return (
      <View style={{flex:1, flexDirection: 'column'}}>
        <View style={stylesDrawer.container}>
          <Image source={require('../Images/onesta.png')} style={stylesDrawer.stretch} />
        </View>
        <FlatList style={stylesDrawer.menuList}
          data={this.state.list}
          renderItem={({item}) =>  
            <TouchableOpacity onPress={() => {
              clearData();
              this.props.navigation.navigate(item.screen);}} style={stylesDrawer.opacityStyle}>
              <Icon name={item.icon} size= {25} color="white" />
              <Text style={stylesDrawer.textStyle}>{item.key}</Text>
            </TouchableOpacity>}
        />
       
      </View>
    )
  }
}

const stylesDrawer = StyleSheet.create({
  stretch: {
    width: 260, 
    height: 150,
    borderBottomWidth: 2, 
    backgroundColor: 'rgba(30, 30, 29, 0.95)', 
    borderColor: 'black',
    marginVertical: 20,
    flex: 1
  },
  container:{
    height:200, 
    width:300, 
    borderBottomColor: 'black', 
    backgroundColor: 'rgb(68, 68, 68)'
  },
  menuList: {
    backgroundColor: 'rgb(100, 100, 100)',
    flex:1,
    borderBottomWidth: 1
  },
  textStyle:{
    color: 'white',
    backgroundColor: 'rgb(100, 100, 100)',
    marginLeft: 10, 
    fontSize: 20
  },
  opacityStyle:{
    marginTop: 10,
    paddingBottom: 10,
    backgroundColor: 'rgb(100, 100, 100)',
    paddingLeft: 20,
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    
  }
});

export default DrawerButton
