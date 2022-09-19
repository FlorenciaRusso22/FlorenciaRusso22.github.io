const URL = "https://japceibal.github.io/emercado-api/cats_products/"
//copie constantes de categorias 
const ORDER_ASC_BY_PRECIO = "$$";
const ORDER_DESC_BY_PRECIO = "$";
const ORDER_BY_PROD_PRECIO = "Precio";
let currentCategoriesArray = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;

//funcion para categorias

function sortCategories(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_PRECIO)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_PRECIO){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_PRECIO){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}
//otra 
function sortAndShowCategories(sortCriteria, categoriesArray){
    currentSortCriteria = sortCriteria;

    if(categoriesArray != undefined){
        currentCategoriesArray = categoriesArray;
    }

    currentCategoriesArray = sortCategories(currentSortCriteria, currentCategoriesArray);
    //Muestro las categorías ordenadas
    productsList();
}


//aca en la linea 1, cambie el url porque ya no uso el 101.json ahora uso el de productos en general. 

// use este codigo de categorias y lo modifique un poco
//cree una constante para ir cambiando el subtitulo llamando al id que le puse al parrafo en products.html 
//dentro del getSONData concatene las const del init.js product url el id y el ext type (.json) para que lea y vaya cambiando de 101 a 102 y asi sucesivamente


document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL+localStorage.getItem("catID")+EXT_TYPE).then(function(resultObj){
        if (resultObj.status === "ok"){
            currentCategoriesArray = resultObj.data.products;
            productsList(currentCategoriesArray);
            const prod_subtitle = document.getElementById("subtitulo_prod");
            prod_subtitle.innerHTML = "Veras aqui todos los productos de la categoria " + resultObj.data.catName;
        }
    });
    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowCategories(ORDER_ASC_BY_PRECIO);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowCategories(ORDER_DESC_BY_PRECIO);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowCategories(ORDER_BY_PROD_PRECIO);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;
//aca llame a la funcion que corresponde y le cambie por la que tenia antes
        productsList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }
//aca llame a la funcion que corresponde y le cambie por la que tenia antes
        productsList();
    });    


});

//cambie el set por el get porque quiero tomar el valor de esa variable que se llama catID. Tambien borre el windows location que tenia
function setCatID(id) {
    localStorage.getItem("catID", id);
}

//Agregue funcion para que cuando se de clic en el producto se tome el id de ese producto y mande a product info 
//y en product info voy a empezar a trabajar con cada producto

function setProduct(id){
    localStorage.setItem("ProdID", id)
    window.location.href ="product-info.html"
}



function productsList(){

    let htmlContentToAppend = "";
    for(let i = 0; i < currentCategoriesArray.length; i++){
        let products = currentCategoriesArray[i];
//en parseInt le cambie por soldCount porque es lo que necesita traer del json de productos para ordenar en base a ese dato
        if (((minCount == undefined) || (minCount != undefined && parseInt(products.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(products.cost) <= maxCount))){
//En este if modifique para que en el parseInt filtre con el valor de cost y no como estaba antes. 
            htmlContentToAppend += `
            <div onclick="setProduct(${products.id})" class="list-group-item list-group-item-action cursor-active">
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
}

