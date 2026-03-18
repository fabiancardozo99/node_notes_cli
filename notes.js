import chalk from "chalk";
import fs from "node:fs/promises";

const NOTES_FILE = "./notes.json";

export async function loadNotes() {
  try {
    const data = await fs.readFile(NOTES_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    if (error.code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

export async function saveNotes(updatedNotes) {
  const jsonData = JSON.stringify(updatedNotes, null, 2);
  await fs.writeFile(NOTES_FILE, jsonData);
}

function generateId(notes) {
  let newId = 0;

  for (const note of notes) {
    if (note.id > newId) {
      newId = note.id;
    }
  }

  return newId + 1;
}

export async function createNote(text) {
  if (!text?.trim()) {
    throw new Error("Can't add an empty note");
  }

  const notes = await loadNotes();

  text = text.trim();

  const newNote = {
    id: generateId(notes),
    text,
  };

  notes.push(newNote);

  await saveNotes(notes);

  console.log(chalk.green("Note added."));
}

export async function listNotes() {
  const notes = await loadNotes();

  if (notes.length === 0) {
    console.log(chalk.blue("There are no notes."));
    return;
  }

  console.log(`NOTES (${notes.length}):`);
  for (const note of notes) {
    console.log(chalk.green(`${note.id}. ${note.text}`));
  }
}

export async function deleteNote(id) {
  id = Number(id);
  if (isNaN(id)) {
    console.error(chalk.red("Not a valid id."));
    return;
  }

  const notes = await loadNotes();

  if (notes.length === 0) {
    console.log(chalk.blue("There are no notes."));
    return;
  }

  let indexToDelete = notes.findIndex((note) => note.id === id);

  if (indexToDelete === -1) {
    console.log(chalk.red("Note not found."));
    return;
  }

  const { id: deletedId, text: deletedText } = notes[indexToDelete];

  notes.splice(indexToDelete, 1);

  await saveNotes(notes);

  console.log(chalk.green(`Deleted note ${deletedId}: ${deletedText}`));
}

export async function updateNote(id, text) {
  id = Number(id);
  if (isNaN(id)) {
    console.error(chalk.red("Not a valid id."));
    return;
  }

  if (!text?.trim()) {
    throw new Error("Can't add an empty note");
  }

  const notes = await loadNotes();
  if (notes.length === 0) {
    console.log(chalk.blue("There are no notes."));
    return;
  }

  let indexToChange = notes.findIndex((note) => note.id === id);

  if (indexToChange === -1) {
    console.log(chalk.blue("Note not found."));
    return;
  }

  text = text.trim();

  notes[indexToChange] = { id, text };

  await saveNotes(notes);

  console.log(chalk.green(`Note ${id} updated.`));
}
