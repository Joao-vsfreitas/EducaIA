const form = document.getElementById("study-form");
const subjectInput = document.getElementById("subject");
const actionInput = document.getElementById("action");
const submitButton = document.getElementById("submit-button");
const emptyState = document.getElementById("empty-state");
const resultContent = document.getElementById("result-content");
const loadingState = document.getElementById("loading-state");
const errorState = document.getElementById("error-state");
const answerText = document.getElementById("answer-text");
const resultTitle = document.getElementById("result-title");
const evaluateArea = document.getElementById("evaluate-area");

let lastRequest = null;
let lastQuizText = "";

const actionCards = document.querySelectorAll(".action-card");
actionCards.forEach(card => card.addEventListener("click", () => {
  actionCards.forEach(item => item.classList.remove("selected"));
  card.classList.add("selected");
  actionInput.value = card.dataset.action;
}));

document.querySelectorAll("[data-suggestion]").forEach(button => {
  button.addEventListener("click", () => {
    subjectInput.value = button.dataset.suggestion;
    subjectInput.focus();
  });
});

function showState(state) {
  emptyState.classList.toggle("hidden", state !== "empty");
  resultContent.classList.toggle("hidden", state !== "result");
  loadingState.classList.toggle("hidden", state !== "loading");
  errorState.classList.toggle("hidden", state !== "error");
}

function currentLevel() {
  return document.querySelector('input[name="level"]:checked').value;
}

async function requestAI(payload) {
  lastRequest = payload;
  if (payload.action === "quiz") lastQuizText = "";

  showState("loading");
  submitButton.disabled = true;

  try {
    const response = await fetch("/api/educar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Erro ao consultar a IA.");

    answerText.textContent = data.text;
    resultTitle.textContent = payload.action === "quiz" ? "Hora de praticar!" :
      payload.action === "evaluate" ? "Análise da sua resposta" : "Sua explicação personalizada";

    document.getElementById("result-time").textContent = `Modelo: ${data.model}`;
    if (payload.action === "quiz") lastQuizText = data.text;

    evaluateArea.classList.toggle("hidden", payload.action !== "quiz");
    document.getElementById("student-answer").value = "";
    showState("result");
  } catch (error) {
    document.getElementById("error-message").textContent = error.message;
    showState("error");
  } finally {
    submitButton.disabled = false;
  }
}

form.addEventListener("submit", event => {
  event.preventDefault();
  const subject = subjectInput.value.trim();
  if (!subject) return;
  requestAI({ action: actionInput.value, subject, level: currentLevel() });
});

document.getElementById("new-quiz").addEventListener("click", () => {
  if (!lastRequest) return;
  requestAI({
    action: "quiz",
    subject: lastRequest.subject,
    level: currentLevel()
  });
});

document.getElementById("evaluate-button").addEventListener("click", () => {
  if (!lastRequest || !lastQuizText) {
    document.getElementById("error-message").textContent = "Gere um exercício antes de enviar uma resposta.";
    showState("error");
    return;
  }

  const answer = document.getElementById("student-answer").value.trim();
  if (!answer) {
    document.getElementById("student-answer").focus();
    return;
  }

  requestAI({
    action: "evaluate",
    subject: lastRequest.subject,
    level: currentLevel(),
    answer,
    quizContext: lastQuizText
  });
});

document.getElementById("retry-button").addEventListener("click", () => {
  if (lastRequest) requestAI(lastRequest);
  else showState("empty");
});

fetch("/api/status")
  .then(response => response.json())
  .then(data => {
    const label = document.getElementById("connection-label");
    const dot = document.querySelector(".status-dot");
    if (data.configured) {
      label.textContent = `${data.provider} configurada · ${data.model}`;
      dot.classList.add("online");
    } else {
      label.textContent = "Configure a chave da IA";
    }
  })
  .catch(() => {
    document.getElementById("connection-label").textContent = "Servidor indisponível";
  });
