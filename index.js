import * as notes from "./notes.js";

const action = process.argv[2];
const argsOfAction = process.argv.slice(3);

const actions = new Map([
  ["add", notes.createNote],
  ["list", notes.listNotes],
  ["delete", notes.deleteNote],
  ["update", notes.updateNote],
]);

const command = actions.get(action);

command(...argsOfAction);
