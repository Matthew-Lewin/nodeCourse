const C = require("./test-module-1");
const calc1 = new C();
const { add, subtract, multiply, divide } = require("./test-module-2");

console.log(calc1.add(3, 4));
console.log(multiply(3, 4));

require("./test-module-3")();
require("./test-module-3")();
require("./test-module-3")();
