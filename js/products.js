const URL = "https://japceibal.github.io/emercado-api/cats_products/101.json"



function productsList(Array){

    let htmlContentToAppend = "";
    for(let i = 0; i < Array.length; i++){
        let products = Array[i];

            htmlContentToAppend += `
            <div class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${products.image}" alt="${products.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${products.name + " " + "-" + " " + products.currency+ " " + "-" + " " + products.cost}</h4>
                            <small class="text-muted">${products.soldCount} Vendidos</small>
                        </div>
                        <p class="mb-1">${products.description}</p>
                    </div>
                </div>
            </div>
            `

        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    }
}


fetch(URL)
.then(respuesta => respuesta.json())
.then(info => {
    productsList(info.products )
})