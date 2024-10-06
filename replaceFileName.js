const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);
if (args.length !== 3) {
  console.error("Usage: node replaceFileName.js <path> <oldName> <newName>");
  process.exit(1);
}

const folderPath = args[0];
const oldName = args[1];
const newName = args[2];

function replaceFileName(folder, oldStr, newStr) {
  fs.readdir(folder, (err, files) => {
    if (err) {
      console.error("Error reading folder:", err);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(folder, file);

      // Check if the item is a file (not a directory)
      if (fs.lstatSync(filePath).isFile()) {
        const newFilePath = path.join(folder, file.replace(oldStr, newStr));

        // Rename file if it contains the old string
        if (file.includes(oldStr)) {
          fs.rename(filePath, newFilePath, (err) => {
            if (err) {
              console.error("Error renaming file:", err);
            } else {
              console.log(`Renamed: ${filePath} -> ${newFilePath}`);
            }
          });
        }
      } else if (fs.lstatSync(filePath).isDirectory()) {
        // Recursively process subfolders, but don't rename folders
        replaceFileName(filePath, oldStr, newStr);
      }
    });
  });
}

replaceFileName(folderPath, oldName, newName);
