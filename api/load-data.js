require('dotenv').config()
const PouchDB = require('pouchdb-core')
PouchDB.plugin(require('pouchdb-adapter-http'))
const db = new PouchDB(process.env.COUCHDB_URL + process.env.COUCHDB_DATABASE)
const {dissoc, assoc, compose, map} = require('ramda')
console.log("loading data to :", process.env.COUCHDB_URL + process.env.COUCHDB_DATABASE)

const users = [
  {
    _id: "user_rcmontgo",
    firstName: "Cam",
    lastName: "Montgomery",
    userName: "rcmontgo",
    userPhoto: "cam_montgomery_smiling.jpg",
    friends: [
      {
        userName: "user_miguel_fernandez"
      }, {
        userName: "user_jj_driscoll"
      }, {
        userName: "user_curry_thomas"
      }, {
        userName: "user_bill"
      }, {
        userName: "user_jeff_montgomery"
      }, {
        userName: "user_trip_ottinger"
      }, {
        userName: "user_tom_wilson"
      }
    ],
    finacialAccount: {
      checkingAccount: {
        bankName: "Wells Fargo",
        routingNumber: "125000105",
        accountNumber: "123456789"
      },
      creditCard: [
        {
          cardNumber: "1234987612349876",
          securityCode: "012",
          expirationMonth: "12",
          expirationYear: "2020"
        }
      ]
    }
  }, {
    _id: "user_miguel_fernandez",
    firstName: "Miguel",
    lastName: "Fenandez",
    userName: "miguelfernandez",
    userPhoto: "miguel_stuntin.jpg",
    friends: [
      {
        userName: "user_rcmontgo"
      }, {
        userName: "user_jj_driscoll"
      }, {
        userName: "user_curry_thomas"
      }, {
        userName: "user_bill"
      }, {
        userName: "user_jeff_montgomery"
      }, {
        userName: "user_trip_ottinger"
      }, {
        userName: "user_tom_wilson"
      }
    ],
    finacialAccount: {
      checkingAccount: {
        bankName: "Bank of America",
        routingNumber: "125000303",
        accountNumber: "1234554321"
      },
      creditCard: [
        {
          cardNumber: "1234987333349876",
          securityCode: "013",
          expirationMonth: "11",
          expirationYear: "2021"
        }
      ]
    }
  }, {
    _id: "user_jj_driscoll",
    firstName: "JJ",
    lastName: "Drisscol",
    userName: "jj",
    userPhoto: "jj_stuntin.jpg",
    friends: [
      {
        userName: "user_rcmontgo"
      }, {
        userName: "user_jj_driscoll"
      }, {
        userName: "user_curry_thomas"
      }, {
        userName: "user_bill"
      }, {
        userName: "user_jeff_montgomery"
      }, {
        userName: "user_trip_ottinger"
      }, {
        userName: "user_tom_wilson"
      }
    ],
    finacialAccount: {
      checkingAccount: {
        bankName: "Bank of America",
        routingNumber: "1250321303",
        accountNumber: "1234533421"
      },
      creditCard: [
        {
          cardNumber: "1234987333392276",
          securityCode: "213",
          expirationMonth: "10",
          expirationYear: "2021"
        }
      ]
    }
  }, {
    _id: "user_bill",
    firstName: "Bill",
    lastName: "Joy",
    userName: "Bill",
    userPhoto: "Bill_stuntin.jpg",
    friends: [
      {
        userName: "user_rcmontgo"
      }, {
        userName: "user_jj_driscoll"
      }, {
        userName: "user_curry_thomas"
      }, {
        userName: "user_bill"
      }, {
        userName: "user_jeff_montgomery"
      }, {
        userName: "user_trip_ottinger"
      }, {
        userName: "user_tom_wilson"
      }
    ],
    finacialAccount: {
      checkingAccount: {
        bankName: "Visa",
        routingNumber: "125000303",
        accountNumber: "1234554321"
      },
      creditCard: [
        {
          cardNumber: "1234447333349876",
          securityCode: "043",
          expirationMonth: "01",
          expirationYear: "2019"
        }
      ]
    }
  }, {
    _id: "user_curry_thomas",
    firstName: "Curry",
    lastName: "Thomas",
    userName: "currythomas",
    userPhoto: "curry-t.jpg",
    friends: [
      {
        userName: "user_rcmontgo"
      }, {
        userName: "user_jj_driscoll"
      }, {
        userName: "user_curry_thomas"
      }, {
        userName: "user_bill"
      }, {
        userName: "user_jeff_montgomery"
      }, {
        userName: "user_trip_ottinger"
      }, {
        userName: "user_tom_wilson"
      }
    ],
    finacialAccount: {
      checkingAccount: {
        bankName: "Wells Fargo",
        routingNumber: "125003303",
        accountNumber: "1234554321"
      },
      creditCard: [
        {
          cardNumber: "1298987333349876",
          securityCode: "016",
          expirationMonth: "10",
          expirationYear: "2020"
        }
      ]
    }
  }, {
    _id: "user_Monty",
    firstName: "Jeff",
    lastName: "Montgomery",
    userName: "Monty",
    userPhoto: "monty_.jpg",
    friends: [
      {
        userName: "user_rcmontgo"
      }, {
        userName: "user_jj_driscoll"
      }, {
        userName: "user_curry_thomas"
      }, {
        userName: "user_bill"
      }, {
        userName: "user_jeff_montgomery"
      }, {
        userName: "user_trip_ottinger"
      }, {
        userName: "user_tom_wilson"
      }
    ],
    finacialAccount: {
      checkingAccount: {
        bankName: "Visa",
        routingNumber: "125000303",
        accountNumber: "1234553431"
      },
      creditCard: [
        {
          cardNumber: "123495653349876",
          securityCode: "017",
          expirationMonth: "08",
          expirationYear: "2022"
        }
      ]
    }
  }
]

