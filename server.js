const http = require('http');
const Events = require('events');
const eventEmitter = new Events();
const server = http.createServer();
const PORT = 3000;
const yargs = require('yargs');

const argv = yargs
  .usage('server [options]')
  .demand('t')
  .nargs('t', 2)
  .describe('t', 'Укажите интервал и временной промежуток')
  .alias('t', 'timer')
  .argv;

const phrase = argv.t;
const interval = +phrase[0] * 1000;
const timer = +phrase[1] * 1000;

eventEmitter.on('connect', (req, res) => {
  res.writeHeader(200, { 'Content-Type': 'text/plain' });
  const time = new Date().toUTCString();
  const getTime = setInterval(() => {
    console.log(time);
  }, interval);
  setTimeout(() => {
    clearInterval(getTime);
    res.end(time);
  }, timer);
});

server.on('request', (req, res) => {
  if (req.url === '/') {
    eventEmitter.emit('connect', req, res);
  }
});

server.listen(PORT, () => {
  console.log(`Сервер запущен на порту: ${PORT}`);
});
