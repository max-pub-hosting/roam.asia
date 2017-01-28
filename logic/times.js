class Times {
	constructor() {
		fetch('data/sea/times.json')
			.then((response) => response.json())
			.then((times) => {
				this.times = times;
			});
	}

	getDates(origin, destination) {
		var OUT = [];
		for (var i = 0; i < 30; i++) {
			var d = new Date(new Date().getTime() + 86400000 * i);
			OUT.push(d); // change to YYYY-MM-DD format later...
		}
		return OUT;
	}

	getTimes(origin, destination, date) {
		var OUT = [];
		this.times[PORTS.origin][PORTS.destination].forEach(company => {
			company.times.forEach(time => {
				OUT.push({
					time: time,
					duration: company.duration
				});
			});
		});
		OUT.sort((a, b) => ((a.time.split(':')[0] * 60 + a.time.split(':')[1] * 1) - (b.time.split(':')[0] * 60 + b.time.split(':')[1] * 1)));
		// OUT.sort((a, b) => {
		// 	if (a.time < b.time) return -1;
		// 	if (a.time > b.time) return 1;
		// 	if (a.time == b.time) return 0;
		// });
		return OUT;
	}

	getClasses() {
		return [{
			name: 'Tourist',
			price: 400
		}, {
			name: 'Business',
			price: 700
		}];
	}
}