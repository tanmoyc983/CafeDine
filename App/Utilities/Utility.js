var floors;
var menuItems = [];
var fullOrder = [];
var floorList = [];
var Customer;
var selectedTable;
var customerStack = false;

export function saveFloors() {
    fetch('http://onestaapi.azurewebsites.net/api/Floor')
        .then(response => { return response.json() })
        .then(res => {
            floors = res;
            res.forEach(element => {
                floorList.push({ value: 'Floor' + element.floorID });
            });
        });
}

export function getFloors() {
    return floors;
}

export function setMenuItems() {
    menuItems = [];

    fetch('http://onestaapi.azurewebsites.net/onesta/item/all')
        .then(res => { return res.json() })
        .then(response => {
            response.forEach(temp => {
                temp.items.forEach(data => {
                    data.quantity = 0;
                })
                menuItems.push(temp);
            });
        });
}

export function getMenuItems() {
    return menuItems;
}

export function setFullOrders(data) {
    fullOrder = [];
    data.forEach((temp) => {
        temp.items.forEach(res => {
            if (res.quantity > 0) {
                fullOrder.push(res);
            }
        })

    });
}

export function getFullOrder() {
    return fullOrder;
}

export function getFloorList() {
    return floorList;
}

export function setCustomer(data) {
    Customer = data;
    customerStack = true;
}

export function getCustomer() {
    return Customer;
}

export function setSelectedTable(data) {
    selectedTable = data;
}

export function getSelectedTable() {
    return selectedTable;
}

export function getStackParam() {
    return customerStack;
}

export function setStackParam(data) {
    customerStack = data;
}

export function clearData() {
    menuItems = [];
    fullOrder = [];
    Customer = null;
    selectedTable = null;
    customerStack = false;
    floors = null;
    floorList = [];
}

export function setTableOrder(data){
    fullOrder = data;
}