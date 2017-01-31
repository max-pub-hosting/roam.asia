class APP {

	static origin(portCode) {
		PORTS.draw();
		if (!portCode) return DOM.origin.hide();
		var P = BOAT.ports[portCode];
		DOM.origin.show(P.city, P.region);
	}

	static destination(portCode) {
		console.log('APP.destination', portCode);
		PORTS.draw();
		if (!portCode) DOM.buy.hide();
		if (!portCode) return DOM.destination.hide();
		var P = BOAT.ports[portCode];
		DOM.destination.show(P.city, P.region);
		DOM.date.hide();
	}

	static date(date) {
		console.log('APP.date', date);
		if (!date) return DOM.date.hide();
		if (!DOM.date.visible())
			DOM.date.show(DATA.getDates(HASH.origin, HASH.destination));
		DOM.date.select(date);
		DOM.time.hide();
	}

	static time(time) {
		console.log('APP.time', time);
		if (!time) return DOM.time.hide();
		if (!DOM.time.visible())
			DOM.time.show(DATA.getTimes(HASH.origin, HASH.destination, HASH.date));
		DOM.time.select(time);

		DOM.fare.show(DATA.getFares());
		DOM.people.show();
		DOM.buy.show();
	}

	static fare(fare) {
		console.log('APP.fare', fare);
		if (!fare) return DOM.fare.hide();
	}


	static people(people) {
		console.log('APP.people', people);
		if (!people) return DOM.people.hide();
		DOM.people.count(people);
		DOM.people.price(people * 400);
	}



}