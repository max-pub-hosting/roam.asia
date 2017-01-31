class TIMES {
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
			var weekday = TIMES.getWeekDay(d).toUpperCase();
			if ((DAYS.length == 0) || (DAYS.includes(weekday)))
				OUT.push(d.getFullYear() + '-' + TIMES.pad0(d.getMonth() + 1) + '-' + TIMES.pad0(d.getDate())); // change to YYYY-MM-DD format later...
		}
		return OUT;
	}



	static getTimes(origin, destination, date) {
		var OUT = [];
		var weekday = TIMES.getWeekDay(new Date(Date.parse(date))).toUpperCase();

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



	static getClasses() {
		return [{
			name: 'Tourist',
			price: 400
		}, {
			name: 'Business',
			price: 700
		}];
	}
}



// constructor() {
// fetch('data/sea/times.json')
// 	.then((response) => response.json())
// 	.then((times) => {
// 		BOAT.times = times;
// 	});
// }



// var daily = false;
// var weekly = [];
// for (var op in BOAT.times[origin][destination]) {
// 	let O = BOAT.times[origin][destination][op];
// 	if (O.daily) daily = true;
// 	if (O.weekly) weekly = weekly.concat(O.weekly);
// }

// for (var op in BOAT.times[origin][destination])
// 	BOAT.times[origin][destination][op].times.forEach(time => {
// 		let tmp = time.split('|');
// 		if (tmp.length == 1) daily = true;
// 		else if (!weekly.includes(tmp[1])) weekly.push(tmp[1]);
// 	});



// BOAT.times[origin][destination].forEach(company => {
// 	company.times.forEach(time => {
// 		OUT.push({
// 			time: time,
// 			duration: company.duration
// 		});
// 	});
// });
// OUT.sort((a, b) => {
// 	if (a.time < b.time) return -1;
// 	if (a.time > b.time) return 1;
// 	if (a.time == b.time) return 0;
// });
// OUT.sort((a, b) => ((a.time.split(':')[0] * 60 + a.time.split(':')[1] * 1) - (b.time.split(':')[0] * 60 + b.time.split(':')[1] * 1)));