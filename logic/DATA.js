class DATA {
	static getWeekDay(date) {
		return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()];
	}

	static pad0(n) {
		return (n * 1 < 10) ? '0' + n : n;
	}

	static getDates(origin, destination) {
		var DAYS = [];
		for (var op in BOAT.times[origin][destination]) {
			let O = BOAT.times[origin][destination][op];
			if (O.daily) DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
			if (O.weekly) DAYS = DAYS.concat(Object.keys(O.weekly));
		}
		console.log('getDates', origin, destination, DAYS);
		var OUT = [];
		for (var i = 0; i < 100; i++) {
			var d = new Date(new Date().getTime() + 86400000 * i);
			var weekday = DATA.getWeekDay(d).toUpperCase();
			if ((DAYS.length == 0) || (DAYS.includes(weekday)))
				OUT.push(d.getFullYear() + '-' + DATA.pad0(d.getMonth() + 1) + '-' + DATA.pad0(d.getDate())); // change to YYYY-MM-DD format later...
		}
		return OUT;
	}



	static getTimes(origin, destination, date) {
		var OUT = [];
		var weekday = DATA.getWeekDay(new Date(Date.parse(date))).toUpperCase();

		for (var op in BOAT.times[origin][destination]) {
			var O = BOAT.times[origin][destination][op];
			if (O.daily)
				O.daily.forEach(time => OUT.push(time + '|' + op + '|' + O.duration));
			if (O.weekly)
				if (O.weekly[weekday])
					O.weekly[weekday].forEach(time => OUT.push(time + '|' + op + '|' + O.duration));
		}
		var absTime = (str) => {
			let t1 = str.split('|');
			let t2 = t1[0].split(':');
			return t2[0] * 60 + t2[1] * 1;
		};
		OUT.sort((a, b) => (absTime(a) - absTime(b)));
		return OUT;
	}



	static getFares() {
		return [{
			operator: 'Ocean Jet',
			name: 'Tourist',
			price: 400,
			duration: 90
		}, {
			operator: 'Ocean Jet',
			name: 'Business',
			price: 700,
			duration: 90
		}];
	}
}