// groupchat_script.js

document.addEventListener('DOMContentLoaded', function() {
    const chatMessages = document.getElementById('chat-messages');
    const userInputForm = document.getElementById('user-input');
    const userMessageInput = document.getElementById('user-message');

    // Function to display a message
    function displayMessage(message, isUserMessage = false) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('chat-message');
        if (isUserMessage) {
            messageDiv.classList.add('user-message');
        }
        messageDiv.textContent = message;
        chatMessages.appendChild(messageDiv);
    }

    // Event listener for user input submission
    userInputForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const userMessage = userMessageInput.value.trim();
        if (userMessage !== '') {
            displayMessage(userMessage, true);
            userMessageInput.value = ''; // Clear the input field after sending the message
        }
    });

    // Example: Display some initial messages
    displayMessage('Welcome to the group chat!');
    displayMessage('Feel free to start the conversation.');
});
