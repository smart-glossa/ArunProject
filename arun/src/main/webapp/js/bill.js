$(document).ready(function() {
  $(document).on("click", "#logout", function(){
	    	//postToServer("logout");
	    	document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	    	window.location.href = '/arun/';
	    });
	//displaybills();
	//totalbill() ;
    $(document).on("click","#submit",function(key) {
        var billno = $('#billno').val();
        var sales = $('#sales').val();
        var paid = $('#paid').val();
        var prin=$('#principle').val();
        var date=$('#date').val();
        if (billno === "") {
            alert("Please Enter BillNo");
            $("#billno").focus().css("outline-color", "#ff0000");
            return;
        }
        if (sales === "") {
            alert("Please Enter Product sales");
            $("#sales").focus().css("outline-color", "#ff0000");
            return;
        }
        if (paid === "") {
            alert("Please Enter paid");
            $("#paid").focus().css("outline-color", "ff0000");
            return;
        }
        if (prin === "") {
            alert("Please Enter principle");
            $("#principle").focus().css("outline-color", "ff0000");
            return;
        }
        if(parseInt(paid)>parseInt(sales)){
            alert("Please max val");
            $("#sales").focus().css("outline-color","red");
            $("#paid").focus().css("outline-color","red");
            return;
        }
        if(date==""){
        	alert("Please select Date..");
        	$('#date').focus().css('outline-color','ff0000');
        	return;
        }
        
        var url = "/arun/bill?operation=add&billno=" + billno + "&sales="+ sales + "&paid=" + paid + "&principle=" + prin+"&date="+date;
        $.ajax({
            url: url,
            type: 'POST'
        }).done(function(result) {
            result =JSON.parse(result);
            if(result.status == 1) {
                alert("SuccessFully Added");
                $('#billno').val("");
                $('#sales').val("");
                $('#paid').val("");
                $('#principle').val("");
               // displaybills();
               totalbill() ;
           } else if(result.status == 0) {
            alert("Error occurs");
        }

    }).fail(function(result) {
           // console.log(result);
           alert("Please Check Details!..")
       });
})


    $(document).on("click", ".delete", function() {
	// If user not confirmed, then dont execute, just return back.
 if (!confirm(" Delete Are you sure?")) {
   return;
}
var tag = $(this).parent().parent();
var billno = tag.children(".billno")[0].innerHTML;
var url = "/arun/bill?operation=delete&billno=" + billno;
$.ajax({
    url: url,
    type: 'POST'
}).done(function(result) {
   tag.remove();
}).fail(function(result) {
    console.log(result)
});
})
    $(document).on("keyup", "#billno", function() {
        var billno = $('#billno').val();
        if (billno != "") {
            var getUrl = "/arun/bill?operation=getOne&billno=" + billno;
            $.ajax({
                url: getUrl,
                type: "POST"
            })
            .done(function(result) {
                result = JSON.parse(result);
                var sales = result.sales;
                var paid=result.paid;
                var prin=result.prin;
                    //var date=result.date;
                    $("#sales").val(sales);
                    $("#paid").val(paid);
                    $("#principle").val(prin);
                    
                })
            .fail(function(result) {
                alert("Some Errors Please Enter correct value");
            });
        } else {
            $("#sales").val("");
            $("#paid").val("");
            $("#principle").val("");
        }
    });
    $(document).on("click", "#update", function() {
        var billno = $('#billno').val();
        var sales=$('#sales').val();
        var paid=$('#paid').val();
        var prin = $('#principle').val();
        var date=$('#date').val();
        if (billno == "") {
            alert("Please Enter BillNo..");
            $("#billno").focus().css("outline-color", "#ff0000");
            return;
        }
        if (sales === "") {
            alert("Please Enter From SalesAmount");
            $("#sales").focus().css("outline-color", "#ff0000");
            return;
        }
        if (paid === "") {
            alert("Please Enter To PaidAmount");
            $("#to").focus().css("outline-color", "#ff0000");
            return;
        }
        if (prin === "") {
            alert("Please Enter PrincipleAmount");
            $("#principle").focus().css("outline-color", "ff0000");
            return;
        }if(parseInt(paid)>parseInt(sales)){
            alert("principleAmount maximum value Please Change minimum value");
            $("#sales").focus().css("outline-color","red");
            $("#paid").focus().css("outline-color","red");
            return;
        }
        if(date===""){
        	alert("Please select Date..");
        	$('#date').focus().css("outline-color","ff0000");
        	return;
        	
        }
        var url = "/arun/bill?operation=update&billno=" + billno + "&sales=" + sales + "&paid=" + paid + "&principle=" + prin+",&date="+date;
        $.ajax({
            url: url,
            type: 'POST'
        })
        .done(function(result) {
           result = JSON.parse(result);
           if (result.status === 1) {
            alert("Updated SuccessFully");
            $('#billno').val("");
            $('#sales').val("");
            $('#paid').val("");
            $('#principle').val("");
        } else {
            if (result.status === 0) {
                alert("Error occurs");
            }
        }
    }).fail(function(result) {
        console.log(result);
    });

})
    /*keyup and keydown*/
    $(document).on("keyup","#billno",function(key){
        var td = $(this).parent();
        var tr = td.parent();
        if (key.which == 40) {
            tr.next().children().children("#sales").focus();
        }
    })
    $(document).on("keyup","#sales",function(key){
        var td = $(this).parent();
        var tr = td.parent();
        if (key.which == 40) {
            tr.next().children().children("#paid").focus();
        }
        if(key.which == 38){
            tr.prev().children().children("#billno").focus();
        }
    })
    $(document).on("keyup","#paid",function(key){
        var td = $(this).parent();
        var tr = td.parent();
        if (key.which == 40) {
            tr.next().children().children("#principle").focus();
        }
        if (key.which==38) {
            tr.prev().children().children("#sales").focus();
        }
    })
    $(document).on("keyup","#principle",function(key){
        var td = $(this).parent();
        var tr = td.parent();
        if (key.which == 40) {
            tr.next().children().children("#date").focus();
        }
        if(key.which == 38){
            tr.prev().children().children("#paid").focus();
        }
    })
    $(document).on("keyup","#date",function(key){
      var td=$(this).parent();
      var tr=td.parent();
      if(key.which==40){
         tr.next().children().children("#submit").focus();
     }
     if(key.which==38){
         tr.prev().children().children("#prin").foucs();
     }
 })
    $('#submit').keypress(function(event){
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if(keycode == '13'){
      //  alert('You pressed a "enter" key in textbox');  
  }
});
    $(document).on("keyup","#submit",function(key){
        var td = $(this).parent();
        var tr = td.parent();
        if (key.which == 40) {
            tr.next().children().children("#update").focus();
        }
        if(key.which == 38){
            tr.prev().children().children("#principle").focus();
        }
    })
  //called when key is pressed in textbox not allowed char..
  $(".chars").keypress(function (e) {
     if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
          //display error message
          $("#errmsg").html("Please type Only Numbers.. ").show().fadeOut(4000);
          return false;
      }
  });

});