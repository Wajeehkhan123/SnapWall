$(document).ready(function () {

    'use strict';

    var t="";
    var o="";
    var lockFlag = true;
    var objectDropZone;
    var allRequests = [];
    var completeRequests = [];
    var newRequests = [];
    var inProgressRequests = [];

    // Date Request page

	// ------------------------------------------------------ //
	// Date Request DataTable
    // ------------------------------------------------------ //

    var table = $('#requests').DataTable( {
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
            targets: [ 7 ],
            visible: false,
            searchable: false
        },
        {
            targets: [ 8 ],
            visible: false,
            searchable: false
        }
       ]
} );

var gender;
var desc;
var date;
var contact;
var age;
var status;
var id;
var userId;

    var rootRef = firebase.database().ref().child("dateRequests");

    rootRef.on("child_added", snap => {

        gender = snap.child("gender").val();
        desc = snap.child("description").val();
        date = snap.child("dateCreated").val();
        contact = snap.child("contact").val();
        age = snap.child("age").val();
        id = snap.child("id").val();
        userId = snap.child("userId").val();
        status = snap.child("status").val();
     
    if(gender == null)
    {
        gender = "NA";
    }
    if(date == null)
    {
        date = "NA";
    }
    if(desc == null)
    {
        desc = "NA";
    }
    if(contact == null)
    {
        contact = "NA";
    }
    if(id == null)
    {
        id = "NA";
    }
    if(userId == null)
    {
        userId = "NA";
    }
    if(age == null || age == "")
    {
        age = "NA";
    }
    if(status == null)
    {
        age = "NA";
    }

    var selectHtml = "";

    if(status == "new" || status == "New"){
        newRequests.push({
            gender: gender,
            description: desc,
            date: date,
            contact: contact,
            age: age,
            id: id,
            userId: userId,
            status: status
        });
        selectHtml = '<select style="border: 2px solid #ec0b43; padding: 4px; font-weight: 600;" class="form-control" id="statusId"><option selected value='+status+'><strong>'+status+'</strong></option><option value="in progress">in progress</option><option value="complete">complete</option></select>';
    }
    else if(status == "in progress" || status == "In progress"){
        inProgressRequests.push({
            gender: gender,
            description: desc,
            date: date,
            contact: contact,
            age: age,
            id: id,
            userId: userId,
            status: status
        });
        selectHtml = '<select style="border: 2px solid #ec0b43; padding: 4px; font-weight: 600;" class="form-control" id="statusId"><option selected value='+status+'><strong>'+status+'</strong></option><option value="new">new</option><option value="complete">complete</option></select>';
    }
    else if(status == "complete" || status == "Complete"){
        completeRequests.push({
            gender: gender,
            description: desc,
            date: date,
            contact: contact,
            age: age,
            id: id,
            userId: userId,
            status: status
        });
        selectHtml = '<select style="border: 2px solid #ec0b43; padding: 4px; font-weight: 600;" class="form-control" id="statusId"><option selected value='+status+'><strong>'+status+'</strong></option><option value="in progress">in progress</option><option value="new">new</option></select>';
    }
    allRequests.push({
        gender: gender,
        description: desc,
        date: date,
        contact: contact,
        age: age,
        id: id,
        userId: userId,
        status: status
    });

   $("#requests").DataTable().row.add([
          gender,
          desc,
          date,
          contact,
          age,
          selectHtml,
          '<button type="button" style="margin:5px; background-color:#ec0b43;color:white;" class="btn btn-sm viewBtn"><i class="fas fa-eye"></i> User</button>',
          id,
          userId

    ]).draw();

});

