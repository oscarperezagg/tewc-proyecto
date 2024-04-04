document.addEventListener("DOMContentLoaded", function () {
  // Elimina la variable 'deck' del sessionStorage si existe
  if (sessionStorage.getItem("deck")) {
    sessionStorage.removeItem("deck");
    console.log('Variable "deck" eliminada de sessionStorage');
  }

  // Elimina la variable 'actualIndex' del sessionStorage si existe
  if (sessionStorage.getItem("actualIndex")) {
    sessionStorage.removeItem("actualIndex");
    console.log('Variable "actualIndex" eliminada de sessionStorage');
  }

  // Elimina la variable 'actualIndex' del sessionStorage si existe
  if (sessionStorage.getItem("correctAnswers")) {
    sessionStorage.removeItem("correctAnswers");
    console.log('Variable "correctAnswers" eliminada de sessionStorage');
  }

  document.addEventListener("click", function (event) {
    var elemento = event.target;

    // Verificar si el elemento es un <td> o tiene un padre <td>
    var trCercano = elemento.closest("tr");
    if (trCercano) {
      var idtrCercano = trCercano.id;
      console.log("Haz hecho clic en un elemento <td> con el id:", idtrCercano);

      // Destruir la tabla
      var tabla = $("#tabla-carreras").DataTable();
      if (tabla !== undefined && tabla !== null) {
        tabla.destroy();
      }

      // Ocultar elementos
      $("#notSelectedCarrera").attr("hidden", "hidden");
      $(".nothingFound").attr("hidden", "hidden");
      $("#tabla-carreras").attr("hidden", "hidden");

      // Obtener el contenido de la tercera columna del <tr> (índice 2)
      var contenidoTerceraColumna = trCercano.cells[2].innerHTML;
      console.log("Contenido de la tercera columna:", contenidoTerceraColumna);

      // Añadir el contenido de la tercera columna al elemento <p> con la clase "title_deck"
      var tituloDeck = document.getElementById("title_deck");
      tituloDeck.textContent = contenidoTerceraColumna;

      $(".question_answer").removeAttr("hidden");
      $("#title_deck").removeAttr("hidden");

      // Lógica de tarjetas
      deck(idtrCercano);
    }
  });
});

const deck = (id) => {
  if (sessionStorage.getItem("deck")) {
    sessionStorage.removeItem("deck");
    console.log('Variable "deck" eliminada de sessionStorage');
  }

  // Elimina la variable 'actualIndex' del sessionStorage si existe
  if (sessionStorage.getItem("actualIndex")) {
    sessionStorage.removeItem("actualIndex");
    console.log('Variable "actualIndex" eliminada de sessionStorage');
  }

  // Elimina la variable 'actualIndex' del sessionStorage si existe
  if (sessionStorage.getItem("correctAnswers")) {
    sessionStorage.removeItem("correctAnswers");
    console.log('Variable "correctAnswers" eliminada de sessionStorage');
  }

  var elemento = document.getElementById("FailedQuestion");
  elemento.removeAttribute("hidden");
  var elemento = document.getElementById("CorrectQuestion");
  elemento.removeAttribute("hidden");
  elemento = document.getElementById("NextQuestion");
  elemento.setAttribute("hidden", true);
  // URL del archivo JSON
  const url = `modelos/decks/${id}`;

  // Realiza la solicitud usando fetch
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al cargar el archivo JSON");
      }
      return response.json();
    })
    .then((jsonData) => {
      // Guarda el objeto JSON en sessionStorage como un deck
      sessionStorage.setItem("deck", JSON.stringify(jsonData));
      console.log("Deck guardado en sessionStorage:", jsonData);

      // Guarda el índice actual en sessionStorage
      sessionStorage.setItem("actualIndex", 0);

      sessionStorage.setItem("correctAnswers", 0);
      // Obtener el elemento <p> con el id "paciertos"
      var paciertosElement = document.getElementById("paciertos");

      // Actualizar el innerHTML del elemento con el nuevo valor de correctAnswers
      paciertosElement.innerHTML = "Correct answers: " + "0";

      console.log("Índice actual guardado en sessionStorage: 0");
      // Acceder al primer elemento del array jsonData
      const primerElemento = jsonData[0];
      // Acceder a la pregunta del primer elemento
      const pregunta = primerElemento.question;
      // Colocar la pregunta en el HTML
      document.getElementById("question").innerHTML = pregunta;
    })
    .catch((error) => {
      console.error(error);
      // window.location.reload();
    });
};

