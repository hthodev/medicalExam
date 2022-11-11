const createServer = require('./server')

let port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Nodejs running on the port " + port);
});
