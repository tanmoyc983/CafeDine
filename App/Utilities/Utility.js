var floors;
var menuItems = [];
var modifiedmenuItems = [];
var selectedMnuItems = [];
var fullOrder ;
var finalOrder;
var floorList = [];
var Customer;
var selectedTable;
var customerStack = false;
var selectedModes = [];
var placedOrder = [];
var selectedMode='';
var currentOrder=[];
var previousOrder=[];
var currSubOrderNumber = 0;
var currOrderNumber = "";

export const getCurrSubOrderNumber = () => {
  return currSubOrderNumber;
}

export const setCurrSubOrderNumber = () => {
  currSubOrderNumber += 1;
  return currSubOrderNumber;
}
export const getcurrOrderNumber = () => {
  return currOrderNumber;
}

export const setcurrOrderNumber = (number) => {
  currOrderNumber = number;
}

export function saveOrder(data) {
  return new Promise((resolve, reject) => {
fetch('http://10.31.101.118:8080/api/OrderDetails', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }).then(response => response.json())
        .then(
          response => {
            setcurrOrderNumber(response);
            resolve(response);
          }
        ).catch(err => {
          alert('err');
          reject(err);
        });
      });
    }

export function saveFloors() {
  debugger;
  floorList=[];
  fetch('http://10.31.101.118:8080/api/Floor')
    .then(response => {
      return response.json()
    })
    .then(res => {
      floors = res;
      res.forEach(element => {   
        floorList.push({
          value: 'Floor ' + element.floorID
        });
      });
    });
}

export function getFloors() {
  return floors;
}

export function setMenuItems() {
  menuItems = [];
  fetch('http://10.31.101.118:8080/onesta/item/all')
      .then(res => { return res.json() })
      .then(response => {
          response.forEach(temp => {
              menuItems.push(temp); 
          });
      });
}

export function getMenuItems() {
  return menuItems;
  //return ;
}

export function setmodifiedMenuItems(data) {
  if (typeof data !== 'undefined' && data.length > 0) {
    modifiedmenuItems = data;
  }
}
export function getmodifiedMenuItems() {
  return modifiedmenuItems;
  //return ;
}

