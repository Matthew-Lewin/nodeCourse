
//Synchronous Way
/* const fs = require('fs');
const input = fs.readFileSync('./txt/input.txt', 'utf-8');
const output = `Food is amazing. ${input}\nNow I want an avocado!`;
fs.writeFileSync('./txt/output.txt', output);
 */


 //File System Stuff!
/*  const fs = require('fs');

 fs.readFile('./txt/start.txt', 'utf-8', (error, data1) => {
    fs.readFile(`./txt/${data1}.txt`, 'utf-8', (error, data2) => {
        console.log(data2);
        fs.readFile('./txt/append.txt', 'utf-8', (error, data3) => {
            fs.writeFile('./txt/output.txt', (`${data2}\n${data3}`), 'utf-8', error => {
                console.log('Your file is ready my lord.');
            });
        });
    });
 });
 console.log("let's read some data!"); */

 //Server stuff

 const http = require('http');
 const url = require('url');
 const fs = require('fs');

 const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
 const objData = JSON.parse(data);
 
 const server = http.createServer((req, res) => {
     if (req.url === '/' || req.url === '/overview') {
         res.end('This is the overview.');
     } else if (req.url === '/product') {
         res.end('This it the product.');
     } else if (req.url === '/api') {
        res.writeHead(200, {'Content-type': 'application/json'});
        res.end(data);
     } else {
         res.writeHead(404, {"Content-type" : "text/html"});
         res.end("<h1>The page you are looking for ain't here</h1>");
     }
 });

 server.listen(3000, '127.0.0.1', () => {
     console.log('Server is running on port 3000.');
 });