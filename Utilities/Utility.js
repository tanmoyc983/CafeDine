var floors;
var menuItems = [];
var fullOrder = [];

export function saveFloors() {
    fetch('http://onestaapi.azurewebsites.net/api/Floor')
        .then(response => { return response.json() })
        .then(res => {
            console.log(res);
            floors = res;
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
            console.log(response);
            response.forEach(temp => {
                temp.quantity = 0;
                menuItems.push(temp)
            });
        })

}

export function getMenuItems() {
    return menuItems;
}

export function setFullOrders() {
    menuItems.forEach((temp) => {
        if (temp.quantity > 0) fullOrder.push(temp);
    });
}

export function getFullOrder() {
    return fullOrder;
}