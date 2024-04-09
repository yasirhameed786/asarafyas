// electrical_script.js

document.addEventListener('DOMContentLoaded', function() {
    const questionsContainer = document.getElementById('questions-container');
    const quizForm = document.getElementById('quiz-form');
    const scoreContainer = document.getElementById('score');

    let score = 0;
    let questions = [];

    // Fetch electrical questions from API
    fetchElectricalQuestions()
        .then(data => {
            questions = data.results;
            displayQuestions();
        })
        .catch(error => {
            console.error('Error fetching questions:', error);
            questionsContainer.innerHTML = '<p>Error fetching questions. Please try again later.</p>';
        });

    // Function to fetch electrical questions from API
    async function fetchElectricalQuestions() {
        const apiUrl = 'https://opentdb.com/api.php?amount=10&category=22&type=multiple'; // Example URL for fetching 10 electrical questions
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch questions');
        }
        const data = await response.json();
        return data;
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
                    ${generateOptions(correct_answer, incorrect_answers)}
                </div>
            `;
            questionsContainer.appendChild(questionDiv);
        });
    }

    // Function to generate options for a question
    function generateOptions(correctAnswer, incorrectAnswers) {
        const options = shuffleArray([correctAnswer, ...incorrectAnswers]);
        let optionsHTML = '';
        options.forEach(option => {
            optionsHTML += `
                <label>
                    <input type="radio" name="option${questions.indexOf(correctAnswer)}" value="${option}">
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
        score = calculateScore();
        scoreContainer.textContent = score;
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
});
