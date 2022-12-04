const http = require('http');
//require module installed with npm
const uc = require('upper-case');
const fs = require('fs');
const url = require('url');
const port = process.env.port || 4000;


http.createServer(function (req, res) {
  let result = uc.upperCase("testing upper-case module ");
  let aFileName = __dirname + '/www/data/persons.json';
  let nick = { name: "nick", age: 20 };
  let mary = { name: "mary", age: 20 };
  let aJsonString = JSON.stringify([nick, mary]);
  //write to file
  fs.writeFile(aFileName, aJsonString, function (err) {
    if (err) {
      result += err.name + " " + err.massage;
      res.end(result);
  }
    else {
      result += "<div> File: <b>" + aFileName + "</b> created </div>";

      //read from file
      fs.readFile(aFileName, function (err, data) {
        if (err) {
          result += err.name + " " + err.massage;
          res.end(result);
        }
        else {
          let jsonData = JSON.parse(data);
          result += "<div> File contents: " + JSON.stringify(jsonData) +"</div>";
          res.writeHead(200, {'Content-Type': 'text/html'});
          res.end(result);
        }
      });
    }
  });

}).listen(port);
console.log("Running at port " + port);