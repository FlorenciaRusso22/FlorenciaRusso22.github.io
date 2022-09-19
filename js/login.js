function showAlertError() {
    document.getElementById("alert-danger").classList.add("show");
}


document.getElementById("ok").addEventListener("click", function(){


    const email = document.getElementById("email").value;
    const floatingPassword = document.getElementById("floatingPassword").value;

    if (email.length > 0 && floatingPassword.length > 0){
        var email_analizado = /^([^]+)@(\w+).(\w+)$/.exec(email)
        localStorage.setItem("email", email_analizado[1])
        window.location.href = "index.html";
    }else{
        showAlertError()
        localStorage.setItem ("email", null);
    }
})

const button = document.getElementById("ok");    