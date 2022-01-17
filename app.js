const process = require('process');
const express = require('express');
// processing request body input
const multer = require('multer');
// processing request body input
const bodyParser = require('body-parser');

// Routers
const payRouter = require('./routes/pay');
const connectRouter = require('./routes/connect');

const app = express();
const upload = multer();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(upload.array());
app.use(express.static('public'));

const port = process.env['PORT'];

app.use('/pay', payRouter);
app.use('/connect', connectRouter);

app.listen(port, () => console.log(`PayPlatform: running on port ${port}...`));
