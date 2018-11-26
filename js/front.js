$(document).ready(function () {

    'use strict';

    var t="";

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
        console.log(keys);

       /* $('#question1').text(getData[keys[0]].question);
        $('#answer1').text(getData[keys[0]].answer);

        $('#question2').text(getData[keys[1]].question);
        $('#answer2').text(getData[keys[1]].answer);

        $('#question3').text(getData[keys[2]].question);
        $('#answer3').text(getData[keys[2]].answer);*/

        for(var i = 0; i < keys.length; i++){
            var k = keys[i];
            var qu = getData[k].question;
            var an = getData[k].answer;
            //console.log(qu,an);
            var button = $("<button></button>").addClass("accordion").text(qu);
            $('#dul').append(button);
            var para = $("<p></p>").addClass("panel").text(an);
            $('#dul').append(para);
            
        }
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

    $('#faqSubmit').on('click', function() {
        var question = $('#question').val();
        var answer = $('#answer').val();
        faqRef.push({
            question: question,
            answer: answer
        });
    })

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