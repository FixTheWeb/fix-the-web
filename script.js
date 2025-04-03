document.getElementById('errorForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const url = document.getElementById('url').value;
    const wrong = document.getElementById('wrong').value;
    const correct = document.getElementById('correct').value;
    const email = document.getElementById('email').value;

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
        const response = await fetch('https://script.google.com/macros/s/AKfycbyhOAtd4rFfi16RKWIJyBqyheLL8Pqwsw-Cik5ORF81GXPQR-EQk7JwzlCt67UBag/exec', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        // Remove loading indicator
        loadingMessage.remove();

        if (response.ok) {
            const responseData = await response.json(); // Parse JSON response

            if (responseData && responseData.status === 'success') {
                displayFeedback('Correction submitted! Thanks for helping fix the web.', 'success');
                document.getElementById('errorForm').reset();
            } else if (responseData && responseData.status === 'error') {
                displayFeedback('Error submitting correction. (Google Apps Script error: ' + responseData.message + ')', 'error');
                console.error('Google Apps Script Error:', responseData.message);
            } else {
                 displayFeedback('Error with google app script, unhandled response', 'error');
                 console.error('google app script unhandled response', responseData);
            }

        } else {
            displayFeedback('Error submitting correction. (Network error)', 'error');
            console.error('Network Error:', response.status, response.statusText);
        }

    } catch (error) {
        console.error('Fetch Error:', error);
        displayFeedback('An unexpected error occurred. Please try again.', 'error');
        loadingMessage.remove(); // Remove loading indicator on error
    }
});

function displayFeedback(message, type) {
    const feedbackDiv = document.getElementById('feedback');
    if(feedbackDiv){
        feedbackDiv.textContent = message;
        feedbackDiv.className = type; // 'success' or 'error' class for styling
    } else {
        console.error("Feedback div not found");
    }
}

// Reset button functionality
document.getElementById('resetButton').addEventListener('click', function() {
    document.getElementById('errorForm').reset();
});
