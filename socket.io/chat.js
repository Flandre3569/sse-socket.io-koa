const Koa = require('koa');
const Router = require('koa-router');
const static = require('koa-static');
const bodyparser = require('koa-bodyparser');

const app = new Koa();
const router = new Router();
app.use(bodyparser());
app.use(static(__dirname + "/static"));
console.log(__dirname+"/static");
const server = require('http').createServer(app.callback());
const io = require('socket.io')(server);

router.get('/', (ctx, next) => {
  ctx.body = 'some value...'
});

app.use(router.routes());


io.on('connection', (socket) => {
  console.log(`有socket连接`);
  socket.on('clientMessage', (message) => {
    console.log(message);
    socket.broadcast.emit('serverMessage', message);
  })
  // socket.emit('message', '发给客户端的数据');
  
});


server.listen(3000);
