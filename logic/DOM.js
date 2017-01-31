class DOM {

	static hideOrigin() {
		document.querySelector('#origin').innerHTML = '';
	}
	static showOrigin(city, region) {
		document.querySelector('#origin').innerHTML = this.OD('odot', city, region, `HASH.truncate(0)`);
	}

	static hideDestination() {
		document.querySelector('#destination').innerHTML = '';
	}
	static showDestination(city, region) {
		document.querySelector('#destination').innerHTML = this.OD('rarr', city, region, `HASH.truncate(2)`);
	}

	static OD(icon, city, region, action) {
		if (!city) return '';
		return `<tr>
				<td class='icon'>
					&${icon};
				</td> 
				<td>
					<span class='city'>${city}</span> 
					<span class='region'>${region}</span> 
				</td>
				<td class='close' onclick="${action}">
					&times;
				</td>
				</tr>`;
	}



	static hideDates() {
		document.querySelector('#dates').innerHTML = '';
	}
	static showDates(list) {
		var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
		var OUT = '';
		list.forEach(date => { // YYYY-MM-DD
			// var d = date.split('-');
			var d = new Date(Date.parse(date));
			OUT += `<div date='${date}' onclick='HASH.setDate("${date}");'>
						<span class='day'>${days[d.getDay()]}</span>
						<span class='date'>${d.getDate()}</span>
						<span class='month'>${months[d.getMonth()]}</span>			
					</div>`;

		});
		document.querySelector('#dates').innerHTML = OUT;
	}
	static hasDates() {
		return document.querySelector('#dates').innerHTML.trim() != '';
	}
	static setDate(date) { // YYYY-MM-DD
		try {
			document.querySelector(`#dates .selected`).classList.remove('selected');
		} catch (e) {}
		document.querySelector(`[date='${date}']`).classList.add('selected');
	}
	static getDate() { // YYYY-MM-DD
		return document.querySelector(`#dates .selected`).getAttribute('date');
	}

	// <span class='day'>${days[d[2]*1]}</span>
	// <span class='date'>${d[2]}</span>
	// <span class='month'>${months[d[1]*1]}</span>



	static hideTimes() {
		document.querySelector('#times').innerHTML = '';
	}
	static showTimes(list) {
		var OUT = '';
		list.forEach(item => { // COD|HH:MM|DUR
			var x = item.split('|');
			var t = x[0].split(':');
			var ref = x.slice(0, 2).join('|');
			OUT += `<div time='${ref}' onclick='HASH.setTime("${ref}");'>
						<span class='time'>
							${t[0]*1} <sup>${t[1]}</sup>
						</span>
						<span class='duration'>${x[2]} min</span>
					</div>`;
		});
		document.querySelector('#times').innerHTML = OUT;
	}
	static hasTimes() {
		return document.querySelector('#times').innerHTML.trim() != '';
	}
	static setTime(time) { // COD|HH:MM
		try {
			document.querySelector(`#times .selected`).classList.remove('selected');
		} catch (e) {}
		document.querySelector(`[time='${time}']`).classList.add('selected');
	}
	static getTime() { // COD|HH:MM
		return document.querySelector(`#times .selected`).getAttribute('time');
	}



	static hideClasses() {
		document.querySelector('#classes').innerHTML = '';
	}
	static showClasses(list) {
		var OUT = '';
		list.forEach(item => { // CLASS|PRICE
			OUT += `<div _class='${item.name}'>
						<span class='className'>${item.name}</span>
						<span class='class'>class</span>
						<span class='price'>${item.price} PHP</span>
					</div>`;

		});
		document.querySelector('#classes').innerHTML = OUT;
	}



	static hidePassengers() {
		document.querySelector('#passengers').innerHTML = '';
	}
	static showPassengers() {
		document.querySelector('#passengers').innerHTML = `
		<div>
			<span class='minus'>-</span> 
			<span class='count'>1</span> 
			<span class='passenger'>P</span> 
			<span class='plus'>+</span> 
			<span class='price'>400 PHP</span> 
		</div>
		`;
	}



	static hideBuyButton() {
		document.querySelector('#BuyButton').innerHTML = '';
	}
	static showBuyButton() {
		document.querySelector('#BuyButton').innerHTML = `
			<div>Buy Now</div>
		`;
	}

	static hideMost() {
		DOM.hideDestination();
		DOM.hideDates();
		DOM.hideTimes();
		DOM.hideClasses();
		DOM.hidePassengers();
		DOM.hideBuyButton();
	}
}

// selectDate(date) {
// 	console.log('selectDate', date);
// 	if (TIMES.date)
// 		document.querySelector(`[date='${TIMES.date}']`).classList.remove('selected');
// 	document.querySelector(`[date='${date}']`).classList.add('selected');
// }

// selectTime(time) {
// 	console.log('selectTime', time);
// 	if (TIMES.time)
// 		document.querySelector(`[time='${TIMES.time}']`).classList.remove('selected');
// 	document.querySelector(`[time='${time}']`).classList.add('selected');
// }

// selectClass(_class) {
// 	console.log('selectClass', _class);
// 	if (TIMES._class)
// 		document.querySelector(`[_class='${TIMES._class}']`).classList.remove('selected');
// 	document.querySelector(`[_class='${_class}']`).classList.add('selected');
// }



// <span class='day'>${days[d.getDay()]}</span>
// <span class='date'>${d.getDate()}</span>
// <span class='month'>${months[d.getMonth()]}</span>