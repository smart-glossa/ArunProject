$(document).ready(function() {
	if (getCookie("user") != undefined) {
		$("body")[0].appendChild(menu());
		$("body")[0].appendChild(menus());
		applyUser();
		$($(".mainArea")[0]).remove();
		var div = document.createElement("div");
		div.className = "mainArea";
		$("body")[0].appendChild(div);
		$(".mainArea")[0].appendChild( billdetails());
		$(".mainArea")[0].appendChild(totalbill());	
	}
	$(document).on("click", "#signin", function(key) {
		var name = $("#name").val();
		var user = $("#username").val();
		var pass = $("#password").val();
		var cpass=$("#cpass").val();
		if(name===""){
			alert("Please Enter Name..");
			$("#name").focus().css("outline-color","#ff0000");
			return;
		}
		if(user==""){
			alert("Please Enter Your UserName..");
			$("#username").focus().css("outline-color","#ff0000");
			return;
		}
		if(pass===""){
			alert("Please Enter Password..");
			$("#password").focus().css("outline-color","#ff0000");
			return;
		}
		if(cpass===""){
			alert("Please Enter ConformPassword");
			$("#cpass").focus().css("outline-color","#ff0000");
			return;
		}
		if(cpass !== pass){
			
			$("#divCheckPasswordMatch").html("Passwords do not match Please try to again!").show().fadeOut(3000);
			$("#cpass").focus().css("outline-color","red");
			return;
		}else{
			
			$("#divCheckPasswordMatch").html("Passwords match.").show().fadeOut(3000);
		}
        	   //added user detail
        	   var url ="/arun/bill?operation=adduser&name=" +name+ "&username=" +username+ "&password="+pass; 
        	   $.ajax({
        	   	url : url,
        	   	type : 'POST'
        	   }).done(function(result) {
        	   	result = JSON.parse(result);
        	   	if (result.status == 1) {
        	   		alert("successfully Added");
        	   		$('#name').val("");
        	   		$('#username').val("");
        	   		$('#password').val("");
        	   		$('#cpass').val("");
        	   	} else {
        	   		result = JSON.parse(result);
        	   		if (result.status == 0) {
        	   			alert("Error occurs");
        	   		}
        	   	}
        	   }).fail(function(result) {
        	   	alert("Please Check Details!..")
        	   });

        	})
	/*keyup and keydown*/
	$(document).on("keyup","#name",function(key){
		var td = $(this).parent();
		var tr = td.parent();
		if (key.which == 13) {
			tr.next().children().children("#username").focus();
		}
	})
	$(document).on("keyup","#username",function(key){
		var td = $(this).parent();
		var tr = td.parent();
		if (key.which == 13) {
			tr.next().children().children("#password").focus();
		}
		if(key.which == 38){
			tr.prev().children().children("#name").focus();
		}
	})
	$(document).on("keyup","#password",function(key){
		var td = $(this).parent();
		var tr = td.parent();
		if (key.which == 13) {
			tr.next().children().children("#cpass").focus();
		}
		if (key.which==38) {
			tr.prev().children().children("#username").focus();
		}
	})
	$(document).on("keyup","#cpass",function(key){
		var td = $(this).parent();
		var tr = td.parent();
		if (key.which == 13) {
			tr.next().children().children("#signin").focus();
		}
		if(key.which == 38){
			tr.prev().children().children("#password").focus();
		}
	})
	$('#submit').keypress(function(event){
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if(keycode == '13'){
	      //  alert('You pressed a "enter" key in textbox');  
	  }
	});
	$(document).on(
		"click",
		"#login",
		function(key) {
			var user = $('#user').val();
			var pass = $('#pass').val();

			if (user == "") {
				alert("Please Enter username ");
				$("#user").focus().css("outline-color", "#ff0000");
			}
			if (pass == "") {
				alert("Please Enter password");
				$("#pass").focus().css("outline-color", "ff0000");
				return;
			}
			var url = "/arun/bill?operation=login&user="
			+ user + "&pass=" + pass;
			$.ajax({
				url : url,
				type : 'POST'
			}).done(function(result) {
				var resp = JSON.parse(result);
				if (resp.status == "success") {
					//alert("successlly login"+user);
					document.cookie = "user=" + user;
					$("body")[0].appendChild(menu());
					$("body")[0].appendChild(menus());
					applyUser();
					$($(".mainArea")[0]).remove();
					var div = document.createElement("div");
					div.className = "mainArea";
					$("body")[0].appendChild(div);
					$(".mainArea")[0].appendChild(billdetails());
					$(".mainArea")[0].appendChild(totalbill());	
					
				} else {
					//result = JSON.parse(result);
					if (resp.status == "error") {
						alert("Incorrect username /password");
					}
				}

			}).fail(function(result) {
				console.log(result);
			});

		});
});
function getCookie(user) {
	var name = user + "=";
	var ca = document.cookie.split(';');
	for(var i = 0; i <ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length,c.length);
		}
	}
	return undefined;
}

function applyUser() {
	var usname = getCookie("user");
	
	$.ajax({
		
		url: "/arun/bill?operation=getusername&users=" + usname,
		type: 'POST'
	})
	.done(function(result){
		result = JSON.parse(result);
		if (result.status == 1) {
			$(".showusername").text("Welcome Mr. " + result.message);
		}
	})
	.fail(function(result){
		console.log(result);
	});
	
}
function billdetails() {
	var div = document.createElement("div");
	div.className = "b";
	var html = '<h3 class="fn">Add Bill Details</h3>'
	+ '<table class="ss">'
	+  '<span id="errmsg"></span>'
	+ '<tr><td>BillNo<span>*<span>:</td><td> <input type=text id="billno"  placeholder="BillNo.."></td></tr>'
	+ '<tr><td>SalesAmount<span>*</span>:</td> <td><input type=text id="sales" class="chars" placeholder="SalesAmount.."></td></tr>'
	+ '<tr><td>PaidAmount<span>*</span>:</td><td> <input type=text id="paid" class="chars" placeholder="PaidAmount.."></td></tr>'
	+ '<tr><td>PrincipleAmount<span>*</span>:</td><td> <input type=text id="principle" class="chars" placeholder="PrincipleAmount.."></td></tr>'
	+ '<tr><td>Date<span>*</span>:</td><td> <input type=date id="date" class="add"></td></tr>'
	+ '<tr><td></td><td><button id="submit">SUBMIT</button>&nbsp;&nbsp;'
	
	+ '<button id="update">UPDATE</button></td><tr>'
	+'</table>';
	
	div.innerHTML = html;
	return div;
}
function menu() {
	var div = document.createElement("div");
	div.className = "menuBar";
	var strVar="";
	strVar += "<ul id=\"menu\">";
	strVar += "  <li style=\"float:right\"><a id=\"logout\"><img src=\"img/6.png\" width=\"20\">Logout<\/a><\/li>";
	strVar += "<\/ul>";
	div.innerHTML = strVar;
	return div;
}
function menus() {
	var div = document.createElement("div");
	div.className = "menuBars";
	var strVar="";
	strVar += "<ul id=\"menu\">";
	strVar += "  <li><div id=\"opener\" onclick=\"displaybill()\"><a href=\"#\" onclick=\"return show();\"><img src=\"img/home.png\">AllBillDetail</a></div><\/li>";
	strVar += "<\/ul>";
	div.innerHTML = strVar;
	return div;
}