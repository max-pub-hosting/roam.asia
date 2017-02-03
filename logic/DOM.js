$ = s => document.querySelector(s);

DOM = {
	origin: {
		show: (city, region) => {
			$('#origin').innerHTML = `<tr>
				<td class='icon'> &odot; </td> 
				<td>
					<span class='city'>${city}</span> 
					<span class='region'>${region}</span> 
				</td>
				<td class='close' onclick="HASH.clear(0)"> &times; </td>
				</tr>`;
		},
		hide: () => {
			$('#origin').innerHTML = '';
		}
	},



	destination: {
		show: (city, region) => {
			$('#destination').innerHTML = `<tr>
				<td class='icon'> &rarr; </td> 
				<td>
					<span class='city'>${city}</span> 
					<span class='region'>${region}</span> 
				</td>
				<td class='close' onclick="HASH.clear(1)"> &times; </td>
				</tr>`;
		},
		hide: () => {
			$('#destination').innerHTML = '';
		}

	},



	date: {
		showData: () => {
			DOM.date.show(DATA.getDates(HASH.origin, HASH.destination));
			DOM.date.select(HASH.date);
		},
		show: (list) => {
			var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
			var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
			var OUT = '';
			list.forEach(date => { // YYYY-MM-DD
				var d = new Date(Date.parse(date));
				OUT += `<div date='${date}' onclick='HASH.date="${date}";'>
						<span class='day'>${days[d.getDay()]}</span>
						<span class='date'>${d.getDate()}</span>
						<span class='month'>${months[d.getMonth()]}</span>			
					</div>`;

			});
			$('#dates').innerHTML = OUT;

		},
		hide: () => {
			$('#dates').innerHTML = '';
		},
		visible: () => {
			return $('#dates').innerHTML.trim() != '';
		},
		select: (date) => {
			if ($(`#dates .selected`))
				$(`#dates .selected`).classList.remove('selected');
			$(`[date='${date}']`).classList.add('selected');
		}

	},



	time: {
		showData: () => {
			console.log('DOM.time.showData');
			DOM.time.show(DATA.getTimes(HASH.origin, HASH.destination, HASH.date));
			DOM.time.select(HASH.time);
		},
		show: (list) => {
			var OUT = '';
			if (!list) return console.log('NO LIST', list);
			list.forEach(item => { // COD|HH:MM|DUR
				var t = item.split(':');
				OUT += `<div time='${item}' onclick='HASH.time="${item}";'>
							<span class='time'>
								${t[0]*1} <sup>${t[1]}</sup>
							</span>
						</div>`;
			});
			$('#times').innerHTML = OUT;
		},
		hide: () => {
			$('#times').innerHTML = '';
		},
		visible: () => {
			return $('#times').innerHTML.trim() != '';
		},
		select: (time) => {
			try {
				$(`#times .selected`).classList.remove('selected');
			} catch (e) {}
			try {
				$(`[time='${time}']`).classList.add('selected');
			} catch (e) {}
		}
	},



	fare: {
		showData: () => {
			DOM.fare.show(DATA.getFares());
			DOM.fare.select(HASH.fare);
		},
		show: (list) => {
			var OUT = '';
			list.forEach(item => { // CLASS|PRICE
				var ref = item.opCode + ':' + item.name;
				OUT += `<div fare='${ref}' onclick='HASH.fare="${ref}";'>
							<div class='operator'>${item.operator}</div>
							<div>
								<span class='fare'>${item.name}</span>
								<span class='class'>class</span>
							</div>
							<div>
								<span class='duration'>${item.duration} min</span>
								<span class='price'>${item.price} PHP</span>
							</div>
						</div>`;

			});
			$('#fares').innerHTML = OUT;
		},
		hide: () => {
			$('#fares').innerHTML = '';
		},
		select: (fare) => {
			if ($(`#fares .selected`))
				$(`#fares .selected`).classList.remove('selected');
			$(`[fare='${fare}']`).classList.add('selected');
		}
	},



	people: {
		show: (n) => {
			$('#people').innerHTML = `
				<div>
					<span class='minus' onclick="HASH.people--">-</span> 
					<span class='count'>${n}</span> 
					<span class='passenger'>P</span> 
					<span class='plus' onclick="HASH.people++">+</span> 
				</div>`;
		},
		hide: () => {
			$('#people').innerHTML = '';
		}

		// 			<span class='price'>400</span> 
		// 			<span class='currency'>PHP</span> 
		// count: (count) => {
		// 	$('#people .count').innerHTML = count;
		// },
		// price: (price) => {
		// 	$('#people .price').innerHTML = price;
		// }
	},



	buy: {
		show: () => {
			$('#buy').innerHTML = `
				<div>Buy It</div>
			`;
		},
		hide: () => {
			$('#buy').innerHTML = '';
		}

	}
}