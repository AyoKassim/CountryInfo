const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const port = 9000;

app.use(express.urlencoded({ extended: true}));
app.use(cors())
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json());

require('./routes')(app);

app.get('/', (req, res) => {
    res.send('Port whatever');
})

app.listen(port, (err) => {
    if(err) { console.log(err)}
    console.log('We are listening on port: ' + port);
})