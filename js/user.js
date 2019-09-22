$(document).ready(function () {

    'use strict';

    var t="";
    var o="";
    var lockFlag = true;

    // User page

	$('#details').hide();
	
	// ------------------------------------------------------ //
	// Users DataTable
    // ------------------------------------------------------ //

    var table = $('#users').DataTable( {
        "language": {
            "emptyTable": "Loading...."
          },
        responsive: {
           details: {
               type: 'column'
           }
       },
       columnDefs: [
        {
            targets: [ 4 ],
            visible: false,
            searchable: false
        },
        {
            targets: [ 5 ],
            visible: false,
            searchable: false
        },
        {
            targets: [ 6 ],
            visible: false,
            searchable: false
        },
        {
            targets: [ 7 ],
            visible: false,
            searchable: false
        },
        {
            targets: [ 8 ],
            visible: false,
            searchable: false
        },
        {
            targets: [ 9 ],
            visible: false,
            searchable: false
        },
        {
            targets: [ 10 ],
            visible: false,
            searchable: false
        }
    ]
} );

var n;
var e;
var type;
var dob;
var id;
var verify;
var online;
var ssid;
var statuss;
var reviews;
var profile;

    var rootRef = firebase.database().ref().child("users");

    rootRef.on("child_added", snap => {
     n = snap.child("name").val();
     e = snap.child("email").val();
     type = snap.child("typeAccount").val();
     dob = snap.child("dob").val();
     id = snap.child("id").val();
     verify = snap.child("isVerified").val();
     online = snap.child("online").val();
     statuss = snap.child("status").val();
     ssid = snap.child("ssid").val();
     reviews = snap.child("reviewsList").val();
     profile = snap.child("profile_pic").val();

    if(n == null)
    {
        n = "NA";
    }
    if(e == null)
    {
        e = "NA";
    }
    if(type == null)
    {
        type = "NA";
    }
    if(dob == null)
    {
        dob = "NA";
    }
    if(id == null)
    {
        id = "NA";
    }
    if(verify == null)
    {
        verify = "NA";
    }
    if(online == null)
    {
        online = "NA";
    }
    if(status == null)
    {
        status = "NA";
    }
    if(ssid == null)
    {
        ssid = "NA";
    }
    if(reviews == null)
    {
        reviews = "NA";
    }
    if(profile == null)
    {
        profile = "NA";
    }

   $("#users").DataTable().row.add([
         n,
         e,
         type,
         dob,
         id,
         verify,
         online,
         statuss,
         ssid,
         reviews,
         profile,
         '<button type="button" class="btn btn-primary viewBtn"><i class="fas fa-eye"></i></button> <button type="button" class="btn btn-danger delBtn"><i class="fas fa-trash"></i></button>'

    ]).draw();

    console.log(snap.val());
});


	    //view user detail
        $('#users').on('click', 'tbody .viewBtn', function () {

            var mainDiv = $(" ");
            var subDiv = $(" ");

            var name;
            var email;
            var utype;
            var dob;
            var id;
            var online;
            var verify;
            var ssid;
            var statuss;
            var reviews;
            var profile;

            var row_data;
            var rowname=$(this).parents('tr').attr('class');
            
            if(rowname=="child"){
				  
                  row_data = table.row($(this).parents('tr').prev('tr')).data();
                  name = row_data[0];
                  email = row_data[1];
                  utype = row_data[2];
                  dob = row_data[3];
                  id = row_data[4];
                  verify = row_data[5];
                  online = row_data[6];
                  statuss = row_data[7];
                  ssid = row_data[8];
                  reviews = row_data[9];
                  profile = row_data[10];
            }
            
         else{
             row_data = table.row($(this).closest('tr')).data();

             name = row_data[0];
             email = row_data[1];
             utype = row_data[2];
             dob = row_data[3];
             id = row_data[4];
             verify = row_data[5];
             online = row_data[6];
             statuss = row_data[7];
             ssid = row_data[8];
             reviews = row_data[9];
             profile = row_data[10];
            }
            
		
        $('#datatable').hide();
        $('#changeTitle').text("Details");
		$('#details').show();
		
		$('#uname').text(name);
		$('#uemail').text(email);
        $('#utype').text(utype);
        $('#dob').text(dob);
        $('#verify').text(verify);
        $('#online').text(online);
        $('#ssid').text(ssid);
        $('#status').text(statuss);

        var src = "data:image/jpeg;base64,";
        src += profile;
        mainDiv = $(".profile_image");
        subDiv = "<img src=\""+src+"\" style=\"height:200px;width:200px; margin: 1em; \" class= \" rounded \" alt= \" profile_image \">";
        $(mainDiv).append(subDiv);

       /* var reviewCounter = 0;

        for(let i = 0; i < Object.values(reviews).length; i++){
            var mainDiv = $(".review");

            var name = Object.values(reviews)[i].reviwerUserName;
            var text = Object.values(reviews)[i].reviewText;
            var ratings = Object.values(reviews)[i].ratings;
            var create = Object.values(reviews)[i].createdAt;

            var subDiv ="<h4 class=\" inner-title \">Reviewer Name</h4><p class=\" category \">"+ name +"</p>"; 
            
            $(mainDiv).append(subDiv);

            reviewCounter++;

            console.log(Object.values(reviews)[i].createdAt);
        }*/
        
    } );



    //back button
    $('.backBtn').on('click',function() {
        $('#details').hide();
        $('#changeTitle').text("Users");
        $('#datatable').show();
        $('.profile_image').html("");
    });


	//delete user 
	$('#users tbody').on( 'click', '.delBtn', function (e) {

        var reference = firebase.database().ref().child("users");

         t=$(this);

            var id;
            var row_data;
            var rowname=$(this).parents('tr').attr('class');
            
              			  if(rowname=="child"){
				  
                  row_data = table.row($(this).parents('tr').prev('tr')).data();
                  id = row_data[4];
			  }
         else{
             row_data = table.row($(this).closest('tr')).data();
             id = row_data[4];
            }

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

                  reference.child(id).remove().
                  then(function(){
                      table.row($(t).parents('tr').prev('tr')).remove();
                  });
              }
              reference.child(id).remove().
              then(function(){
                table
                .row( $(t).parents('tr') )
                .remove()
                .draw();
              });
			  
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


    /* Toggle between adding and removing the "active" and "show" classes 
    when the user clicks on one of the "Section" buttons. The "active" class 
    is used to add a background color to the current button when its belonging
    panel is open. The "show" class is used to open the specific accordion panel */

    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
        acc[i].onclick = function(){
        this.classList.toggle("active");
        this.nextElementSibling.classList.toggle("show");
      }
    }

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