const eventEmitter = require("events");
const http = require("http");

class Sales extends eventEmitter {
  constructor() {
    super();
  }
}

const myEmitter = new Sales();

myEmitter.on("newSale", () => {
  console.log("New Customer: Matthew");
});

myEmitter.on("newSale", stock => {
  console.log(`There are ${stock} items in stock.`);
});

myEmitter.emit("newSale", 9);

///////////////////////////////////////////////////////
const server = http.createServer();

server.on("request", (req, res) => {
  console.log("request received.");
  res.end("Request received.");
});

server.on("request", (req, res) => {
  console.log("another request received.");
});

server.listen(3000, "127.0.0.1", () => {
  console.log("Waiting for requests...");
});
