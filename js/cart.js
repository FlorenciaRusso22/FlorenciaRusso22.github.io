const URL_CART = CART_INFO_URL + "25801" + EXT_TYPE

let producto_compra = {}
let precio_unitario = 0
document.addEventListener("DOMContentLoaded", ()=>{
    fetch(URL_CART)
    .then(resp_compra => resp_compra.json())
    .then (data_compra => {
        producto_compra = data_compra

            htmlImagenes_vend = `
            <div class="">    
                <img src="${producto_compra.articles[0].image}" width="100" height="100" class="img-thumbnail gallery-item">
            </div>
            `
        document.getElementById("imagen_vend").innerHTML = htmlImagenes_vend;

        document.getElementById("nombre_vendido").innerHTML = producto_compra.articles[0].name;
        document.getElementById("currency_cost").innerHTML = producto_compra.articles[0].currency +" " + producto_compra.articles[0].unitCost
        cambio_precio(producto_compra)
    })
})
//funcion para que en un principio el precio unitario sea igual al valor que me traje de el json. 
//luego ira cambiando a medida que cambie la cantidad de vendidos ya que se encuentra relacionado con el id=subtotal
function cambio_precio(){
    precio_unitario = producto_compra.articles[0].unitCost
    lista = `
    <p id="subtotal">${precio_unitario}</p>
    `
    document.getElementById("compra").innerHTML = lista;
}
//funcion definida para que el subtotal sea igual al precio unitario por la cantidad de articulos vendidos, por lo que al variar los articulos
//varia el subtotal.
function subtotal() {
    document.getElementById("subtotal").innerHTML = precio_unitario * document.getElementById("cantidad_art").value
}
//el id cantidad de articulos hace referencia al input que se encuentra en cart.html, de ese input tomo el valor para multiplicarlo por el preciounit
