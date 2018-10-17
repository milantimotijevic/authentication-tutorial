const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const bodyParser = require('body-parser');
const expressJwt = require('express-jwt');
const secret = 'Keep it secret, keep it safe';
const authenticate = expressJwt({secret});
const jwt = require('jsonwebtoken');
const jwtDecode = require('jwt-decode');

const app = express();
app.use(bodyParser.json());

// common error handling middleware
app.use(function(err, req, res, next) {
    res.status(400).send('Something went wrong....');
});

// passport is obsolete with this approach; I'm using jwt to encode data (id and name) which would normally get fetched from a db; next: I use jwt-decode to read the token; expressJwt is used to authenticate the endpoints (ensure they are only getting hit with requests whose headers contain Authorization token which includes given secred word)
// passport.use(new LocalStrategy(function(username, password, done) {
//     if(username === 'pera') {
//         done(null, {id: 1, username: 'pera'});
//     } else {
//         done(null, false);
//     }
// }));

app.get('/login', function(req, res, next) {
    // would normally get fetched from DB so I would not need to hardcode
    req.token = jwt.sign({id: 1, name: 'pera peric forever'}, secret, {expiresIn: 9999});
    res.send(req.token);
});

app.get('/products', authenticate, function(req, res, next) {
    const user = jwtDecode(req.headers.authorization);
    console.log(user);
    res.send(['Spaghetti', 'Stove', 'Parachute', 'Morphine']);
});

app.listen(3000, function() {
    console.log('Prismatic Core: Online (app3)');
});
