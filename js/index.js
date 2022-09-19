document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});


document.addEventListener("DOMContentLoaded", function(){
    if (localStorage.getItem("email") == null){
        document.getElementById("ingresar").innerHTML = "Ingresar"
    } else {
        document.getElementById("ingresar").innerHTML = localStorage.getItem("email")
    }
})
