import React from 'react';
import { Button } from 'native-base';
import { Text, TouchableOpacity } from 'react-native';
import { View } from 'react-native-animatable';
// import Menu, { MenuContext, MenuOptions, MenuOption, MenuTrigger } from 'react-native-menu';
import { ouchableOpacity } from 'react-native';
import comStyles, { backgroundColor } from '../Containers/Styles/CommonStyles';
import Modal from "react-native-modal";
import ReduxActions from "../Redux/ActionTypes/Action";
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Entypo';
import Icon1 from 'react-native-vector-icons/Ionicons';

class MenuDrop extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Modal backdropColor="" backdropOpacity="0" style={{
        backgroundColor: backgroundColor, borderRadius: 5,
        position: 'absolute', right: -20, top: 5, padding: 0, height: 100, width: 200
      }} visible={this.props.modalVisible} onBackdropPress={() => { this.setModalVisible(false) }}
        onRequestClose={() => { this.setModalVisible(false) }} onPressOut={() => { this.setModalVisible(false) }}>
        <TouchableOpacity style={{ flex: 1, flexDirection: "column", justifyContent: 'center', alignItems: 'center', margin: 0 }} onPressOut={() => { this.setModalVisible(false) }}>
          <TouchableOpacity style={comStyles.xmButtonStyle} onPress={() => { this.setModalVisible(false) }}>
            <Icon1 active name="md-settings" size={24} color="#FAFAFA" style={{marginRight: 5}}/>
            <Text style={comStyles.smWhiteTxtStyle}>Password change</Text>
          </TouchableOpacity>
          <TouchableOpacity style={comStyles.xmButtonStyle} onPress={() => { this.setModalVisible(false) }}>
            <Icon active name="log-out" size={24} color="#FAFAFA" />
            <Text style={comStyles.smWhiteTxtStyle}>Log out</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    );
  }
  setModalVisible(visible) {
    this.props.dispatch({ type: ReduxActions.SHOW_MODAL, visible: visible })
  }

}

const mapStateToProps = (state) => {
  return {
    modalVisible: state.userReducer.modalVisible
  };
}
export default connect(mapStateToProps, null)(MenuDrop)