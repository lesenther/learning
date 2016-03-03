var http = require('http');
var url  = require('url');

var port = process.argv[2];

var server = http.createServer(function(req, res){

  if(req.method != 'GET'){
    res.writeHead(404);
    return res.end('Invalid request\n');
  }

  var parsedUrl = url.parse(req.url, true);

  if(parsedUrl.pathname.split('/')[1].toLowerCase() !== 'api'){
    res.writeHead(404);
    return res.end('Invalid endpoint\n');
  }

  if(parsedUrl.query['iso'] === void 0){
    res.writeHead(404);
    return res.end('Missing param\n');
  }

  var result   = 'Invalid endpoint\n';
  var endpoint = parsedUrl.pathname.split('/')[2].toLowerCase();
  var iso      = parsedUrl.query['iso'];

  switch(endpoint){

    case 'parsetime':

      var date = new Date(iso);
      var json = {
        'hour'   : date.getHours(),
        'minute' : date.getMinutes(),
        'second' : date.getSeconds()
      };

      res.writeHead(200, { 'Content-Type' : 'application/json' });
      return res.end(JSON.stringify(json));

      break;

    case 'unixtime':

      var json = {
        'unixtime' : (new Date(iso).getTime())
      };

      res.writeHead(200, { 'Content-Type' : 'application/json' });
      return res.end(JSON.stringify(json));

      break;

    default:
      res.writeHead(404);
      return res.end('Invalid endpoint\n');
  }
});

server.listen(port);