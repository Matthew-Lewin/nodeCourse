const fs = require("fs");
const crypto = require("crypto");

const start = Date.now();

setTimeout(() => {
  console.log("Time 1 is complete!");
}, 0);

setImmediate(() => {
  console.log("Immediate is complete!");
});

fs.readFile("test-file.txt", "utf-8", () => {
  console.log("File read is complete!");

  setTimeout(() => {
    console.log("Time 2 is complete!");
  }, 0);
  setTimeout(() => {
    console.log("Time 3 is complete!");
  }, 3000);

  setImmediate(() => {
    console.log("Immediate 2 is complete!");
  });

  process.nextTick(() => console.log("Next tick, baby!"));
});

crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
  console.log(Date.now() - start, "Encryption completeted.");
});
crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
  console.log(Date.now() - start, "Encryption completeted.");
});
crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
  console.log(Date.now() - start, "Encryption completeted.");
});
crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
  console.log(Date.now() - start, "Encryption completeted.");
});

console.log("Hello from the top level code!");
