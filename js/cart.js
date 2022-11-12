const URL_CART = CART_INFO_URL + "25801" + EXT_TYPE;

let producto_compra = {};
let precio_unitario = 0;


//COMIENZA MODIFICACIONES EN EL TOTAL, SUBTOTAL Y ENVIO DE LA COMPRA:
let subtotalFin = 0;
let totalFin = 0;
let costoEnvio = 0;



(function () {

    'use strict'
    var forms = document.querySelectorAll('.needs-validation')
    var parrafo = document.getElementById("parrafo") //PARRAFO QUE APARECE CUANDO NO SE SELECIONA NINGUNO DE LOS DOS, ESTA OCULTO
    var credito = document.getElementById("TarjCreditRadio") //RADIO DE LA TARJETA DE CREDITO
    var cuentaBank = document.getElementById("NumCuenta") //RADIO PARA CUENTA BANCARIA
    Array.prototype.slice.call(forms)
    .forEach(function (form) {
        form.addEventListener('submit', function (event){
            
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            } if (!credito.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
                parrafo.setAttribute('style', 'color: red;'); 
                document.getElementById('parrafo').removeAttribute('hidden', 'hidden')
    
            } if (!cuentaBank.checkValidity()){
                event.preventDefault()
                event.stopPropagation()
                parrafo.setAttribute('style', 'color: red;'); 
                document.getElementById('parrafo').removeAttribute('hidden', 'hidden')
            } if (credito.checkValidity()) {
                parrafo.setAttribute('style', 'color: green;');
                document.getElementById('parrafo').setAttribute('hidden', 'hidden')
            } if((cuentaBank.checkValidity())){
                parrafo.setAttribute('style', 'color: green;');
                document.getElementById('parrafo').setAttribute('hidden', 'hidden')
            }
            credito.addEventListener("change", (event) => {
                if ((!credito.checkValidity())) {
                parrafo.setAttribute('style', 'color: red;'); //poner color y style .display
                  document.getElementById('parrafo').removeAttribute('hidden', 'hidden')
                } else {
                parrafo.setAttribute('style', 'color: green;');
                  parrafo.setAttribute('hidden', 'hidden')
      
                }
            })
            cuentaBank.addEventListener("change", (event) => {
                if ((!cuentaBank.checkValidity())) {
                parrafo.setAttribute('style', 'color: red;'); //poner color y style .display
                  document.getElementById('parrafo').removeAttribute('hidden', 'hidden')
                } else {
                parrafo.setAttribute('style', 'color: green;');
                  parrafo.setAttribute('hidden', 'hidden')
      
                }
            })
            
            form.classList.add('was-validated');
        },false)
    }) 
})();



document.addEventListener("DOMContentLoaded", ()=>{
    fetch(URL_CART)
    .then(resp_compra => resp_compra.json())
    .then (data_compra => {
        producto_compra = data_compra

            htmlImagenes_vend = `
            <div class="">    
                <img src="${producto_compra.articles[0].image}" width="65" height="45" class="rounded float">
            </div>
            `
        document.getElementById("imagen_vend").innerHTML = htmlImagenes_vend;

        document.getElementById("nombre_vendido").innerHTML = producto_compra.articles[0].name;
        document.getElementById("currency_cost").innerHTML = producto_compra.articles[0].currency +" " + producto_compra.articles[0].unitCost
        cambio_precio(producto_compra)
        subtotal()
    })
    //MODIFICACIONES RELACIONADAS AL MODAL
    //Validaciones para el modal de la tarjeta de credito o de la transferencia bancaria:
    document.getElementById("TarjCreditRadio").addEventListener("change", function(){

        document.getElementById("NumTarjeta").disabled = false;
        document.getElementById("CodigSegurid").disabled = false;
        document.getElementById("CodigoSeg").disabled = false;
        document.getElementById("NumCuenta").disabled = true;

        checkeada()
    })

    document.getElementById("TransferBank").addEventListener("change", function(){

        document.getElementById("NumTarjeta").disabled = true;
        document.getElementById("CodigSegurid").disabled = true;
        document.getElementById("CodigoSeg").disabled = true;
        document.getElementById("NumCuenta").disabled = false;

        checkeada()
    })
})


