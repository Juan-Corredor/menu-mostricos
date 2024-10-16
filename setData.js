import { observeNewSection } from './navigation-features.js';
import { addQuantity, subtractQuantity } from './index.js';

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
    tempDiv.id = category.categoryId;
    tempDiv.className = 'products-container';

    // Agrega el nuevo div al contenedor
    container.appendChild(tempDiv);

    // Elimina el nodo original
    containerCategory.remove();

    // Crea tarjetas de producto para cada producto de la categoría
    category.products.forEach(product => createProductCard(product, template, tempDiv));

    // Observa la nueva sección añadida
    observeNewSection(tempDiv);
}

// Función para crear una tarjeta de producto
function createProductCard(product, template, container) {
    const formatPrice = product.price.toLocaleString();

    // Crear un elemento div temporal para contener la plantilla
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = template;

    // Rellenar el contenido de la tarjeta con los datos del producto
    tempDiv.querySelector('.product-card__image-container__img').src = product.imgProduct;
    tempDiv.querySelector('.product-card__name').textContent = product.name;
    tempDiv.querySelector('.product-card__price').textContent = `$ ${formatPrice}`;
    tempDiv.querySelector('.product-card__ingredients').textContent = `Ingredientes: ${product.ingredients}`;
    tempDiv.querySelector('.product-card__observations').id = `observation-${product.productId}`;
    tempDiv.querySelector('.quantity').textContent = product.quantity;
    tempDiv.querySelector('.quantity').id = `quantity-${product.productId}`;

    let name = product.name;
    let img = product.imgProduct;
    let price = product.price;
    let observation = tempDiv.querySelector('.product-card__observations');
    let quantityElement = tempDiv.querySelector('.quantity');
    let decrementButton = tempDiv.querySelector('.minus_btn');
    let incrementButton = tempDiv.querySelector('.more_btn');

    // Asigna la función al evento onclick sin ejecutarla inmediatamente
    decrementButton.addEventListener('click', () => subtractQuantity(name,  img, observation, price, quantityElement, decrementButton, incrementButton));
    incrementButton.addEventListener('click', () => addQuantity(name, img, observation, price, quantityElement, decrementButton, incrementButton));

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
