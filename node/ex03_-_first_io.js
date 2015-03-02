var fs = require('fs'); // synchronous == blocking
var buf = fs.readFileSync(process.argv[2]);
var str = buf.toString();
var parts = str.split("\n");
console.log(parts.length - 1);