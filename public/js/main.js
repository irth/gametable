var a;
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

ko.applyBindings(timetableViewModel);
