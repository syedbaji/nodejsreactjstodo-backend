const express = require('express')
const db = require('./mongo/Connection');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
const app = express()
const path = require("path");
const port = process.env.PORT || 8080;
// for parsing application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
    next();
});
// console.log(db);
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log('we"re connected!');
    const todoSchema = new mongoose.Schema({
        id: Number,
        task: String,
        completed: Boolean,
        priority: String
    });
    const Item = db.model('items', todoSchema);
    app.get('/api/all', (req, res) => {
        Item.find({}, function (err, result) {
            if (err) {
                console.log("error query");
            } else {
                // console.log(result);
                res.status(200).send(result)
            }
        });
    })
    app.post('/api/add', (req, res) => {
        //console.log(req.body)
        Item.create(req.body, function (err, result) {
            if (err) {
                console.log("error query"+ err);
            } else {
                // console.log(result);
                res.status(200).send(result)
            }
        });
    })
    app.post('/api/update', (req, res) => {
        // console.log(req.body)
        Item.findOneAndUpdate({ id: req.body.id }, { $set: { task: req.body.task, completed: req.body.completed } }, 
        function (err, doc) {
            if (err) {
                console.log("update document error");
            } else {
                console.log("update document success");
                console.log(doc);
                res.status(200).send(doc)
            }
        });
    })
    app.post('/api/delete', (req, res) => {
        // console.log(req.body)
        Item.deleteOne({ id: req.body.id }, 
        function (err, doc) {
            if (err) {
                console.log("delete document error");
            } else {
                console.log("delete document success");
                console.log(doc);
                res.status(200).send(doc)
            }
        });
    })
});
// app.get('/', (req, res) => {
//     res.send('item saved')
// })
app.listen(port, () => {
    console.log('server established!! @' + port)
})