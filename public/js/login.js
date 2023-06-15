$(document).ready(function () {
    $("#submit").click(function (e) {
        $.post("https://news-utd-app.onrender.com/home/login",
            {
                email: $("#email").val(),
                password: $("#password").val()
            },
            function (data, status) {
                if (status == "success") {
                    if (data.success)
                        window.location.href = "/home/NewsAPI";
                    else
                        $("#status").text("Invalid Username or Password");
                }
            });
        e.preventDefault();
    });
});