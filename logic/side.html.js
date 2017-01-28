class Ticket {

	static showOrigin(city, region, action) {
		document.querySelector('#origin').innerHTML = this.OD('odot', city, region, action);
	}

	static showDestination(city, region, action) {
		document.querySelector('#destination').innerHTML = this.OD('rarr', city, region, action);
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

	static showDates(list) {
		if (!list) return document.querySelector('#dates').innerHTML = '';
		var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
		var OUT = '';
		list.forEach(date => {
			OUT += `<div>
						<span class='day'>${days[date.getDay()]}</span>
						<span class='date'>${date.getDate()}</span>
						<span class='month'>${months[date.getMonth()]}</span>
					</div>`;

		});
		document.querySelector('#dates').innerHTML = OUT;
	}

	static showTimes(list) {
		if (!list) return document.querySelector('#times').innerHTML = '';
		var OUT = '';
		list.forEach(item => {
			var t = item.time.split(':');
			OUT += `<div>
						<span class='time'>
							${t[0]*1} <sup>${t[1]}</sup>
						</span>
						<span class='duration'>${item.duration}min</span>
					</div>`;
		});
		document.querySelector('#times').innerHTML = OUT;
	}

	static showClasses(list) {
		if (!list) return document.querySelector('#classes').innerHTML = '';
		var OUT = '';
		list.forEach(item => {
			OUT += `<div>
						<span class='className'>${item.name}</span>
						<span class='class'>class</span>
						<span class='price'>${item.price} PHP</span>
					</div>`;

		});
		document.querySelector('#classes').innerHTML = OUT;
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

	static showBuyButton() {
		document.querySelector('#BuyButton').innerHTML = `
			<div>Buy Ticket now</div>
		`;
	}

}