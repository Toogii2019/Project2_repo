

$("#sign-in").on("click", function(event) {
    // event.preventDefault();
    // Make a newUser object
    var userLoginInfo = {
        email: $("#inputEmail").val().trim(),
        password: $("#inputPassword").val().trim(),
      };
    
    if (! userLoginInfo.email || ! userLoginInfo.password) {
        alert("Please fill up all the required fields!");
        return;
    }
  
    // Send an AJAX POST-request with jQuery
    $.post("/api/sign_in", userLoginInfo)
      // On success, run the following code
      .then(function(res) {
      });
});