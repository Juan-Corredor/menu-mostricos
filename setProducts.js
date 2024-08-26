// Referencia al contenedor donde se agregarán las tarjetas
const container = document.getElementById('products-container');

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
function createProductCard(product, template) {
    // Crear un elemento div temporal para contener la plantilla
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = template;

    // Rellenar el contenido de la tarjeta con los datos del producto
    tempDiv.querySelector('.product-card__image-container__img').src = product.imgProduct;
    tempDiv.querySelector('.product-card__name').textContent = product.name;
    tempDiv.querySelector('.product-card__price').textContent = `$${product.price}`;
    tempDiv.querySelector('.product-card__ingredients').textContent = `Ingredientes: ${product.ingredients}`;
    tempDiv.querySelector('.product-card__observations').id = `observation-${product.idProduc}`;

    // Agregar la tarjeta al contenedor
    container.appendChild(tempDiv.firstElementChild);
}

// Cargar la plantilla y el JSON, luego crear las tarjetas de productos
Promise.all([loadProductCardTemplate(), loadProductData()])
    .then(([template, data]) => {
        data.products.forEach(product => createProductCard(product, template));
    })
    .catch(error => {
        console.error('Error loading data:', error);
    });
