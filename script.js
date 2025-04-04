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
        const response = await fetch('https://script.google.com/macros/s/AKfycbwzUH0eOlGSjIcC0ARAei5gSBb_VcoX8uvmfvxz9peTbNL_ZJktMrtP-BuwSD_8hnU/exec', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        // Remove loading indicator
        loadingMessage.remove();

        const responseData = await response.json();

        if (response.ok && responseData.status === 'success') {
            displayFeedback('Correction submitted! Thanks for helping fix the web.', 'success');
            document.getElementById('errorForm').reset();
        } else {
            const errMsg = responseData?.message || 'Unexpected server response.';
            displayFeedback(`Error submitting correction. ${errMsg}`, 'error');
            console.error('Backend Error:', responseData);
        }

    } catch (error) {
        loadingMessage.remove();
        console.error('Fetch Error:', error);
        displayFeedback('An unexpected error occurred. Please try again.', 'error');
    }
});

function displayFeedback(message, type) {
    const feedbackDiv = document.getElementById('feedback');
    if (feedbackDiv) {
        feedbackDiv.textContent = message;
        feedbackDiv.className = type; // 'success' or 'error' class for styling
    } else {
        console.error("Feedback div not found");
    }
}

// Reset button functionality
document.getElementById('resetButton').addEventListener('click', function () {
    document.getElementById('errorForm').reset();
    displayFeedback('', '');
});