//status filter
$('#filterStatus').on('change', function(){

    var statusValue = $('#filterStatus').val();

    if(statusValue == "All"){

        $("#requests").DataTable().clear();
        $("#requests").DataTable().destroy();

        $('#requests').DataTable( {
            "language": {
                "emptyTable": "No data available...."
              },
            responsive: {
               details: {
                   type: 'column'
               }
           },
           columnDefs: [
            {
                targets: [ 7 ],
                visible: false,
                searchable: false
            },
            {
                targets: [ 8 ],
                visible: false,
                searchable: false
            }
           ]
    } );

        var gender;
        var desc;
        var date;
        var contact;
        var age;
        var status;
        var id;
        var userId;
        
            var rootRequestsRef = firebase.database().ref().child("dateRequests");
        
            rootRequestsRef.on("child_added", snap => {
        
                gender = snap.child("gender").val();
                desc = snap.child("description").val();
                date = snap.child("dateCreated").val();
                contact = snap.child("contact").val();
                age = snap.child("age").val();
                id = snap.child("id").val();
                userId = snap.child("userId").val();
                status = snap.child("status").val();
             
            if(gender == null)
            {
                gender = "NA";
            }
            if(date == null)
            {
                date = "NA";
            }
            if(desc == null)
            {
                desc = "NA";
            }
            if(contact == null)
            {
                contact = "NA";
            }
            if(id == null)
            {
                id = "NA";
            }
            if(userId == null)
            {
                userId = "NA";
            }
            if(age == null || age == "")
            {
                age = "NA";
            }
            if(status == null)
            {
                age = "NA";
            }
        
            var selectHtml = "";
        
            if(status == "new" || status == "New"){
                selectHtml = '<select style="border: 2px solid #ec0b43; padding: 4px; font-weight: 600;" class="form-control" id="statusId"><option selected value='+status+'><strong>'+status+'</strong></option><option value="in progress">in progress</option><option value="complete">complete</option></select>';
            }
            else if(status == "in progress" || status == "In progress"){
                selectHtml = '<select style="border: 2px solid #ec0b43; padding: 4px; font-weight: 600;" class="form-control" id="statusId"><option selected value='+status+'><strong>'+status+'</strong></option><option value="new">new</option><option value="complete">complete</option></select>';
            }
            else if(status == "complete" || status == "Complete"){
                selectHtml = '<select style="border: 2px solid #ec0b43; padding: 4px; font-weight: 600;" class="form-control" id="statusId"><option selected value='+status+'><strong>'+status+'</strong></option><option value="in progress">in progress</option><option value="new">new</option></select>';
            }
            
           $("#requests").DataTable().row.add([
                  gender,
                  desc,
                  date,
                  contact,
                  age,
                  selectHtml,
                  '<button type="button" style="margin:5px; background-color:#ec0b43;color:white;" class="btn btn-sm viewBtn"><i class="fas fa-eye"></i> User</button>',
                  id,
                  userId
        
            ]).draw();

        });   

    }

    else  if(statusValue == "new"){

        $("#requests").DataTable().clear();
        $("#requests").DataTable().draw();
        $("#requests").DataTable().destroy();

        $('#requests').DataTable( {
            "language": {
                "emptyTable": "No data available...."
              },
            responsive: {
               details: {
                   type: 'column'
               }
           },
           columnDefs: [
            {
                targets: [ 7 ],
                visible: false,
                searchable: false
            },
            {
                targets: [ 8 ],
                visible: false,
                searchable: false
            }
           ]
    } );

        var gender;
        var desc;
        var date;
        var contact;
        var age;
        var status;
        var id;
        var userId;
        
            var rootRequestsRef = firebase.database().ref().child("dateRequests");
        
            rootRequestsRef.on("child_added", snap => {

                if(snap.child("status").val() == "new"){
                    gender = snap.child("gender").val();
                    desc = snap.child("description").val();
                    date = snap.child("dateCreated").val();
                    contact = snap.child("contact").val();
                    age = snap.child("age").val();
                    id = snap.child("id").val();
                    userId = snap.child("userId").val();
                    status = snap.child("status").val();
                 
                if(gender == null)
                {
                    gender = "NA";
                }
                if(date == null)
                {
                    date = "NA";
                }
                if(desc == null)
                {
                    desc = "NA";
                }
                if(contact == null)
                {
                    contact = "NA";
                }
                if(id == null)
                {
                    id = "NA";
                }
                if(userId == null)
                {
                    userId = "NA";
                }
                if(age == null || age == "")
                {
                    age = "NA";
                }
                if(status == null)
                {
                    age = "NA";
                }
            
                var selectHtml = '<select style="border: 2px solid #ec0b43; padding: 4px; font-weight: 600;" class="form-control" id="statusId"><option selected value='+status+'><strong>'+status+'</strong></option><option value="in progress">in progress</option><option value="complete">complete</option></select>';
                
               $("#requests").DataTable().row.add([
                      gender,
                      desc,
                      date,
                      contact,
                      age,
                      selectHtml,
                      '<button type="button" style="margin:5px; background-color:#ec0b43;color:white;" class="btn btn-sm viewBtn"><i class="fas fa-eye"></i> User</button>',
                      id,
                      userId
            
                ]).draw();
                }
        });       
    }

    else  if(statusValue == "complete"){

        $("#requests").DataTable().clear();
        $("#requests").DataTable().draw();
        $("#requests").DataTable().destroy();

        $('#requests').DataTable( {
            "language": {
                "emptyTable": "No data available...."
              },
            responsive: {
               details: {
                   type: 'column'
               }
           },
           columnDefs: [
            {
                targets: [ 7 ],
                visible: false,
                searchable: false
            },
            {
                targets: [ 8 ],
                visible: false,
                searchable: false
            }
           ]
    } );

        var gender;
        var desc;
        var date;
        var contact;
        var age;
        var status;
        var id;
        var userId;
        
            var rootRequestsRef = firebase.database().ref().child("dateRequests");
        
            rootRequestsRef.on("child_added", snap => {

                if(snap.child("status").val() == "complete"){
                    gender = snap.child("gender").val();
                    desc = snap.child("description").val();
                    date = snap.child("dateCreated").val();
                    contact = snap.child("contact").val();
                    age = snap.child("age").val();
                    id = snap.child("id").val();
                    userId = snap.child("userId").val();
                    status = snap.child("status").val();
                 
                if(gender == null)
                {
                    gender = "NA";
                }
                if(date == null)
                {
                    date = "NA";
                }
                if(desc == null)
                {
                    desc = "NA";
                }
                if(contact == null)
                {
                    contact = "NA";
                }
                if(id == null)
                {
                    id = "NA";
                }
                if(userId == null)
                {
                    userId = "NA";
                }
                if(age == null || age == "")
                {
                    age = "NA";
                }
                if(status == null)
                {
                    age = "NA";
                }
            
                var selectHtml = '<select style="border: 2px solid #ec0b43; padding: 4px; font-weight: 600;" class="form-control" id="statusId"><option selected value='+status+'><strong>'+status+'</strong></option><option value="in progress">in progress</option><option value="new">new</option></select>';
                
               $("#requests").DataTable().row.add([
                      gender,
                      desc,
                      date,
                      contact,
                      age,
                      selectHtml,
                      '<button type="button" style="margin:5px; background-color:#ec0b43;color:white;" class="btn btn-sm viewBtn"><i class="fas fa-eye"></i> User</button>',
                      id,
                      userId
            
                ]).draw();
                }
        });       
    }

    else  if(statusValue == "in progress"){

        $("#requests").DataTable().clear();
        $("#requests").DataTable().draw();
        $("#requests").DataTable().destroy();

        $('#requests').DataTable( {
            "language": {
                "emptyTable": "No data available...."
              },
            responsive: {
               details: {
                   type: 'column'
               }
           },
           columnDefs: [
            {
                targets: [ 7 ],
                visible: false,
                searchable: false
            },
            {
                targets: [ 8 ],
                visible: false,
                searchable: false
            }
           ]
    } );

        var gender;
        var desc;
        var date;
        var contact;
        var age;
        var status;
        var id;
        var userId;
        
            var rootRequestsRef = firebase.database().ref().child("dateRequests");
        
            rootRequestsRef.on("child_added", snap => {

                if(snap.child("status").val() == "in progress"){
                    gender = snap.child("gender").val();
                    desc = snap.child("description").val();
                    date = snap.child("dateCreated").val();
                    contact = snap.child("contact").val();
                    age = snap.child("age").val();
                    id = snap.child("id").val();
                    userId = snap.child("userId").val();
                    status = snap.child("status").val();
                 
                if(gender == null)
                {
                    gender = "NA";
                }
                if(date == null)
                {
                    date = "NA";
                }
                if(desc == null)
                {
                    desc = "NA";
                }
                if(contact == null)
                {
                    contact = "NA";
                }
                if(id == null)
                {
                    id = "NA";
                }
                if(userId == null)
                {
                    userId = "NA";
                }
                if(age == null || age == "")
                {
                    age = "NA";
                }
                if(status == null)
                {
                    age = "NA";
                }
            
                var selectHtml = '<select style="border: 2px solid #ec0b43; padding: 4px; font-weight: 600;" class="form-control" id="statusId"><option selected value='+status+'><strong>'+status+'</strong></option><option value="new">new</option><option value="complete">complete</option></select>';
                
               $("#requests").DataTable().row.add([
                      gender,
                      desc,
                      date,
                      contact,
                      age,
                      selectHtml,
                      '<button type="button" style="margin:5px; background-color:#ec0b43;color:white;" class="btn btn-sm viewBtn"><i class="fas fa-eye"></i> User</button>',
                      id,
                      userId
            
                ]).draw();
                }
        });       
    }

});

