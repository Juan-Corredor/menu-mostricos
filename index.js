let totalAmount = 0;
const totalElement = document.getElementById('total');
const orderContainer = document.getElementById('order_container');

function updateOrderContainerDisplay() {
    orderContainer.style.display = totalAmount > 0 ? 'grid' : 'none';
}

function updateTotalAmountDisplay() {
    totalElement.textContent = `$ ${totalAmount.toLocaleString('es-ES')}`;
}

function addQuantity(quantityElement, price, decrementButton, incrementButton) {
    totalAmount += price;
    quantityElement.textContent++;
    
    updateOrderContainerDisplay();
    updateTotalAmountDisplay();

    if (quantityElement.textContent > 0) {
        decrementButton.classList.remove('bloqueado');
        incrementButton.classList.add('add-product');
    }
}

function subtractQuantity(quantityElement, price, decrementButton, incrementButton) {
    if (quantityElement.textContent > 0) {
        quantityElement.textContent--;
        totalAmount -= price;

        updateOrderContainerDisplay();
        updateTotalAmountDisplay();

        if (quantityElement.textContent <= 0) {
            decrementButton.classList.add('bloqueado');
            incrementButton.classList.remove('add-product');
        }
    }
}

export {
    addQuantity,
    subtractQuantity
}
