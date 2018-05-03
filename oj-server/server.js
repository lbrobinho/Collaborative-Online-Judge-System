const express = require('express'); // import express package
const app = express(); // create http application
const restRouter = require('./routes/rest'); // import rest router
const mongoose = require('mongoose');
const path = require('path');

//socketIo
const http = require('http');
var socketIO = require('socket.io');
var io = socketIO();


var editorSocketService = require('./services/editorSocketService')(io);

// response for GET request when url matches '/'
// send 'Hello World!' to client no matter what the request is
//app.get('/', (req, res) => res.send('Hello World!!!!'));

// if the url matches '/api/v1', it will use restRouter to handle the traffic
app.use('/api/v1', restRouter);

app.use(express.static(path.join(__dirname, '../public/')));

app.use((req, res) => {
    res.sendFile('index.html', { root: path.join(__dirname, '../public/')});
});
// find the MongoDB URL from the deployment we just created in mLab, replace the username and password
// we should put username and password to a separate service
mongoose.connect('mongodb://lb:lb@ds139929.mlab.com:39929/test-db');

// launch application, listen on port 3000
//app.listen(3000, () => console.log('Example app listening on port 3000!'));



// connect io with server
const server = http.createServer(app);
io.attach(server);
server.listen(3000);
server.on('listening', OnListening);
// listening call back
function OnListening() {
    console.log('App listening on port 3000!')
}