function pedido(contenedor) {
    const element = document.getElementById(contenedor)
    if (element.style.display == 'none') {
        element.style.display = 'grid';
        console.log(element.style.display);
    } else {
        element.style.display = 'none'
    }
}

