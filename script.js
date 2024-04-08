document.addEventListener("DOMContentLoaded", function() {
    const menuItems = document.querySelectorAll(".main-menu a");
    const titleElement = document.querySelector(".content-title");
    const textElement = document.querySelector(".content-text");
    const videosElement = document.querySelector(".content-videos");

    // Función para agregar negrita a las palabras entre asteriscos
    function processBold(content) {
        const boldRegex = /\*(.*?)\*/g; // Expresión regular para buscar palabras entre asteriscos
        return content.replace(boldRegex, '<strong>$1</strong>');
    }

    // Función para dividir el contenido en párrafos
    function processParagraphs(content) {
        const parts = content.split("|");
        return parts.map(part => processBold(part.trim())).join("<br>");
    }

    // Función para eliminar las URL de los videos del contenido
    function removeVideoUrls(content) {
        const videoRegex = /(https:\/\/www\.youtube\.com\/embed\/[a-zA-Z0-9_-]+)/g;
        return content.replace(videoRegex, "");
    }

    // Obtener el contenido por defecto del primer elemento del menú
    const defaultContent = menuItems[0].getAttribute("data-content");
    const defaultTitle = menuItems[0].textContent;

    // Mostrar el contenido por defecto al cargar la página
    titleElement.textContent = defaultTitle;
    textElement.innerHTML = processParagraphs(defaultContent);

    menuItems.forEach(item => {
        item.addEventListener("click", function(event) {
            event.preventDefault();
            const content = this.getAttribute("data-content");
            const title = this.textContent;

            // Mostrar el título
            titleElement.textContent = title;

            // Limpiar el contenido dinámico
            textElement.innerHTML = "";
            videosElement.innerHTML = "";

            // Procesar el contenido y dividirlo en párrafos
            const processedContent = processParagraphs(content);

            // Crear un párrafo para cada parte del contenido
            const paragraph = document.createElement("p");
            paragraph.innerHTML = removeVideoUrls(processedContent);
            textElement.appendChild(paragraph);

            // Buscar si hay enlaces de videos en el contenido
            const videoRegex = /(https:\/\/www\.youtube\.com\/embed\/[a-zA-Z0-9_-]+)/g;
            const videoMatches = content.match(videoRegex);
            if (videoMatches) {
                videoMatches.forEach(videoUrl => {
                    // Crear un iframe para cada enlace de video y agregarlo al contenedor de videos
                    const iframe = document.createElement("iframe");
                    iframe.src = videoUrl;
                    iframe.width = "560";
                    iframe.height = "315";
                    iframe.allowFullscreen = true;
                    videosElement.appendChild(iframe);
                });
            }
        });
    });
});
