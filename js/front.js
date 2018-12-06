$(document).ready(function () {
//string to image function link
//https://screenshots.firefox.com/f1Np98B3KEGBbvp8/stackoverflow.com
    'use strict';

    var t="";
    var o="";
    var lockFlag = true;

    // ------------------------------------------------------- //
    // Search Box
    // ------------------------------------------------------ //
    $('#search').on('click', function (e) {
        e.preventDefault();
        $('.search-box').fadeIn();
    });
    $('.dismiss').on('click', function () {
        $('.search-box').fadeOut();
    });
    
    
    // User page

	$('#details').hide();
	
	// ------------------------------------------------------ //
	// Users DataTable
    // ------------------------------------------------------ //

    var table = $('#users').DataTable( {
        responsive: {
           details: {
               type: 'column'
           }
       },
       columnDefs: [
        {
            targets: [ 3 ],
            visible: false,
            searchable: false
        },
        {
            targets: [ 4 ],
            visible: false
        },
        {
            targets: [ 5 ],
            visible: false
        },
        {
            targets: [ 6 ],
            visible: false
        },
        {
            targets: [ 7 ],
            visible: false
        }
    ]
       
} );

var n;
var e;
var type;
var id;
var phone;
var address;
var state;
var zip;
var city;
var ref;

    var rootRef = firebase.database().ref().child("users");

    rootRef.on("child_added", snap => {
     n = snap.child("name").val();
     e = snap.child("email").val();
     type = snap.child("typeAccount").val();
     id = snap.child("id").val();
     phone = snap.child("phone").val();
     address = snap.child("address").val();
     state = snap.child("state").val();
     zip = snap.child("zipCode").val();
     city = snap.child("city").val();
     ref = snap.child("referral").val();

    if(n == null)
    {
        n = "NA";
    }
    if(ref == null)
    {
        ref = "NA";
    }
    if(e == null)
    {
        e = "NA";
    }
    if(type == null)
    {
        type = "NA";
    }
    if(id == null)
    {
        id = "NA";
    }
    if(phone == null)
    {
        phone = "NA";
    }
    if(address == null)
    {
        address = "NA";
    }
    if(zip == null)
    {
        zip = "NA";
    }
    if(city == null)
    {
        city = "NA";
    }
    if(state == null)
    {
        state = "NA";
    }

    $("#users").DataTable().row.add([
         n, e , phone , type , address , city , state , zip , '<button type="button" class="btn btn-primary viewBtn"><i class="fas fa-eye"></i></button>',
        '<button type="button" class="btn btn-warning"><i class="fas fa-edit"></i></button>',
        '<button type="button" class="btn btn-danger delBtn"><i class="fas fa-close"></i></button>'

    ]).draw();

});

	
        $('#users').on('click', 'tbody .viewBtn', function () {

            var name;
            var email;
            var utype;
            var p;
            var a;
            var c;
            var s;
            var z;
            var r;

            var row_data;
            var rowname=$(this).parents('tr').attr('class');
            
              			  if(rowname=="child"){
				  
                  row_data = table.row($(this).parents('tr').prev('tr')).data();
                  name = row_data[0];
                  email = row_data[1];
                  p = row_data[2];
                  utype = row_data[3];
                  a = row_data[4];
                  c = row_data[5];
                  s = row_data[6];
                  z = row_data[7];
                  //r = row_data[8];
			  }
         else{
             row_data = table.row($(this).closest('tr')).data();

             name = row_data[0];
             email = row_data[1];
             p = row_data[2];
             utype = row_data[3];
             a = row_data[4];
             c = row_data[5];
             s = row_data[6];
             z = row_data[7];
             //r = row_data[8];
			}
		
        $('#datatable').hide();
        $('#changeTitle').text("Details");
		$('#details').show();
		
		$('#uname').text(name);
		$('#uemail').text(email);
        $('#utype').text(utype);
        $('#phone').text(p);
        $('#address').text(a);
        $('#city').text(c);
        $('#state').text(s);
        $('#zip').text(z);
       // $('#referral').text(r);
		
    } );

    $('.backBtn').on('click',function() {
        $('#details').hide();
        $('#changeTitle').text("Users");
        $('#datatable').show();
    });
	
	$('#users tbody').on( 'click', '.delBtn', function (e) {
    
         t=$(this);

        const swalWithBootstrapButtons = swal.mixin({
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger '
          });
          
          swalWithBootstrapButtons({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
          }).then((result) => {
            if (result.value) {
                
				var rowname=$(t).parents('tr').attr('class');
              			  if(rowname=="child"){
				  
				  table.row($(t).parents('tr').prev('tr')).remove();
				  
			  }
			  table
              .row( $(t).parents('tr') )
              .remove()
              .draw();
              swalWithBootstrapButtons(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            } else if (
              // Read more about handling dismissals
              result.dismiss === swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons(
                'Cancelled',
                'Your file is safe 🙂',
                'error'
              )
            }
          });

        return false;
});	

// ----------------------------------------------------------- //

// Order page

$('#orderdetails').hide();
	
	// ------------------------------------------------------ //
	// Orders DataTable
    // ------------------------------------------------------ //

var orderTable = $('#orders').DataTable( {
    responsive: {
       details: {
           type: 'column'
       }
    },
   columnDefs: [
    {
        targets: [ 3 ],
        visible: false,
        searchable: false
    },
    {
        targets: [ 4 ],
        visible: false
    },
    {
        targets: [ 5 ],
        visible: false
    },
    {
        targets: [ 6 ],
        visible: false
    },
    {
        targets: [ 7 ],
        visible: false
    },
    {
        targets: [ 8 ],
        visible: false
    },
    {
        targets: [ 9 ],
        visible: false
    }
]     
} );


var placedate;
var expectedArrival;
var status;
var user_id;
var price;
var orderAddress;
var orderState;
var orderZip;
var orderCity;
var orderid;

     var orderRef = firebase.database().ref().child("orders");

     orderRef.on("child_added", snap => {
     placedate = snap.child("placement_date").val();
     expectedArrival = snap.child("expected_arrival").val();
     status = snap.child("status").val();
     user_id = snap.child("user_id").val();
     price = snap.child("price").val();
     orderAddress = snap.child("shipping_address").val();
     orderState = snap.child("shipping_province").val();
     orderZip = snap.child("shipping_zipcode").val();
     orderCity = snap.child("shipping_city").val();
     orderid = snap.child("key").val();

    if(placedate == null)
    {
        placedate = "NA";
    }
    if(expectedArrival == null)
    {
        expectedArrival = "NA";
    }
    if(status == null)
    {
        status = "NA";
    }
    if(price == null)
    {
        price = "NA";
    }
    if(user_id == null)
    {
        user_id = "NA";
    }
    if(orderAddress == null)
    {
        orderAddress = "NA";
    }
    if(orderZip == null)
    {
        orderZip = "NA";
    }
    if(orderCity == null)
    {
        orderCity = "NA";
    }
    if(orderState == null)
    {
        orderState = "NA";
    }

    $("#orders").DataTable().row.add([
         orderid , status , price , placedate, expectedArrival , orderAddress , orderCity , orderState , orderZip , user_id , '<button type="button" class="btn btn-primary orderviewBtn"><i class="fas fa-eye"></i></button>',
        '<button type="button" class="btn btn-warning"><i class="fas fa-edit"></i></button>',
        '<button type="button" class="btn btn-danger orderdelBtn"><i class="fas fa-close"></i></button>'

    ]).draw();

});

$('#orders').on('click', 'tbody .orderviewBtn', function () {

    var pd;
    var ea;
    var sta;
    var pri;
    var shipadd;
    var shipcity;
    var shipstate;
    var shipzip;
    var usrid;
    var oid;

    var order_row_data;

    var userrowname=$(this).parents('tr').attr('class');
    
                    if(userrowname=="child"){
          
          order_row_data = orderTable.row($(this).parents('tr').prev('tr')).data();
          oid = order_row_data[0];
          sta = order_row_data[1];
          pri = order_row_data[2];
          pd = order_row_data[3];
          ea = order_row_data[4];
          shipadd = order_row_data[5];
          shipcity = order_row_data[6];
          shipstate = order_row_data[7];
          shipzip = order_row_data[8];
          usrid = order_row_data[9];
      }
 else{
     order_row_data = orderTable.row($(this).closest('tr')).data();

     oid = order_row_data[0];
     sta = order_row_data[1];
     pri = order_row_data[2];
     pd = order_row_data[3];
     ea = order_row_data[4];
     shipadd = order_row_data[5];
     shipcity = order_row_data[6];
     shipstate = order_row_data[7];
     shipzip = order_row_data[8];
     usrid = order_row_data[9];

    }

$('#datatableOrder').hide();
$('#changeTitle').text("Details");
$('#orderdetails').show();

$('#pd').text(pd);
$('#ea').text(ea);
$('#price').text(pri);
$('#status').text(sta);
$('#sp').text(shipstate);
$('#sc').text(shipcity);
$('#szc').text(shipzip);
$('#ui').text(usrid);
$('#sa').text(shipadd);

//orderRef.on('value', gotOrderData, errOrderData); 

/*function gotOrderData(data){
    var getData = data.val();
    var keys = Object.keys(getData);
    var mainImageDiv = $('#displayImage');
    for(var i = 0; i < keys.length; i++){
        var k = keys[i];
        var pic = getData[k].pictures;

        if(pic == undefined)
        {
            var msg="Not pictures yet!";
            var appenddivElement = "<div id=\""+k+"\" class=\"row forImage\"><div class=\"col-md-12 img1\">"+"<span id=\"imageText\">"+msg+"</span></div></div>";
            $(mainImageDiv).append(appenddivElement);
        }

        else{
        if(k == oid){    
        for(var j=0; j<pic.length; j++)
        {
            var l = j+1;
            var src = "data:image/jpeg;base64,";
            var item_image = pic[j];
            src += item_image;
            var newImage = document.createElement('img');
            newImage.src = src;
            //newImage.attr({'height':'200', 'width':'200'});
            //document.querySelector('.img').innerHTML = newImage.outerHTML;//where to insert your image
            var appenddivElement="<div id=\""+k+"\" class=\"row forImage text-center\"><div class=\"col-md-12 img\">"+"<span>\ <b>Image No<b> \ "+l+" </span>"+"<br><br>"+"<img class=\"img-fluid\" style=\"height:300px;width:300px;\" src=\""+newImage.src+"\"><hr></div></div>"; 

            $(mainImageDiv).append(appenddivElement);
        
        }
    }
}
    }
}

function errOrderData(err){
    console.log('Error !');
    console.log(err);
}*/

} );


$('#orders tbody').on( 'click', '.orderdelBtn', function (e) {
    
    o=$(this);

   const swalWithBootstrapButtons = swal.mixin({
       confirmButtonClass: 'btn btn-success',
       cancelButtonClass: 'btn btn-danger '
     });
     
     swalWithBootstrapButtons({
       title: 'Are you sure?',
       text: "You won't be able to revert this!",
       type: 'warning',
       showCancelButton: true,
       confirmButtonText: 'Yes, delete it!',
       cancelButtonText: 'No, cancel!',
       reverseButtons: true
     }).then((result) => {
       if (result.value) {
           
           var orderrowname=$(o).parents('tr').attr('class');
                       if(orderrowname=="child"){
             
             orderTable.row($(o).parents('tr').prev('tr')).remove();
             
         }
         orderTable
         .row( $(o).parents('tr') )
         .remove()
         .draw();
         swalWithBootstrapButtons(
           'Deleted!',
           'Your file has been deleted.',
           'success'
         )
       } else if (
         // Read more about handling dismissals
         result.dismiss === swal.DismissReason.cancel
       ) {
         swalWithBootstrapButtons(
           'Cancelled',
           'Your file is safe 🙂',
           'error'
         )
       }
     });

   return false;
});	


$('.orderDetail').hide();
var oRef = firebase.database().ref().child("orders");
oRef.on('value', OrderData, errorData);

function OrderData(data){
    var getData = data.val();
    var keys = Object.keys(getData);
    var ordersCounter=0;
    var completeCounter=0;
    var packCounter=0;
    var assemblyCounter=0;
    var printCounter=0;
    for(var i = 0; i < keys.length; i++){
        var k = keys[i];
        ordersCounter++;
        if(getData[k].status == "printing")
        {
            printCounter++;
        }
        if(getData[k].status == "packing")
        {
            packCounter++;
        }
        if(getData[k].status == "complete")
        {
            completeCounter++;
        }
        if(getData[k].status == "assembly")
        {
            assemblyCounter++;
        }
    }
    $('#totalorders').text(ordersCounter);
    $('#assembly').text(assemblyCounter);
    $('#packing').text(packCounter);
    $('#printing').text(printCounter);
    $('#complete').text(completeCounter);

}
function errorData(err){
    console.log('Error !');
    console.log(err);
}

$('#printButton').on('click',function(){
    $('.orderList').hide();
    $('.orderDetail').show();
    $('#changeOrderTitle').text("Details");

    var orRef = firebase.database().ref().child("orders");
    orRef.on('value', gotOrderData, errOrderData);

    function gotOrderData(data){
        var getData = data.val();
        var keys = Object.keys(getData);
        var mainImageDiv = $('#displayImage');
        var mainChuss = $('#detailChuss');
        for(var i = 0; i < keys.length; i++){
            var k = keys[i];
            var pic = getData[k].pictures;
            var ordstatus = getData[k].status;
            var images = new Array();

            if(ordstatus == "printing"){
                //console.log(getData[k].key); 
            
            for(var j=0; j<pic.length; j++)
            {
                var l = j+1;
                var src = "data:image/jpeg;base64,";
                var item_image = pic[j];
                src += item_image;
                var newImage = document.createElement('img');
                newImage.src = src;
                images.push(newImage.src);
                //newImage.attr({'height':'200', 'width':'200'});
                //document.querySelector('.img').innerHTML = newImage.outerHTML;//where to insert your image
     
               //var appenddivElement="<div class=\"col-md-4\">"+"<img class=\"img-fluid\" style=\"height:300px;width:300px;\" src=\""+newImage.src+"\"></div>"; 
               //console.log(j+" "+images);
            }

            var submainChuss ="<div id=\""+getData[k].key+"\" class=\" printDetail \"><h3 class=\"inner-title text-center\">\ Order Id = "+getData[k].key+" \</h3><hr><h4 class=\"inner-title\">\ Placement Date\</h4><p class=\"category\">"+getData[k].placement_date+"</p><h4 class=\"inner-title\">\ Expected Arrival\</h4><p class=\"category\">"+getData[k].expected_arrival+"</p><h4 class=\"inner-title\">\ Price\ </h4><p class=\"category\">"+getData[k].price+"</p><h4 class=\"inner-title\">\ Status\</h4><p class=\"category\">"+getData[k].status+"</p><h4 class=\"inner-title\">\ Shipping Province\</h4><p class=\"category\">"+getData[k].shipping_province+"</p><h4 class=\"inner-title\">\ City\ </h4><p class=\"category\">"+getData[k].shipping_city+"</p><h4 class=\"inner-title\">\ Shipping Address\ </h4><p class=\"category\">"+getData[k].shipping_address+"</p><h4 class=\"inner-title\">\ Zip Code\ </h4><p class=\"category\">"+getData[k].shipping_zipcode+"</p><h4 class=\"inner-title\">\ User Id\</h4><p class=\"category\">"+getData[k].user_id+"</p><h4 class=\"inner-title\">\ Order Images\</h4><hr><div class=\ row \ ><div class=\ col-md-4 \ >"+"<img class=\"img-fluid\" style=\"height:300px;width:300px; margin: 1em; \" src=\""+images[0]+"\"></div><div class=\ col-md-4 \ >"+"<img class=\"img-fluid\" style=\"height:300px;width:300px; margin: 1em; \" src=\""+images[1]+"\"></div><div class=\ col-md-4 \ >"+"<img class=\"img-fluid\" style=\"height:300px;width:300px; margin: 1em; \" src=\""+images[2]+"\"></div></div><button type=\"button\" style=\"margin-bottom: 0.5em;\" class=\"btn btn-primary text-center confirm-btn\"><i class=\"fas fa-check\"></i>\ Confirm \ </button></div><hr><br>"; 
            $(mainChuss).append(submainChuss);
        }
    }

    $(".confirm-btn").on("click",function(){
        var btn = $(this);

        const swalWithBootstrapButtons = swal.mixin({
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
            
          });
          
          swalWithBootstrapButtons({
            title: 'Are you sure you want to print this?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, confirm it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
          }).then((result) => {
            if (result.value) {
               // $(btn).parent("div").parent("div").parent("div");
               var div=$(btn).closest(".printDetail");
               var keyHaiYeBhai=div.attr("id");
               console.log(keyHaiYeBhai);
              // div.remove();
              $("#detailChuss").html(""); 
              firebase.database().ref("orders").child(keyHaiYeBhai).update({ "status": "assembly" })
               .then(function() {
                console.log("Updated succeeded.");
                //location.reload();
               // $('.kiaAzaab').html("");
                
              })
              .catch(function(error) {
                console.log("Updation failed: " + error.message);
              });

               /*.remove()
               .then(function() {
                 console.log("Remove succeeded.");
                 location.reload();
               })
               .catch(function(error) {
                 console.log("Remove failed: " + error.message);
               });*/
               //div.parent("div").html("");
               //console.log();
              swalWithBootstrapButtons(
                'Confirmed!',
                'Your order is confirmed.',
                'success'
              )
            } else if (
              // Read more about handling dismissals
              result.dismiss === swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons(
                'Cancelled',
                'Your order is safe :)',
                'error'
              )
            }
          });

          return false;

    });

    }
    
    function errOrderData(err){
        console.log('Error !');
        console.log(err);
    }
});

$('.orderbackBtnUp').on('click',function() {
    $('#detailChuss').html("");
    $('#displayImage').html("");
    $('#orderdetails').hide();
    $('#changeTitle').text("Orders");
    $('#datatableOrder').show();
});

$('.orderbackBtn').on('click',function() {
    $('#detailChuss').html("");
    $('#displayImage').html("");
    $('#orderdetails').hide();
    $('#changeTitle').text("Orders");
    $('#datatableOrder').show();
});

// ------------------------------------------------------------ //




    // ------------------------------------------------------ //
    // Add Question
    // ------------------------------------------------------ //

    /* Toggle between adding and removing the "active" and "show" classes when the user clicks on one of the "Section" buttons. The "active" class is used to add a background color to the current button when its belonging panel is open. The "show" class is used to open the specific accordion panel */
    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
        acc[i].onclick = function(){
        this.classList.toggle("active");
        this.nextElementSibling.classList.toggle("show");
      }
    }

    // Hiding faq control
    var faqRef = firebase.database().ref().child("faq");
    $('#faqCard').hide();


    /*var myfaqRef = new Firebase('https://snapwall-d66e6.firebaseio.com/');
    $('#faqSubmit').on('click', function() {
        var ques = $('#question').val();
        var ans = $('#answer').val();
        myfaqRef.push({ question: ques, answer: ans });
    });
    myfaqRef.on('child_added', function(snapshot) {
        var message = snapshot.val();
        displayChatMessage(message.ques, message.ans);
      });

    // Getting faq reference
    var faqRef = firebase.database().ref().child("faq");
    faqRef.on("child_added", snap => {
        

    });*/

    $('#addQtn').on('click', function() {
        $('#faqCard').slideDown(1000);
    });

    // Faq close
    $('#faqClose').on('click', function() {
        $('#faqCard').slideUp(1000);
    });

    var ques; 
    var ans;
 
    faqRef.on('value', gotData, errData);
    function gotData(data){
        //console.log(data.val());
        var getData = data.val();
        var keys = Object.keys(getData);
        //console.log(keys);

       /* $('#question1').text(getData[keys[0]].question);
        $('#answer1').text(getData[keys[0]].answer);

        $('#question2').text(getData[keys[1]].question);
        $('#answer2').text(getData[keys[1]].answer);

        $('#question3').text(getData[keys[2]].question);
        $('#answer3').text(getData[keys[2]].answer);*/
 var mainDiv=$("#questionlist");
        
        for(var i = 0; i < keys.length; i++){
            var k = keys[i];
            var qu = getData[k].question;
            var an = getData[k].answer;
            //console.log(k);
            var divElement="<div id=\""+k+"\" class=\"waj text-center\"><div class=\"row\"><div class=\"col-md-12\">"+    
            "<h4 class=\"inner-title\">"+qu+"</h4></div><div class=\"col-md-6 text-left\"><p id=\"uname\" class=\"category text-left\">"+an+"</p></div>"+
             "<div class=\"col-md-6 text-right\"><button type=\"button\" style=\"margin-bottom: 0.5em;\" class=\"btn btn-danger btn-delete\"><i class=\"fas fa-close\"></i></button></div>"+
             "</div><hr></div>";
                
                
            $(mainDiv).append(divElement);
            
        
          
            /*
             
            
            
            var h4 = $("<h4></h4>").addClass("inner-title").text(qu);
            $('.h').append(h4);
            var para = $("<p></p>").addClass("category").text(an);
            $('.p').append(para);
            var button = $("<button type='button' style='margin-bottom: 0.5em;' class='btn btn-danger'><i class='fas fa-close'></i></button>").addClass("col-md-offset-6");
            $('.b').append(button);
            var line = $("<hr>");
            $('.waj').append(line);
            
            
            /*var h4 = $("<h4></h4>").addClass("inner-title").text(qu);
            $('.faqques').append(h4);
            var para = $("<p></p>").addClass("category").text(an);
            $('.faqques').append(para);
            var button = $("<button type='button' style='margin-bottom: 0.5em;' class='btn btn-danger'><i class='fas fa-close'></i></button>").addClass("col-md-offset-6");
            $('.faqques').append(button);*/
        }
    
        $(".btn-delete").on("click",function(){
            var btn = $(this);

            const swalWithBootstrapButtons = swal.mixin({
                confirmButtonClass: 'btn btn-success',
                cancelButtonClass: 'btn btn-danger',
                
              });
              
              swalWithBootstrapButtons({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel!',
                reverseButtons: true
              }).then((result) => {
                if (result.value) {
                   // $(btn).parent("div").parent("div").parent("div");
                   var div=$(btn).closest(".waj");
                   var keyHaiYeBhai=div.attr("id");
                   console.log();
                   div.remove();
                   $("#questionlist").html(""); 
                   firebase.database().ref("faq").child(keyHaiYeBhai).remove()
                   .then(function() {
                     console.log("Remove succeeded.");
                     lockFlag = false;
                     //location.reload();
                     console.log(lockFlag);
                   })
                   .catch(function(error) {
                     console.log("Remove failed: " + error.message);
                   });
                   //div.parent("div").html("");
                   console.log();
                  swalWithBootstrapButtons(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                  )
                } else if (
                  // Read more about handling dismissals
                  result.dismiss === swal.DismissReason.cancel
                ) {
                  swalWithBootstrapButtons(
                    'Cancelled',
                    'Your imaginary file is safe :)',
                    'error'
                  )
                }
              });

              return false;

        });
        
    
}

    function errData(err){
        console.log('Error !');
        console.log(err);
    }
    
    
   /* snap => {
        ques = snap.child("question").val();
        ans = snap.child("answer").val();

        $('#question1').text(ques);
        $('#answer1').text(ans);

        $('#question2').text(ques);
        $('#answer2').text(ans);

        $('#question3').text(ques);
        $('#answer3').text(ans);
    });*/

//delete handler


    $('#faqSubmit').on('click', function() {
        var question = $('#question').val();
        var answer = $('#answer').val();
        faqRef.push({
            question: question,
            answer: answer
        });
    });

   /* $('#addImg').on('click', function() {
        const ref = firebase.storage().ref();
const file = document.querySelector('#image').files[0]
const namefile = (+new Date()) + '-' + file.name;
const metadata = {
  contentType: file.type
};
const task = ref.child(namefile).put(file, metadata);
task
  .then(snapshot => snapshot.ref.getDownloadURL())
  .then((url) => {
    console.log(url);
    document.querySelector('#someImageTagID').src = url;
  })
  .catch(console.error);
    });*/


    // ------------------------------------------------------- //
    // Card Close
    // ------------------------------------------------------ //
    $('.card-close a.remove').on('click', function (e) {
        e.preventDefault();
        $(this).parents('.card').fadeOut();
    });

    // ------------------------------------------------------- //
    // Tooltips init
    // ------------------------------------------------------ //    

    $('[data-toggle="tooltip"]').tooltip()    


    // ------------------------------------------------------- //
    // Adding fade effect to dropdowns
    // ------------------------------------------------------ //
    $('.dropdown').on('show.bs.dropdown', function () {
        $(this).find('.dropdown-menu').first().stop(true, true).fadeIn();
    });
    $('.dropdown').on('hide.bs.dropdown', function () {
        $(this).find('.dropdown-menu').first().stop(true, true).fadeOut();
    });


    // ------------------------------------------------------- //
    // Sidebar Functionality
    // ------------------------------------------------------ //
    $('#toggle-btn').on('click', function (e) {
		
        e.preventDefault();
        $(this).toggleClass('active');

		$('#side-navbar').animate({
			width: 'toggle'
		},2000);
        $('.side-navbar').toggleClass('shrinked');
        $('.content-inner').toggleClass('active');
        $(document).trigger('sidebarChanged');

        if ($(window).outerWidth() > 1183) {
            if ($('#toggle-btn').hasClass('active')) {
                $('.navbar-header .brand-small').hide();
                $('.navbar-header .brand-big').show();
            } else {
                $('.navbar-header .brand-small').show();
                $('.navbar-header .brand-big').hide();
            }
        }

        if ($(window).outerWidth() < 1183) {
            $('.navbar-header .brand-small').show();
        }
    });

    // ------------------------------------------------------- //
    // Universal Form Validation
    // ------------------------------------------------------ //

    $('.form-validate').each(function() {  
        $(this).validate({
            errorElement: "div",
            errorClass: 'is-invalid',
            validClass: 'is-valid',
            ignore: ':hidden:not(.summernote, .checkbox-template, .form-control-custom),.note-editable.card-block',
            errorPlacement: function (error, element) {
                // Add the invalid-feedback class to the error element
                error.addClass("invalid-feedback");
                console.log(element);
                if (element.prop("type") === "checkbox") {
                    error.insertAfter(element.siblings("label"));
                } 
                else {
                    error.insertAfter(element);
                }
            }
        });

    });    

    // ------------------------------------------------------- //
    // Material Inputs
    // ------------------------------------------------------ //

    var materialInputs = $('input.input-material');

    // activate labels for prefilled values
    materialInputs.filter(function() { return $(this).val() !== ""; }).siblings('.label-material').addClass('active');

    // move label on focus
    materialInputs.on('focus', function () {
        $(this).siblings('.label-material').addClass('active');
    });

    // remove/keep label on blur
    materialInputs.on('blur', function () {
        $(this).siblings('.label-material').removeClass('active');

        if ($(this).val() !== '') {
            $(this).siblings('.label-material').addClass('active');
        } else {
            $(this).siblings('.label-material').removeClass('active');
        }
    });

    // ------------------------------------------------------- //
    // Footer 
    // ------------------------------------------------------ //   

    var contentInner = $('.content-inner');

    $(document).on('sidebarChanged', function () {
        adjustFooter();
    });

    $(window).on('resize', function () {
        adjustFooter();
    })

    function adjustFooter() {
        var footerBlockHeight = $('.main-footer').outerHeight();
        contentInner.css('padding-bottom', footerBlockHeight + 'px');
    }

    // ------------------------------------------------------- //
    // External links to new window
    // ------------------------------------------------------ //
    $('.external').on('click', function (e) {

        e.preventDefault();
        window.open($(this).attr("href"));
    });

    // ------------------------------------------------------ //
    // For demo purposes, can be deleted
    // ------------------------------------------------------ //

    var stylesheet = $('link#theme-stylesheet');
    $("<link id='new-stylesheet' rel='stylesheet'>").insertAfter(stylesheet);
    var alternateColour = $('link#new-stylesheet');

    if ($.cookie("theme_csspath")) {
        alternateColour.attr("href", $.cookie("theme_csspath"));
    }

    $("#colour").change(function () {

        if ($(this).val() !== '') {

            var theme_csspath = 'css/style.' + $(this).val() + '.css';

            alternateColour.attr("href", theme_csspath);

            $.cookie("theme_csspath", theme_csspath, {
                expires: 365,
                path: document.URL.substr(0, document.URL.lastIndexOf('/'))
            });

        }

        return false;
    });

});