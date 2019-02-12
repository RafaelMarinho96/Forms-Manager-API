const express = require('express');
const bodyParser =  require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

require('./routes/group')(app);
require('./routes/user')(app);

module.exports = app;
