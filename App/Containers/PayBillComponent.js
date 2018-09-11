import React from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList, Button, Image, ActivityIndicator } from 'react-native';
import { getFullOrder, getCustomer, getSelectedTable, setStackParam, clearData } from "../Utilities/Utility";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './Styles/LaunchScreenStyles';
import { Images } from '../Themes';
import comStyles, {dropdownColor, customerIconColor} from './Styles/CommonStyles';

export default class PayBillComponent extends React.Component {
    constructor() {
        super();

        this.state = {
            order: getFullOrder(),
            showIndicator: false
        }
    }

    submitOrder(data) {
        fetch('http://onestaapi.azurewebsites.net/onesta/table/updatestatus?id=' + this.state.order.tableID, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        }).then(response => response.json())
            .then(
                response => {
                    setStackParam(false);
                    clearData();
                    this.setState({ showIndicator: false });
                    this.props.navigation.navigate('TablesScreen');
                }
            ).catch(err => {
                console.log(err);
            });
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <Image source={Images.background} style={styles.backgroundImage} resizeMode='cover' />
                <Text style={{fontSize: 20, color: {customerIconColor}, marginLeft: 10}}> Bill for {this.state.order.customerDetails.customerName}</Text>
                {this.state.showIndicator && <View style={[comStyles.colContainer, comStyles.horizontal]}>
                    <ActivityIndicator size="large" color="red" /></View>}
                {!this.state.showIndicator && <View>
                    <FlatList
                        data={this.state.order.orderDetails}
                        renderItem={({ item }) => (
                            <View style={comStyles.buttonStyle}>
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <Text style={{ flex: 7, textAlign: 'left', marginVertical: 18, fontSize: 20, marginLeft: 5 }}>
                                        {item.item.itemName}
                                    </Text>
                                    <View style={{ flex: 4, flexDirection: 'row' }}>
                                        <View style={{ flex: 4, flexDirection: 'row' }}>
                                            <Text style={{ marginVertical: 18, fontSize: 20 }}>{item.quantity}</Text>
                                        </View>

                                    </View>
                                </View>
                            </View>
                        )}
                    />
                    <Button title='Pay bill' style={{ marginTop: 10 }} backgroundColor={dropdownColor} onPress={this.submitOrder.bind(this)}></Button>
                </View>}
            </View>

        );
    }
}
