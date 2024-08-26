// Referencia al contenedor donde se agregarán las tarjetas
const container = document.getElementById('products-container');
const prueba = document.getElementById('prueba');

// Función para cargar la plantilla de tarjeta de producto
async function loadProductCardTemplate() {
    const response = await fetch('product-card-template.html');
    const template = await response.text();
    return template;
}

// Función para cargar el JSON de productos
async function loadProductData() {
    const response = await fetch('products-data.json');
    const data = await response.json();
    return data;
}

// Función para crear una tarjeta de producto
function createCategory(category, template) {
    console.log(template, prueba);
    // Clona el nodo del elemento original
    const tempDiv = prueba.cloneNode(true);

    // Modifica el contenido del título dentro del elemento clonado
    tempDiv.querySelector('.titulo').textContent = category.name;

    // Crea un nuevo div para envolver el contenido clonado
    const newDiv = document.createElement('div');
    newDiv.appendChild(tempDiv);  // Agrega el contenido clonado dentro del nuevo div

    // Agrega el nuevo div al contenedor
    container.appendChild(newDiv);

    // Elimina el nodo original
    prueba.remove();


    const listProducts = category.products;
    for (let p = 0; p < listProducts.length; p++) {
        const element = listProducts[p];
        console.log(element);
        createProductCard(element, template, tempDiv)
    }
}

// Función para crear una tarjeta de producto
function createProductCard(product, template, contendor) {
    // Crear un elemento div temporal para contener la plantilla
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = template;

    // Rellenar el contenido de la tarjeta con los datos del producto
    tempDiv.querySelector('.product-card__image-container__img').src = product.imgProduct;
    tempDiv.querySelector('.product-card__name').textContent = product.name;
    tempDiv.querySelector('.product-card__price').textContent = `$ ${product.price}`;
    tempDiv.querySelector('.product-card__ingredients').textContent = `Ingredientes: ${product.ingredients}`;
    tempDiv.querySelector('.product-card__observations').id = `observation-${product.idProduc}`;

    // Agregar la tarjeta al contenedor
    contendor.appendChild(tempDiv.firstElementChild);
}


Promise.all([loadProductData(), loadProductCardTemplate()])
    .then(([data, template]) => {
        data.categorys.forEach(category => createCategory(category, template));
    })
    .catch(error => {
        console.error('Error loading data:', error);
    });

// // Cargar la plantilla y el JSON, luego crear las tarjetas de productos
// Promise.all([loadProductCardTemplate(), loadProductData()])
//     .then(([template, data]) => {
//         data.categorys.forEach(category => console.log(category, template));
//     })
//     .catch(error => {
//         console.error('Error loading data:', error);
//     });
