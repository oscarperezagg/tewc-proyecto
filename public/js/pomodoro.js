let countdownWorker = undefined;
const pomodoroSet = {
  status: "first",
  time: 25,
  break: 5,
  round: 4,
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

  // Añadir mirar un pomodoroSet en LocalStorage

  const spanTime = document.getElementById("time");

  spanTime.innerHTML = segundosAFormato(pomodoroSet.time * 60);
  // Obtener el botón por su ID
  const startButton = document.getElementById("startButton");

  // Agregar un event listener de click al botón
  startButton.addEventListener("click", function () {
    // Añadir mirar un pomodoroSet en LocalStorage

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

    // Si está corriendo paramos
    // Enviar mensaje para pausar el countdown
    countdownWorker.postMessage({ action: "pause" });
  } else if (pomodoroData.status === "paused") {
    // Cambiar el estado a "paused"
    pomodoroData.status = "run";
    sessionStorage.setItem("pomodoro", JSON.stringify(pomodoroData));
    const startButton = document.getElementById("startButton");
    startButton.innerHTML = "PAUSED";

    // Si está pausado resumimos
    countdownWorker.postMessage({ action: "resume" });
  } else {
    // Cambiar el estado a "paused"
    pomodoroData.status = "run";
    sessionStorage.setItem("pomodoro", JSON.stringify(pomodoroData));
    const startButton = document.getElementById("startButton");
    startButton.innerHTML = "PAUSED";
    // Ejemplo de uso:

    // Crear un Web Worker
    try {
      if (countdownWorker) countdownWorker.terminate();
    } catch (e) {
      console.log(e);
    }
    countdownWorker = new Worker("/public/js/pomodoroWorkers.js");

    // Iniciar el countdown
    countdownWorker.postMessage({ action: "run", minutes: time });

    // Escuchar mensajes del worker
    countdownWorker.onmessage = function (e) {
      if (e.data.type === "update") {
        const span = document.getElementById("time");
        document.title = `LearnHub (${e.data.time})`;
        span.innerHTML = e.data.time;
      } else if (e.data.type === "finish") {
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
      }
    };
  }
};
