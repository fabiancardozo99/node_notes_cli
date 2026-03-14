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
