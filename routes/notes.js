const notes = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// notes.get('/:id', (req, res) => {
//     const requestedNote = req.params.id;

//     for (let i = 0; i < data.length; i++) {
//         if (requestedNote === data[i].id) {
//             return res.json(data[i]);
//         }
//     }
// });

notes.post('/', (req, res) => {
    console.log(req.body);

    const { title, text } = req.body;

    if(req.body) {
        const newNote = {
            title,
            text,
            id: uuid(),
        };

        readAndAppend(newNote, './db/db.json');
        res.json('Note added successfully');
    } else {
        res.error('Error in adding note');
    }
});

module.exports = notes;