function checkStatus(){

    var statusValue = $('#filterStatus').val();

    if(statusValue == "All"){

        $("#requests").DataTable().clear();
        $("#requests").DataTable().destroy();

        $('#requests').DataTable( {
            "language": {
                "emptyTable": "No data available...."
              },
            responsive: {
               details: {
                   type: 'column'
               }
           },
           columnDefs: [
            {
                targets: [ 7 ],
                visible: false,
                searchable: false
            },
            {
                targets: [ 8 ],
                visible: false,
                searchable: false
            }
           ]
    } );

        var gender;
        var desc;
        var date;
        var contact;
        var age;
        var status;
        var id;
        var userId;
        
            var rootRequestsRef = firebase.database().ref().child("dateRequests");
        
            rootRequestsRef.on("child_added", snap => {
        
                gender = snap.child("gender").val();
                desc = snap.child("description").val();
                date = snap.child("dateCreated").val();
                contact = snap.child("contact").val();
                age = snap.child("age").val();
                id = snap.child("id").val();
                userId = snap.child("userId").val();
                status = snap.child("status").val();
             
            if(gender == null)
            {
                gender = "NA";
            }
            if(date == null)
            {
                date = "NA";
            }
            if(desc == null)
            {
                desc = "NA";
            }
            if(contact == null)
            {
                contact = "NA";
            }
            if(id == null)
            {
                id = "NA";
            }
            if(userId == null)
            {
                userId = "NA";
            }
            if(age == null || age == "")
            {
                age = "NA";
            }
            if(status == null)
            {
                age = "NA";
            }
        
            var selectHtml = "";
        
            if(status == "new" || status == "New"){
                selectHtml = '<select style="border: 2px solid #ec0b43; padding: 4px; font-weight: 600;" class="form-control" id="statusId"><option selected value='+status+'><strong>'+status+'</strong></option><option value="in progress">in progress</option><option value="complete">complete</option></select>';
            }
            else if(status == "in progress" || status == "In progress"){
                selectHtml = '<select style="border: 2px solid #ec0b43; padding: 4px; font-weight: 600;" class="form-control" id="statusId"><option selected value='+status+'><strong>'+status+'</strong></option><option value="new">new</option><option value="complete">complete</option></select>';
            }
            else if(status == "complete" || status == "Complete"){
                selectHtml = '<select style="border: 2px solid #ec0b43; padding: 4px; font-weight: 600;" class="form-control" id="statusId"><option selected value='+status+'><strong>'+status+'</strong></option><option value="in progress">in progress</option><option value="new">new</option></select>';
            }
            
           $("#requests").DataTable().row.add([
                  gender,
                  desc,
                  date,
                  contact,
                  age,
                  selectHtml,
                  '<button type="button" style="margin:5px; background-color:#ec0b43;color:white;" class="btn btn-sm viewBtn"><i class="fas fa-eye"></i> User</button>',
                  id,
                  userId
        
            ]).draw();

        });   

    }

    else  if(statusValue == "new"){

        $("#requests").DataTable().clear();
        $("#requests").DataTable().draw();
        $("#requests").DataTable().destroy();

        $('#requests').DataTable( {
            "language": {
                "emptyTable": "No data available...."
              },
            responsive: {
               details: {
                   type: 'column'
               }
           },
           columnDefs: [
            {
                targets: [ 7 ],
                visible: false,
                searchable: false
            },
            {
                targets: [ 8 ],
                visible: false,
                searchable: false
            }
           ]
    } );

        var gender;
        var desc;
        var date;
        var contact;
        var age;
        var status;
        var id;
        var userId;
        
            var rootRequestsRef = firebase.database().ref().child("dateRequests");
        
            rootRequestsRef.on("child_added", snap => {

                if(snap.child("status").val() == "new"){
                    gender = snap.child("gender").val();
                    desc = snap.child("description").val();
                    date = snap.child("dateCreated").val();
                    contact = snap.child("contact").val();
                    age = snap.child("age").val();
                    id = snap.child("id").val();
                    userId = snap.child("userId").val();
                    status = snap.child("status").val();
                 
                if(gender == null)
                {
                    gender = "NA";
                }
                if(date == null)
                {
                    date = "NA";
                }
                if(desc == null)
                {
                    desc = "NA";
                }
                if(contact == null)
                {
                    contact = "NA";
                }
                if(id == null)
                {
                    id = "NA";
                }
                if(userId == null)
                {
                    userId = "NA";
                }
                if(age == null || age == "")
                {
                    age = "NA";
                }
                if(status == null)
                {
                    age = "NA";
                }
            
                var selectHtml = '<select style="border: 2px solid #ec0b43; padding: 4px; font-weight: 600;" class="form-control" id="statusId"><option selected value='+status+'><strong>'+status+'</strong></option><option value="in progress">in progress</option><option value="complete">complete</option></select>';
                
               $("#requests").DataTable().row.add([
                      gender,
                      desc,
                      date,
                      contact,
                      age,
                      selectHtml,
                      '<button type="button" style="margin:5px; background-color:#ec0b43;color:white;" class="btn btn-sm viewBtn"><i class="fas fa-eye"></i> User</button>',
                      id,
                      userId
            
                ]).draw();
                }
        });       
    }

    else  if(statusValue == "complete"){

        $("#requests").DataTable().clear();
        $("#requests").DataTable().draw();
        $("#requests").DataTable().destroy();

        $('#requests').DataTable( {
            "language": {
                "emptyTable": "No data available...."
              },
            responsive: {
               details: {
                   type: 'column'
               }
           },
           columnDefs: [
            {
                targets: [ 7 ],
                visible: false,
                searchable: false
            },
            {
                targets: [ 8 ],
                visible: false,
                searchable: false
            }
           ]
    } );

        var gender;
        var desc;
        var date;
        var contact;
        var age;
        var status;
        var id;
        var userId;
        
            var rootRequestsRef = firebase.database().ref().child("dateRequests");
        
            rootRequestsRef.on("child_added", snap => {

                if(snap.child("status").val() == "complete"){
                    gender = snap.child("gender").val();
                    desc = snap.child("description").val();
                    date = snap.child("dateCreated").val();
                    contact = snap.child("contact").val();
                    age = snap.child("age").val();
                    id = snap.child("id").val();
                    userId = snap.child("userId").val();
                    status = snap.child("status").val();
                 
                if(gender == null)
                {
                    gender = "NA";
                }
                if(date == null)
                {
                    date = "NA";
                }
                if(desc == null)
                {
                    desc = "NA";
                }
                if(contact == null)
                {
                    contact = "NA";
                }
                if(id == null)
                {
                    id = "NA";
                }
                if(userId == null)
                {
                    userId = "NA";
                }
                if(age == null || age == "")
                {
                    age = "NA";
                }
                if(status == null)
                {
                    age = "NA";
                }
            
                var selectHtml = '<select style="border: 2px solid #ec0b43; padding: 4px; font-weight: 600;" class="form-control" id="statusId"><option selected value='+status+'><strong>'+status+'</strong></option><option value="in progress">in progress</option><option value="new">new</option></select>';
                
               $("#requests").DataTable().row.add([
                      gender,
                      desc,
                      date,
                      contact,
                      age,
                      selectHtml,
                      '<button type="button" style="margin:5px; background-color:#ec0b43;color:white;" class="btn btn-sm viewBtn"><i class="fas fa-eye"></i> User</button>',
                      id,
                      userId
            
                ]).draw();
                }
        });       
    }

    else  if(statusValue == "in progress"){

        $("#requests").DataTable().clear();
        $("#requests").DataTable().draw();
        $("#requests").DataTable().destroy();

        $('#requests').DataTable( {
            "language": {
                "emptyTable": "No data available...."
              },
            responsive: {
               details: {
                   type: 'column'
               }
           },
           columnDefs: [
            {
                targets: [ 7 ],
                visible: false,
                searchable: false
            },
            {
                targets: [ 8 ],
                visible: false,
                searchable: false
            }
           ]
    } );

        var gender;
        var desc;
        var date;
        var contact;
        var age;
        var status;
        var id;
        var userId;
        
            var rootRequestsRef = firebase.database().ref().child("dateRequests");
        
            rootRequestsRef.on("child_added", snap => {

                if(snap.child("status").val() == "in progress"){
                    gender = snap.child("gender").val();
                    desc = snap.child("description").val();
                    date = snap.child("dateCreated").val();
                    contact = snap.child("contact").val();
                    age = snap.child("age").val();
                    id = snap.child("id").val();
                    userId = snap.child("userId").val();
                    status = snap.child("status").val();
                 
                if(gender == null)
                {
                    gender = "NA";
                }
                if(date == null)
                {
                    date = "NA";
                }
                if(desc == null)
                {
                    desc = "NA";
                }
                if(contact == null)
                {
                    contact = "NA";
                }
                if(id == null)
                {
                    id = "NA";
                }
                if(userId == null)
                {
                    userId = "NA";
                }
                if(age == null || age == "")
                {
                    age = "NA";
                }
                if(status == null)
                {
                    age = "NA";
                }
            
                var selectHtml = '<select style="border: 2px solid #ec0b43; padding: 4px; font-weight: 600;" class="form-control" id="statusId"><option selected value='+status+'><strong>'+status+'</strong></option><option value="new">new</option><option value="complete">complete</option></select>';
                
               $("#requests").DataTable().row.add([
                      gender,
                      desc,
                      date,
                      contact,
                      age,
                      selectHtml,
                      '<button type="button" style="margin:5px; background-color:#ec0b43;color:white;" class="btn btn-sm viewBtn"><i class="fas fa-eye"></i> User</button>',
                      id,
                      userId
            
                ]).draw();
                }
        });       
    }
}

