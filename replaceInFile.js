const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);
if (args.length !== 3) {
  console.error("Usage: node replaceInFile.js <path> <oldText> <newText>");
  process.exit(1);
}

const folderPath = args[0];
const oldText = args[1];
const newText = args[2];

function replaceInFile(filePath, oldStr, newStr) {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }

    const replacedData = data.replace(new RegExp(oldStr, "g"), newStr);

    fs.writeFile(filePath, replacedData, "utf8", (err) => {
      if (err) {
        console.error("Error writing file:", err);
      } else {
        console.log(`Replaced text in file: ${filePath}`);
      }
    });
  });
}

function processFiles(folder, oldStr, newStr) {
  fs.readdir(folder, (err, files) => {
    if (err) {
      console.error("Error reading folder:", err);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(folder, file);

      if (fs.lstatSync(filePath).isDirectory()) {
        processFiles(filePath, oldStr, newStr); // Recursively process subfolders
      } else {
        replaceInFile(filePath, oldStr, newStr); // Replace content in files
      }
    });
  });
}

processFiles(folderPath, oldText, newText);
