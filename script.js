document.addEventListener("DOMContentLoaded", function () {
  const taskInput = document.getElementById("taskInput");
  const taskList = document.getElementById("taskList");

  window.addTask = function () {
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = taskText;
    span.onclick = function () {
      this.parentElement.classList.toggle("completed");
    };

    const delBtn = document.createElement("button");
    delBtn.textContent = "❌";
    delBtn.onclick = function () {
      this.parentElement.remove();
    };

    li.appendChild(span);
    li.appendChild(delBtn);
    taskList.appendChild(li);
    taskInput.value = "";
  };

  window.startVoice = function () {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech Recognition not supported");
      return;
    }

    const recognition = new webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.start();

    recognition.onresult = function (event) {
      const voiceText = event.results[0][0].transcript;
      taskInput.value = voiceText;
      window.addTask();
    };
  };
});

function generateFloatingMics() {
  const micContainer = document.querySelector(".mic-bg-container");
  const emojis = ["📄", "🎙️", "📔", "🗒️"];
  
  setInterval(() => {
    const emoji = document.createElement("span");
    emoji.classList.add("mic-emoji");
    emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    emoji.style.left = Math.random() * 100 + "vw";
    emoji.style.fontSize = Math.random() * 20 + 20 + "px";
    emoji.style.animationDuration = Math.random() * 10 + 10 + "s";
    micContainer.appendChild(emoji);

    // Remove emoji after animation completes
    setTimeout(() => {
      emoji.remove();
    }, 20000);
  }, 500); 
}

document.addEventListener("DOMContentLoaded", generateFloatingMics);