# API endpoints

## User endpoints

### Create a User- POST /users
**Example**
```
{
_id: "user_rcmontgo",
firstName: "Cam",
lastName: "Montgomery",
userName: "rcmontgo",
userPhoto: "cam_montgomery_smiling.jpg",
friends:[
  {
    userName:"user_miguel_fernandez"
  },
  {
    userName:"user_jj_driscoll"
  },
  {
    userName:"user_curry_thomas"
  },
  {
    userName:"user_bill_joy"
  }
  {
    userName:"user_jeff_montgomery"
  },
  {
    userName:"user_trip_ottinger"
  },
  {
    userName"user_tom_wilson"
  }
],
finacialAccount:{
  checkingAccount:{
    bankName:"Wells Fargo",
    routingNumber:"125000105",
    accountNumber:"123456789"
  },
  creditCard:[
    {
      cardNumber:"1234987612349876",
      securityCode:"012"
      expirationMonth:"12",
      expirationYear:"2020"
    }
    ]
  }
}
```
**Response**
```
{
  ok:true,
  _id:"user_rcmontgo",
  _rev:"1-23202479633c2b380f79507a776743d5"
}
```

### Get a User - GET /users/{id}
**Example**
```
GET /users/user_rcmontgo
```
**Response**
```
{
_id: "user_rcmontgo",
firstName: "Cam",
lastName: "Montgomery",
userName: "rcmontgo",
userPhoto: "cam_montgomery_smiling.jpg",
friends:[
  {
    userName:"user_miguel_fernandez"
  },
  {
    userName:"user_jj_driscoll"
  },
  {
    userName:"user_curry_thomas"
  },
  {
    userName:"user_bill_joy"
  }
  {
    userName:"user_jeff_montgomery"
  },
  {
    userName:"user_trip_ottinger"
  },
  {
    userName"user_tom_wilson"
  }
],
finacialAccount:{
  checkingAccount:{
    bankName:"Wells Fargo",
    routingNumber:"125000105",
    accountNumber:"123456789"
  },
  creditCard:[
    {
      cardNumber:"1234987612349876",
      securityCode:"012"
      expirationMonth:"12",
      expirationYear:"2020"
    }
    ]
  }
}
```
### Update a user - PUT /users/:id
**Example**
- In the example the user rcmontgo has updated his profile picture and added a credit card. These two update would be separate actions in the application.
- For the time being, adding friends to a user's network will update the given user. This may change in the future if the user object's friend array is replaced with a lookup key for the hypothetical endpoint /friends/{id}. 
```
PUT /users/user_rcmontgo

{
_id: "user_rcmontgo",
_rev:"1-23202479633c2b380f79507a776743d5",
firstName: "Cam",
lastName: "Montgomery",
userName: "rcmontgo",
userPhoto: "cam_montgomery_smiling_but_better_edit.jpg",
friends:[
  {
    userName:"user_miguel_fernandez"
  },
  {
    userName:"user_jj_driscoll"
  },
  {
    userName:"user_curry_thomas"
  },
  {
    userName:"user_bill_joy"
  }
  {
    userName:"user_jeff_montgomery"
  },
  {
    userName:"user_trip_ottinger"
  },
  {
    userName"user_tom_wilson"
  }
],
finacialAccount:{
  checkingAccount:{
    bankName:"Wells Fargo",
    routingNumber:"125000105",
    accountNumber:"123456789"
  },
  creditCard:[
    {
      cardNumber:"1234987612349876",
      securityCode:"012"
      expirationMonth:"12",
      expirationYear:"2020"
    },
    {
      cardNumber:"1233387667649876",
      securityCode:"011"
      expirationMonth:"02",
      expirationYear:"2022"
    }
    ]
  }
}
```

**Response**
```
{
  ok:true,
  _id:"user_rcmontgo",
  _rev:"2-23202479633c2b380f79507a776743d5"
}
```

### Delete a user - DELETE /users/{id}
**Example**
```
DELETE /users/user_rcmontgo
```
**Response**
```
{
  ok:true,
  _id:"user_rcmontgo",
  _rev:"3-23202479633c2b380f79507a776743d5"
}
```

### Get all users in the collection - GET /users/

**Example**
```
GET /users/
```
**Response**
```
[
  {
  _id: "user_rcmontgo",
  firstName: "Cam",
  lastName: "Montgomery",
  userName: "rcmontgo",
  userPhoto: "cam_montgomery_smiling.jpg",
  friends:[
    {
      userName:"user_miguel_fernandez"
    },
    {
      userName:"user_jj_driscoll"
    },
    {
      userName:"user_curry_thomas"
    },
    {
      userName:"user_bill_joy"
    }
    {
      userName:"user_jeff_montgomery"
    },
    {
      userName:"user_trip_ottinger"
    },
    {
      userName"user_tom_wilson"
    }
  ],
  finacialAccount:{
    checkingAccount:{
      bankName:"Wells Fargo",
      routingNumber:"125000105",
      accountNumber:"123456789"
    },
    creditCard:[
      {
        cardNumber:"1234987612349876",
        securityCode:"012"
        expirationMonth:"12",
        expirationYear:"2020"
      }
      ]
    }
  },
  {
  _id: "user_miguelfernandez",
  firstName: "Miguel",
  lastName: "Fenandez",
  userName: "miguelfernandez",
  userPhoto: "miguel_stuntin.jpg",
  friends:[
    {
      userName:"user_rcmontgo"
    },
    {
      userName:"user_jj_driscoll"
    },
    {
      userName:"user_curry_thomas"
    },
    {
      userName:"user_bill_joy"
    }
    {
      userName:"user_jeff_montgomery"
    },
    {
      userName:"user_trip_ottinger"
    },
    {
      userName"user_tom_wilson"
    }
  ],
  finacialAccount:{
    checkingAccount:{
      bankName:"Bank of America",
      routingNumber:"125000303",
      accountNumber:"1234554321"
    },
    creditCard:[
      {
        cardNumber:"1234987333349876",
        securityCode:"013"
        expirationMonth:"11",
        expirationYear:"2021"
      }
      ]
    }
  }

]

```