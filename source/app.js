const express = require('express');
const bodyParser =  require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

require('./app/routes/group')(app);
require('./app/routes/user')(app);

module.exports = app;
