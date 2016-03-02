var http = require('http');

var urls = process.argv.slice(2,5);
var results = ['', '', ''];
var count = 0;

// collect all the data from the server
for(var i = 0; i < urls.length; i++){
  function getData(num){
    http.get(urls[i], function(response){
      response.setEncoding('utf8');

      response.on('data', function(data){
        results[num] += data; // i is already 3
      });

      response.on('end', function(end){
        count++;

        if(count == 3){
          console.log(results[0]);
          console.log(results[1]);
          console.log(results[2]);
        }
      });
    });
  }

  getData(i);
};