//updating status
$('#requests').on('change', 'tbody #statusId', function (){

    var row_data;

    var requestReference = firebase.database().ref().child("dateRequests");

    var rowname=$(this).parents('tr').attr('class');
    
    if(rowname=="child")
    {			  
        row_data = $("#requests").DataTable().row($(this).parents('tr').prev('tr')).data();
    }
    else
    {
        row_data = $("#requests").DataTable().row($(this).closest('tr')).data();
    }

    var requestStatus = $(this).val();
    var requestId = row_data[7];

    if(requestStatus == "in" || requestStatus == "In"){
        requestStatus = "in progress";
    }
    
    //console.log(requestStatus);
    //console.log(requestId);

    requestReference.child(requestId).update({ 
        status: requestStatus
    })
    .then(function() {
        swal({title: "Updated", text: "Status updated!", type: "success"}).catch(function(){
            swal({ title: "Error!", text: "Error in updating the status!", type: "error" });
        }).then(function() {
            //location.reload();
            checkStatus();
        });
    });

});


//view request detail
$('#requests').on('click', 'tbody .viewBtn', function () {

    var mainDivv = $(" ");
    var subDivv = $(" ");

    var rowname=$(this).parents('tr').attr('class');
    var row_data;
    var gender;
    var desc;
    var date;
    var contact;
    var age;
    var id;
    var userId;
    var status;

    if(rowname=="child")
    {			  
        row_data = $("#requests").DataTable().row($(this).parents('tr').prev('tr')).data();
        gender = row_data[0];
        desc = row_data[1];
        date = row_data[2];
        contact = row_data[3];
        age = row_data[4];
        status = row_data[5];
        id = row_data[7];
        userId = row_data[8];
    }
    else
    {
        row_data = $("#requests").DataTable().row($(this).closest('tr')).data();
        gender = row_data[0];
        desc = row_data[1];
        date = row_data[2];
        contact = row_data[3];
        age = row_data[4];
        status = row_data[5];
        id = row_data[7];
        userId = row_data[8];
    }

$('#datatable').hide();
$('#changeTitle').text("Request Details");
$('#details').show();

var userReff = firebase.database().ref().child("users").child(userId);

userReff.on("value", snap => {
    
    var val = snap.val();
    var userName = val["name"];
    var userEmail = val["email"];
    var profile_pic = val["profile_pic"];
    
    $('#userName').text(userName);
    $('#userEmail').text(userEmail);

    mainDivv = $(".user_image");
    subDivv = "<img src=\""+profile_pic+"\" style=\" height:150px; width:150px; margin: 1em; \" class= \" rounded \" alt= \" profile_image \">";
    $(mainDivv).append(subDivv);

});


});

