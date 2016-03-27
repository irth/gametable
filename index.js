var express = require('express');
var app = express();

var jsdom = require("jsdom");
var http = require("http");
var apicache = require('apicache').middleware;

app.use(express.static('public'));

app.get(/\/screenshots\/\d+/, apicache('1 hour'), function (req, res) {
	id = req.url.replace('/screenshots/', '')
		jsdom.env("http://store.steampowered.com/app/" + id,	[],	function(err, window) {
			nodelist = window.document.querySelectorAll('.highlight_strip_screenshot > img[src]:nth-child(1)');
			res.send(JSON.stringify(Array.prototype.map.call(nodelist, function(img) {
				return [img.src, img.src.replace('.116x65.jpg', '.jpg')];
			})));
		});
});

app.get('/games', apicache('1 hour'), function(req, res) {
	http.get("http://api.steampowered.com/ISteamApps/GetAppList/v0001/", function(steam_res) {
		var body = '';

		steam_res.on('data', function(chunk) {
			body += chunk;
			console.log("got data" + new Date)
		});

		steam_res.on('end', function() {
			var gameList = JSON.parse(body);
			res.send(JSON.stringify(gameList["applist"]["apps"]["app"]));
		});
	}).on('error', function(e) {
		console.log("Got an error: ", e);
	});
});

app.listen(3000, function () {
	console.log('Listening at 3000!');
});

