Jwt token stores the whole data in a token which is used for authentication.
where as if we use passport session we will pass key which will be session key which will later be use to get data from some database like redis or mongodb.

To enable JWT we need passport-jwt and nestjs/jwt
then register the jwt module in auth module and use jwt service in Auth.service

- Jwt.sign is used to sign the data.

To enable authentication using session we need express-session

- initialiaze passport and establish session
- make authenticated gaurd and implement canActivate.
- use that gaurd where ever u want the authenticated routes.
