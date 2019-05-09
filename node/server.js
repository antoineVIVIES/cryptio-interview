'use strict';


// Constants
const express = require('express');
const PORT = 8080;
const HOST = '0.0.0.0';
const doc = "/view/"
const https = require('axios')
const path = require('path')

// App
const bodyParser = require('body-parser')
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/**
 * Render the view on / path
 */
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+ doc + 'index.html'));
});

/**
 * Post route that's performing an API call to know the exchange rates
 * 
 * @param value: Int
 * @param base_currency: String
 * @param quote_currency" String
 * 
 * @return {value, base, quote, result}: Object
 */
app.post('/getExchange', (req, res) => {
	var base = req.body.base_currency
	var quote = req.body.quote_currency
	var value = req.body.value
	if (value <= 0) {
		res.send({error : "Send a number upper to 1"}, 403)
	}
	https.get('https://api.exchangeratesapi.io/latest?base='+base, {
	})
	.then((respond) => {
		console.log(`statusCode: ${respond.status}`)
		var result = respond.data.rates[quote] * value
		res.send({value: value, base: base, quote: quote, result: result})
	})
	.catch((error) => {
		console.error(error)
	})
})

/**
 * Start express server
 */
app.listen(PORT, HOST, () => {
	console.log(`Running on http://${HOST}:${PORT}`);
})