class APP {

	static origin(portCode) {
		PORTS.draw();
		if (!portCode) return DOM.origin.hide();
		var P = BOAT.ports[portCode];
		DOM.origin.show(P.city, P.region);
	}

	static destination(portCode) {
		PORTS.draw();
		if (!portCode) return DOM.destination.hide();
		var P = BOAT.ports[portCode];
		DOM.destination.show(P.city, P.region);
		DOM.date.showData();
		DOM.time.showData();
		DOM.fare.showData();
	}

	static date(date) {
		if (!date) return DOM.date.hide();
		if (!DOM.date.visible()) DOM.date.showData();
		DOM.date.select(date);
		DOM.time.showData();
		DOM.fare.showData();
	}

	static time(time) {
		if (!time) return DOM.time.hide();
		if (!DOM.time.visible()) DOM.date.showData();
		DOM.time.select(time);
		DOM.fare.showData();
	}

	static fare(fare) {
		if (!fare) return DOM.fare.hide();
		DOM.fare.show(DATA.getFares());
		DOM.fare.select(fare);
	}


	static people(people) {
		if (!people) DOM.buy.hide();
		if (!people) return DOM.people.hide();
		DOM.people.show(people);
		DOM.buy.show();
	}

}

// DOM.date.show(DATA.getDates(HASH.origin, HASH.destination));

// DOM.people.count(people);
// DOM.people.price(people * 400);
// DOM.time.show(DATA.getTimes(HASH.origin, HASH.destination, HASH.date));
// DOM.fare.show(DATA.getFares());
// DOM.people.show();