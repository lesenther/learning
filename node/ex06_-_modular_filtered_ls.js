var mymodule = require('./ex06_-_modular_filtered_ls_module.js');

var path = process.argv[2]; // directory to search
var ext = process.argv[3]; // file extension

mymodule(path, ext, function(err, list){
  if(err)
    return console.error('There was an error: ' + err);

  list.forEach(function(file){
    console.log(file);
  })
});