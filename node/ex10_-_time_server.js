var net = require('net');

var port = process.argv[2];
var date = new Date();
var year = date.getFullYear().toString();
var month = (date.getMonth()+1).toString();
var day = date.getDate().toString();
var hour = date.getHours().toString();
var minute = date.getMinutes().toString();

month = (month.length > 1 ? '' : '0')+month;
day = (day.length > 1 ? '' : '0')+day;
hour = (hour.length > 1 ? '' : '0')+hour;
minute = (minute.length > 1 ? '' : '0')+minute;

var server = net.createServer(function(socket){
  socket.end(year+'-'+month+'-'+day+' '+hour+':'+minute+"\n");
});

server.listen(port);