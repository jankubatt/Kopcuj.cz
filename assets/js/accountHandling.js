/*
Copyright © Jan Kubát 2021 - present
api.mapy.cz
*/

$("#btnLogin").on("click", function() {
    login();
})

$("#btnRegister").on("click", function() {
    register();
})

$(document).keypress(function(event){
    let keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
        if (window.location.href.includes("register")) {
            register();
        }
        else {
            login();
        }
    }
});

if (getCookie("id") != "") {
    window.location.replace("../home.html");
}

function login() {
    $.post("assets/php/loginScript.php", {login: $("#login").val(), pass: $("#pass").val()}).then(function(data) {
        if (data == "OK") {
            window.location.replace("../home.html");
        }
    });
}

function register() {
    if ($("#pass").val() == $("#passAgain").val())
        $.post("assets/php/registerScript.php", {login: $("#login").val(), pass: $("#pass").val()}).then(function(data) {
            if (data == "OK") {
                window.location.replace("../index.html");
            }
        });

    else {
        $("#error").html("Hesla nejsou stejná");
    }
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}