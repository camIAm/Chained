#User stories

## Home Page
As a user I would like to see a list of recent transactions. I would like a toggle switch to move between personal and friend network transactions.

As a user I would like to have a drawer menu for easy access to any location in the app. 

As a user I would like to pay button which propts me with a easy to fill out and send payment form so that I might quickly pay my friends, roommates or establishments 

## Profile Page
As a user I would like to see a recent history of payments to and from my account. 

## Drawer

As a user I would like to see a Home button to easily navigate to the home page from anywhere on the app

As a user I would like to see a Profile button to easily navigate to the profile page from anywhere on the app in case I need to consult my recent transaction history

As a user I would like to see Search button so I can see if friends are available for p2p payments

As a user I would like a transfer to bank option so that I might easily transfer any fraction of my current balance total to my checking account registered in the application

As a user I would like a setting button so that I might easily add or edit my payment options.

## Sign Up (no sign up for simple, not in scope)

Use Auth0 to sign up for an account in Auth0. Use auth0 profile info to establish a user/profile in the database with a link to the profile in auth0.  That way when a user login (see Sign In below), you can establish their authenticated accoutn in Auth0 with the user document in the database.

How are you going to link an authenticated user in auth 0 to you user document in the database?

 ## Sign In (Simple no auth0)
 User logs in, as a user i need to identify myself to the system, I supply a simple username and password. If profile not set up then Set Up User Profile.  If account info not set up then Set Up Bank Account

## Set Up User Profile. 

Assuming logged in.  A user must supply firstName, lastName, userName,...

 ## Set Up Bank Account 
 Assuming Logged in.  If a logged in user doesnt have account information established prompt the user to enter bank account information so that the user's status is set as active to receive and send money.
 

## Send money
### preqs 
 - Sign In
 - Set Up User Profile
 - Set up bank account

Assuming a user is logged (see Sign In) in, user profile set (see Set Up User Profile) and they have established their account information (see Set Up Bank Account), the user may send and receive money.

- User clicks send money icon
- User is directed to select recipient. User searches friends and application users for a payment recipient.
- User is directed to a form to enter the amount and short description of the transaction.
- User is redirected to the profile page that lists all recent transactions.