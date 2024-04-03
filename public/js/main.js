// Función que maneja el evento de clic
function handleClick(event) {
  // Obtener el ID del elemento que hizo saltar el evento
  const id = event.target.id;
  if (!id) return;

  if (id === "modalLoginButton") auth();
  else if (id === "logOutButton") logout();
  else if (id === "modalRequestButton") addRequest();
}

// Función que se ejecuta cuando el documento está cargado
document.addEventListener("DOMContentLoaded", function () {
  login();
  // Agregar event listener de clic a todos los botones
  const buttons = document.querySelectorAll("button");
  buttons.forEach(function (button) {
    button.addEventListener("click", handleClick);
  });
});

// Authentication logic :)

const auth = () => {
  // Realizar autenticación aquí
  // Obtener referencia a los elementos de entrada
  const usernameInput = document.getElementById("username");

  // Supongamos que la autenticación es exitosa
  const isAuthenticated = true;
  const usernameValue = usernameInput.value;
  console.log(usernameValue);

  if (isAuthenticated) {
    // Guardar información en localStorage
    localStorage.setItem("user", usernameValue);
    // Aquí puedes guardar más información si es necesario
    // Por ejemplo, si necesitas guardar un token de sesión:
    // localStorage.setItem('token', 'valor_del_token');
    login();
  }
};

const login = () => {
  // Tratar de obtener la variable 'user' del localStorage
  const user = localStorage.getItem("user");
  console.log(user);
  // Verificar si 'user' está presente en localStorage
  if (user) {
    // Si 'user' está presente, obtener una referencia al elemento span con el id 'username'
    const usernameSpan = document.getElementById("span_username");

    // Verificar si se encontró el elemento span
    if (usernameSpan) {
      // Si se encontró el elemento span, establecer su innerHTML con el valor de user
      usernameSpan.innerHTML = "Hi, " + user;
      // Quitar el atributo 'hidden' para mostrar el elemento span
      usernameSpan.removeAttribute("hidden");
    }

    // Si 'user' está presente, obtener una referencia al elemento span con el id 'username'
    const logoutButton = document.getElementById("logOutButton");

    // Verificar si se encontró el elemento span
    if (logoutButton) {
      // Quitar el atributo 'hidden' para mostrar el elemento span
      logoutButton.removeAttribute("hidden");
    }

    // Si 'user' está presente, obtener una referencia al botón de inicio de sesión
    const loginButton = document.getElementById("loginButton");

    // Verificar si se encontró el botón de inicio de sesión
    if (loginButton) {
      // Si se encontró el botón de inicio de sesión, eliminarlo
      loginButton.setAttribute("hidden", true);
    }
  }
};

const logout = () => {
  // Borrar el elemento 'user' del localStorage
  localStorage.removeItem("user");

  // Obtener una referencia al elemento span_username por su id
  const usernameSpan = document.getElementById("span_username");

  // Modificar el innerHTML de span_username a ""
  if (usernameSpan) {
    usernameSpan.innerHTML = "";
  }

  // Obtener una referencia al elemento logOutButton por su id
  const logoutButton = document.getElementById("logOutButton");

  // Añadir el atributo hidden a span_username y logOutButton
  if (logoutButton && usernameSpan) {
    usernameSpan.setAttribute("hidden", true);
    logoutButton.setAttribute("hidden", true);
  }

  // Obtener una referencia al elemento loginButton por su id
  const loginButton = document.getElementById("loginButton");

  // Quitar el atributo hidden a loginButton
  if (loginButton) {
    loginButton.removeAttribute("hidden");
  }

  var userInput = document.getElementById("user");

  // Verificar si se encontró un elemento con ID "user"
  if (userInput) {
    // Vaciar el contenido del campo de entrada
    userInput.value = "";

    // Quitar el atributo "readonly" si existe
    userInput.removeAttribute("readonly");
  }
};

const addRequest = () => {
  // Intentar obtener las solicitudes del localStorage
  var solicitudesLocalStorage = JSON.parse(localStorage.getItem("solicitudes"));

  if (!solicitudesLocalStorage) {
    // Si las solicitudes no están disponibles en el localStorage, obtenerlas del archivo JSON
    $.getJSON("/modelos/requests.json", function (data) {
      solicitudesLocalStorage = data || [];
      agregarSolicitud(solicitudesLocalStorage);
    });
  } else {
    // Si las solicitudes están disponibles en el localStorage, agregar la nueva solicitud
    agregarSolicitud(solicitudesLocalStorage);
  }

  function agregarSolicitud(solicitudes) {
    // Obtener los valores de los campos
    var shortDescription = document.getElementById("short_description").value;
    var description = document.getElementById("description").value;
    var user = document.getElementById("user").value;
    var fecha = new Date().toISOString().slice(0, 10); // Obtener la fecha actual en formato YYYY-MM-DD
    var estado = "Pending"; // Estado por defecto

    // Crear el diccionario con los valores obtenidos
    var solicitud = {
      usuario: user,
      tema: shortDescription,
      solicitud: description,
      fecha: fecha,
      estado: estado,
    };

    // Agregar la nueva solicitud al array de solicitudes
    solicitudes.push(solicitud);

    // Guardar el array actualizado en localStorage
    localStorage.setItem("solicitudes", JSON.stringify(solicitudes));

    // Aquí puedes hacer lo que necesites con la solicitud, como enviarla a un servidor, procesarla, etc.
    console.log("Solicitud añadida:", solicitud);

    location.reload();
  }
};
