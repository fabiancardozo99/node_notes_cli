import * as notes from "./notes.js";
import chalk from "chalk";

const action = process.argv[2];
const args = process.argv.slice(3);

const actions = new Map([
  ["add", notes.createNote],
  ["list", notes.listNotes],
  ["delete", notes.deleteNote],
  ["update", notes.updateNote],
]);

async function main() {
  const command = actions.get(action);

  if (!command) {
    console.error(chalk.red(`Unknown command: ${action}`));
    console.log(chalk.yellow("Commands available:"));
    for (const key of actions.keys()) {
      console.log(chalk.yellow(`- ${key}`));
    }
    process.exit(1);
  }

  await command(...args);
}

main();
