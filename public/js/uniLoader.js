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
async function loadHTMLContent(filePath, ...props) {
  // Ruta del archivo HTML a cargar
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
    rootDiv.innerHTML = formatString(htmlContent, ...props);
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
  const idNumber = parseInt(partes[1]);

  // Cargar el contenido HTML de la página
  await loadDegree(idNumber);
}

// Listener para cargar la página
document.addEventListener("DOMContentLoaded", async () => {
  // Cargar la información de las universidades
  const html = await loadUniversities();
  // Cargar el contenido HTML de la página
  await loadHTMLContent("templates/uni/uni.html", { content: html });

  // Agregar el evento de clic a todos los botones
  document.addEventListener("click", (e) => {
    // Verificar si el elemento clicado o alguno de sus ancestros es un botón
    const button = e.target.closest("button");
    if (button) {
      uniLoader(button);
    }
  });
});

// Función para cargar la información de las universidades
async function loadError() {
  // Ruta del archivo HTML a cargar
  const filePath = "templates/error.html";
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
    rootDiv.innerHTML = formatString(htmlContent);
  } catch (error) {
    // Manejar cualquier error que ocurra durante la carga del archivo HTML
    console.error("Error:", error);
  }
}

const getSingleDregree = async (id) => {
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

    return colleges[id];
  } catch (error) {
    // Manejar cualquier error que ocurra durante la carga del archivo JSON
    console.error("Error:", error);
    return false;
  }
};

const loadDegree = async (id) => {
  // Obtenemos los detalles de colleges.json
  const degree = await getSingleDregree(id);
  // Obtenemos el nombre del archivo con los datos
  var formattedName = degree.nombre.toLowerCase().replace(/ /g, "_");
  const url = "modelos/carreras.json";
  let html = "";
  try {
    // Usar fetch para obtener el contenido del archivo JSON
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Error al cargar el archivo JSON");
    }
    // Convertir la respuesta a JSON
    const carreras = await response.json();

    carreras.slice(0, 5).forEach((carrera, index) => {
      if (carrera.universidad !== formattedName) return;
      html += `
        <button type="button" class="btn carrera" id="${carrera.decks_file}" >${carrera.carrera}</button>
      `;
    });
  } catch (error) {
    // Manejar cualquier error que ocurra durante la carga del archivo JSON
    html = "No data found - Try UPM";
  }
  if (html === "") {
    html = "No data found - Try UPM";
  }
  loadHTMLContent("templates/uni/degree.html", {
    content: html,
    name: degree.nombre,
  });
};


