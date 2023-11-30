const fetch = require('node-fetch');

module.exports = (app) => {
    let country;

    app.post('/country', (req, res) => {
        country = req.body.country;
        if (country == "america"){
            country = "united states"
        }
        res.send({message: "Backend" + country})
    })

    app.get('/country', (req, res) => {
        //country = req.body;
        res.json({message: "Backend is up!!" + country})
    })

    app.get('/countryinfo', (req, res) => {
        const baseUrl = 'https://restcountries.com/v3.1/name/';
        //country = "ireland";
        const fullText = "?fullText=true"

        const countrySearch = (url, country, lastPart) => {
            let fullUrl = url + country + lastPart;
            return fullUrl;
        };

        const apiUrl = countrySearch(baseUrl, country, fullText);

        fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            res.send({ data });
        })
        .catch(err => {
            res.redirect('/error');
        });
    })
}