const tx = [
  {
    sender: "user_rcmontgo",
    recipient: "user_miguel_fernandez",
    amount: "10.00",
    currency: "USD",
    description: "Pizza",
    timeStamp: "Wed Oct 10 2017 12:41:34 GMT+0000 (UTC)"
  }, {
    sender: "user_rcmontgo",
    recipient: "user_jj_driscoll",
    amount: "10.00",
    currency: "USD",
    description: "Pizza",
    timeStamp: "Wed Oct 11 2017 12:41:34 GMT+0000 (UTC)"
  }, {
    sender: "user_miguel_fernandez",
    recipient: "user_Monty",
    amount: "100.00",
    currency: "USD",
    description: "Surf Lessons",
    timeStamp: "Wed Oct 12 2017 12:41:34 GMT+0000 (UTC)"
  }, {
    sender: "user_rcmontgo",
    recipient: "user_jj_driscoll",
    amount: "40.00",
    currency: "USD",
    description: "Hair tips",
    timeStamp: "Wed Oct 09 2017 12:40:34 GMT+0000 (UTC)"
  }, {
    sender: "user_rcmontgo",
    recipient: "user_bill",
    amount: "200.00",
    currency: "USD",
    description: "Music lessons",
    timeStamp: "Wed Oct 09 2017 12:41:34 GMT+0000 (UTC)"
  }, {
    sender: "user_curry_thomas",
    recipient: "user_jj_driscoll",
    amount: "15.00",
    currency: "USD",
    description: "Beerz",
    timeStamp: "Wed Oct 09 2017 01:41:34 GMT+0000 (UTC)"
  }, {
    sender: "user_miguel_fernandez",
    recipient: "user_rcmontgo",
    amount: "35.00",
    currency: "USD",
    description: "Driving lessons",
    timeStamp: "Wed Oct 28 2017 12:41:34 GMT+0000 (UTC)"
  }, {
    sender: "user_rcmontgo",
    recipient: "user_jj_driscoll",
    amount: "10.00",
    currency: "USD",
    description: "Debugging my spaghetti code",
    timeStamp: "Wed Oct 23 2017 12:41:34 GMT+0000 (UTC)"
  }, {
    sender: "user_rcmontgo",
    recipient: "user_curry_thomas",
    amount: "350.00",
    currency: "USD",
    description: "Finacial Services",
    timeStamp: "Wed Oct 23 2017 12:51:34 GMT+0000 (UTC)"
  }, {
    sender: "user_Monty",
    recipient: "user_jj_driscoll",
    amount: "140.00",
    currency: "USD",
    description: "Tattoo work",
    timeStamp: "Wed Oct 12 2017 12:41:34 GMT+0000 (UTC)"
  }, {
    sender: "user_Monty",
    recipient: "user_rcmontgo",
    amount: "140.00",
    currency: "USD",
    description: "APP TESTING",
    timeStamp: "Wed Oct 01 2017 12:41:34 GMT+0000 (UTC)"
  }

]

db
  .bulkDocs(users)
  .then(res => console.log("Successfully loaded users data!"))
  .catch("An error has occurred will loading data");

db.bulkDocs(compose(map(assoc('timeStamp', new Date().toISOString())), map(dissoc('timeStamp')))(tx))
  .then(res => console.log("Successfully loaded TX data!"))
  .catch("An error has occurred will loading data")