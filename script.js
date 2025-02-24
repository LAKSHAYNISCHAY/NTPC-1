// Timer
let timeLeft = 90 * 60; // 90 minutes in seconds
const timerDisplay = document.getElementById('timer');
function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `Time Left: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    timeLeft--;
    if (timeLeft < 0) {
        alert('Time’s up! Exam submitted.');
        clearInterval(timerInterval);
    }
}
const timerInterval = setInterval(updateTimer, 1000);

// Question Navigation
let currentQuestion = 0;
const answers = [];
document.getElementById('save-next').addEventListener('click', () => {
    const selected = document.querySelector('input[name="answer"]:checked');
    if (selected) {
        answers[currentQuestion] = selected.value;
        document.querySelectorAll('#question-nav span')[currentQuestion].classList.add('answered');
    }
    currentQuestion++;
    // Add logic to load next question here
});

document.getElementById('clear-response').addEventListener('click', () => {
    document.querySelectorAll('input[name="answer"]').forEach(input => input.checked = false);
});

document.getElementById('mark-review').addEventListener('click', () => {
    // Add review marking logic here
    currentQuestion++;
});

document.getElementById('submit-btn').addEventListener('click', () => {
    alert('Exam submitted!');
    // Add submission logic here
});
