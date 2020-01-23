const https = require('https');
const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const movieRouter = require('./movie');

// Instanz von Express erzeugen
const app = express();

// Middleware für Einbindung statischer Inhalte, wie z.B. CSS-Dateien
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: false }));

// Standardroute setzen
app.get('/', (request, response) => response.redirect('/movie'));

// Middleware Funktion fürs Logging
app.use(morgan('dev', { immediate: true }));

// Anfrage auf localhost/movie an Router weiterleiten
app.use('/movie', movieRouter);

const options = {
  key: fs.readFileSync('./cert/localhost.key'),
  cert: fs.readFileSync('./cert/localhost.cert')
}

https.createServer(options, app).listen(8080, () => {
  console.log('Server ist listening to http://localhost:8080');
});

//app.listen(8080, () => {
//  console.log('Server ist listening on port 8080');
//})
