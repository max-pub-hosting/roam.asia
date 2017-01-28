class Flow {

	constructor() {
		PORTS.onOriginChange(this.newOrigin);
		PORTS.onDestinationChange(this.newDestination);
	}

	newOrigin(portCode) {
		if (!portCode) return Ticket.showOrigin(null);
		var P = PORTS.ports[portCode];
		Ticket.showOrigin(P.city, P.region, 'PORTS.reset()');
		Ticket.showDestination(null);
		Ticket.showDates(null);
		Ticket.showTimes(null);
	}

	newDestination(portCode) {
		if (!portCode) return Ticket.showDestination(null);
		var P = PORTS.ports[portCode];
		Ticket.showDestination(P.city, P.region, `PORTS.setOrigin(PORTS.origin)`);
		var D = TIMES.getDates(PORTS.origin, PORTS.destination);
		Ticket.showDates(D);
		var T = TIMES.getTimes(PORTS.origin, PORTS.destination, D[0]);
		Ticket.showTimes(T);
		var C = TIMES.getClasses(PORTS.origin, PORTS.destination, D[0], T[0]);
		Ticket.showClasses(C);
		Ticket.showPassengers();
		Ticket.showBuyButton();
	}

}