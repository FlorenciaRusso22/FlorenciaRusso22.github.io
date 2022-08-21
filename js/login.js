function showAlertError() {
    document.getElementById("alert-danger").classList.add("show");
}


document.getElementById("ok").addEventListener("click", function(){


    const email = document.getElementById("email").value;
    const floatingPassword = document.getElementById("floatingPassword").value;

    if (email.length > 0 && floatingPassword.length > 0){
        window.location.href = "index.html";

    }else{
        showAlertError()
    }
})

const button = document.getElementById("ok");