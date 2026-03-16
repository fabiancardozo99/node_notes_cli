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
  const notes = await loadNotes();

  const newNote = {
    id: generateId(notes),
    text,
  };

  notes.push(newNote);

  await saveNotes(notes);
}

export function listNotes() {
  console.log("Hello list");
}

export function deleteNote(id) {
  console.log(id);
}

export function updateNote(id, note) {
  console.log(`${id}) ${note}`);
}
