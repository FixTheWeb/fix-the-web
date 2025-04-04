document.getElementById('errorForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const url = document.getElementById('url').value.trim();
    const wrong = document.getElementById('wrong').value.trim();
    const correct = document.getElementById('correct').value.trim();
    const email = document.getElementById('email').value.trim();

    if (!url || !wrong || !correct) {
        displayFeedback('Please fill in all required fields.', 'error');
        return;
    }

    const data = { url, wrong, correct, email };

    const loadingMessage = document.createElement('div');
    loadingMessage.textContent = 'Submitting...';
    loadingMessage.style.textAlign = 'center';
    loadingMessage.style.marginTop = '20px';
    document.getElementById('errorForm').appendChild(loadingMessage);

    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbxxrN09QLNLP1VlUGRYhTLnEi1xPww964g4rw2uny369siH0daZFcA-DJlqcfHwqZ0/exec', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

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
        feedbackDiv.className = type; // 'success' or 'error'
    } else {
        console.error("Feedback div not found");
    }
}

document.getElementById('resetButton').addEventListener('click', function () {
    document.getElementById('errorForm').reset();
    displayFeedback('', '');
});