//funcion para que en un principio el precio unitario sea igual al valor que me traje de el json. 
//luego ira cambiando a medida que cambie la cantidad de vendidos ya que se encuentra relacionado con el id=subtotal
function cambio_precio(){
    precio_unitario = producto_compra.articles[0].unitCost
    lista = `
    <p id="subtotal">${precio_unitario}</p>
    `
    document.getElementById("compra").innerHTML = producto_compra.articles[0].currency +" "+lista;
}
//funcion definida para que el subtotal sea igual al precio unitario por la cantidad de articulos vendidos, por lo que al variar los articulos
//varia el subtotal.
//Tambien agregue para que el subtotal final sea igual a esa cuenta. Es por eso que defini la variable SubtotalFin. 
function subtotal() {
    subtotalFin = precio_unitario * document.getElementById("cantidad_art").value
    document.getElementById("subtotal").innerHTML = subtotalFin
    document.getElementById("subtotalCosto").innerHTML = producto_compra.articles[0].currency +" " + subtotalFin
    EnvioTotal()
    calcTotal()
}
//El id cantidad de articulos hace referencia al input que se encuentra en cart.html, de ese input tomo el valor para multiplicarlo por el preciounit

//FUNCION PARA CALCULAR EL TOTAL DE ENVIO
function EnvioTotal(){
    if (document.getElementById("premium").checked){
        costoEnvio = subtotalFin * 0.15
        document.getElementById("textEnvioTip").innerHTML = producto_compra.articles[0].currency + " " + costoEnvio
    }else if(document.getElementById("express").checked){
        costoEnvio = subtotalFin * 0.07
        document.getElementById("textEnvioTip").innerHTML = producto_compra.articles[0].currency + " " + costoEnvio
    }else{
        costoEnvio = subtotalFin * 0.05
        document.getElementById("textEnvioTip").innerHTML = producto_compra.articles[0].currency + " " + costoEnvio
    }
    calcTotal()
}

//FUNCION PARA EL CALCULO FINAL TOTAL
function calcTotal(){
    document.getElementById("totalCostText").innerHTML = producto_compra.articles[0].currency + " " + (subtotalFin + costoEnvio)
}



//FUNCION PARA QUE AL SELECIONAR UNO DE LAS DOS OPCIONES CAMBIE EL TEXTO DE "AUN NO HA SELECIONADO NADA" POR EL TEXTO DE ESA OPCION
//A ESA MISMA FUNCION LA LLAMO DENTRO DE CADA VALIDACION PARA QUE SE RELACIONEN
function checkeada(){
    if(document.getElementById("TarjCreditRadio").checked){
        document.getElementById("typePayment").innerHTML = "Tarjeta de credito"
    }else if(document.getElementById("TransferBank").checked){
        document.getElementById("typePayment").innerHTML = "Transferencia Bancaria"
    }
}


/** 
const calle =  document.getElementById("inputCalle").value;
const numero = document.getElementById("inputNumero").value; 
const esquina = document.getElementById("inputEsquina").value; 

function submit_form(){
    const cartel_estado_compra = document.getElementById('cartel');

    if((calle.validity.valid)&&(esquina.validity.valid)&&(numero.validity.valid)){
        
        cartel_estado_compra.innerHTML = `  <div class="alert alert-success alert-dismissible" role="alert" id="alert-success">
            <p>FELICITACIONES!!!!! La compra se realizó con éxito</p>
            <p>Por favor... Cierre esta ventana para CONTINUAR EL PROCESO DE COMPRA</P>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onclick = "formulario.submit()"></button>
          </div>`
    };
};





function showAlertSuccess() {
    document.getElementById("alert-success").classList.add("show");
}

*/
/**function validacion(){
    const calle =  document.getElementById("inputCalle").value;
    const numero = document.getElementById("inputNumero").value; 
    const esquina = document.getElementById("inputEsquina").value; 
    if(calle!="" && numero!="" && esquina!= ""){
        showAlertSuccess()
    }
}

const button = document.getElementById("BotonCompra");
button.onclick = validacion;*/
