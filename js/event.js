$(document).ready(function () {

    'use strict';

    var t="";
    var o="";
    var lockFlag = true;
    var objectDropZone;

    // Event page
    
    //add description summernote
    $('#desc').summernote({
        placeholder: 'enter description'
      });

	// ------------------------------------------------------ //
	// Event DataTable
    // ------------------------------------------------------ //

    var table = $('#events').DataTable( {
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
        }
       ]
} );

var name;
var desc;
var date;
var cdate;
var profile;
var id;
var cust;

    var rootRef = firebase.database().ref().child("events");

    rootRef.on("child_added", snap => {

        name = snap.child("Name").val();
        desc = snap.child("Description").val();
        date = snap.child("Event_Date").val();
        cdate = snap.child("CreatedOn").val();
        profile = snap.child("Picture").val();
        id = snap.child("id").val();
        cust = snap.child("Customers").val();
     
    if(name == null)
    {
        name = "NA";
    }
    if(date == null)
    {
        date = "NA";
    }
    if(desc == null)
    {
        desc = "NA";
    }
    if(cdate == null)
    {
        cdate = "NA";
    }
    if(id == null)
    {
        id = "NA";
    }
    if(cust == null)
    {
        cust = "NA";
    }

   $("#events").DataTable().row.add([
          name,
          desc,
          date,
          cdate,
          profile,
          id,
          cust,
         '<button type="button" class="btn btn-primary viewBtn"><i class="fas fa-eye"></i></button> <button type="button" class="btn btn-warning editBtn"><i class="fas fa-edit"></i></button> <button type="button" class="btn btn-danger delBtn"><i class="fas fa-trash"></i></button>'

    ]).draw();

});


