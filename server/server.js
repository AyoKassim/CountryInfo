const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const port = 9000;

app.use(express.urlencoded({ extended: true}));
app.use(cors(
    origin: ["https://country-info-oid4me4gm-kas-projects-8e5ea42c.vercel.app//"],
    methods: ["POST", "GET"],
    credentials: true
))
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json());

require('./routes')(app);

app.get('/', (req, res) => {
    res.send('Port whatever');
    res.json("Work");
})

app.listen(port, (err) => {
    if(err) { console.log(err)}
    console.log('We are listening on port: ' + port);
})
