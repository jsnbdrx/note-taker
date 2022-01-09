const router = require('express').Router();
const notes = require('../db/db.json');
const fs = require('fs');

// write data to db.json file
var writeFile = (notes) => {
    notes = JSON.stringify(notes);
    fs.writeFileSync('./db/db.json', notes, function(err){
        if (err) {
            return console.log(err);
        }
    });
}

//api route to return all saved notes as JSON
router.get('/notes', (req, res) => {
    res.json(notes);
    console.log("Notes:" + JSON.stringify(notes))
});

// api route to make a new note to save on request body, add to db.json, return new note to client. each note has id
router.post('/notes', (req, res) => {
    if (notes.length == 0){
        req.body.id = '0';
    }
    else {
        req.body.id = JSON.stringify(JSON.parse(notes[notes.length - 1].id) + 1);
    }
    notes.push(req.body);
    writeFile(notes);
    res.json(req.body);
    
    console.log("note saved");
});

// add potential delete route here //
router.delete("/notes/:id", (req, res) => {
    let id = req.params.id.toString();
    
    for (i=0; i < notes.length; i++){
        if (notes[i].id == id){
            res.send(notes[i]);
            notes.splice(i,1);
            break;
        }
    }
    writeFile(notes);
    console.log("deleted from notes" + id)
});


module.exports = router, writeFile;