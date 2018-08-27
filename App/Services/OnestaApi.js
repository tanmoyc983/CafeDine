const baseUrl='http://10.31.101.118:8080/';

export const getCustomer = (mobileNumber) => {
    let url = baseUrl+'onesta/customer/SearchbyMobile?mobile=' + mobileNumber;
    return fetch(url,{
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
      ).then((response) => {
         return response.json();
      }).then(responseJson => {  
        return responseJson;     
      }).catch(err => {
        console.log(err);
      });
}

export const saveNewCustomer = (objUser) => {
  return fetch(baseUrl+'onesta/customer/create', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(objUser),
      }).then((response) => {
        return response.json();
     }).then(responseJson => {  
       return responseJson;     
     }).catch(err => {
       console.log(err);
     });
    }

export const setMenuItems=()=>{
      return fetch(baseUrl+'onesta/item/all')
          .then(res => { return res.json() })
          .then(response => {
              return response;
          }).catch(err=>{
            console.log(err);
          });
    }

export const saveFloors=()=>{
      return fetch(baseUrl+'api/Floor')
        .then(response => {
          return response.json()
        })
        .then(res => {
          return res;
        }).catch(err=>{
          console.log(err);
        });        
    }

export const saveOrder=(orderdata)=>{
      return fetch(baseUrl+'api/OrderDetails', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderdata),
      }).then((response) => {
        return response.json();
     }).then(responseJson => {  
       return responseJson;     
     }).catch(err => {
       console.log(err);
     });
    }

export const getCustomersbyName = (name) => {  
      let url = baseUrl+'onesta/customer/SearchbyName?Name=' + name;
      return fetch(url,{
      method: 'GET',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      }}).then((response) => {
        return response.json();
     }).then(responseJson => {  
       return responseJson;     
     }).catch(err => {
       console.log(err);
     });
      }

export const getReviewOrder=(orderID) =>{
        let url = baseUrl+'api/OrderDetails?OrderID=' + orderID;
        return fetch(url,{
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          }
            ).then((response) => {
               return response.json();
            }).then(responseJson => {
                return responseJson;
            }).catch(err => {
              console.log(err);
            });
      }

export const getFinalOrder=(orderID)=> {
        let url = baseUrl+'onesta/orderdetails/FinalOrder?OrderID=' + orderID;
        return  fetch(url,{
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }}
            ).then((response) => {
               return response.json();
            }).then(responseJson => {
              return responseJson;
            }).catch(err => {
              console.log(err);
            });
      }

export const DeleteCustomer = (CustomerID) => {
        return fetch(baseUrl+'onesta/customer/DeleteCustomer?mobile='+CustomerID, {
              method: 'DELETE',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              }
            }).then((response) => {
              return response.json();
           }).then(responseJson => {  
             return responseJson;     
           }).catch(err => {
             console.log(err);
           });
          }

export const tableDetails=()=>{
  let url = baseUrl+'onesta/floor/FloorsWithOrderDetails';
  return fetch(url,{
  method: 'GET',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
}
  ).then((response) => {
      return response.json();
  }).then(responseJson => {  
    return responseJson;     
  }).catch(err => {
    console.log(err);
  });
}

export const ModifyCustomer = (objUserModified) => {
  return fetch(baseUrl+'onesta/customer/ModifyCustomer', {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(objUserModified),
      }).then((response) => {
        return response.json();
     }).then(responseJson => {  
       return responseJson;     
     }).catch(err => {
       console.log(err);
     });
    }          
    export const approveOrder=(orderData)=>{
      return fetch(baseUrl+'onesta/orderdetails/ApprovedOrder', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      }).then((response) => {
        return response.json();
     }).then(responseJson => {  
       return responseJson;     
     }).catch(err => {
       console.log(err);
     });
    }


    export const bookTable = (tableNumber) => {
      let url = baseUrl+'onesta/table/BookTable?id=' + tableNumber;
      return fetch(url,{
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
        ).then((response) => {
           return response.json();
        }).then(responseJson => {  
          return responseJson;     
        }).catch(err => {
          console.log(err);
        });
  }

  export const releaseTable = (tableNumber) => {
    let url = baseUrl+'onesta/table/ReleaseTable?id=' + tableNumber;
    return fetch(url,{
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
      ).then((response) => {
         return response.json();
      }).then(responseJson => {  
        return responseJson;     
      }).catch(err => {
        console.log(err);
      });
}