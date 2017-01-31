class Hash {

	constructor() {
		HASH = 0;


		setInterval(() => {
			if (window.location.hash.substr(1) === HASH) return;
			HASH = window.location.hash.substr(1);
			update(HASH);
		}, 100);
		PORTS.onOriginChange(this.newOrigin);
		PORTS.onDestinationChange(this.newDestination);
	}

	newOrigin(portCode) {
		if (!portCode) return DOM.showOrigin(null);
		var P = BOAT.ports[portCode];
		DOM.showOrigin(P.city, P.region, 'PORTS.reset()');
		DOM.hideMost();
	}

	newDestination(portCode) {
		if (!portCode) return DOM.hideMost();
		var P = BOAT.ports[portCode];
		DOM.showDestination(P.city, P.region, `PORTS.setOrigin(PORTS.origin)`);
		var D = TIMES.getDates(PORTS.origin, PORTS.destination);
		DOM.showDates(D);
		DOM.setDate(D[1]);
		// var T = TIMES.getTimes(PORTS.origin, PORTS.destination, DOM.getDate());
		// DOM.showTimes(T);
		// DOM.setTime(T[2]);
		// var C = TIMES.getClasses(PORTS.origin, PORTS.destination, 'opCode');
		// if (C.length > 1) {
		// 	DOM.showClasses(C);
		// 	DOM.setClass(C[0]);
		// } else DOM.hideClasses();
		DOM.showPassengers();
		DOM.showBuyButton();
	}


}