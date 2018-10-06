import React from 'react';
import { Button } from 'native-base';
import { Text } from 'react-native';
import comStyles, { customerIconColor, backgroundColor } from '../Containers/Styles/CommonStyles';
import Icon from 'react-native-vector-icons/EvilIcons';
import IconPush from 'react-native-vector-icons/Ionicons';
import { View } from 'react-native-animatable';
import MenuDrop from './menuDrop';
import PendingOrder from '../Containers/PendingOrder';
import ReduxActions from "../Redux/ActionTypes/Action";
import { connect } from 'react-redux';
import Modal from "react-native-modal";

class RightHeader extends React.Component {
  setModalVisible() {
    let temp = this.props.modalVisible;
    this.props.dispatch({ type: ReduxActions.SHOW_MODAL, visible: !temp });
  }

  showPage() {
    this.props.dispatch({ type: ReduxActions.RESET_NOTIFICATON_COUNT, count: 0 });
    let alertTemp = this.props.alertModalVisible;
    this.props.dispatch({ type: ReduxActions.SHOW_ALERT, visible: !alertTemp });
  }
  setAlertModalVisible(visible) {
    this.props.dispatch({ type: ReduxActions.SHOW_ALERT, visible: visible })
  }
  render() {
    console.log(this.props.captainDetails);    
    return (
      <View style={{ flexDirection: 'row' }}>
        <Button style={{ backgroundColor: '#1C227E' }} onPress={this.showPage.bind(this)}>
          <IconPush name="md-notifications-outline" size={30} color={customerIconColor} >
            {this.props.notificationCount >0 && <Text style={[comStyles.smWhiteTxtStyle, comStyles.pushNotification]}>{this.props.notificationCount}</Text>}
            {/* </IconAlert> */}
          </IconPush>
        </Button>
        <Button style={comStyles.smButtonStyle} onPress={this.setModalVisible.bind(this)}>
          <Text style={comStyles.smWhiteTxtStyle}>Hi {this.props.captainDetails.loggedInUserName}</Text>
          <Icon name="user" size={42} color={customerIconColor} />
        </Button>
        {(this.props.modalVisible && this.props.captainDetails.mobileNo !='') && <MenuDrop navigation={this.props.navigation}></MenuDrop>}
        {this.props.alertModalVisible && 
        <Modal backdropColor="black" backdropOpacity="0.4"  style={{
                backgroundColor: backgroundColor, borderRadius: 5,}}
                visible={this.props.alertModalVisible} onBackdropPress={() => { this.setAlertModalVisible(false) }}
                onRequestClose={() => { this.setAlertModalVisible(false) }}>
                <PendingOrder navigation={this.props.navigation}></PendingOrder>           
        </Modal>}
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    modalVisible: state.userReducer.modalVisible,
    alertModalVisible: state.userReducer.alertModalVisible,
    notificationCount: state.RealtimeReducer.notificatioCount,
    captainDetails:state.loginReducer.captainloginDetils
  }
}

export default connect(mapStateToProps, null)(RightHeader)