# Data model

## User

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

## Transaction

```
{
  sender:"user_rcmontgo",
  recipient:"user_miguel_fernandez",
  amount:"10.00",
  currency:"USD",
  description:"Pizza",
  timeStamp:"Wed Oct 18 2017 12:41:34 GMT+0000 (UTC)"
}

```
## Transactions

[ 
  {
    sender:"user_rcmontgo",
    recipient:"user_miguel_fernandez",
    amount:"10.00",
    currency:"USD",
    description:"Pizza",
    timeStamp:"Wed Oct 18 2017 12:41:34 GMT+0000 (UTC)"
  },
  {
    sender:"user_rcmontgo",
    recipient:"user_jj_driscoll",
    amount:"10.00",
    currency:"USD",
    description:"Pizza",
    timeStamp:"Wed Oct 18 2017 12:41:34 GMT+0000 (UTC)"
  },
  /// more data
]