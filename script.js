// script.js
document.addEventListener('DOMContentLoaded', function() {
    const totalQuestions = 24; // For Part A
    let currentQuestion = 0;
    let answers = new Array(totalQuestions).fill(null);
    let statuses = new Array(totalQuestions).fill('not-visited');

    // Generate Question Palette
    const questionNav = document.getElementById('question-nav');
    for (let i = 1; i <= totalQuestions; i++) {
        const span = document.createElement('span');
        span.textContent = i;
        span.addEventListener('click', () => {
            currentQuestion = i - 1;
            loadQuestion(currentQuestion);
        });
        questionNav.appendChild(span);
    }

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
            submitExam();
        }
    }
    setInterval(updateTimer, 1000);

    // Load First Question
    loadQuestion(currentQuestion);

    // Function to Load a Question
    function loadQuestion(index) {
        const questionArea = document.getElementById('question-area');
        const question = questions[index] || { id: index + 1, text: "Question not available", options: [] };
        questionArea.innerHTML = `
            <h3>Question No. ${question.id}</h3>
            <p>${question.text}</p>
            ${question.options.map((opt, i) => `
                <label>
                    <input type="radio" name="answer" value="${String.fromCharCode(65 + i)}">
                    ${opt}
                </label><br>
            `).join('')}
            <div class="control-buttons">
                <button id="mark-review">Mark for Review & Next</button>
                <button id="clear-response">Clear Response</button>
                <button id="save-next">Save & Next</button>
            </div>
        `;

        // Restore Previous Answer
        if (answers[index]) {
            document.querySelectorAll('input[name="answer"]').forEach(radio => {
                if (radio.value === answers[index]) radio.checked = true;
            });
        }

        // Update Palette
        const navSpans = document.querySelectorAll('#question-nav span');
        navSpans.forEach(span => span.classList.remove('current'));
        navSpans[index].classList.add('current');
        statuses.forEach((status, i) => {
            navSpans[i].classList.remove('answered', 'not-answered');
            if (status === 'answered') navSpans[i].classList.add('answered');
            else if (status === 'visited') navSpans[i].classList.add('not-answered');
        });
    }

    // Event Listeners for Buttons
    document.addEventListener('click', function(event) {
        if (event.target.id === 'save-next') {
            const selected = document.querySelector('input[name="answer"]:checked');
            if (selected) {
                answers[currentQuestion] = selected.value;
                statuses[currentQuestion] = 'answered';
            } else {
                statuses[currentQuestion] = 'visited';
            }
            currentQuestion++;
            if (currentQuestion < totalQuestions) loadQuestion(currentQuestion);
            else alert('You have reached the end of the section.');
        } else if (event.target.id === 'clear-response') {
            document.querySelectorAll('input[name="answer"]').forEach(input => input.checked = false);
        } else if (event.target.id === 'mark-review') {
            statuses[currentQuestion] = 'visited'; // Could add a 'marked' status
            currentQuestion++;
            if (currentQuestion < totalQuestions) loadQuestion(currentQuestion);
            else alert('You have reached the end of the section.');
        } else if (event.target.id === 'submit-btn') {
            submitExam();
        } else if (event.target.id === 'attempt-btn') {
            // For simplicity, assume Part A is selected and loaded
            loadQuestion(0);
        }
    });

    // Submit Exam
    function submitExam() {
        let score = 0;
        questions.forEach((q, index) => {
            if (answers[index] === q.correctAnswer) score += 1;
        });
        alert(`Exam submitted! Your score: ${score} out of ${questions.length}`);
    }
});
