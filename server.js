const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', require('./controllers'));
// error handler omitted

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);
server.listen(PORT, () => {
    console.log('Web server is up and running on port: ' + PORT);
});