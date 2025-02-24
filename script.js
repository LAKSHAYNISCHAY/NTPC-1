// NTPC सेट - 57 के उदाहरण प्रश्नों का एक नमूना सेट
// (नोट: यहाँ केवल 10 प्रश्न दिए गए हैं। शेष प्रश्न भी इसी प्रारूप में जोड़े जा सकते हैं)
const questions = [
  {
    id: 1,
    text: "हाल ही में किसने 'NATO' के महासचिव का पदभार संभाला है ?",
    options: {
      A: "मोनिक मोकाल",
      B: "माक़ रुटे",
      C: "माइली साइरस",
      D: "इनमें से कोई नहीं"
    },
    answer: "B"  // Answer Key: 1 (B)
  },
  {
    id: 2,
    text: "संयुक्त राष्ट्र सुरक्षा परिषद में कितने अस्थायी सदस्य हैं?",
    options: {
      A: "5",
      B: "10",
      C: "15",
      D: "20"
    },
    answer: "B"  // Answer Key: 2 (B)
  },
  {
    id: 3,
    text: "निम्नलिखित में कौन ‘अनामिका’ कविता संग्रह के रचनाकार हैं?",
    options: {
      A: "रामनरेश त्रिपाठ",
      B: "जयशंकर प्रसाद",
      C: "सयू-कांत त्रिपाठ नीराला",
      D: "सोहनलाल विश्वदी"
    },
    answer: "C"  // Answer Key: 3 (C)
  },
  {
    id: 4,
    text: "सात व्यक्ति, P, Q, R, S, T, U और V, एक सीधी पंक्ति में उत्तर की ओर उन्मुख होकर बैठे हैं। केवल दो व्यक्ति U के दायाँ बैठे हैं, केवल दो व्यक्ति R के बायाँ बैठे हैं, केवल दो व्यक्ति U और Q के मध्य बैठे हैं, केवल तीन व्यक्ति R और V के मध्य बैठे हैं, T, U का निकटतम पड़ोसी नहीं है, और S, U के दायाँ बैठा है। U के ठीक दायाँ कौन बैठा है?",
    options: {
      A: "P",
      B: "S",
      C: "R",
      D: "T"
    },
    answer: "B"  // Answer Key: 4 (B)
  },
  {
    id: 5,
    text: "दी गई प्रतिक्रया से लुप्त संख्या का चयन करें।",
    options: {
      A: "50",
      B: "94",
      C: "25",
      D: "47"
    },
    answer: "A"  // Answer Key: 5 (A)
  },
  {
    id: 6,
    text: "एक कूट भाषा में, 'DENT' को '51' तथा 'LOAD' को '40' के रूप में लिखा जाता है। तो उसी कूट भाषा में 'COST' को कैसे लिखा जाएगा?",
    options: {
      A: "65",
      B: "62",
      C: "75",
      D: "57"
    },
    answer: "A"  // Answer Key: 6 (A)
  },
  {
    id: 7,
    text: "निम्नलिखित आकृतियों में कितने त्रिभुज हैं?",
    options: {
      A: "10",
      B: "9",
      C: "12",
      D: "13"
    },
    answer: "A"  // Answer Key: 7 (A)
  },
  {
    id: 8,
    text: "हाल ही में साल 2025 में दृष्टिहीन महिला टी20 विश्व कप की मेजबानी कौन-सा देश करेगा?",
    options: {
      A: "नेपाल",
      B: "भारत",
      C: "श्रीलंका",
      D: "इनमें से कोई नहीं"
    },
    answer: "B"  // Answer Key: 8 (B)
  },
  {
    id: 9,
    text: "यदि sec 3θ = cosec (4θ -15°) है, तो tan 3θ का मान ज्ञात कीजिए।",
    options: {
      A: "√3",
      B: "-1",
      C: "1",
      D: ""  // खाली विकल्प
    },
    answer: "C"  // Answer Key: 9 (C)
  },
  {
    id: 10,
    text: "हाल ही में किस राज्य ने 'ग्रीन एनर्जी' के लिए नई नीति की घोषणा की है?",
    options: {
      A: "गोवा",
      B: "गुजरात",
      C: "राजस्थान",
      D: "इनमें से कोई नहीं"
    },
    answer: "B"  // Answer Key: 10 (B)
  }
  // आगे के प्रश्न इसी प्रारूप में जोड़े जा सकते हैं...
];

let currentQuestionIndex = 0;
const userAnswers = {};
const flaggedQuestions = new Set();

// Timer variables (30 मिनट)
let totalTime = 30 * 60;
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

// परीक्षा इंटरफेस का प्रारंभ करें
function initExam() {
  currentQuestionIndex = 0;
  for (const key in userAnswers) delete userAnswers[key];
  flaggedQuestions.clear();
  resultSection.style.display = "none";
  document.querySelector(".container").style.display = "flex";
  document.querySelector("header").style.display = "block";
  renderQuestionNav();
  renderQuestion();
  totalTime = 30 * 60; // टाइमर रीसेट
  startTimer();
}

// टाइमर काउंटडाउन
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
      timerDisplay.textContent = `समय: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
  }, 1000);
}

// प्रश्न नेविगेशन बटन रेंडर करें
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

// वर्तमान प्रश्न रेंडर करें
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

  // रेडियो इनपुट पर चेंज इवेंट लगाएँ
  document.querySelectorAll("input[name='option']").forEach((input) => {
    input.addEventListener("change", (e) => {
      userAnswers[currentQ.id] = e.target.value;
    });
  });
}

// अगले एवं पिछले बटन की घटनाएँ
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

// फ्लैग बटन की घटना
flagBtn.addEventListener("click", () => {
  const currentId = questions[currentQuestionIndex].id;
  if (flaggedQuestions.has(currentId)) {
    flaggedQuestions.delete(currentId);
    flagBtn.textContent = "फ्लैग";
    flagBtn.style.backgroundColor = "#f59e0b";
  } else {
    flaggedQuestions.add(currentId);
    flagBtn.textContent = "फ्लैग्ड";
    flagBtn.style.backgroundColor = "#dc2626";
  }
});

// सबमिट बटन की घटना
submitBtn.addEventListener("click", submitExam);

function submitExam() {
  clearInterval(timerInterval);
  // स्कोर की गणना
  let score = 0;
  questions.forEach((q) => {
    if (userAnswers[q.id] === q.answer) {
      score++;
    }
  });
  scoreDisplay.textContent = `आपका स्कोर: ${score} / ${questions.length}`;
  resultSection.style.display = "block";
  document.querySelector(".container").style.display = "none";
  document.querySelector("header").style.display = "none";
}

// retry बटन की घटना
retryBtn.addEventListener("click", initExam);

// परिणाम डाउनलोड करने की घटना
downloadBtn.addEventListener("click", () => {
  let resultText = `परीक्षा परिणाम\n${scoreDisplay.textContent}\n\nविस्तृत प्रतिक्रियाएँ:\n`;
  questions.forEach((q) => {
    resultText += `Q${q.id}: आपकी उत्तर: ${userAnswers[q.id] || "उत्तर नहीं दिया"}, सही उत्तर: ${q.answer}\n`;
  });
  const blob = new Blob([resultText], { type: "text/plain" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "Exam_Result.txt";
  a.click();
});

// पेज लोड होने पर परीक्षा प्रारंभ करें
window.onload = initExam;
