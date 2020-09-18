/* global moment */
// When user clicks add-btn
$("#user-submit").on("click", function(event) {
    event.preventDefault();
    // Make a newUser object
    var newUser = {
      firstName: $("#first-name").val().trim(),
      lastName: $("#last-name").val().trim(),
      username: $("#username").val().trim(),
      password: $("#password").val().trim(),
    };
    
    if (! newUser.firstName || ! newUser.lastName || ! newUser.username || ! newUser.password) {
        alert("Please fill up all the required fields!");
        return;
    }
  
    // Send an AJAX POST-request with jQuery
    $.post("/api/new_user", newUser)
      // On success, run the following code
      .then(function() {
        location.reload();
  
      });
});

$.get("/api/users", function(data) {

    if (data.length !== 0) {
    
        for (var i = 0; i < data.length; i++) {
    
            var row = $("<div>");
            row.addClass("users");
            row.append(`<h3> User #${i+1}: </h3>`);
            row.append("<p> First Name: " + data[i].first_name + "</p>");
            row.append("<p> Last Name: " + data[i].last_name + "</p>");
            row.append("<p> Username: " + data[i].username + "</p>");
        
            $("#users-area").prepend(row);
    
        }
    
    }

});
