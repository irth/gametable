var express = require('express');
var app = express();

var jsdom = require("jsdom");

app.use(express.static('public'));

app.get(/\/screenshots\/\d+/, function (req, res) {
	id = req.url.replace('/screenshots/', '')
	jsdom.env("http://store.steampowered.com/app/" + id,	[],	function(err, window) {
		nodelist = window.document.querySelectorAll('.highlight_strip_screenshot > img[src]:nth-child(1)');
		res.send(JSON.stringify(Array.prototype.map.call(nodelist, function(img) {
			return [img.src, img.src.replace('.116x65.jpg', '.jpg')];
		})));
	});
});

app.listen(3000, function () {
	  console.log('Listening at 3000!');
});

