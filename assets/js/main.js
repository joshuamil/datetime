import * as clock from './clock';
import dateFormat from 'dateformat';

// Render the Calendar
let renderCalendar = (mm,yy) => {

	// HTML renderers
	let _html = '';
	let th = '';
	let tr = '';
	let td = '';
	let cls = '';
	let msg = '';
	let sty = '';
	let id = '';

	// Create current date object
	let now = new Date();

	// Defaults
	mm = (mm === undefined)? now.getMonth() : mm;
	yy = (yy === undefined)? now.getFullYear() : yy;

	// Create viewed date object
	let mon = new Date(yy,mm,1);
	let yp = mon.getFullYear();
	let yn = mon.getFullYear();
	let prv = new Date(yp,mm-1,1);
	let nxt = new Date(yn,mm+1,1);

	// Date elements
	let m = ["January","February","March","April","May","June","July","August",
		 "September","October","November","December"];
	let d = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
	let ds = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
	let n = [31,28,31,30,31,30,31,31,30,31,30,31];

	// Leap year
	if(now.getYear()%4 === 0){
		n[1] = 29;
	}

	// Get some important days
	let fdom = mon.getDay(); // First day of month
	let mwks = 6 // Weeks in month

	// Render Month
	document.querySelector('.year').innerHTML = mon.getFullYear();
	document.querySelector('.month').innerHTML = m[mon.getMonth()];

	// Clear view
	let h = document.querySelector('#calendar > thead');
	let b = document.querySelector('#calendar > tbody');

	while (h.hasChildNodes()) {
	  h.removeChild(h.lastChild);
	}

	while (b.hasChildNodes()) {
	  b.removeChild(b.lastChild);
	}

	// Render Days of Week
	tr = document.createElement('tr');
	for(let j=0;j<d.length;j++){
		th = document.createElement('th');
		th.innerHTML = d[j];
		tr.appendChild(th);
	}
	h.appendChild(tr);

	// Render days
	let dow = 0;
	let first = 0;
	let last = 0;
	let max = 6;
	for(let i=0;i>=last && i<=max;i++){

		tr = document.createElement('tr');

		for(let j=0;j<d.length;j++){

			cls = '';
			msg = '';
			sty = '';
			id = '';

			// Determine if we have reached the first of the month
			if(first >= n[mon.getMonth()]){
				dow = 0;
			}else if((dow>0 && first>0) || (j===fdom)){
				dow++;
				first++;
			}

			// Get last day of month
			if(dow === n[mon.getMonth()]){
				last = n[mon.getMonth()];
			}

			// Set class
			if(cls.length === 0){
				if(
					dow === now.getDate()
					&& now.getMonth() === mon.getMonth()
					&& now.getFullYear() === mon.getFullYear()
				){
					cls = "today";
				}else if(j === 0 || j === 6){
					cls = "weekend";
				}else{
					cls = '';
				}
			}

			// Set ID
			id = "cell_" + i + '' + j + '' + dow;

			// Set full date for this cell
			let dt = new Date(mon.getFullYear(),mon.getMonth(),dow);

			// Set day of week for this cell
			let day = ds[j];

			td = document.createElement('td');

				console.log(dow);

			// Render HTML
			if(dow === 0){

				td.setAttribute('class', 'empty');
				td.setAttribute('data-dow', j);
				td.setAttribute('data-day', day);
				td.setAttribute('role', 'gridcell');
				td.innerHTML = '<div>&nbsp;</div>';

			}else if(msg.length > 0){

				td.setAttribute('class', cls);
				td.setAttribute('id', id);
				td.setAttribute('data-dow', dow);
				td.setAttribute('data-day', day);
				td.setAttribute('data-full-date', dateFormat(dt,"yyyy-MM-dd"));
				td.setAttribute('role', 'gridcell');

				_html = '<div style="'+sty+'"><div class="num">' + dow + '</div><div class="day">'+day+'</div><div class="content">'+msg+'</div></div>';

				td.innerHTML = _html;

			}else{

				td.setAttribute('class', cls);
				td.setAttribute('id', id);
				td.setAttribute('data-dow', dow);
				td.setAttribute('data-day', day);
				td.setAttribute('data-full-date', dateFormat(dt,"yyyy-MM-dd"));
				td.setAttribute('role', 'gridcell');

				_html = '<div><div class="num">' + dow + '</div><div class="day">'+day+'</div></div>';

				td.innerHTML = _html;
			}

			tr.appendChild(td);

		}

		b.append(tr);
	}


	// Enable previous/next functionality
	let lst = document.querySelector('#last');
	let lsc = lst.cloneNode(true);
	lst.parentNode.replaceChild(lsc, lst);
	lsc.addEventListener('click', (event) => {
		console.log('A');
		renderCalendar(prv.getMonth(),prv.getFullYear());
	});

	let cur = document.querySelector('#current');
	let cuc = cur.cloneNode(true);
	cur.parentNode.replaceChild(cuc, cur);
	cuc.addEventListener('click', (event) => {
		console.log('B');
		renderCalendar(now.getMonth(),now.getFullYear());
	});

	let nex = document.querySelector('#next');
	let nec = nex.cloneNode(true);
	nex.parentNode.replaceChild(nec, nex);
	nec.addEventListener('click', (event) => {
		console.log('C');
		renderCalendar(nxt.getMonth(),nxt.getFullYear());
	});

	// Enable links and current day panel loading
	let dayLinks = document.querySelectorAll('.calendar-frame .calendar td>div');
	Array.from(dayLinks).forEach( link => {
		link.addEventListener('click', (event) => {

			let el = link;

			let cx = document.createElement('a');
			cx.setAttribute('href', '#');
			cx.setAttribute('class', 'close fa fa-2x fa-close');

			let fd = document.querySelector('.full-day');

			let html = el.cloneNode(true);
	    html.appendChild(cx)
			html.addEventListener('click', () => {
				fd.classList.toggle('active');
			});

			fd.classList.toggle('active');
			fd.innerHTML = '';
			fd.appendChild(html);

		});
	});

};

// Initialization
let init = () => {

	// Render the calendar
	renderCalendar();

	// Render the clock
	clock.renderTime();
	clock.enableButtons();

};

// Call init when the DOM is loaded
document.addEventListener('DOMContentLoaded', (event) =>{
	init();
});
