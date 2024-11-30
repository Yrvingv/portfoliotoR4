'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");


// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// Mapa de equivalencias entre el texto visible y el atributo data-page
const pageMap = {
  "sobre mí": "about", // Traducción de 'Sobre mí' a 'about'
  "resumen": "resumen",
  "mis servicios": "services", // Asegúrate de que coincida con el texto exacto del botón
  "portfolio": "portfolio",
  "blog": "blog",
  "contacto": "contacto"
};

// Variables de navegación y páginas
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// Agregar eventos a todos los enlaces de navegación
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    const selectedPage = pageMap[this.textContent.trim().toLowerCase()] || this.textContent.trim().toLowerCase();

    // Iterar sobre todas las páginas y enlaces
    for (let i = 0; i < pages.length; i++) {
      if (selectedPage === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }
  });
}

// Comprobar si la página actual tiene un hash en la URL
document.addEventListener("DOMContentLoaded", function () {
  const hash = window.location.hash.slice(1); // Quita el símbolo #
  if (hash && pageMap[hash]) {
    const selectedPage = pageMap[hash];
    pages.forEach((page) => {
      if (page.dataset.page === selectedPage) {
        page.classList.add("active");
      } else {
        page.classList.remove("active");
      }
    });
    navigationLinks.forEach((link) => {
      if (pageMap[link.textContent.trim().toLowerCase()] === selectedPage) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }
});



//para el boton de regreso//
document.addEventListener("DOMContentLoaded", function () {
  const currentPath = window.location.pathname;

  // Activar la ventana del blog si estamos en "/blog"
  if (currentPath === "/blog") {
    const blogSection = document.querySelector('[data-page="blog"]');
    const aboutSection = document.querySelector('[data-page="about"]');
    const navLinks = document.querySelectorAll("[data-nav-link]");

    // Identificar el enlace del blog específicamente
    let blogLink = null;
    let aboutLink = null;

    navLinks.forEach(link => {
      if (link.innerHTML.trim().toLowerCase() === "blog") {
        blogLink = link;
      } else if (link.innerHTML.trim().toLowerCase() === "sobre mí") {
        aboutLink = link;
      }
    });

    // Desactivar la sección "Sobre mí" y activar "Blog"
    if (aboutSection) aboutSection.classList.remove("active");
    if (blogSection) blogSection.classList.add("active");

    // Actualizar el enlace de navegación
    navLinks.forEach(link => link.classList.remove("active"));
    if (blogLink) blogLink.classList.add("active");
  }
});



document.querySelectorAll("[data-nav-link]").forEach(link => {
  console.log(`Link: ${link.innerHTML}, Active: ${link.classList.contains("active")}`);
});

// fin de llamada a blog


// ticker
document.addEventListener("DOMContentLoaded", function () {
  const tickerContent = document.querySelector('.ticker-content');
  const images = tickerContent.innerHTML;

  // Duplica dinámicamente las imágenes
  tickerContent.innerHTML += images;

  // Calcula el ancho total del contenido para ajustar el ciclo
  const totalWidth = tickerContent.scrollWidth;

  // Aplica duración dinámica de la animación basada en el ancho
  tickerContent.style.animationDuration = `${totalWidth / 100}px`;
});

document.addEventListener("DOMContentLoaded", function () {
  const tickerContent = document.querySelector('.ticker-content');

  // Duplica el contenido para el bucle continuo
  const images = tickerContent.innerHTML;
  tickerContent.innerHTML += images;

  // Calcula el ancho total del contenido
  const totalWidth = tickerContent.scrollWidth;
  tickerContent.style.animationDuration = `${totalWidth / 100}px`;

  // Detiene la animación al pasar el cursor
  tickerContent.addEventListener("mouseover", function () {
    tickerContent.style.animationPlayState = "paused";
  });

  // Reanuda la animación al quitar el cursor
  tickerContent.addEventListener("mouseout", function () {
    tickerContent.style.animationPlayState = "running";
  });
});




// fin de tickers