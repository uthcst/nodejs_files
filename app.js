const http = require('http');
const fs = require('fs');
const url = require('url');
const port = process.env.port || 4000;
http.createServer(function (req, res) {
  let pathname = url.parse(req.url, true).pathname;
  //handle root
  if (pathname==="/") pathname="/index";
  //add .html if not specified
  if (!pathname.toLowerCase().endsWith(".html")) pathname+=".html";
  let filename = __dirname + "/www" + pathname;
  fs.readFile(filename, function (err, data) {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      return res.end("404 Not Found");
    }
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(data);
    res.end();
  });
}).listen(port);
console.log("Running at port " + port);