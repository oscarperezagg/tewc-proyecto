// Función para reemplazar las claves en una cadena con los valores correspondientes del objeto `values`
function formatString(str, values) {
  return str.replace(/\{(\w+)\}/g, function (match, key) {
    // Devuelve el valor correspondiente a la clave si existe, de lo contrario, devuelve el valor de `match`
    return typeof values[key] !== "undefined" ? values[key] : match;
  });
}

const insertData = (file, content) => {
  // Obtener el elemento raíz donde se insertará el contenido
  let root = document.getElementById("root");

  // Obtener el contenido del archivo/plantilla desde la carpeta 'vistas'
  fetch(`vistas/${file}`)
    .then((response) => response.text()) // Convertir la respuesta a texto
    .then((data) => {
      let jsData = data; // Almacenar el contenido del archivo en una variable

      // Formatear el contenido usando la función formatString, pasando un objeto con el contenido
      let formattedStr = formatString(jsData, content);

      // Insertar el contenido formateado en el elemento raíz
      root.innerHTML = formattedStr;
    })
    .catch((error) => {
      // Manejar cualquier error ocurrido durante la carga del archivo
      console.error("Ha ocurrido un error al cargar el archivo:", error);
    });
};

// Este evento se dispara una vez que el DOM está completamente cargado
document.addEventListener("DOMContentLoaded", async () => {
  // Referencia al elemento del DOM donde se insertará el contenido dinámico
  // Obtener la URL actual
  var currentPageUrl = window.location.href;

  // Comprobar si la URL contiene "/index.html"
  if (currentPageUrl.indexOf("/index.html") !== -1) {
    await insertData("home.html", { content: "Home" });
  }

  // Agrega un listener de eventos para capturar clics en el documento
  document.addEventListener("click", function (event) {
    // Previene el comportamiento predeterminado del evento, que sería seguir el enlace
    event.preventDefault();

    // Obtiene el valor del atributo id del elemento al que se le hizo clic
    const idValue = event.target.getAttribute("id");
    if (!idValue) {
      return;
    }
    if (idValue == "index.html") indexContr();
    else if (idValue == "universidad.html") universityContr();
    else if (idValue == "certifications.html") certificationContr();
    else if (idValue == "topics.html") topicContr();
    else if (idValue == "requests.html") requestContr();
  });
});

const indexContr = () => {
  window.location.href = "/index.html";
};

const universityContr = () => {
  insertData("universidad.html", { content: "Universidad" });
  console.log("universityContr");
};

const certificationContr = () => {
  insertData("certification.html", { content: "Certification" });
  console.log("certificationContr");
};

const topicContr = () => {
  insertData("topics.html", { content: "Topics" });
  console.log("topicContr");
};

const requestContr = () => {
  insertData("requests.html", { content: "Requests" });
  console.log("requestContr");
};
