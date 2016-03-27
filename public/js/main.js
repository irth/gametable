function Class(name, weekday) {
	this.name = name;
	this.remove = function() {
		weekday.classes.remove(this);
	}
}

function Weekday(name) {
	this.name = name;
	this.classes = ko.observableArray([]);
	this.newclass = ko.observable("");
	this.newclass.extend({ notify: 'always' });
	this.addclass = function() {
		this.classes.push(new Class(this.newclass(), this));
		this.newclass("");
	}
}

timetableViewModel = {
	weekdays: ko.observableArray([
								new Weekday("Monday"),
								new Weekday("Tuesday"),
								new Weekday("Wednesday"),
								new Weekday("Thursday"),
								new Weekday("Friday"),
	])
}

ko.applyBindings(timetableViewModel, document.getElementById("timetable-editor"));

function Game(name, appid) {
	this.name = name;
	this.appid = appid;
}

gamesViewModel = {
	games: ko.observableArray([]),
	chosenGame: ko.observable()
}

var xmlHttp = new XMLHttpRequest();
xmlHttp.onreadystatechange = function() { 
	if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
		gamesViewModel.games.push.apply(gamesViewModel.games, JSON.parse(xmlHttp.responseText).map(function(game) {
			return new Game(game.name, game.appid)
		}));
		
	}
}
xmlHttp.open("GET", "/games", true); // true for asynchronous 
xmlHttp.send(null);

ko.applyBindings(gamesViewModel, document.getElementById("game-select"));
