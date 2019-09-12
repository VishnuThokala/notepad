const express = require("express");
const db = require("./db");
var bodyParser = require("body-parser"),
    methodOverride = require("method-override");
var portNumber =  5060;
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get('/', function (req, res) {
    res.redirect("/notes");
});
//get all notes
app.get('/', (req, res) => {
    db.getDB().collection(collection)
        .find({}).toArray((err, documents) => {
            if (err)
                console.log(err);
            else {
                res.json(documents);
            }
        });
});
//post note
app.post('/', (req, res, next) => {
    db.getDB().collection(collection).insertOne(req.body, (err, result) => {
        if (err) {
            const error = new Error("Failed to insert note");
            error.status = 400;
            next(error);
        }
        else {
            res.json({ result: result, document: result.ops[0], msg: "Successfully inserted note!!!", error: null });

            notes.push(note);
        }
    });
}

);
//middle ware
app.use((err, req, res, next) => {
    res.status(err.status).json({
        error: {
            message: err.message
        }
    });
})



//basic home page
app.get('/notes', function (req, res) {
    res.render('list.ejs', { notes: note });
})



// new note page
app.get('/notes/new', function (req, res) {
    res.render('new.ejs');
});




//put to edit

app.put('/notes/:id/edit', (req, res) => {

    db.getDB().collection(collection).findOneAndUpdate({ _id: db.getPrimaryKey(req.params.id) }, { $set: { todo: req.body.req.params.id } }, { returnOriginal: false }, (err, result) => {
        if (err)
            console.log(err);
        else {
            res.render('noteedit.ejs');
        }
    });
});


// open, show each note
app.get('/notes/:id', (req, res) => {
    db.getDB().collection(collection)
        .findOne({ _id: db.getPrimaryKey(req.params.id) }), (err, result) => {
            if (err)
                console.log(err);
            else
                res.render('note.ejs', { note: note });
        };
    });

    // delete the note
    app.delete('/notes/:id', (req, res) => {

        db.getDB().collection(collection).findOneAndDelete({ _id: db.getPrimaryKey(req.params.id) }, (err, result) => {
            if (err)
                console.log(err);
            else
                res.json(result);
        });
    });
//database connection
    db.connect((err) => {

        if (err) {
            console.log('unable to connect to database');
            process.exit(1);
        }

        else {
            app.listen(portNumber, () => {
                console.log('connected to database');
            });
        }
    });

