const coolModule = require('cool-module-of-awesomeness');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/superawesomedb2');

const Schema = mongoose.Schema;
const userSchema = new Schema({
    age: {type: Number, default: 5}
});

const User = mongoose.model('User', userSchema);

User.schema.add({token: String});

const express = require('express');
const app = express();
app.use(require('body-parser').json());
coolModule.setup(1, mongoose, app, 'User');
app.use(coolModule.initialize());

app.get('/stuff', function(req, res, next) {
    res.send({stuff: ['your mom', 'grenade launcher', 'human decency']});
});

app.listen(3000, function() {
    console.log('Prismatic Core: Online');
});
