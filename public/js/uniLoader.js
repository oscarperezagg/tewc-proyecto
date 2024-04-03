// #######################
// ######## UTILS ########
// #######################

// Función para formatear una cadena con valores dinámicos
function formatString(str, values) {
  return str.replace(/\{\{\{(\w+)\}\}\}/g, function (match, key) {
    return typeof values[key] !== "undefined" ? values[key] : match;
  });
}

// Función para validar el formato del ID
function validarId(id) {
  // Expresión regular para el formato "uni-<somenumber>"
  var patron = /^uni-\d+$/;
  // Verificar si el id coincide con el patrón
  return patron.test(id);
}

// #########################
// ######## LOADERS ########
// #########################

// Función para cargar la información de las universidades
async function loadUniversities() {
  // URL del archivo JSON
  const url = "modelos/colleges.json";
  let html = "";
  try {
    // Usar fetch para obtener el contenido del archivo JSON
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Error al cargar el archivo JSON");
    }
    // Convertir la respuesta a JSON
    const colleges = await response.json();
    // Crear una super string para el HTML
    // Recorrer cada objeto de colleges y formatear en HTML
    colleges.forEach((college, index) => {
      html += `
        <button class="card card-animation" id="uni-${index}">
          <div class="card-body">
            <img src="${
              college.url || "/public/img/education.png"
            }" alt="" /> <!-- Usar una imagen por defecto si la URL está vacía -->
            <h5 class="card-title">${college.nombre}</h5>
          </div>
        </button>
      `;
    });
    return html;
  } catch (error) {
    // Manejar cualquier error que ocurra durante la carga del archivo JSON
    console.error("Error:", error);
    return "";
  }
}

// Función para cargar el contenido HTML de la página
async function loadHTMLContent(html) {
  // Ruta del archivo HTML a cargar
  const filePath = "templates/uni/uni.html";
  try {
    // Usar fetch para obtener el contenido del archivo HTML
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error("Error al cargar el archivo HTML");
    }
    // Convertir la respuesta a texto
    const htmlContent = await response.text();
    // Insertar el contenido del archivo HTML en el elemento <div> con el ID "root"
    const rootDiv = document.getElementById("root");
    rootDiv.innerHTML = formatString(htmlContent, { content: html });
  } catch (error) {
    // Manejar cualquier error que ocurra durante la carga del archivo HTML
    console.error("Error:", error);
  }
}


// Función para cargar la información de una universidad específica
async function loadUniversity(id) {
  // URL del archivo JSON
  const url = "modelos/colleges.json";
  try {
    // Usar fetch para obtener el contenido del archivo JSON
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Error al cargar el archivo JSON");
    }
    // Convertir la respuesta a JSON
    const colleges = await response.json();
    const college = colleges[id];
    // Crear una super string para el HTML de la universidad seleccionada
    const html = `
        <button class="card card-animation">
          <div class="card-body">
            <img src="${
              college.url || "/public/img/education.png"
            }" alt="" /> <!-- Usar una imagen por defecto si la URL está vacía -->
            <h5 class="card-title">${college.nombre}</h5>
          </div>
        </button>
      `;
    return html;
  } catch (error) {
    // Manejar cualquier error que ocurra durante la carga del archivo JSON
    console.error("Error:", error);
    return "";
  }
}


// Función para manejar el evento de clic en los botones
async function uniLoader(button) {
  // Obtener el ID del elemento que disparó el evento
  const id = button.id;
  if (!id || !validarId(id)) return;
  // Separar la cadena por el carácter "-"
  const partes = id.split("-");

  // Cargar la información de la universidad seleccionada
  const html = await loadUniversity(partes[1]);
  // Cargar el contenido HTML de la página
  await loadHTMLContent(html);
}

// Listener para cargar la página
document.addEventListener("DOMContentLoaded", async () => {
  // Cargar la información de las universidades
  const html = await loadUniversities();
  // Cargar el contenido HTML de la página
  await loadHTMLContent(html);

  // Agregar el evento de clic a todos los botones
  document.addEventListener("click", (e) => {
    // Verificar si el elemento clicado o alguno de sus ancestros es un botón
    const button = e.target.closest("button");
    if (button) {
      uniLoader(button);
    }
  });
});
