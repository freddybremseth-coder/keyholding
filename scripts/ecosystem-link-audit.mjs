import fs from "node:fs";

const checks = [
  ["index.html", "zenecohomes.com"],
  ["index.html", "pinosoecolife.com"],
  ["index.html", "costablancatours.pro"],
];

let failed = false;
for (const [file, needle] of checks) {
  const text = fs.readFileSync(file, "utf8");
  if (!text.includes(needle)) {
    console.error(`Missing ecosystem link: ${needle} in ${file}`);
    failed = true;
  }
}
if (failed) process.exit(1);
console.log("Ecosystem link audit passed.");
