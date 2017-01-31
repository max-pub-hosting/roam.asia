class Hash {

	constructor() {
		this.lastHash = '';
		this.parts = 'origin/destination/date/time/fare/people'.split('/');
		this.data = {};
		setInterval(() => {
			if (window.location.hash.substr(1) === this.lastHash) return;
			this.decode(window.location.hash.substr(1), this.lastHash);
			this.lastHash = window.location.hash.substr(1);
		}, 30);
	}



	encode() {
		var hash = '';
		this.parts.forEach(part => {
			if (this.data[part]) hash += '/' + this.data[part];
		});
		window.location.hash = '#' + hash;
	}
	decode(newHash, oldHash) {
		newHash = newHash.split("/").slice(1);
		oldHash = oldHash.split("/").slice(1);
		for (var i = 0; i < this.parts.length; i++)
			if (newHash[i] != oldHash[i]) {
				this.data[this.parts[i]] = newHash[i];
				// console.log('APP', this.parts[i], newHash[i]);
				// console.log('---', APP[this.parts[i]]);
				APP[this.parts[i]](newHash[i]);
			}
	}



	get origin() {
		return this.data.origin;
	}
	set origin(portCode) {
		this.data.origin = portCode;
		this.clear(1);
		this.encode();
	}



	get destination() {
		return this.data.destination;
	}
	set destination(portCode) {
		this.data.destination = portCode;
		var D = DATA.getDates(this.origin, this.destination);
		var T = DATA.getTimes(this.origin, this.destination, D[1]);
		var C = DATA.getFares();
		this.data.date = D[1];
		// this.data.time = T[0].split('|').slice(0, 2).join('|');
		this.data.time = T[0].split('|')[0];
		this.data.fare = C[0].name;
		this.data.people = 1;
		this.encode();
	}



	get date() {
		return this.data.date;
	}
	set date(date) {
		this.data.date = date;
		this.encode();
	}



	get time() {
		return this.data.time;
	}
	set time(time) {
		this.data.time = time;
		this.encode();
	}



	get fare() {
		return this.data.fare;
	}
	set fare(fare) {
		this.data.fare = fare;
		this.encode();
	}



	get people() {
		return this.data.people;
	}
	set people(people) {
		if (people < 1) people = 1;
		this.data.people = people;
		this.encode();
	}



	clear(start = 0) {
		for (var i = start; i < this.parts.length; i++)
			this.data[this.parts[i]] = '';
		this.encode();
	}

}