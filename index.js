function pedido(contenedor) {
    const element = document.getElementById(contenedor)
    if (element.style.display == 'none') {
        element.style.display = 'grid';
        console.log(element.style.display);
    } else {
        element.style.display = 'none'
    }
}

function handleClick(e) {
    const link = e.target.closest('a');

    if (link?.tagName === 'A' && link.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();

        // Desactivar la clase active de todos los enlaces
        navLinks.forEach(navLink => navLink.classList.remove('active'));

        // Activar la clase active en el enlace clicado
        link.classList.add('active');

        const targetElement = document.getElementById(link.getAttribute('href').substring(1));

        if (targetElement && navbar) {
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = targetElement.offsetTop;
            const scrollPosition = targetPosition - (navbar.classList.contains('sticky') ? 0 : navbarHeight);
            console.log('scrollPosition: ', scrollPosition);
            window.scrollTo({
                top: scrollPosition - 80,
                behavior: 'smooth'
            });
        }
    }
}

document.removeEventListener('click', handleClick); // Eliminar el listener de clic si ya existe para evitar duplicados
document.addEventListener('click', handleClick); // Adjuntar el listener de clic

// Intersection Observer para cambiar el color del enlace cuando la sección es visible
//const sections = document.querySelectorAll('.products-container');
const navLinks = document.querySelectorAll('.link');

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1 // Ajusta el umbral según tus necesidades
};

const observer = new IntersectionObserver((entries) => {    
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Desactivar la clase active de todos los enlaces
            navLinks.forEach(navLink => navLink.classList.remove('active'));

            // Activar la clase active en el enlace correspondiente
            const id = entry.target.getAttribute('id');
            const navLink = document.querySelector(`a[href="#${id}"]`);
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}, observerOptions);

// sections.forEach(section => { observer.observe(section);});
function observeNewSection(section) {
    observer.observe(section);
}

// Exporta la función para usarla en otros archivos
export { observeNewSection };