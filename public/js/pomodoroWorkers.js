let startTime;
let targetSeconds;

self.onmessage = function (e) {
  const now = Date.now();
  switch (e.data.action) {
    case "run":
      targetSeconds = e.data.minutes * 60 + 1;
      startTime = now;
      startCountdown();
      break;
    case "pause":
      pauseCountdown();
      break;
    case "resume":
      // Ajustar startTime para el tiempo pausado
      startTime = now - (targetSeconds - seconds) * 1000;
      resumeCountdown();
      break;
  }
};

function startCountdown() {
  intervalId = setInterval(() => {
    const now = Date.now();
    const elapsed = (now - startTime) / 1000; // Tiempo en segundos desde el inicio
    seconds = targetSeconds - elapsed;
    if (seconds <= 0) {
      clearInterval(intervalId);
      self.postMessage({ type: "finish" });
    } else {
      const mins = Math.floor(seconds / 60);
      let secs = Math.floor(seconds % 60);
      secs = secs < 10 ? "0" + secs : secs;
      self.postMessage({ type: "update", time: mins + ":" + secs });
    }
  }, 1000);
}

function pauseCountdown() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
}

function resumeCountdown() {
  if (!intervalId) {
    startCountdown();
  }
}
