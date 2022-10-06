const URL = PRODUCT_INFO_URL + localStorage.getItem("ProdID") + EXT_TYPE;

const URL_COM = PRODUCT_INFO_COMMENTS_URL + localStorage.getItem("ProdID") + EXT_TYPE;

let producto = {};
let coments = {};


function setProduct(id){
    localStorage.setItem("ProdID", id)
    window.location.href ="product-info.html"
}


function starscore(stars){  //funcion para pasar la puntuacion del usuario a estrellas
    let htmlStar = ""
    for (let i = 0; i < stars; i++){
        htmlStar += `<span class="fa fa-star checked"></span>`
    };
    for(i = stars; i < 5; i++){
        htmlStar +=  `<span class="fa fa-star"></span>`
    }
    return htmlStar;
}

document.addEventListener("DOMContentLoaded", () => {

    fetch(URL)
    .then(resp => resp.json())
    .then(data => {
        producto = data
        document.getElementById("productName").innerHTML = producto.name;
        document.getElementById("precio").innerHTML =  producto.currency + " " + producto.cost;
        document.getElementById("Descripcion").innerHTML = producto.description;
        document.getElementById("categoria").innerHTML = producto.category;
        document.getElementById("cantidad_vendidos").innerHTML = producto.soldCount;


        htmlImagenes = ""   
            for (let i = 0; i < producto.images.length; i++){
                htmlImagenes += `
                <div class="col">    
                    <img src="${producto.images[i]}" class="img-thumbnail gallery-item">
                </div>
                `
            }  //for para recorrer las imagenes de los productos
        document.getElementById("imagenes_prod").innerHTML = htmlImagenes;
        
        fetch(URL_COM)
        .then(resp => resp.json())
        .then(dato =>{
            coments = dato;

            htmlcomentarios = ""   
            for (let i = 0; i < coments.length; i++){
                let cantidad = coments[i].score
                let htmlStar = starscore(cantidad)

                htmlcomentarios += `
                <div class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col"
                        <h6 class="mb-1"><small class="fw-border h6">${coments[i].user}${" "} - ${coments[i].dateTime} - ${htmlStar} </small></h6>
                        <p class="mb-1">${coments[i].description}</p>
                    </div>
                </div>     
                </div>   
                `
            } //for para recorrer los comentarios 
            document.getElementById("comentarios").innerHTML = htmlcomentarios
        })


        let productosRelacionados = " "
        for (let i = 0; i < producto.relatedProducts.length; i++){
            productosRelacionados += 

            `
            <div class= "card col">
                <div class="text-center">
                    <img src="${producto.relatedProducts[i].image}" class="img-thumbnail gallery-item";></img>   
                </div>
                <div class="card-body text-center">
                    <h5 class="card-title"> ${producto.relatedProducts[i].name}</h5>
                    <a href="product-info.html" style="text-decoration:none"  style="text-decoration:none; color:black" onclick="setProduct(${producto.relatedProducts[i].id})")> Ver más </a> 
                </div>
            </div>
            `
        }
        document.getElementById("Producto_relacionado").innerHTML = productosRelacionados;
    })
})


