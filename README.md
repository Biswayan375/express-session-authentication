# express-session-authentication
A simple login logout express application to understand how to authenticate users using express session

First we need to think that what do we actually need to authenticate an user in our applications? The answer is - 

1. When an user provides his username and password, we check into our database whether those provided credentials are correct or not. If correct, then we need to create a session with an unique session ID and store that somewhere in our server to keep a record of the fact that someone has logged into his account.
2. Then with each request from the client (browser) to any protected route (such as, home page or profile page) we need to verify that the request is coming from some logged in user and not from any random guy on the internet. To do that, in that previous step, that unique session ID must be passed to the client and with each request the client must send that ID so that we know it is coming from an authenticated user by verifying that ID from the client request against the ID we have saved in our server (maybe in local storage or some database or some cached storage like redis). We can achieve that by setting the unique session ID as a cookie on the client side.
3. On log out, we need to destroy that session with unique session ID as well the cookie so that no one after logging out do not have access to protected routes.

All these stuff is not so easy to implement manually. The express-session is an npm package to take all these heavy lifting for us.
Here are some useful links for additional resourse - 
1. [How to use express-session (video)](https://youtu.be/OH6Z0dJ_Huk)
2. [How to use express-session (written)](https://github.com/alex996/presentations/blob/master/express-session.md)
3. [How to use mongoDB as session storage in production enviornment](https://meghagarwal.medium.com/storing-sessions-with-connect-mongo-in-mongodb-64d74e3bbd9c)