//updating request status
var requestId;
$('#requests tbody').on('click', '.editBtn', function (e) { 

    var rowname=$(this).parents('tr').attr('class');
    var row_data;
    var status;

    if(rowname=="child")
    {			  
        row_data = table.row($(this).parents('tr').prev('tr')).data();
        status = row_data[5];
        requestId = row_data[7];
    }
    else
    {
        row_data = table.row($(this).closest('tr')).data();
        status = row_data[5];
        requestId = row_data[7];
    }

    var newStatus = new Option("new", "new");
    var inProgressStatus = new Option("in progress", "in progress");
    var completeStatus = new Option("complete", "complete");
    
    $(newStatus).html("new");
    $("#statusId").append(newStatus);

    $(inProgressStatus).html("in progress");
    $("#statusId").append(inProgressStatus);

    $(completeStatus).html("complete");
    $("#statusId").append(completeStatus);

    if(status == "new" || status == "New"){
        $(newStatus).attr("selected","selected");
    }
    else if(status == "complete" || status == "Complete"){
        $(completeStatus).attr("selected","selected");
    }
    else if(status == "in progress" || status == "In progress"){
        $(inProgressStatus).attr("selected","selected");
    }

    $("#editRequestModal").modal('show');

});

//close modal event
$(document).on("click", "#closeModal", function () {
    $("#statusId").html("");
    $("#editRequestModal").modal('hide');
});

//update button event
$(document).on("click", "#updateStatus", function () {

    var requestReference = firebase.database().ref().child("dateRequests");

    var updatedStatus = $(".modal-body #statusId").val();

    requestReference.child(requestId).update({ 
        status: updatedStatus
    })
    .then(function() {
        swal({title: "Updated", text: "Status updated!", type: "success"})
        .then(function() {
           location.reload();
        }).catch(function(){
            swal({ title: "Error!", text: "Error in updating the status!", type: "error" });
        });
    });

});


//back button
$('.backBtn').on('click',function() {
    location.reload();
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