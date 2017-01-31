$ = s => document.querySelector(s);

class DOM {

	static hideOrigin() {
		$('#origin').innerHTML = '';
	}
	static showOrigin(city, region) {
		$('#origin').innerHTML = this.OD('odot', city, region, `HASH.clear(0)`);
	}

	static hideDestination() {
		$('#destination').innerHTML = '';
	}
	static showDestination(city, region) {
		$('#destination').innerHTML = this.OD('rarr', city, region, `HASH.clear(1)`);
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
		$('#dates').innerHTML = '';
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
		$('#dates').innerHTML = OUT;
	}
	static hasDates() {
		return $('#dates').innerHTML.trim() != '';
	}
	static setDate(date) { // YYYY-MM-DD
		try {
			$(`#dates .selected`).classList.remove('selected');
		} catch (e) {}
		$(`[date='${date}']`).classList.add('selected');
	}



	static hideTimes() {
		$('#times').innerHTML = '';
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
		$('#times').innerHTML = OUT;
	}
	static hasTimes() {
		return $('#times').innerHTML.trim() != '';
	}
	static setTime(time) { // COD|HH:MM
		if ($(`#times .selected`))
			$(`#times .selected`).classList.remove('selected');
		$(`[time='${time}']`).classList.add('selected');
	}



	static hideFares() {
		$('#classes').innerHTML = '';
	}
	static showFares(list) {
		var OUT = '';
		list.forEach(item => { // CLASS|PRICE
			OUT += `<div _class='${item.name}'>
						<span class='className'>${item.name}</span>
						<span class='class'>class</span>
						<span class='price'>${item.price} PHP</span>
					</div>`;

		});
		$('#classes').innerHTML = OUT;
	}



	static hidePassengers() {
		$('#passengers').innerHTML = '';
	}
	static showPassengers() {
		$('#passengers').innerHTML = `
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
		$('#BuyButton').innerHTML = '';
	}
	static showBuyButton() {
		$('#BuyButton').innerHTML = `
			<div>Buy Now</div>
		`;
	}
}