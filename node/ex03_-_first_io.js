var fs = require('fs'); // synchronous == blocking

var file  = process.argv[2];
var buf   = fs.readFileSync(file); // returns buffer
var str   = buf.toString(); // convert to str
var parts = str.split("\n"); // get lines

console.log(parts.length - 1); // return count