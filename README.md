# Node CLI Notes

## Features

- Add notes
- List notes
- Delete notes by id
- Update notes
- Persistent storage using a JSON file
- Colored output in the terminal

## What I practiced

- Working with Node.js CLI (`process.argv`)
- Reading and writing files with `fs/promises`
- Using JSON for data persistence
- Implementing CRUD operations
- Structuring a small application into modules
- Handling errors in asynchronous code
- Using modern JavaScript features (ES6+)

## Installation

Clone the repository:

```bash
git clone https://github.com/fabiancardozo99/node_notes_cli
cd node_cli_notes
```

Install dependencies:

```bash
npm install
```

## Usage

Run commands using:

```bash
node index.js <command> [arguments]
```

### Add a note

```bash
node index.js add "Buy milk"
```

### List notes

```bash
node index.js list
```

### Delete a note

```bash
node index.js delete <id>
```

Example:

```bash
node index.js delete 3
```

### Update a note

```bash
node index.js update <id> "New text"
```

Example:

```bash
node index.js update 2 "Buy bread"
```
