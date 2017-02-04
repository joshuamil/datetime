var ui = {

	// Render the Calendar
	"renderCalendar" : function(evnt,mm,yy){

		// HTML renderers
		var _html = "";
		var cls = "";
		var msg = "";
		var id = "";

		// Create current date object
		var now = new Date();

		// Defaults
		if(arguments.length == 1){
			mm = now.getMonth();
			yy = now.getFullYear();
		}

		// Create viewed date object
		var mon = new Date(yy,mm,1);
		var yp=mon.getFullYear();
		var yn=mon.getFullYear();

		var prv = new Date(yp,mm-1,1);
		var nxt = new Date(yn,mm+1,1);

		var m = [
			 "January"
			,"February"
			,"March"
			,"April"
			,"May"
			,"June"
			,"July"
			,"August"
			,"September"
			,"October"
			,"November"
			,"December"
		];

		var d = [
			 "Sunday"
			,"Monday"
			,"Tuesday"
			,"Wednesday"
			,"Thursday"
			,"Friday"
			,"Saturday"
		];

		var ds = [
			 "Sun"
			,"Mon"
			,"Tue"
			,"Wed"
			,"Thu"
			,"Fri"
			,"Sat"
		];

		// Days in Month
		var n = [
			 31
			,28
			,31
			,30
			,31
			,30
			,31
			,31
			,30
			,31
			,30
			,31
		];

		// Leap year
		if(now.getYear()%4 == 0){
			n[1] = 29;
		}

		// Get some important days
		var fdom = mon.getDay(); // First day of month
		var mwks = 6 // Weeks in month

		// Render Month
		$('.year').html(mon.getFullYear());
		$('.month').html(m[mon.getMonth()]);

		// Clear view
		var h = $('#calendar > thead:last');
		var b = $('#calendar > tbody:last');

		h.empty();
		b.empty();

		// Render Days of Week
		for(var j=0;j<d.length;j++){
			_html += "<th>" +d[j]+ "</th>";
		}
		_html = "<tr>" +_html+ "</tr>";
		h.append(_html);

		// Render days
		var dow = 0;
		var first = 0;
		var last = 0;
		for(var i=0;i>=last;i++){

			_html = "";

			for(var j=0;j<d.length;j++){

				cls = "";
				msg = "";
				sty = "";
				id = "";

				// Determine if we have reached the first of the month
				if(first >= n[mon.getMonth()]){
					dow = 0;
				}else if((dow>0 && first>0) || (j==fdom)){
					dow++;
					first++;
				}

				// Format Day of Week with leading zero
				dow = "0" + dow;

				// Get last day of month
				if(dow==n[mon.getMonth()]){
					last = n[mon.getMonth()];
				}

				// Check Event schedule
				var dte;
				var dtt;
				var pth = "daytona";
				$.each(evnt,function(){

					dte = new Date(mon.getFullYear(),mon.getMonth(),parseInt(dow));
					dtt = new Date(this.Race_Date);

					if(this.Race_Date.substr(0,10) == $.format.date(dte,"yyyy-MM-dd")){

						pth = this.Track_Name.split(' ')[0].toLowerCase().replace(' ','') || "daytona";

						sty = "background-image: url('http://www.nascar.com/content/dam/nascar/tracks/"+pth+"/images/Daylife.jpg')";
						cls = "event series-" + this.Series_Id;
						msg = "<h4>" + this.Race_Name + "";
						if(this.Track_Name.length > 0){
							msg += "<small>" + this.Track_Name + "</small>";
						}
						msg += "</h4>";
						msg += "<div class='event-time'>" + $.format.date(dtt,"h:mm a") + " ET</div>";

						if(dte.getTime() >= now.getTime()){
							msg += "<div class='btn-group future'>";
								msg += "<a href='#' class='btn btn-default'><i class='fa fa-ticket fa-lg fa-fw'></i><span> Buy Tickets</span></a>";
								msg += "<a href='#' class='btn btn-default'><i class='fa fa-suitcase fa-lg fa-fw'></i><span> Travel</span></a>";
								msg += "<a href='#' class='btn btn-default'><i class='fa fa-tv fa-lg fa-fw'></i><span> TV ("+this.Race_TV+")</span></a>";
							msg += "</div>";
						}else{
							msg += "<div class='btn-group past'>";
								msg += "<a href='"+this.Race_URL+"' class='btn btn-default'><i class='fa fa-flag-checkered fa-lg fa-fw'></i><span> Race Center</span></a>";
								msg += "<a href='"+this.Race_Result+"' class='btn btn-default'><i class='fa fa-trophy fa-lg fa-fw'></i><span> Race Results</span></a>";
							msg += "</div>";
						}

					}
				});

				// Set class
				if(cls.length == 0){
					if(
						dow==now.getDate()
						&& now.getMonth() == mon.getMonth()
						&& now.getFullYear() == mon.getFullYear()
					){
						cls = "today";
					}else if(j == 0 || j == 6){
						cls = "weekend";
					}else{
						cls = "";
					}
				}

				// Set ID
				id = "cell_" + i + "" + j + "" + dow;

				// Set full date for this cell
				var dt = new Date(mon.getFullYear(),mon.getMonth(),parseInt(dow));

				// Set day of week for this cell
				var day = ds[j];

				// Render HTML
				if(dow == 0){
					_html += '<td class="empty" data-dow="'+j+'" data-day="'+day+'"><div>&nbsp;</div></td>';
				}else if(msg.length > 0){
					_html += '<td class="' +cls+ '" id="'+id+'" data-dow="'+dow+'" data-day="'+day+'" data-full-date="'+$.format.date(dt,"yyyy-MM-dd")+'"><div style="'+sty+'"><div class="num">' + dow.substr(-2) + '</div><div class="day">'+day+'</div><div class="content">'+msg+'</div></div></td>';
				}else{
					_html += '<td class="' +cls+ ' no-content" id="'+id+'" data-dow="'+dow+'" data-day="'+day+'" data-full-date="'+$.format.date(dt,"yyyy-MM-dd")+'"><div><div class="num">' + dow.substr(-2) + '</div><div class="day">'+day+'</div></div></td>';
				}

			}

			_html = "<tr>" +_html+ "</tr>";
			b.append(_html);
		}

		$('#last').unbind('click').bind('click',function(){
			ui.renderCalendar(evnt,prv.getMonth(),prv.getFullYear());
		});

		$('#current').unbind('click').bind('click',function(){
			ui.renderCalendar(evnt,now.getMonth(),now.getFullYear());
		});

		$('#next').unbind('click').bind('click',function(){
			ui.renderCalendar(evnt,nxt.getMonth(),nxt.getFullYear());
		});

		// Click actions
		$('.calendar-frame .calendar TD>DIV').on('click', function(event) {

			var el = $(this);
			var html = el.clone();
			    html
						.append('<a href="#" class="close fa fa-2x fa-close"></a>')
						.on('click', function() {
							$('.full-day').toggleClass('active');
						});

			$('.full-day')
				.toggleClass('active')
				.html('')
				.append(html);
		});




	},


	// Render Clock
	"renderTime" : function(){
		var now = new Date();

		var tt = "AM";
		var hh = now.getHours();
		var nn = "0" + now.getMinutes();

		if(now.getHours()>12){
			hh = now.getHours()-12;
			tt = "PM";
		}

		$('.time').html(
			hh + ":" + nn.substr(-2) + " " + tt
		);

		var doit = function(){
			ui.renderTime();
		}

		setTimeout(doit,500);
	},


	// Initialization
	"init" : function(){

		$.getJSON('lib/data/full-schedule.json',function(data){

			// Render the calendar
			ui.renderCalendar(data);

			// Render the clock
			ui.renderTime();

		});

	}

};


// Load
$(document).ready(function(){

	// Initialize
	ui.init();

});
