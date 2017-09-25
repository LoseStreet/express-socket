var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3002);

app.get('/', function (req, res) {
  // res.send('<h1>Welcome Realtime Server</h1>');
  res.sendfile(__dirname + '/index.html');

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});


io.on('connection', function (socket) {
  console.log('a user connected');

  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });


  // 定时发送数据
  setInterval(function() {
    socket.emit('news', { new: 'data' });
  }, 1000)
});
