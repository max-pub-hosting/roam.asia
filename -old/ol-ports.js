// setTimeTableHTML() {
// 	var HTML = '';
// 	this.times[this.A][this.B].forEach(operator => {
// 		HTML += `<table>
// 				<tr><td class='operator' colspan='2'>${operator.operator}</td></tr>
// 				<tr><td class='meta'>
// 					<div class='duration'>${operator.duration} min</div>
// 					<div class='price'>${operator.price} php</div>
// 				</td>
// 				<td class='timetable'>
// 				`;
// 		operator.times.forEach(time => {
// 			var t = time.split(':');
// 			HTML += `<a onclick='sendMail("${operator.operator}","${time}");'>${t[0]*1}<sup>${t[1]}</sup></a>`;
// 		});
// 		HTML += '</td></tr></table>';
// 	});
// 	this.Tdom.innerHTML = HTML;
// 	// return HTML;
// }

// clearB() {
// 	this.markers[this.B].setLabel(null);
// 	this.B = '';
// 	this.Bdom.innerHTML = '';
// }

// #times 
// 	table
// 		width: 100%
// 	.operator
// 		font-size: 22px

// 	.meta
// 		text-align: right
// 		color: gray
// 		width: 70px

// 		.duration
// 			font-size: 18px

// 		.price
// 			font-size: 18px

// 	.timetable
// 		margin: 0
// 		a
// 			color: silver
// 			font-size: 18px
// 			display: inline-block
// 			width: 50px
// 			text-align: right
// 			cursor: pointer
// 			sup
// 				font-size: 12px

// console.log('marker click a:', this.A, 'click:', portCode, this.A ? 'y' : 'n');
// if (this.times[this.A]) // valid source
// 	if (this.times[this.A][portCode]) // valid target
// 		return this.setStop(portCode);
// else // no target... new start
// this.setStart(portCode);
// else this.setStart(portCode);