export function getImageonType(modeType) {
  if(modeType === 'ULNVP') return require('../Images/MenuImage/nvgpizza.jpg');
  if(modeType === 'ULVP') return require('../Images/MenuImage/vgpizza.jpg');
  if(modeType === 'A la carte') return require('../Images/MenuImage/ULNV.png');
  if(modeType === 'UNVB') return require('../Images/MenuImage/UNVB.jpg');
}
export function setFullOrders(orderID) {
  return new Promise((resolve, reject) => {
  var url = 'http://10.31.101.118:8080/api/OrderDetails?OrderID=' + orderID;
    fetch(url,{
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
      ).then((response) => {
         return response.json();
      }).then(responseJson => {
          let res = responseJson;
          fullOrder=res;
          resolve(res);  
      }).catch(err => {
        alert('error');
        reject(res);
      });
    });
}

export function getFullOrder() {
  return fullOrder;
}

export function setFinalOrder(orderID) {
  return new Promise((resolve, reject) => {
  var url = 'http://10.31.101.118:8080/onesta/orderdetails/FinalOrder?OrderID=' + orderID;
    fetch(url,{
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
      ).then((response) => {
         return response.json();
      }).then(responseJson => {
          let res = responseJson;
          finalOrder=res;
          resolve(res);  
      }).catch(err => {
        alert('error');
        reject(res);
      });
    });
}

export function getFinalOrder() {
  return finalOrder;
}

export function CheckoutFinalOrder(data) {
  return new Promise((resolve, reject) => {
    fetch('http://10.31.101.118:8080/api/OrderDetails', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          }).then(response => response.json())
            .then(
              response => {
                resolve(response);
              }
            ).catch(err => {
              alert('err');
              reject(err);
            });
          });
}

export function getFloorList() {
  return floorList;
}

export function setCustomer(data) {
  Customer = data;
  customerStack = true;
}

export function getCustomer() {
  if(Customer!=null){
  Customer.customerID=Customer.customerID.toString();
  }
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

export function setCurrentOrder(data) {
    currentOrder.push(data);
}

export function updateCurrentOrder(Modetype,data) {
    if(currentOrder.length>0){
      currentOrder.forEach(element => {
        if(element.modeType===Modetype){
          element.orders.push(data);
        }
      });
  }
}

export function getCurrentOrder() {
  return currentOrder;
}
export function rmItemsFromCurrentOrder(modeType) {
  for (let index = 0; index < currentOrder.length; index++) {
    if(currentOrder[index].modeType===modeType){
      currentOrder[index].orders=[];
    }    
  }
}

export function setPreviousOrder(data) {
    previousOrder.push(data);
}
export function updatePreviousOrder(Modetype,data) {
    if(previousOrder.length>0){
      previousOrder.forEach(element => {
        if(element.modeType===Modetype){
          data.orders.forEach(item => {
            element.orders.push(item);
          });          
        }
      });
  }
}

export function getPreviousOrder() {
  return previousOrder;
}

export function setStackParam(data) {
  customerStack = data;
}

export function clearData() {
  floors=null;
   menuItems = [];
   modifiedmenuItems = [];
   modifiedmenuItems = [];
   selectedMnuItems = [];
   fullOrder=null;
   finalOrder=null;
   floorList = [];
   Customer;
   selectedTable;
   customerStack = false;
   selectedModes = [];
   placedOrder = [];
   selectedMode='';
   currentOrder=[];
   previousOrder=[];
   currSubOrderNumber = 0;
   currOrderNumber = "";
}

export function setTableOrder(data) {
  fullOrder = data;
}

export function setSelectedModes(data) {
  selectedModes = data;
}

export function getSelectedModes(data) {
  return selectedModes;
}

export function setSelectedMode(data) {
  selectedMode = data;
}

export function getSelectedMode() {
  return selectedMode;
}

export function setSelectedMenuItems(data) {
  if (data !== '') {
    modifiedmenuItems.forEach(item => {
      if (data === item.modeType){
      selectedMnuItems=item.category;
      }
    })
  }
  if(currentOrder.length > 0 && currentOrder[0].orders.length === 0){
    let isOrder = false;
    currentOrder.forEach(elem => {
      if(elem.orders.length > 0 && !isOrder){
        isOrder = true;
      }
    })
    if(!isOrder){
      selectedMnuItems.forEach(elem => {
        elem.items.forEach(temp => {
          temp.quantity = 0;
        })
      })
    }
  }
}

export function getSelectedMenuItems() {
  return selectedMnuItems;
}


export function getItems(data) {
  let toReturn;
  items.forEach((temp) => {
    if (temp.modeType === data) toReturn = temp.category;
  })
  console.log(toReturn);
  return toReturn;
}

export function getPlacedOrder() {
  return placedOrder;
}

export function setPlacedOrder(data) {
  fullOrder = [];
  placedOrder = data;
}
export const ClearCurrentOrder=()=>{
  currentOrder.forEach(element => {
    element.orders=[];
  });
}
export const setOrder=(data,callapi)=>{
OrderDetails.orderID=currOrderNumber;
OrderDetails.customer.customerID=Customer.customerID;
OrderDetails.tableID=selectedTable.tableID;
OrderDetails.subOrder=[];
OrderDetails.subOrder.push(data);
return new Promise((resolve, reject) => {
  saveOrder(OrderDetails).then(response => resolve(response)).catch(err => reject(err));
});
}

export const getOrder=()=>{

}

var OrderDetails =
{
	"orderID": "",
	"customer": {
		"customerID": 0,
	},
	"tableID": 0,
	"finalCheckout": false,
	"subOrder": [
	]
}