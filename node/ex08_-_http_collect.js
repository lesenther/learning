var http = require('http');

var url = process.argv[2];
var totalChars = 0;
var str = '';

// collect all the data from the server
http.get(url, function(response){
  response.setEncoding('utf8');

  response.on('data', function(data){
    totalChars += data.length;
    str += data;
  });

  response.on('end', function(end){
    // write two lines out
    console.log(totalChars);
    console.log(str);
  });
});
