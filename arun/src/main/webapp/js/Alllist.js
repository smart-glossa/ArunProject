function displaybill() {
	var url = "/arun/bill?operation=getall";
	var imgURL = "img/1.jpg";
	$.ajax({
		url : url,
		type : 'POST'
	})
	.done(
		function(result) {
			var array = JSON.parse(result);
			var query = "<table border= '2px solid black'>"
			query += "<tr><th>BillNo</th> <th>SalesAmount</th><th>PaidAmount</th><th>PrincipleAmount</th><th>CreaditAmount</th><th>ShortageAmount</th><th>Excess</th><th>Date</th><th>Delete</th></tr>"
			if(result!="undefined"){
				for (var i = 0; i < array.length; i++) {
					query += "<tr class='productRow'><td class='billno'>"
					+ array[i].billNO + "</td>";
					query += "<td>" + array[i].sales + "</td>";
					query += "<td>" + array[i].paid + "</td>";
					query += "<td>" + array[i].prin + "</td>";
					query += "<td>" + array[i].credit + "</td>";
					query += "<td>" + array[i].shortage + "</td>";
					query += "<td>" + array[i].Excess + "</td>";
					query += "<td>" + array[i].date + "</td>";
					query += "<td> <img class='delete' src='" + imgURL + "' width='25px' height='25px'/></td></tr>"
				}
			}
			query += "</table>"
			$("#all")[0].innerHTML = query;

		}).fail(function() {

		});

	}

	function displaybills() {
		var url = "/arun/bill?operation=total";
		var imgURL = "img/1.jpg";
		$.ajax({
			url : url,
			type : 'POST'
		})
		.done(
			function(result) {
				var array = JSON.parse(result);
				var query = "<table border= '2px solid black'>"
				query += "<th>SalesAmount</th><th>PaidAmount</th><th>PrincipleAmount</th><th>CreaditAmount</th><th>ShortageAmount</th><th>Excess</th><th>Delete</th></tr>"
				if(result!="undefined"){
					for (var i = 0; i < array.length; i++) {
						
						query += "<td>" + array[i].sales + "</td>";
						query += "<td>" + array[i].paid + "</td>";
						query += "<td>" + array[i].prin + "</td>";
						query += "<td>" + array[i].credit + "</td>";
						query += "<td>" + array[i].shortage + "</td>";
						query += "<td>" + array[i].excess + "</td>";
						query += "<td> <img class='delete' src='" + imgURL + "' width='25px' height='25px'/></td></tr>"
					}
				}
				query += "</table>"
				$("#alls")[0].innerHTML = query;

			}).fail(function() {

			});

		} 
		function totalbill() {
		//http://localhost:8080/arun/bill?operation=totlist
		var url = "/arun/bill?operation=totlist";
		$.ajax({
			url : url,
			type : 'POST'
		})
		.done(
			function(result) {
				var array = JSON.parse(result);
				var query = "<table border= '2px solid black'>"
				query += "<th>SalesAmount</th><th>PaidAmount</th><th>PrincipleAmount</th><th>CreditAmount</th><th>Total</th></tr>"
				if(result!="undefined"){
					for (var i = 0; i < array.length; i++) {
						
						query += "<td>" + array[i].sales + "</td>";
						query += "<td>" + array[i].paid + "</td>";
						query += "<td>" + array[i].prin + "</td>";
						query += "<td>" + array[i].credit + "</td>";
						query += "<td>" + array[i].tot + "</td></tr>"
					//	query += "<td> <img class='delete' src='" + imgURL + "' width='25px' height='25px'/></td></tr>"
				}
			}
			query += "</table>"
			$(".total")[0].innerHTML = query;

		}).fail(function() {

		});

	} 

