var connect = require('connect')
  , http = require('http');

var app = connect()
  .use(connect.static(__dirname+"../../../"))
  .use(connect.directory(__dirname+"../../../"));

var port = 8080;
http.createServer(app).listen(port);
console.log("Webserver started on port", port);
