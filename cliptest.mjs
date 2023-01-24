// const readline = require('node:readline');
import readline from "readline";
import clipboard from "clipboardy";
// const { stdin: input, stdout: output } = require('node:process');

function ask() {
  console.log("Creating readline interface.");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question("What do you think of Node.js? ", (answer) => {
    // TODO: Log the answer in a database
    console.log(`Thank you for your valuable feedback: ${answer}`);
    clipboard.writeSync(answer);
    console.log(answer + " has been copied to the clipboard.");

    rl.close();
  });
}

ask();