$(document).ready(function () {
  $("#usercheck").hide();
  let validusername = false;
  $("#username").keyup(function () {
    validateUsername();
  });
  function validateUsername() {
    let usernameValue = $("#username").val();
    if (usernameValue.length == "") {
      $("#usercheck").show();
      validusername = false;
      return false;
    } else if (usernameValue.length < 3 || usernameValue.length > 20) {
      $("#usercheck").show();
      $("#usercheck").html("**Length of username must be between 3 and 20");
      validusername = false;
      return false;
    } else {
      validusername = true;
      $("#usercheck").hide();
    }
  }

  const email = document.getElementById("email");
  let validmail = false;
  $("#emailvalid").hide();
  email.addEventListener("blur", () => {
    let regex = /^([_\-\.0-9a-zA-Z]+)@([_\-\.0-9a-zA-Z]+)\.([a-zA-Z]){2,7}$/;
    let s = email.value;
    if (regex.test(s)) {
      $("#emailvalid").addClass("success");
      $("#emailvalid").text("Valid Maild id");
      validmail = true;
    } else {
      validmail = false;
      $("#emailvalid").removeClass("success");
      $("#emailvalid").text("Invalid Maild id");
    }
  });
  $("#emailvalid").show();

  $("#passcheck").hide();
  let validpassword = false;
  $("#password").keyup(function () {
    validatePassword();
  });
  function validatePassword() {
    let passwordValue = $("#password").val();
    if (passwordValue.length == "") {
      $("#passcheck").show();
      validpassword = false;
      return false;
    }
    if (passwordValue.length < 8 || passwordValue.length > 20) {
      $("#passcheck").show();
      $("#passcheck").html(
        "**Length of your password must be between 8 and 20"
      );
      validpassword = false;
      return false;
    } else {
      validpassword = true;
      $("#passcheck").hide();
    }
  }

  $("#numcheck").hide();
  let validnumber = false;
  $("#phnumber").keyup(function () {
    validateNumber();
  });
  function validateNumber() {
    let number = $("#phnumber").val();
    if (number.length == "") {
      $("#numbercheck").show();
      validpassword = false;
      return false;
    }
    if (number.length < 10 || number.length > 10 || isNaN(number)) {
      $("#numbercheck").show();
      $("#numbercheck").html(
        "**Input must be a number of size 10"
      );
      validnumber = false;
      return false;
    } else {
      validnumber = true;
      $("#numbercheck").hide();
    }
  }

  $("#submit").click(function (event) {
    const res = validmail && validnumber && validusername && validpassword;
    if (res) {
      $.post("https://news-utd-app.onrender.com/home/register",
        {
          username: $("#username").val(),
          email: $("#email").val(),
          password: $("#password").val(),
          phnumber: $("#phnumber").val()
        },
        function (data, status) {
          if (data.success) {
            alert(`New User ${$("#username").val()} Created`)
            setTimeout(() => {
              window.location.href = "/home";
            }, 5000);
          }
          else {
            $("#status").text("Email Id or Phone Number already exists");
          }
        });
    }
    else {
      $("#status").text("Fill the data properly");
    }
    event.preventDefault();
  });
});

