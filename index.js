let totalAmount = 0;
const totalElement = document.getElementById('total');
const orderContainer = document.getElementById('order_container');
const order = { products: [] };

function updateOrderContainerDisplay() {
    orderContainer.style.display = totalAmount > 0 ? 'grid' : 'none';
}

function updateTotalAmountDisplay() {
    totalElement.textContent = `$ ${totalAmount.toLocaleString('es-ES')}`;
}

function updateProduct(name, observation, price, quantityElement) {
    let existingProduct = order.products.find(product => product.name === name);
    if (existingProduct) {
        // Si el producto ya existe, actualiza la cantidad y la observación
        existingProduct.quantity = quantityElement.textContent;
        existingProduct.observation = observation.value;
    } else {
        // Si el producto no existe, lo agrega al array
        let product = {
            name: name,
            quantity: quantityElement.textContent,
            price: price,
            observation: ''
        };

        observation.addEventListener('input', function () { product.observation = observation.value;});
        order.products.push(product);
    }
};

function addQuantity(name, observation, price, quantityElement, decrementButton, incrementButton) {
    // Actualiza la cantidad antes de hacer el push
    quantityElement.textContent++;
        
    // Actualiza el monto total, el producto y la interfaz
    totalAmount += price;
    updateProduct(name, observation, price, quantityElement);
    updateOrderContainerDisplay();
    updateTotalAmountDisplay();

    if (quantityElement.textContent > 0) {
        decrementButton.classList.remove('blocked');
        incrementButton.classList.add('add-product');
    }
}

function subtractQuantity(name, observation, price, quantityElement, decrementButton, incrementButton) {
    let existingProduct = order.products.find(product => product.name === name);

    if (quantityElement.textContent > 0) {
        quantityElement.textContent--;
        totalAmount -= price;

        if (existingProduct) {
            // Actualiza la cantidad en el producto existente
            existingProduct.quantity = quantityElement.textContent;

            // Si la cantidad llega a 0, elimina el producto de la lista
            if (existingProduct.quantity <= 0) {
                order.products = order.products.filter(product => product.name !== name);
            }
        }

        updateOrderContainerDisplay();
        updateTotalAmountDisplay();

        if (quantityElement.textContent <= 0) {
            decrementButton.classList.add('blocked');
            incrementButton.classList.remove('add-product');
        }
    }
}

// document.getElementById('testProduts').addEventListener('click', function() {
//     console.log(order.products);
// });

document.getElementById('whatsappButton').addEventListener('click', function () {
    sendOrder();
});

function sendOrder() {
    const phoneNumber = "573113461855";
    let message = `Quiero hacer un pedido:\n\n`;
    let total = 0;

    order.products.forEach(product => {
        const subtotal = product.quantity * product.price;
        message += `*${product.name}:* ${product.quantity}x\n`;
        
        if (product.observation) message += `*Observación:* ${product.observation}\n`;
        
        message += `*Valor:* _$${product.price.toLocaleString()}_\n`;
        message += `*Subtotal:* _$${subtotal.toLocaleString()}_\n\n`;
        total += subtotal;
    });

    message += `*Total:* _$${total.toLocaleString()}_`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');

    // Recargar la ventana original después de abrir la nueva
    window.location.reload();
}

export {
    addQuantity,
    subtractQuantity
}
