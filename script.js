const messageEl = document.getElementById("typed-message");
const replayBtn = document.getElementById("replay-btn");
const sparkleBtn = document.getElementById("sparkle-btn");
const sparkleLayer = document.getElementById("sparkle-layer");
const openEnvelopeBtn = document.getElementById("open-envelope-btn");
const envelopeScene = document.getElementById("envelope-scene");
const greetingCard = document.getElementById("greeting-card");
const backgroundMusic = document.getElementById("background-music");

const messageText =
  "Di hari yang suci ini, aku ingin minta maaf atas semua salahku, baik yang sengaja maupun tidak. Semoga Allah melimpahkan kebahagiaan, kesehatan, dan keberkahan untukmu, Luthfiana. Terima kasih sudah hadir dan membuat hariku lebih indah. Selamat Idul Fitri 1447 H, sayang.";

let typingTimer;
let isEnvelopeOpened = false;

function typeMessage(text, speed = 28) {
  clearTimeout(typingTimer);
  messageEl.textContent = "";

  let i = 0;
  function typeNext() {
    if (i < text.length) {
      messageEl.textContent += text.charAt(i);
      i += 1;
      typingTimer = setTimeout(typeNext, speed);
    }
  }

  typeNext();
}

function spawnSparkles(count = 22) {
  const width = window.innerWidth;
  const height = window.innerHeight;

  for (let i = 0; i < count; i += 1) {
    const dot = document.createElement("span");
    dot.className = "sparkle";

    dot.style.left = `${Math.random() * width}px`;
    dot.style.top = `${Math.random() * height}px`;
    dot.style.animationDelay = `${Math.random() * 240}ms`;

    sparkleLayer.appendChild(dot);

    setTimeout(() => {
      dot.remove();
    }, 1200);
  }
}

function revealGreetingCard() {
  greetingCard.classList.remove("is-hidden");
  greetingCard.classList.add("revealed");
  greetingCard.setAttribute("aria-hidden", "false");

  typeMessage(messageText, 28);

  setTimeout(() => {
    spawnSparkles(18);
  }, 500);
}

replayBtn.addEventListener("click", () => {
  typeMessage(messageText, 26);
});

sparkleBtn.addEventListener("click", () => {
  spawnSparkles(34);
});

openEnvelopeBtn.addEventListener("click", () => {
  if (isEnvelopeOpened) {
    return;
  }

  isEnvelopeOpened = true;
  openEnvelopeBtn.disabled = true;
  openEnvelopeBtn.textContent = "Amplop Dibuka";
  envelopeScene.classList.add("opening");
  backgroundMusic.play().catch(() => {});

  setTimeout(() => {
    envelopeScene.classList.add("done");
    revealGreetingCard();
  }, 980);
});

window.addEventListener("load", () => {
  messageEl.textContent = "Klik tombol Buka Amplop untuk melihat ucapan.";
});
