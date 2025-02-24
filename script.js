// Sample questions – you can add more questions as needed
const questions = [
  {
    id: 1,
    text: "What is the full form of NTPC?",
    options: {
      A: "National Thermal Power Corporation",
      B: "National Transmission Power Company",
      C: "National Transport Planning Council",
      D: "None of the above"
    },
    answer: "A"
  },
  {
    id: 2,
    text: "Who conducted the exam?",
    options: {
      A: "Wipro",
      B: "TCS",
      C: "Infosys",
      D: "Tech Mahindra"
    },
    answer: "B"
  },
  {
    id: 3,
    text: "Which programming language is used for web development?",
    options: {
      A: "C++",
      B: "Java",
      C: "JavaScript",
      D: "Python"
    },
    answer: "C"
  },
  {
    id: 4,
    text: "Select the correct HTML tag for inserting a line break.",
    options: {
      A: "<br>",
      B: "<break>",
      C: "<lb>",
      D: "<line>"
    },
    answer: "A"
  }
];

let currentQuestionIndex = 0;
const userAnswers = {};
const flaggedQuestions = new Set();

// Timer variables
let totalTime = 30 * 60; // 30 minutes in seconds
let timerInterval;

const timerDisplay = document.getElementById("timer");
const questionContainer = document.getElementById("question-container");
const questionNav = document.getElementById("question-nav");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const flagBtn = document.getElementById("flagBtn");
const submitBtn = document.getElementById("submitBtn");
const resultSection = document.getElementById("resultSection");
const scoreDisplay = document.getElementById("scoreDisplay");
const retryBtn = document.getElementById("retryBtn");
const downloadBtn = document.getElementById("downloadBtn");

// Initialize exam interface
function initExam() {
  currentQuestionIndex = 0;
  for (const key in userAnswers) delete userAnswers[key];
  flaggedQuestions.clear();
  resultSection.style.display = "none";
  document.querySelector(".container").style.display = "flex";
  document.querySelector("header").style.display = "block";
  renderQuestionNav();
  renderQuestion();
  totalTime = 30 * 60; // reset timer
  startTimer();
}

// Timer countdown
function startTimer() {
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    if (totalTime <= 0) {
      clearInterval(timerInterval);
      submitExam();
    } else {
      totalTime--;
      let minutes = Math.floor(totalTime / 60);
      let seconds = totalTime % 60;
      timerDisplay.textContent = `Time: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
  }, 1000);
}

// Render navigation buttons for questions
function renderQuestionNav() {
  questionNav.innerHTML = "";
  questions.forEach((q, index) => {
    const btn = document.createElement("div");
    btn.className = "question-number" + (index === currentQuestionIndex ? " active" : "");
    btn.textContent = q.id;
    btn.addEventListener("click", () => {
      currentQuestionIndex = index;
      renderQuestion();
      updateNavActive();
    });
    questionNav.appendChild(btn);
  });
}

function updateNavActive() {
  const navButtons = document.querySelectorAll(".question-number");
  navButtons.forEach((btn, index) => {
    btn.classList.toggle("active", index === currentQuestionIndex);
  });
}

// Render the current question
function renderQuestion() {
  const currentQ = questions[currentQuestionIndex];
  let html = `<div class="question-text"><strong>Q${currentQ.id}.</strong> ${currentQ.text}</div><ul class="options">`;
  for (const [key, value] of Object.entries(currentQ.options)) {
    const checked = userAnswers[currentQ.id] === key ? "checked" : "";
    html += `<li>
              <label>
                <input type="radio" name="option" value="${key}" ${checked}>
                <span>${key}: ${value}</span>
              </label>
            </li>`;
  }
  html += "</ul>";
  questionContainer.innerHTML = html;

  // Attach change event to radio inputs
  document.querySelectorAll("input[name='option']").forEach((input) => {
    input.addEventListener("change", (e) => {
      userAnswers[currentQ.id] = e.target.value;
    });
  });
}

// Next & Previous button events
nextBtn.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    renderQuestion();
    updateNavActive();
  }
});
prevBtn.addEventListener("click", () => {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    renderQuestion();
    updateNavActive();
  }
});

// Flag button event
flagBtn.addEventListener("click", () => {
  const currentId = questions[currentQuestionIndex].id;
  if (flaggedQuestions.has(currentId)) {
    flaggedQuestions.delete(currentId);
    flagBtn.textContent = "Flag";
    flagBtn.style.backgroundColor = "#f59e0b";
  } else {
    flaggedQuestions.add(currentId);
    flagBtn.textContent = "Flagged";
    flagBtn.style.backgroundColor = "#dc2626";
  }
});

// Submit button event
submitBtn.addEventListener("click", submitExam);

function submitExam() {
  clearInterval(timerInterval);
  // Calculate score
  let score = 0;
  questions.forEach((q) => {
    if (userAnswers[q.id] === q.answer) {
      score++;
    }
  });
  scoreDisplay.textContent = `Your Score: ${score} / ${questions.length}`;
  resultSection.style.display = "block";
  document.querySelector(".container").style.display = "none";
  document.querySelector("header").style.display = "none";
}

// Retry button event
retryBtn.addEventListener("click", initExam);

// Download result event
downloadBtn.addEventListener("click", () => {
  let resultText = `Exam Result\nYour Score: ${scoreDisplay.textContent}\n\nDetailed Responses:\n`;
  questions.forEach((q) => {
    resultText += `Q${q.id}: Your Answer: ${userAnswers[q.id] || "Not Answered"}, Correct Answer: ${q.answer}\n`;
  });
  const blob = new Blob([resultText], { type: "text/plain" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "Exam_Result.txt";
  a.click();
});

// Start exam on page load
window.onload = initExam;
