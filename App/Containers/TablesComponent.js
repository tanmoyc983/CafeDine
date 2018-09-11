import React from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { setMenuItems, getFloors, setFullOrders, getFloorList, setSelectedTable, getStackParam, setTableOrder, saveFloors } from "../Utilities/Utility";
import { Images } from '../Themes';
import styles from './Styles/LaunchScreenStyles';
import comStyles, {dropdownColor, orderColor, customerIconColor} from './Styles/CommonStyles';

export default class TablesComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            floors: getFloors(),
            floorSelected: null,
            floorDetails: [],
            floorList: getFloorList(),
            customerStack: getStackParam(),
            showIndicator: true
        }
    }

    fillTable(data) {
        fetch('http://onestaapi.azurewebsites.net/onesta/table/orderdetailsbyTableID/' + data.tableID)
            .then(response => response.json())
            .then(res => {
                setTableOrder(res);
                this.props.navigation.navigate('PayBillComponent');
            })
            this.setState({showIndicator: true});
    }

    componentWillMount() {
        let floors, floorList = [];
        if (!this.state.floors) {
            fetch('http://onestaapi.azurewebsites.net/api/Floor')
                .then(response => { return response.json() })
                .then(res => {
                    floors = res;
                    res.forEach(element => {
                        floorList.push({ value: 'Floor' + element.floorID });
                    });
                    this.setState({ showIndicator: false, floors: floors, floorList: floorList });
                });
        }
    }

    changeFloor(val) {
        //change to select floor  
        let selectedValue = val.match(/\d+/)[0];
        let FloorDetails;
        if (this.state.floors) {
            this.state.floors.forEach((element, index) => {
                if (element.floorID == selectedValue) {
                    FloorDetails = this.state.floors[index].tables;
                }
            });
        }
        this.setState({ floorSelected: val, floorDetails: FloorDetails });
    }

    render() {
        let tables = this.state.floorDetails;
        if (this.state.floorDetails) {
            for (let index = 1; index <= tables; index++) {
                tables.push("Table " + index);
            }
        }

        return (
            <View style={styles.mainContainer}>
                <Image source={Images.background} style={styles.backgroundImage} resizeMode='cover' />
                {this.state.showIndicator && <View style={[comStyles.rowContainer, comStyles.horizontal]}>
                    <ActivityIndicator size="large" color="red" /></View>}
                {!this.state.showIndicator && <View style={{ height: 100, flex: 1 }}>
                    <Dropdown style={{ justifyContent: 'flex-start', color: customerIconColor }} onChangeText={this.changeFloor.bind(this)}
                        label='Select Floor' baseColor={customerIconColor} labelFontSize={25}
                        data={this.state.floorList}
                    />
                </View>}
                {!this.state.showIndicator && <View style={{ flex: 5 }} >
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ flex: 8, textAlign: 'center', color: customerIconColor }}>
                            Table Number
                            </Text>
                        <Text style={{ flex: 8, textAlign: 'center', color: customerIconColor }}>
                            Capacity
                            </Text>
                    </View>
                    <FlatList
                        data={this.state.floorDetails}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => this.fillTable(item)} style={[comStyles.buttonStyle, item.isOccupied ? stylesFloor.filled : stylesFloor.empty]} disabled={!item.isOccupied}>
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <Text style={{ flex: 8, textAlign: 'center', color: defaultTxtColor }}>
                                        Table {item.tableID}
                                    </Text>
                                    <Text style={{ flex: 8, textAlign: 'center', color: defaultTxtColor }}>
                                        {item.capacity}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </View>}
            </View>

        );
    }
}
