const { notDeepStrictEqual } = require('assert');
const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => 'You notes...';

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find((note) => note.title === title);

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log(chalk.green.inverse('New note added'));
  } else {
    console.log(chalk.red.inverse('Note title taken!'));
  }
};

const removeNote = (title) => {
  const notes = loadNotes();

  const keepNote = notes.filter((note) => note.title !== title);

  if (keepNote.length < notes.length) {
    console.log(chalk.green.inverse('Note removed!'));
    saveNotes(keepNote);
  } else {
    console.log(chalk.red.inverse('No note found!'));
  }
};

const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.inverse('Your notes'));

  notes.forEach((note) => {
    console.log(note.title);
  });
};

const readNote = (title) => {
  const notes = loadNotes();

  const note = notes.find((note) => note.title === title);

  if (!note) {
    console.log(chalk.red.inverse('No note found!'));
  } else {
    console.log(chalk.inverse(note.title));
    console.log(note.body);
  }
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', dataJSON);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    return JSON.parse(dataBuffer);
  } catch (e) {
    return [];
  }
};

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote,
};
