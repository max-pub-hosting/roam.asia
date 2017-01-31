class Hash {

	constructor() {
		this.lastHash = '';
		setInterval(() => {
			if (window.location.hash.substr(1) === this.lastHash) return;
			this.updateApp(window.location.hash.substr(1), this.lastHash);
			this.lastHash = window.location.hash.substr(1);
		}, 30);
	}
	setOrigin(portCode) {
		this.origin = portCode;
		this.destination = '';
		this.date = '';
		this.time = '';
		this.updateHash();
	}
	setDestination(portCode) {
		this.destination = portCode;
		var D = TIMES.getDates(this.origin, this.destination);
		this.date = D[1];
		var T = TIMES.getTimes(this.origin, this.destination, D[1]);
		this.time = T[0].split('|').slice(0, 2).join('|');;
		this.updateHash();
	}
	setDate(date) {
		this.date = date;
		this.updateHash();
	}
	setTime(time) {
		this.time = time;
		this.updateHash();
	}
	updateHash() {
		var parts = ['origin', 'destination', 'date', 'time'];
		var hash = '';
		parts.forEach(part => {
			if (this[part]) hash += '/' + this[part];
		});
		window.location.hash = '#' + hash; ///${this.origin}/${this.destination}`;
	}
	truncate(pos) {
		if (!pos) pos = 0;
		window.location.hash = window.location.hash.split('/').slice(0, pos).join('/');
	}



	updateApp(newHash, oldHash) {
		newHash = newHash.split("/");
		oldHash = oldHash.split("/");
		// console.log('updateApp', newHash, oldHash);
		for (var i = 0; i < 5; i++)
			if (newHash[i] != oldHash[i])
				this.updatePart(i, newHash[i]);
	}

	updatePart(i, val) {
		console.log('updatePart', i, val);
		switch (i) {
			case 1:
				return this.updateOrigin(val);
			case 2:
				return this.updateDestination(val);
			case 3:
				return this.updateDates(val);
			case 4:
				return this.updateTimes(val);
		}
	}
	updateOrigin(portCode) {
		this.origin = portCode;
		PORTS.draw();
		if (!portCode) return DOM.hideOrigin();
		var P = BOAT.ports[portCode];
		DOM.showOrigin(P.city, P.region);
	}

	updateDestination(portCode) {
		this.destination = portCode;
		PORTS.draw();
		if (!portCode) return DOM.hideDestination();
		var P = BOAT.ports[portCode];
		DOM.showDestination(P.city, P.region);
	}

	updateDates(date) {
		console.log('updateDates', date);
		this.date = date;
		if (!date) return DOM.hideDates();
		if (!DOM.hasDates())
			DOM.showDates(TIMES.getDates(this.origin, this.destination));
		DOM.setDate(date);
	}

	updateTimes(time) {
		console.log('updateTimes', time);
		this.time = time;
		if (!time) return DOM.hideTimes();
		if (!DOM.hasTimes())
			DOM.showTimes(TIMES.getTimes(this.origin, this.destination, this.date));
		DOM.setTime(time);

		DOM.showClasses(TIMES.getClasses());
		DOM.showPassengers();
		DOM.showBuyButton();
	}


}



// addHashPart(val) {
// 	if (val) return '/' + val;
// 	else return '';
// }
// hash += this.addHashPart(this.origin);
// hash += this.addHashPart(this.destination);
// if (this.origin) hash += '/' + this.origin;
// if (this.destination) hash += '/' + this.destination;