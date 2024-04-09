// sports_script.js

document.addEventListener('DOMContentLoaded', function() {
    const questionsContainer = document.getElementById('questions-container');
    const quizForm = document.getElementById('quiz-form');
    const scoreContainer = document.getElementById('score');

    let questions = [];

    // Fetch Sports questions from API
    async function fetchSportsQuestions() {
        try {
            const response = await fetch('https://opentdb.com/api.php?amount=10&category=21&type=multiple'); // Category 21 represents Sports questions
            const data = await response.json();
            return data.results;
        } catch (error) {
            console.error('Error fetching questions:', error);
            throw new Error('Failed to fetch questions');
        }
    }

    // Function to display questions
    function displayQuestions() {
        questionsContainer.innerHTML = '';
        questions.forEach((question, index) => {
            const { question: questionText, correct_answer, incorrect_answers } = question;
            const questionDiv = document.createElement('div');
            questionDiv.classList.add('question');
            questionDiv.innerHTML = `
                <p>${index + 1}. ${questionText}</p>
                <div class="options">
                    ${generateOptions(index, correct_answer, incorrect_answers)}
                </div>
            `;
            questionsContainer.appendChild(questionDiv);
        });
    }

    // Function to generate options for a question
    function generateOptions(questionIndex, correctAnswer, incorrectAnswers) {
        const options = shuffleArray([correctAnswer, ...incorrectAnswers]);
        let optionsHTML = '';
        options.forEach(option => {
            optionsHTML += `
                <label>
                    <input type="radio" name="option${questionIndex}" value="${option}">
                    ${option}
                </label>
                <br>
            `;
        });
        return optionsHTML;
    }

    // Function to shuffle array (Fisher-Yates algorithm)
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Event listener for form submission
    quizForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const score = calculateScore();
        displayScore(score);
    });

    // Function to calculate the score
    function calculateScore() {
        let totalScore = 0;
        questions.forEach((question, index) => {
            const selectedOption = document.querySelector(`input[name="option${index}"]:checked`);
            if (selectedOption && selectedOption.value === question.correct_answer) {
                totalScore++;
            }
        });
        return totalScore;
    }

    // Function to display the score
    function displayScore(score) {
        scoreContainer.textContent = `Your Score: ${score}`;
    }

    // Initialize the quiz
    async function initializeQuiz() {
        try {
            questions = await fetchSportsQuestions();
            displayQuestions();
        } catch (error) {
            questionsContainer.innerHTML = '<p>Error fetching questions. Please try again later.</p>';
        }
    }

    // Initialize the quiz when the DOM content is loaded
    initializeQuiz();
});
