let nombre = document.getElementById ("inputNombre");
let emailInput = document.getElementById ("inputEmail");
let apellido = document.getElementById ("inputApellido");
let telefono = document.getElementById ("inputTelefono");
let apellidoD = document.getElementById ("inputSegApellido");
let nombreD = document.getElementById ("inputSegNombre")

//el input del email, lo iguale al email2, que es donde guarde anteriormente el email de login.js cuando ingreso por primera vez. 
//la referencia email2 se encuentra definida en login.js

emailInput.value = localStorage.getItem("email2");

//al hacer clic en el boton guardar, se guarda en el local, lo que se escriba en cada input de nombre, apellido, telefono, snombre, sapellido. 

    document.addEventListener("DOMContentLoaded", () => {
        document.getElementById("buttonguardar").addEventListener("click", () => {
            if(nombre.checkValidity()){
                localStorage.setItem("nombre", nombre.value)
            }
            if(apellido.checkValidity()){
                localStorage.setItem("apellido", apellido.value)
            }
            if(telefono.checkValidity()){
                localStorage.setItem("telefono", telefono.value)
            }
            if(apellidoD.checkValidity()){
                localStorage.setItem("apellidoD", apellidoD.value)
            }
            if(nombreD.checkValidity()){
                localStorage.setItem("nombreD", nombreD.value)
            }
            
            /*window.location.href = "index.html"*/
            
        })

        //Estos addeventlistener son para que me vaya validando en tiempo real. Valida el nombre y el apellido
        nombre.addEventListener("input", () => {
            if(!nombre.checkValidity()){
                document.getElementById("invalidName").style.display ="block"
                nombre.classList.add("is-invalid");
                nombre.classList.remove("is-valid");

            } else {
                nombre.classList.add("is-valid");
                nombre.classList.remove("is-invalid");
                document.getElementById("invalidName").style.display ="none"


            } 
        })
        apellido.addEventListener("input", () => {
            if(!apellido.checkValidity()){
                document.getElementById("invalidSurName").style.display ="block"
                apellido.classList.add("is-invalid");
                apellido.classList.remove("is-valid");
            } else {
                apellido.classList.add("is-valid");
                apellido.classList.remove("is-invalid");
                document.getElementById("invalidSurName").style.display ="none"
            }

        })

        if(localStorage.getItem("nombre") != null){
            nombre.value = localStorage.getItem("nombre");
        }
        if(localStorage.getItem("apellido") != null){
            apellido.value = localStorage.getItem("apellido");
        }
        if(localStorage.getItem("telefono") != null){
            telefono.value = localStorage.getItem("telefono");
        }
        if(localStorage.getItem("apellidoD") != null){
            apellidoD.value = localStorage.getItem("apellidoD");
        }
        if(localStorage.getItem("nombreD") != null){
            nombreD.value = localStorage.getItem("nombreD");
        }

    

    })   

