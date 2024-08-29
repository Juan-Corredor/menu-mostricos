let totalAmount = 0;
const PHONE_NUMBER = "573113461855";
const totalElement = document.getElementById('total');
const orderContainer = document.getElementById('order_container');
const order = { products: [] };

function updateUI(quantityElement, decrementButton, incrementButton) {
    updateOrderContainerDisplay();
    updateTotalAmountDisplay();
    decrementButton.classList.toggle('blocked', quantityElement.textContent <= 0);
    incrementButton.classList.toggle('add-product', quantityElement.textContent > 0);
}

function updateOrderContainerDisplay() {
    orderContainer.style.display = totalAmount > 0 ? 'grid' : 'none';
}

function updateTotalAmountDisplay() {
    totalElement.textContent = `$ ${totalAmount.toLocaleString()}`;
}

function updateProduct(name, img, observation, price, quantityElement) {
    let existingProduct = order.products.find(product => product.name === name);
    if (existingProduct) {
        existingProduct.quantity = quantityElement.textContent;
        existingProduct.observation = observation.value;
    } else {
        let product = {
            name: name,
            img: img,
            quantity: quantityElement.textContent,
            price: price,
            observation: observation.value
        };

        observation.addEventListener('input', function () { product.observation = observation.value; });
        order.products.push(product);
    }
};

function addQuantity(name, img, observation, price, quantityElement, decrementButton, incrementButton) {
    quantityElement.textContent++;
    totalAmount += price;
    updateProduct(name, img, observation, price, quantityElement);
    updateUI(quantityElement, decrementButton, incrementButton);
}

function subtractQuantity(name, img, observation, price, quantityElement, decrementButton, incrementButton) {
    let existingProduct = order.products.find(product => product.name === name);

    if (quantityElement.textContent > 0) {
        quantityElement.textContent--;
        totalAmount -= price;

        if (existingProduct) {
            existingProduct.quantity = quantityElement.textContent;
            if (existingProduct.quantity <= 0) order.products = order.products.filter(product => product.name !== name);
        }
        updateUI(quantityElement, decrementButton, incrementButton);
    }
}


function clearModalContainer() {
    modal.style.display = "none";
    document.body.classList.remove("modal-open");
}

function showModal() {
    modal.style.display = "flex";
    modal.style.alignItems = "center";
    modal.style.justifyContent = "center";
    document.body.className = "modal-open";

    const modalContainer = document.getElementById("modalContainer");
    const templateModal = document.getElementById("modalviewpart");
    modalContainer.innerHTML = ''; // Limpiar el contenedor de la modal antes de añadir los nuevos elementos

    order.products.forEach(product => {
        // Clonar la estructura de la modal
        const modalClone = templateModal.cloneNode(true);
        const subtotal = product.quantity * product.price;

        modalClone.querySelector(".name-product").textContent = product.name;
        modalClone.querySelector(".img-product").src = product.img;
        modalClone.querySelector(".quantity-product").textContent = product.quantity;

        if (product.observation) {
            modalClone.querySelector(".observation-product").style.display = "flex";
            modalClone.querySelector(".observation-product").textContent = `Observación: ${product.observation}`;
        } else {
            modalClone.querySelector(".observation-product").style.display = "none";
        }

        modalClone.querySelector(".price-product").textContent = `Subtotal: $${product.price.toLocaleString()}`;
        modalClone.querySelector(".subtotal-product").textContent = `Subtotal: $${subtotal.toLocaleString()}`;
        modalContainer.appendChild(modalClone);
    });

    templateModal.remove();
    document.getElementById("total-amount").textContent = `TOTAL: $${totalAmount.toLocaleString()}`;
}

const modal = document.getElementById("myModal");
const cancelFooter = document.getElementById("cancel-btn");
//const btn = document.getElementById("openModalBtn");
const span = document.getElementsByClassName("close")[0];

//btn.onclick = function () { showModal(); }
span.onclick = function () { clearModalContainer() };
cancelFooter.onclick = function () { clearModalContainer() };

window.onclick = function (event) {
    if (event.target == modal) clearModalContainer();
}

document.getElementById('whatsappButton').addEventListener('click', sendOrder);

function sendOrder() {
    let message = `Quiero hacer un pedido:\n\n`;
    let total = 0;

    order.products.forEach(product => {
        const subtotal = product.quantity * product.price;
        message += `*${product.name}*\n`;
        message += `*Cantidad:* _${product.quantity}_\n`;
        if (product.observation) message += `*Observación:* ${product.observation}\n`;
        message += `*Valor:* _$${product.price.toLocaleString()}_\n`;
        message += `*Subtotal:* _$${subtotal.toLocaleString()}_\n\n`;
        total += subtotal;
    });

    message += `*Total:* _$${total.toLocaleString()}_`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${PHONE_NUMBER}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    window.location.reload();
}


export {
    addQuantity,
    subtractQuantity
}
