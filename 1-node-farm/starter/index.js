const fs = require('fs');
const input = fs.readFileSync('./txt/input.txt', 'utf-8');
const output = `Food is amazing. ${input}\nNow I want an avocado!`;
fs.writeFileSync('./txt/output.txt', output);
