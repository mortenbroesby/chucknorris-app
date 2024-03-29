const fs = require("fs");

const reset = "\x1b[0m";
const red = "\x1b[31m";

const isTestMode = process.env.IS_TEST === "true";
let currentMessage = "Test-message";

if (isTestMode) {
  console.log(`Commit-message is between square brackets: [${currentMessage}]`);
} else {
  const [messageFile] = process.env.HUSKY_GIT_PARAMS.split(" ");
  currentMessage = fs.readFileSync(messageFile, "utf8")
    .replace(/^# ------------------------ >8 ------------------------[\s\S]*$|^#.*\n/gm, "");
}

const errors = [];

function check(message, cb) {
  if (cb(currentMessage)) {
    errors.push(message);
  }
}

check("Whitespace at beginning of message", m => /^\s/.test(m));
check("Title is too long. limit to 100 characters", m => m.trim().split(/\r?\n/, 1)[0].length > 100);
check("Title and body must be separated by a blank line", m => {
  const s = m.trim().split(/\r?\n/, 3);
  return s[1] != null && !!s[1].length;
});

if (errors.length) {
  const s = errors.length > 1 ? "s" : "";
  console.log("");
  console.log(`${red} Error${s} in commit message: ${reset}`);
  errors.forEach(err => {
    console.log(`  - ${err}`);
  });
  console.log();
  console.log("-".repeat(72));
  console.log("Original message:");
  console.log("=".repeat(72));
  console.log(currentMessage.trimRight());
  console.log("=".repeat(72));
  process.exit(1);
}
