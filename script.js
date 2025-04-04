document.getElementById('errorForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const url = document.getElementById('url').value.trim();
    const wrong = document.getElementById('wrong').value.trim();
    const correct = document.getElementById('correct').value.trim();
    const email = document.getElementById('email').value.trim();

    // Client-side Validation
    if (!url || !wrong || !correct) {
        displayFeedback('Please fill in all required fields.', 'error');
        return;
    }

    const data = { url, wrong, correct, email };

    // Show loading indicator
    const loadingMessage = document.createElement('div');
    loadingMessage.textContent = 'Submitting...';
    loadingMessage.style.textAlign = 'center';
    loadingMessage.style.marginTop = '20px';
    document.getElementById('errorForm').appendChild(loadingMessage);

    try {
        // Fetch request to the Google Apps Script URL
        const response = await fetch('https://script.google.com/macros/s/AKfycbxEEpoUQnngxAaVNAby8jXcB9JmjQYc7SJMNxBbjLL1cWSUXbP9haU2pT6JFO0p-Yw/exec', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json', // Ensures that JSON response is processed
            },
            body: JSON.stringify(data),
            mode: 'cors', // Ensures CORS is handled
        });

        // Remove loading indicator
        loadingMessage.remove();

        const responseData = await response.json();

        if (response.ok && responseData.status === 'success') {
            displayFeedback('Correction submitted! Thanks for helping fix the web.', 'success');
            document.getElementById('errorForm').reset();  // Reset the form after successful submission
        } else {
            const errMsg = responseData?.message || 'Unexpected server response.';
            displayFeedback(`Error submitting correction. ${errMsg}`, 'error');
            console.error('Backend Error:', responseData);
        }

    } catch (error) {
        // Remove loading indicator on error
        loadingMessage.remove();
        console.error('Fetch Error:', error);
        displayFeedback('An unexpected error occurred. Please try again.', 'error');
    }
});

function displayFeedback(message, type) {
    // Create or find the feedback div to show success or error message
    let feedbackDiv = document.getElementById('feedback');
    if (!feedbackDiv) {
        feedbackDiv = document.createElement('div');
        feedbackDiv.id = 'feedback';
        document.body.appendChild(feedbackDiv);  // Append it to the body if it doesn't exist
    }
    
    feedbackDiv.textContent = message;
    feedbackDiv.className = type; // 'success' or 'error' class for styling
}

// Reset button functionality
document.getElementById('resetButton').addEventListener('click', function () {
    document.getElementById('errorForm').reset(); // Reset form fields
    displayFeedback('', '');  // Clear any feedback messages
});
