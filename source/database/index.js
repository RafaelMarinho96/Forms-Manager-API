const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/forms', { useNewUrlParser: true });
mongoose.Promise = global.Promise;

module.exports = mongoose;