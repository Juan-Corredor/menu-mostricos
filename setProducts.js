// Referencia al contenedor donde se agregarán las tarjetas
const container = document.getElementById('main_container');
const containerCategory = document.getElementById('category-container');

// Función para cargar la plantilla de tarjeta de producto
async function loadProductCardTemplate() {
    try {
        const response = await fetch('product-card-template.html');
        return await response.text();
    } catch (error) {
        console.error('Error loading template:', error);
    }
}

// Función para cargar el JSON de productos
async function loadProductData() {
    try {
        const response = await fetch('products-data.json');
        return await response.json();
    } catch (error) {
        console.error('Error loading product data:', error);
    }
}

// Función para crear una categoría
function createCategory(category, template) {
    // Clona el nodo del elemento original
    const tempDiv = containerCategory.cloneNode(true);

    // Modifica el contenido del título dentro del elemento clonado
    tempDiv.querySelector('.tittle-category').textContent = category.name;

    // Crea un nuevo div para envolver el contenido clonado
    const newDiv = document.createElement('div');
    newDiv.id = category.categoryId;
    newDiv.className = 'products-container';
    newDiv.appendChild(tempDiv);  //Agrega el contenido clonado dentro del nuevo div

    // Agrega el nuevo div al contenedor
    container.appendChild(newDiv);

    // Elimina el nodo original
    containerCategory.remove();

    // Crea tarjetas de producto para cada producto de la categoría
    category.products.forEach(product => createProductCard(product, template, tempDiv));
}

// Función para crear una tarjeta de producto
function createProductCard(product, template, container) {
    const formatPrice = parseInt(product.price).toLocaleString('es-ES');

    // Crear un elemento div temporal para contener la plantilla
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = template;

    // Rellenar el contenido de la tarjeta con los datos del producto
    tempDiv.querySelector('.product-card__image-container__img').src = product.imgProduct;
    tempDiv.querySelector('.product-card__name').textContent = product.name;
    tempDiv.querySelector('.product-card__price').textContent = `$ ${formatPrice}`;
    tempDiv.querySelector('.product-card__ingredients').textContent = `Ingredientes: ${product.ingredients}`;
    tempDiv.querySelector('.product-card__observations').id = `observation-${product.productId}`;

    // Agregar la tarjeta al contenedor
    container.appendChild(tempDiv.firstElementChild);
}

// Cargar la plantilla y el JSON, luego crear las tarjetas de productos
Promise.all([loadProductData(), loadProductCardTemplate()])
    .then(([data, template]) => {
        data.categorys.forEach(category => createCategory(category, template));
    })
    .catch(error => {
        console.error('Error loading data:', error);
    });
