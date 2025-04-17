# Listado de Razas de Perros

## Propósito del Proyecto

Este proyecto es una aplicación web interactiva que permite a los usuarios explorar diferentes razas de perros. Las principales funcionalidades incluyen:

* **Visualización de Razas:** Un menú desplegable permite seleccionar una raza de perro y mostrar imágenes aleatorias de esa raza.
* **Información Adicional:** Para cada raza, se muestra si tiene subrazas y cuáles son.
* **Favoritos:** Los usuarios pueden marcar razas como favoritas, y estas se guardan localmente para futuras visitas.
* **Modo Oscuro/Claro:** Una opción para cambiar el tema visual de la aplicación.
* **Selección de Idioma:** Soporte para mostrar la interfaz en español e inglés.

La aplicación utiliza la API pública de [Dog CEO](https://dog.ceo/dog-api/) para obtener la lista de razas e imágenes.

## Cómo Ejecutar el Proyecto

Para ejecutar este proyecto localmente en tu navegador, sigue estos pasos:

1.  **Guarda los archivos:** Asegúrate de tener los siguientes archivos en la misma carpeta:
    * `index.html` (el código HTML proporcionado)
    * `styles.css` (contiene los estilos generales de la aplicación)
    * `hamburger.css` (contiene los estilos específicos para el menú hamburguesa en dispositivos móviles)
    * `scripts.js` (contiene la lógica principal de la aplicación, incluyendo la interacción con la API y la gestión de favoritos)
    * `hamburger.js` (contiene la lógica para el menú hamburguesa)

    Si no tienes los archivos `styles.css`, `hamburger.css`, `scripts.js`, y `hamburger.js`, deberás crearlos con el contenido proporcionado en la pregunta anterior.

2.  **Abre `index.html` en tu navegador:** Simplemente haz doble clic en el archivo `index.html` para abrirlo con tu navegador web preferido.

Una vez abierto, la aplicación debería cargar la lista de razas de perros en el menú desplegable. Al seleccionar una raza, se mostrarán 10 imágenes aleatorias de esa raza en la sección principal. Puedes hacer clic en el icono de corazón (🤍) en cada tarjeta para añadirla a la sección de favoritos (❤️), y el icono cambiará a rojo (❤️). Los favoritos se guardarán en el almacenamiento local de tu navegador.

Puedes cambiar entre el modo oscuro y claro utilizando el botón "🌙 Modo Oscuro" / "☀️ Modo Claro" en la parte superior, y cambiar el idioma de la interfaz con el menú desplegable de selección de idioma.

En dispositivos móviles, la navegación (botones de modo oscuro e idioma) se ocultará en un menú hamburguesa (☰) ubicado en la esquina superior derecha. Al hacer clic en el botón hamburguesa, el menú se desplegará.

## Información Relevante

* **Dependencias:** Este proyecto no tiene dependencias externas más allá de un navegador web moderno con soporte para JavaScript y CSS. Utiliza la API pública de Dog CEO para obtener datos dinámicamente.
* **Estructura de Archivos:**
    * `index.html`: La estructura HTML de la página web.
    * `styles.css`: Los estilos CSS para la presentación general de la página.
    * `hamburger.css`: Estilos CSS específicos para la implementación del menú hamburguesa en pantallas pequeñas.
    * `scripts.js`: El código JavaScript que maneja la lógica de la aplicación, como la interacción con la API, la gestión de favoritos, y el cambio de tema e idioma.
    * `hamburger.js`: El código JavaScript para controlar la funcionalidad de abrir y cerrar el menú hamburguesa.
* **API Utilizada:** [Dog CEO API](https://dog.ceo/dog-api/) para obtener la lista de razas e imágenes de perros.
* **Almacenamiento Local:** La funcionalidad de "Favoritos" utiliza el `localStorage` del navegador para persistir los datos entre sesiones.
* **Diseño Responsivo:** La aplicación incluye un menú hamburguesa para mejorar la experiencia del usuario en dispositivos móviles, adaptando la navegación a pantallas más pequeñas. Los estilos CSS utilizan media queries para lograr un diseño responsivo.
* **Internacionalización (i18n):** Se implementa un sistema básico de traducción para cambiar el texto de la interfaz entre español e inglés, utilizando un objeto de traducciones en `scripts.js`.
* **Manejo de Errores:** La aplicación incluye mecanismos básicos para mostrar mensajes de error en caso de problemas al obtener datos de la API.

Este proyecto es un ejemplo de cómo construir una aplicación web interactiva utilizando HTML, CSS y JavaScript, interactuando con una API externa y utilizando funcionalidades del navegador como el almacenamiento local.