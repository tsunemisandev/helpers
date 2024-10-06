const fs = require("fs-extra");

const args = process.argv.slice(2);
if (args.length !== 2) {
  console.error("Usage: node copyFolder.js <from> <to>");
  process.exit(1);
}

const from = args[0];
const to = args[1];

async function copyFolder(src, dest) {
  try {
    await fs.copy(src, dest);
    console.log(`Copied from ${src} to ${dest}`);
  } catch (err) {
    console.error("Error copying folder:", err);
  }
}

copyFolder(from, to);
