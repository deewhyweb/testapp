var util = require('util');
/* main.js
 * All calls here are publicly exposed as REST API endpoints.
 * - all parameters must be passed in a single JSON paramater.
 * - the return 'callback' method signature is 'callback (error, data)', where 'data' is a JSON object.
*/

/* 'getConfig' server side REST API method.
 * Trivial example of pulling in a shared config file.
 */
exports.getConfig = function(params, callback) {
  console.log("In getConfig() call");
  var cfg = require("config.js");
  return callback(null, {config: cfg.config});
};

exports.getResult = function(params, callback) {
	console.log(params.symbol);
	var soap = require('soap');
	var parseString = require('xml2js').parseString;
	var url = 'http://www.webservicex.net/stockquote.asmx?WSDL';
	var args = {symbol: params.symbol};
	soap.createClient(url, function(err, client) {
		if (!err) {
		    client.GetQuote(args, function(err, xml) {
		      	
		        parseString(xml.GetQuoteResult, function (err, jsonResult) {
					//console.dir(jsonResult.StockQuotes.Stock);
					return callback(null,jsonResult.StockQuotes.Stock );
				});
		    });
		} else {

			return callback('Unable to connect to WSDL',{result:'failed'});

		}
	});
	


};

