const pomodoroSet = {
  status: "first",
  time: 25,
  break: 5,
  round: 3,
  completed: 0,
};

function esPar(numero) {
  return numero % 2 === 0;
}

function segundosAFormato(segundos) {
  const minutos = Math.floor(segundos / 60);
  const segundosRestantes = segundos % 60;

  const formatoMinutos = minutos < 10 ? "0" + minutos : minutos;
  const formatoSegundos =
    segundosRestantes < 10 ? "0" + segundosRestantes : segundosRestantes;

  return formatoMinutos + ":" + formatoSegundos;
}

document.addEventListener("DOMContentLoaded", function () {
  if (sessionStorage.getItem("pomodoro")) {
    // Borrar el elemento "pomodoro" del sessionStorage
    sessionStorage.removeItem("pomodoro");
  }

  const spanTime = document.getElementById("time");

  spanTime.innerHTML = segundosAFormato(pomodoroSet.time * 60);
  // Obtener el botón por su ID
  const startButton = document.getElementById("startButton");

  // Agregar un event listener de click al botón
  startButton.addEventListener("click", function () {
    // Aquí puedes colocar el código que quieres que se ejecute cuando se haga clic en el botón
    runner();
  });
});

const runner = () => {
  // Verificar si no existe un elemento llamado "pomodoro" en el sessionStorage
  if (!sessionStorage.getItem("pomodoro")) {
    // Crear un objeto con las claves "status" y "time"

    // Convertir el objeto a cadena JSON y guardar en el sessionStorage
    sessionStorage.setItem("pomodoro", JSON.stringify(pomodoroSet));
  }
  // Obtener el objeto "pomodoro" del sessionStorage y convertirlo a objeto
  const pomodoroData = JSON.parse(sessionStorage.getItem("pomodoro"));
  let time = pomodoroData.time;
  if (pomodoroData.status === "finish") {
    if (!esPar(pomodoroData.completed)) {
      time = pomodoroData.break;
      const span = document.getElementById("status");
      span.innerHTML = "Break";
    } else {
      const span = document.getElementById("status");
      span.innerHTML = "Pomodoro";
    }
  } else {
    const span = document.getElementById("status");
    span.innerHTML = "Pomodoro";
  }

  // Verificar si el estado es "run"
  if (pomodoroData.status === "run") {
    // Cambiar el estado a "paused"
    pomodoroData.status = "paused";
    sessionStorage.setItem("pomodoro", JSON.stringify(pomodoroData));
    const startButton = document.getElementById("startButton");
    startButton.innerHTML = "RUN";
  } else if (pomodoroData.status === "paused") {
    // Cambiar el estado a "paused"
    pomodoroData.status = "run";
    sessionStorage.setItem("pomodoro", JSON.stringify(pomodoroData));
    const startButton = document.getElementById("startButton");
    startButton.innerHTML = "PAUSED";
  } else {
    // Cambiar el estado a "paused"
    pomodoroData.status = "run";
    sessionStorage.setItem("pomodoro", JSON.stringify(pomodoroData));
    const startButton = document.getElementById("startButton");
    startButton.innerHTML = "PAUSED";
    // Ejemplo de uso:
    countdown(
      time,
      // Función de actualización, se llama cada segundo con el tiempo restante
      function (time) {
        const span = document.getElementById("time");
        span.innerHTML = time;
        // Aquí puedes actualizar la UI con el tiempo restante
      },
      // Función de finalización, se llama cuando el countdown llega a cero
      function () {
        // Actualizar el estado a "finish"
        const pomodoroData = JSON.parse(sessionStorage.getItem("pomodoro"));
        pomodoroData.completed += 1;
        pomodoroData.status = "finish";
        const startButton = document.getElementById("startButton");
        const spanTime = document.getElementById("time");

        if (pomodoroData.completed !== pomodoroData.round * 2 - 1) {
          if (esPar(pomodoroData.completed)) {
            startButton.innerHTML = "NEXT POMODORO";

            spanTime.innerHTML = segundosAFormato(pomodoroData.time * 60);
          } else {
            startButton.innerHTML = "BREAK";

            spanTime.innerHTML = segundosAFormato(pomodoroData.break * 60);
          }
          sessionStorage.setItem("pomodoro", JSON.stringify(pomodoroData));
        } else {
          startButton.innerHTML = "RESTART";
          sessionStorage.removeItem("pomodoro");
        }
        // Aquí puedes ejecutar cualquier acción necesaria al finalizar el countdown
      }
    );
  }
};

function countdown(minutes, updateCallback, finishCallback) {
  let seconds = minutes * 60 - 1;
  let paused = false; // Variable para controlar si el countdown está pausado

  const intervalId = setInterval(() => {
    // Verificar si el elemento "pomodoro" existe en el sessionStorage
    if (sessionStorage.getItem("pomodoro")) {
      // Obtener el objeto "pomodoro" del sessionStorage y convertirlo a objeto
      const pomodoroData = JSON.parse(sessionStorage.getItem("pomodoro"));

      // Verificar si el objeto tiene la clave "status" y si es "paused"
      if ("status" in pomodoroData && pomodoroData.status === "paused") {
        paused = true; // Marcar el countdown como pausado
        return;
      } else {
        paused = false;
      }
    }

    if (paused) {
      // Si el countdown está pausado, no hacer nada
      return;
    }

    // Calcular minutos y segundos restantes
    const mins = Math.floor(seconds / 60);
    let secs = seconds % 60;

    // Agregar un cero delante de los segundos si es necesario
    secs = secs < 10 ? "0" + secs : secs;

    // Llamar a la función de actualización con el tiempo restante
    updateCallback(mins + ":" + secs);

    // Reducir el contador de segundos
    seconds--;

    // Si el contador llega a cero, llamar a la función de finalización, actualizar el estado a "finish" y limpiar el intervalo
    if (seconds < 0) {
      clearInterval(intervalId);
      finishCallback();
    }
  }, 1000);
}
