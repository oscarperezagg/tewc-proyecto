function formatString(str, values) {
  return str.replace(/\{(\w+)\}/g, function (match, key) {
    return typeof values[key] !== "undefined" ? values[key] : match;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // Eventos
  let root = document.getElementById("root");

  document.addEventListener("click", function (event) {
    // Evitar que el enlace siga el enlace predeterminado
    event.preventDefault();

    // Obtener el valor del atributo id del elemento clicado
    const idValue = event.target.getAttribute("id");
    if (idValue) {
      // console.log("El valor del atributo id es:", idValue);
    }
  });
});

// Ejemplo de función para introducir datos

const putData = () => {
  let html = `<div><h3>Has pulsado para ir a: {content}</h3></div>`;

  let root = document.getElementById("root");
  // Obtenemos el contenido del archivo / plantilla
  fetch("vistas/greeting.html")
    .then((response) => response.text())
    .then((data) => {
      let jsData = data;
      // Usamos la función
      let formattedStr = formatString(jsData, {
        content: "Contenido",
      });
      // Introducimos los datos
      root.innerHTML = formattedStr;
    })
    .catch((error) => {
      console.error("Ha ocurrido un error al cargar el archivo:", error);
    });
};