//delete event	
	$('#events tbody').on( 'click', '.delBtn', function (e) {

        var reference = firebase.database().ref().child("events");

         t=$(this);

            var id;
            var row_data;
            var rowname=$(this).parents('tr').attr('class');
            
              			  if(rowname=="child"){
				  
                  row_data = table.row($(this).parents('tr').prev('tr')).data();
                  id = row_data[5];
			  }
         else{
             row_data = table.row($(this).closest('tr')).data();
             id = row_data[5];
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

// dropzone for event picture
var dzFlag = true;
Dropzone.autoDiscover = false;
if (dzFlag) {
    $("#dropZoneExample").addClass("dropzone dz-square dz-processing dz-success dz-complete");
    
    $("div#dropZoneExample").dropzone({
        url: "#",
        autoProcessQueue: false,
        addRemoveLinks: true,
        acceptedFiles: 'image/*',
        maxFilesize: 5,
        dictRemoveFile: '<i class="fa fa-close"></i>',
        maxFiles: 1,
        uploadMultiple: false,
        parallelUploads: 1,
        thumbnailMethod: 'contain',
        init: function () {
            objectDropZone = this;
        }
    });
    dzFlag = false;
}

function checkDate() {
    var date = $(".modal-body #eventdate").val();
    var selectedDate = new Date(date);
    var now = new Date();
    if (selectedDate < now) {
        swal({ title: "Error!", text: "Date must be in the future!", type: "error" });
        return false;
    }
    return true;
}

function editcheckDate() {
    var date = $(".modal-body #editeventdate").val();
    var selectedDate = new Date(date);
    var now = new Date();
    if (selectedDate < now) {
        swal({ title: "Error!", text: "Date must be in the future!", type: "error" });
        return false;
    }
    return true;
}

//adding an event
$(document).on("click", ".addEvent", function () {

    if (objectDropZone.files.length == 0) {
        swal("Please drop the file to be uploaded"," ","error");
        return false;
    }

    var name = $(".modal-body #name").val();
    var desc = $(".modal-body #desc").val();
    var date = $(".modal-body #eventdate").val();
    if(checkDate() == false){
        return false;
    }
    var date = new Date($.now());
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    var cdate = date.getDate()+"-"+(date.getMonth() + 1)+"-"+date.getFullYear()+" "+strTime;
    var src = "data:image/jpeg;base64,";
    var myFile = objectDropZone.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(myFile);
    reader.onload=function(){
    var eventReference = firebase.database().ref().child("events");

    var keeyy = eventReference.push({
        Name: name,
        Description: desc,
        Event_Date: date,
        CreatedOn: cdate,
        Picture: reader.result
    }).getKey();
    
    if(keeyy != null){
        eventReference.child(keeyy).update({ id: keeyy })
        .then(function() {
            swal({ title: "Added", text: "Event Added Successfully!", type: "success" })
            .then(function() {
               location.reload();
            });
        })
        .catch(function(){
            swal({ title: "Error!", text: "Event not added!", type: "error" });
        });
    }
    $("#addEvenetModal").modal('hide');
    }
});

//updating an event part 1
var eventId;
var updatedImage;
var subDiv;
var profile;
$('#events tbody').on('click', '.editBtn', function (e) { 

    var rowname=$(this).parents('tr').attr('class');
    var eventReference = firebase.database().ref().child("events");
    var row_data;
    var name;
    var desc;
    var date;

    if(rowname=="child")
    {			  
        row_data = table.row($(this).parents('tr').prev('tr')).data();
        name = row_data[0];
        desc = row_data[1];
        date = row_data[2];
        profile = row_data[4];
        eventId = row_data[5];
    }
    else
    {
        row_data = table.row($(this).closest('tr')).data();
        name = row_data[0];
        desc = row_data[1];
        date = row_data[2];
        profile = row_data[4];
        eventId = row_data[5];
    }
    $(".modal-body #editname").val(name);
    $("#editdesc").summernote("code", desc);
    $(".modal-body #editeventdate").val(date);
    var mainDiv = $(".editeventpic");
    subDiv = "<img src=\""+profile+"\" style=\"height:150px;width:150px; \" class= \" rounded \" alt= \" event_image \">";
    $(mainDiv).append(subDiv);

    $("#editEvenetModal").modal('show');

    $('#editeventimage').on('change', function() { 
        console.log(this.files[0]); 
        updatedImage = this.files[0];
    }); 

});

//updating event part 2
$(document).on("click", ".editEvent", function () {
    var eventReference = firebase.database().ref().child("events");
    var name = $(".modal-body #editname").val();
    var desc = $(".modal-body #editdesc").val();
    var date = $(".modal-body #editeventdate").val();
    if(editcheckDate() == false){
        return false;
    }
    console.log(updatedImage);

    if(updatedImage!=undefined){
        var myFile = updatedImage;
    var reader = new FileReader();
    reader.readAsDataURL(myFile);
    reader.onload=function(){
        eventReference.child(eventId).update({ 
            Name: name,
            Description: desc,
            Event_Date: date,
            Picture: reader.result 
        })
    .then(function(){
        swal({title: "Updated", text: "Event updated!", type: "success"})
        .then(function(){
            location.reload();
        });
    }).catch(function(){
        swal({ title: "Error!", text: "Event not added!", type: "error" });
    });

    $(".modal-body #editcheck").val("");
    $("#editEvenetModal").modal('hide');
    $(".editeventpic").html("");
    }
    }
    if(updatedImage==undefined){
        eventReference.child(eventId).update({ 
            Name: name,
            Description: desc,
            Event_Date: date,
            Picture: profile 
        })
    .then(function(){
        swal({title: "Updated", text: "Event updated!", type: "success"})
        .then(function(){
            location.reload();
        });
    }).catch(function(){
        swal({ title: "Error!", text: "Event not added!", type: "error" });
    });

    $("#editEvenetModal").modal('hide');
    $(".editeventpic").html("");
    }
});

$(document).on("click", "#closeModal", function () {
    $(".editeventpic").html("");
    $("#editEvenetModal").modal('hide');
});

//view user detail
$('#events').on('click', 'tbody .viewBtn', function () {

    var mainDivv = $(" ");
    var subDivv = $(" ");

    var rowname=$(this).parents('tr').attr('class');
    var row_data;
    var name;
    var desc;
    var date;
    var cdate;
    var dd;
    var pro;
    var cusst;

    if(rowname=="child")
    {			  
        row_data = table.row($(this).parents('tr').prev('tr')).data();
        name = row_data[0];
        desc = row_data[1];
        date = row_data[2];
        cdate = row_data[3];
        pro = row_data[4];
        dd = row_data[5];
        cusst = row_data[6];
    }
    else
    {
        row_data = table.row($(this).closest('tr')).data();
        name = row_data[0];
        desc = row_data[1];
        date = row_data[2];
        cdate = row_data[3];
        pro = row_data[4];
        dd = row_data[5];
        cusst = row_data[6];
    }
    

$('#datatable').hide();
$('#changeTitle').text("Details");
$('#details').show();

$('#eventname').text(name);
$('#eventdesc').text(desc);
$('#dateevent').text(date);
$('#eventcreated').text(cdate);

mainDivv = $(".event_image");
subDivv = "<img src=\""+pro+"\" style=\"height:200px;width:200px; margin: 1em; \" class= \" rounded \" alt= \" profile_image \">";
$(mainDivv).append(subDivv);

 var customerCounter = 1;
 var headDiv = $(".customers");


if(cusst != "NA"){
    for(let i = 0; i < Object.values(cusst).length; i++){
        console.log(Object.values(cusst)[i].id);
    
       var nn=null;
       var ee=null;
       var custRef = firebase.database().ref().child("users").child(Object.values(cusst)[i].id);
    
       custRef.on("value", snap => {
            nn = snap.child("name").val();
            ee = snap.child("email").val();
            console.log(nn);
            console.log(ee);
            
            var dataDiv ="<h3 class=\" text-center \">("+customerCounter+")</h3><h4 class=\" inner-title \">Participiant Name</h4><p class=\" category \">"+ nn +"</p><h4 class=\" inner-title \">Participiant Email</h4><p class=\" category \">"+ ee +"</p>"; 
            $(headDiv).append(dataDiv);
            customerCounter++;
        });
    }
}
if(cusst == "NA")
{
    var dataDiv = "<p class=\" text-center category \">No Participiant for this event.</p>"; 
    $(headDiv).append(dataDiv);
}
});



//back button
$('.backBtn').on('click',function() {
$('#details').hide();
$('#changeTitle').text("Events");
$('#datatable').show();
$('.event_image').html("");
$('.customers').html("");
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