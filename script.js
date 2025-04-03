document.getElementById('errorForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const url = document.getElementById('url').value;
    const wrong = document.getElementById('wrong').value;
    const correct = document.getElementById('correct').value;
    const email = document.getElementById('email').value;

    const data = { url, wrong, correct, email };
    const submitButton = document.querySelector('button[type="submit"]');

    try {
        submitButton.disabled = true; // Disable button during submission
        submitButton.textContent = 'Submitting...';

        const response = await fetch('https://script.google.com/macros/s/AKfycbw5vy93SbKakv0uRUX-ND_kx00SK6fz6lBqdyNA4kWdKiZQ1QXwMw5lFlQYXrbLkQ/exec', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.status === 'success') {
            alert('Correction submitted successfully! Thanks for helping fix the web.');
            document.getElementById('errorForm').reset();
        } else {
            throw new Error(result.message || 'Unknown error');
        }

    } catch (error) {
        console.error('Error:', error);
        alert('Error submitting correction: ' + error.message + '. Please try again.');
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Submit Correction';
    }
});
