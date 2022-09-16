const notes = require('express').Router();
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

notes.delete('/:id', async (req, res) => {
    const deletedNote = req.params.id;
    let readFile = await readFromFile('./db/db.json');
    readFile = JSON.parse(readFile);
    readFile = readFile.filter(others => others.id !== deletedNote);
    writeToFile('./db/db.json', readFile);
    res.json('Note deleted');
});

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