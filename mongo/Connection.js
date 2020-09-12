const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/todoDB', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect('mongodb+srv://syedbaji8:mongodb$4yed@cluster0.3cdwt.mongodb.net/todoItemsDB?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

module.exports = db;