// Add click event listener to the document
document.addEventListener("click", function (event) {
  // Retrieve ID of the clicked element
  var id = event.target.id;
  console.log(id);
  // Check if the clicked element has an ID
  if (id && id == "FailedQuestion") {
    var elemento = document.getElementById("CorrectQuestion");
    elemento.setAttribute("hidden", true);
    elemento = document.getElementById("FailedQuestion");
    elemento.setAttribute("hidden", true);
    var elemento = document.getElementById("NextQuestion");
    elemento.removeAttribute("hidden");
    // Obtener el valor actual de sessionStorage "actualIndex"
    let currentIndex = parseInt(sessionStorage.getItem("actualIndex"));

    // Actualizar el texto de la respuesta y pregunta en el HTML
    updateAnswerText(currentIndex);

    console.log("Clicked element ID:", id);
  } else if (id && id == "CorrectQuestion") {
    // Obtener el elemento por su ID
    var elemento = document.getElementById("CorrectQuestion");
    elemento.setAttribute("hidden", true);
    elemento = document.getElementById("FailedQuestion");
    elemento.setAttribute("hidden", true);
    var elemento = document.getElementById("NextQuestion");
    elemento.removeAttribute("hidden");

    // Obtener el valor actual de sessionStorage "actualIndex"
    let currentIndex = parseInt(sessionStorage.getItem("actualIndex"));

    // Obtener el valor actual de correctAnswers de sessionStorage
    var currentCorrectAnswers = sessionStorage.getItem("correctAnswers");
    console.log(currentCorrectAnswers);

    // Convertir el valor obtenido a un número entero
    currentCorrectAnswers = parseInt(currentCorrectAnswers);

    // Incrementar el valor en 1
    currentCorrectAnswers += 1;

    // Almacenar el nuevo valor en sessionStorage
    sessionStorage.setItem("correctAnswers", currentCorrectAnswers);

    // Obtener el elemento <p> con el id "paciertos"
    var paciertosElement = document.getElementById("paciertos");

    // Actualizar el innerHTML del elemento con el nuevo valor de correctAnswers
    paciertosElement.innerHTML = "Correct answers: " + currentCorrectAnswers;

    // Actualizar el texto de la respuesta y pregunta en el HTML
    updateAnswerText(currentIndex);
  } else if (id && id == "NextQuestion") {
    var elemento = document.getElementById("FailedQuestion");
    elemento.removeAttribute("hidden");
    var elemento = document.getElementById("CorrectQuestion");
    elemento.removeAttribute("hidden");
    elemento = document.getElementById("NextQuestion");
    elemento.setAttribute("hidden", true);
    // Obtener el valor actual de sessionStorage "actualIndex"
    let currentIndex = parseInt(sessionStorage.getItem("actualIndex"));
    // Actualizar el valor en sessionStorage
    sessionStorage.setItem("actualIndex", currentIndex + 1);
    // Actualizar el texto de la respuesta y pregunta en el HTML
    updateQuestionText(currentIndex);
  }
});
// Función para actualizar el texto de la respuesta en el HTML
function updateAnswerText(index) {
  // Obtener el deck del sessionStorage y convertirlo a un array
  const deck = JSON.parse(sessionStorage.getItem("deck"));
  // Obtener el elemento de respuesta del índice actual
  const answerElement = document.getElementById("answer");
  // Verificar si el índice está dentro del rango del array
  if (index < deck.length) {
    // Obtener la respuesta del elemento actualIndex del array deck
    const answer = deck[index].answer;
    // Actualizar el texto de la respuesta en el HTML
    answerElement.innerHTML = answer;
  } else {
    // Si el índice excede el rango del array, mostrar un mensaje
    answerElement.innerHTML = "No hay más respuestas disponibles";
  }
}

// Función para actualizar el texto de la pregunta en el HTML
function updateQuestionText(index) {
  // Obtener el deck del sessionStorage y convertirlo a un array
  const deck = JSON.parse(sessionStorage.getItem("deck"));
  // Obtener el elemento de pregunta del índice actual
  const questionElement = document.getElementById("question");
  // Verificar si el índice está dentro del rango del array
  if (index < deck.length) {
    // Obtener la pregunta del elemento actualIndex del array deck
    const question = deck[index].question;
    // Actualizar el texto de la pregunta en el HTML
    questionElement.innerHTML = question;
    const answerElement = document.getElementById("answer");
    answerElement.innerHTML = "";
  } else {
    // Si el índice excede el rango del array, mostrar un mensaje
    questionElement.innerHTML = "No hay más preguntas disponibles";
  }
}
