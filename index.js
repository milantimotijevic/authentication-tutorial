// contains some useful up-close examples of passport-express integration
const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// common error handling middleware
app.use(function(err, req, res, next) {
    res.status(400).send('Something went wrong....');
});

passport.use(new LocalStrategy(function(username, password, done) {
    if(username === 'peraperic' && password === 'cats123') {
        done(null, {
            id: 1,
            username: 'peraperic',
            email: 'pera@peric.com'
        });
    } else {
        done(null, false);
    }
}));

//app.use(passport.initialize());

app.post('/register', passport.authenticate(
    'local', {
        session: false
    }), serialize, generateToken, respond);

function serialize(req, res, next) {
    db.updateOrCreate(req.user, function(err, user){
        if(err) {return next(err);}
        req.user = {
            id: user.id
        };
        next();
    });
}

app.post('/login', passport.authenticate(
    'local', {
        session: false,
    }
), function(req, res, next) {
    res.send('The Nine have already left Minas Morgul...');
});

const db = {
    updateOrCreate: function(user, cb) {
        cb(null, user);
    }
};

const jwt = require('jsonwebtoken');
function generateToken(req, res, next) {
    req.token = jwt.sign({
        id: req.user.id
    }, 'keep it secret keep it safe', {expiresIn: 9999999});
    next();
}

function respond(req, res) {
    res.json({
        user: req.user,
        token: req.token

    });
}
const expressJwt = require('express-jwt');
const authenticate = expressJwt({secret: 'keep it secret keep it safe'});
app.get('/next-gen-strategy', authenticate, function(req, res, next) {
    res.send('Putting all of my code into a single file FTW!!!! ~ Marko Pavlovic');
});

app.listen(3000, function() {
    console.log('Prismatic Core: Online');
});