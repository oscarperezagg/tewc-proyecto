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
  // 1. Borrado de seguridad
  if (sessionStorage.getItem("pomodoro")) {
    sessionStorage.removeItem("pomodoro");
  }

  // 2. Añadimos la configuración de seguridad
  if (!localStorage.getItem("pomodoroSet")) {
    localStorage.setItem("pomodoroSet", JSON.stringify(pomodoroSet));
  }

  // 3. Modificamos la UI
  const pomodoroSetFromStorage = JSON.parse(
    localStorage.getItem("pomodoroSet")
  );

  const spanTime = document.getElementById("time"); // Tiempo
  spanTime.innerHTML = segundosAFormato(pomodoroSetFromStorage.time * 60);

  // Actualizar los valores de los campos de entrada
  document.getElementById("pomodorotime").value = pomodoroSetFromStorage.time;
  document.getElementById("breaktime").value = pomodoroSetFromStorage.break;
  document.getElementById("rounds").value = pomodoroSetFromStorage.round;
  // 4. Añadimos listener al start button
  const startButton = document.getElementById("startButton");
  startButton.addEventListener("click", function () {
    runner();
  });

  // 5. Añadimos listener al save button
  const saveButton = document.getElementById("saveButton");
  saveButton.addEventListener("click", function () {
    save();
  });
});

const runner = () => {
  // Verificar si no existe un elemento llamado "pomodoro" en el sessionStorage
  if (!sessionStorage.getItem("pomodoro")) {
    // Verificar si el elemento pomodoroSet está en el localStorage
    if (!localStorage.getItem("pomodoroSet")) {
      // Convertir el objeto a cadena JSON y guardarlo en el localStorage
      localStorage.setItem("pomodoroSet", JSON.stringify(pomodoroSet));
    }
    const pomodoroSetFromStorage = JSON.parse(
      localStorage.getItem("pomodoroSet")
    );
    // Crear un objeto con las claves "status" y "time"
    sessionStorage.setItem("pomodoro", JSON.stringify(pomodoroSetFromStorage));
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

const save = () => {
  // 1. Borramos el web worker
  try {
    if (countdownWorker) countdownWorker.terminate();
  } catch (e) {
    console.log(e);
  }

  // 2. Borramos el pomodoro
  if (sessionStorage.getItem("pomodoro")) {
    sessionStorage.removeItem("pomodoro");
  }

  // 4. Actualizamos los valores
  let pomodoroTime = document.getElementById("pomodorotime").value;
  let breakTime = document.getElementById("breaktime").value;
  let rounds = document.getElementById("rounds").value;

  // 5. Copiamos el original
  let newConfig = { ...pomodoroSet };

  // 6. Actualizamos los valores
  if (pomodoroTime) newConfig.time = pomodoroTime;
  if (
    !(
      breakTime === null ||
      breakTime === undefined ||
      breakTime === "" ||
      parseInt(breakTime) <= 0
    )
  ) {
    newConfig.break = breakTime;
  }
  if (
    !(
      rounds === null ||
      rounds === undefined ||
      rounds === "" ||
      parseInt(breakTime) <= 2
    )
  ) {
    newConfig.round = rounds;
  }
  localStorage.setItem("pomodoroSet", JSON.stringify(newConfig));

  // 7. Modificamos la UI
  const pomodoroSetFromStorage = JSON.parse(
    localStorage.getItem("pomodoroSet")
  );

  const spanTime = document.getElementById("time");

  spanTime.innerHTML = segundosAFormato(pomodoroSetFromStorage.time * 60);
  // Obtener el botón por su ID
  const startButton = document.getElementById("startButton");
  startButton.innerHTML = "START";
};
