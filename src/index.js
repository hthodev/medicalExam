const app = require('./server')

let port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log("Nodejs running on the port " + port);
});
