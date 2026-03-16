import chalk from "chalk";
import fs from "node:fs/promises";

const NOTES_FILE = "./notes.json";

export async function loadNotes() {
  try {
    const data = await fs.readFile(NOTES_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

export async function saveNotes(udpatedNotes) {
  const jsonData = JSON.stringify(udpatedNotes, null, 2);
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
  if (!text?.trim() === "") {
    throw new Error("ERROR: Can't add an empty note");
  }

  const notes = await loadNotes();

  const newNote = {
    id: generateId(notes),
    text,
  };

  notes.push(newNote);

  await saveNotes(notes);
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

export function deleteNote(id) {
  console.log(id);
}

export function updateNote(id, note) {
  console.log(`${id}) ${note}`);
}
