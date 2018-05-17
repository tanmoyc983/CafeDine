var floors;
var menuItems = [];

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

