   
  /* scripts.js
  Objeto de traducciones para español e inglés.
  Contiene los textos que se utilizarán en la página.
*/
const translations = {
  es: {
    title: "🐶 Listado de Razas de Perros",
    selectLabel: "🔎 Selecciona una raza:",
    favoritesTitle: "❤️ Favoritos",
    errorList: "❌ Error al obtener la lista de razas:",
    errorImages: "⚠️ Error al obtener imágenes:",
    noSubbreeds: "Sin subrazas",
    subbreeds: "Subrazas: ",
    darkModeOn: "🌙 Modo Oscuro",
    darkModeOff: "☀️ Modo Claro"
  },
  en: {
    title: "🐶 Dog Breeds List",
    selectLabel: "🔎 Select a breed:",
    favoritesTitle: "❤️ Favorites",
    errorList: "❌ Error fetching breed list:",
    errorImages: "⚠️ Error fetching images:",
    noSubbreeds: "No subbreeds",
    subbreeds: "Subbreeds: ",
    darkModeOn: "🌙 Dark Mode",
    darkModeOff: "☀️ Light Mode"
  }
};

/* el lenguaje por defecto es el español */
let currentLanguage = "es";

/* 
  Función para actualizar los textos de la página según el idioma seleccionado.
  Se actualizan el título, etiquetas y botones.
*/
function updateTranslations() {
  document.getElementById("titleText").textContent = translations[currentLanguage].title;
  document.getElementById("selectLabel").textContent = translations[currentLanguage].selectLabel;
  document.querySelector("#breed-select option[value='']").textContent = translations[currentLanguage].selectDefault;
  document.getElementById("favoritesTitle").textContent = translations[currentLanguage].favoritesTitle;
  const darkModeToggle = document.getElementById("darkModeToggle");
  if (document.body.classList.contains("dark-mode")) {
    darkModeToggle.textContent = translations[currentLanguage].darkModeOff;
  } else {
    darkModeToggle.textContent = translations[currentLanguage].darkModeOn;
  }
}

// Evento para cambio de idioma al seleccionar en el combo correspondiente.
document.getElementById("languageSelect").addEventListener("change", function () {
  currentLanguage = this.value;
  updateTranslations();
});

/* Variables globales para manipulación del DOM */
const breedSelect = document.getElementById("breed-select");
const cardsContainer = document.getElementById("cards-container");
const errorMessageDiv = document.getElementById("error-message");
const favoritesContainer = document.getElementById("favorites-container");
let allBreeds = {};

/* 
  Manejo de favoritos usando localStorage para persistencia
  Se recuperan los favoritos almacenados o se inicializa un array vacío.
*/
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

/* Función para mostrar mensajes de error al usuario */
function displayError(message) {
  errorMessageDiv.innerHTML = `<p>${message}</p>`;
}

/* Función para limpiar el mensaje de error */
function clearError() {
  errorMessageDiv.innerHTML = "";
}

/* 
  Función para guardar los favoritos en localStorage.
  Se utiliza cada vez que se marca o desmarca un favorito.
*/
function saveFavorites() {
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

/* 
  Función para renderizar la sección de favoritos.
  Recorre el array de favoritos y añade cada tarjeta al contenedor.
*/
function renderFavorites() {
  favoritesContainer.innerHTML = "";
  favorites.forEach((fav) => {
    const card = createCard(fav.imageUrl, fav.breed, fav.attribute, true);
    favoritesContainer.appendChild(card);
  });
}

/*
  Función para crear una tarjeta de perro.
  Parámetros:
    - imageUrl: URL de la imagen a mostrar.
    - breed: Nombre de la raza.
    - attribute: Texto con la información adicional (por ejemplo, subrazas).
    - isFavorite: Bandera para determinar si la tarjeta se muestra en la sección de favoritos.
*/
function createCard(imageUrl, breed, attribute, isFavorite = false) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `
    <img src="${imageUrl}" alt="${breed}">
    <h3>${breed}</h3>
    <p>${attribute}</p>
    <button class="favorite">${isFavorite ? "❤️" : "🤍"}</button>
  `;
  const favButton = card.querySelector("button.favorite");
  // Evento para alternar entre agregar o quitar favorito
  favButton.addEventListener("click", () => {
    const index = favorites.findIndex(
      (fav) => fav.imageUrl === imageUrl && fav.breed === breed
    );
    // Si el elemento ya es favorito, se elimina
    if (index > -1) {
      favorites.splice(index, 1);
      favButton.textContent = "🤍";
    } else {
      // Si no es favorito, se agrega al array de favoritos
      favorites.push({ imageUrl, breed, attribute });
      favButton.textContent = "❤️";
    }
    saveFavorites();
    renderFavorites();
  });
  return card;
}

/* 
  Configuración del botón para modo oscuro.
  Al hacer clic, se alterna la clase "dark-mode" en el body y se actualizan los textos.
*/
const darkModeToggle = document.getElementById("darkModeToggle");
darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  updateTranslations();
});

/*
  Se realiza la petición a la API para obtener la lista completa de razas.
  Si la petición falla, se muestra un error al usuario.
*/
fetch("https://dog.ceo/api/breeds/list/all")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`${translations[currentLanguage].errorList} ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    // Se almacena la lista de razas globalmente
    allBreeds = data.message;
    // Se añaden cada una de las razas al select de búsqueda
    Object.keys(allBreeds).forEach((breed) => {
      const option = document.createElement("option");
      option.value = breed;
      option.textContent = breed;
      breedSelect.appendChild(option);
    });
  })
  .catch((error) => {
    displayError(error.message);
    console.error("Error fetching breed list:", error);
  });

// Renderización inicial de la sección de favoritos, si hay elementos guardados
renderFavorites();

/* 
  Evento para mostrar 10 tarjetas al seleccionar una raza del select.
  Se realizan las siguientes acciones:
    1. Se limpia el mensaje de error y las tarjetas actuales.
    2. Se valida que la raza exista.
    3. Se realiza la petición para obtener 10 imágenes aleatorias de la raza.
    4. Se muestran las tarjetas con la información correspondiente.
*/
breedSelect.addEventListener("change", () => {
  clearError();
  cardsContainer.innerHTML = "";
  const selectedBreed = breedSelect.value;
  if (selectedBreed) {
    // Validación para asegurar que la raza existe en la lista descargada
    if (!(selectedBreed in allBreeds)) {
      displayError("La raza seleccionada no existe.");
      return;
    }
    fetch(`https://dog.ceo/api/breed/${selectedBreed}/images/random/10`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `${translations[currentLanguage].errorImages} ${response.status}`
          );
        }
        return response.json();
      })
      .then((data) => {
        if (data.status !== "success") {
          throw new Error("Búsqueda no exitosa. Intente con otra raza.");
        }
        // Se determina el atributo adicional (subrazas) a mostrar
        let attribute = translations[currentLanguage].noSubbreeds;
        if (allBreeds[selectedBreed] && allBreeds[selectedBreed].length > 0) {
          attribute =
            translations[currentLanguage].subbreeds +
            allBreeds[selectedBreed].join(", ");
        }
        // Se crean 10 tarjetas, una por cada imagen obtenida de la API
        data.message.forEach((imageUrl) => {
          const card = createCard(imageUrl, selectedBreed, attribute);
          cardsContainer.appendChild(card);
        });
      })
      .catch((error) => {
        displayError(error.message);
        console.error("Error fetching images:", error);
      });
  }
});


// Actualizar los textos de la página con el idioma actual al cargar
updateTranslations();