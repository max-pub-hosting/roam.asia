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
		show: (list) => {
			var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
			var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
			var OUT = '';
			list.forEach(date => { // YYYY-MM-DD
				var d = new Date(Date.parse(date));
				OUT += `<div date='${date}' onclick='HASH.setDate("${date}");'>
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
		show: (list) => {
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
		},
		hide: () => {
			$('#times').innerHTML = '';
		},
		visible: () => {
			return $('#times').innerHTML.trim() != '';
		},
		select: (time) => {
			if ($(`#times .selected`))
				$(`#times .selected`).classList.remove('selected');
			$(`[time='${time}']`).classList.add('selected');
		}
	},



	fare: {
		show: (list) => {
			var OUT = '';
			list.forEach(item => { // CLASS|PRICE
				OUT += `<div fare='${item.name}'>
						<span class='fare'>${item.name}</span>
						<span class='class'>class</span>
						<span class='price'>${item.price} PHP</span>
					</div>`;

			});
			$('#fares').innerHTML = OUT;
		},
		hide: () => {
			$('#fares').innerHTML = '';
		}
	},



	people: {
		show: () => {
			$('#people').innerHTML = `
				<div>
					<span class='minus'>-</span> 
					<span class='count'>1</span> 
					<span class='passenger'>P</span> 
					<span class='plus'>+</span> 
					<span class='price'>400 PHP</span> 
				</div>`;
		},
		hide: () => {
			$('#people').innerHTML = '';
		}
	},



	buy: {
		show: () => {
			$('#buy').innerHTML = `
				<div>Buy Now</div>
			`;
		},
		hide: () => {
			$('#buy').innerHTML = '';
		}

	}
}