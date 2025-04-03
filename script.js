document.getElementById('errorForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const url = document.getElementById('url').value;
    const wrong = document.getElementById('wrong').value;
    const correct = document.getElementById('correct').value;
    const email = document.getElementById('email').value;

    // Client-side Validation (Example)
    if (!url || !wrong || !correct) {
        alert('Please fill in all required fields.');
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
        const response = await fetch('https://script.google.com/macros/s/AKfycbyhOAtd4rFfi16RKWIJyBqyheLL8Pqwsw-Cik5ORF81GXPQR-EQk7JwzlCt67UBag/exec', { // Replace with your URL
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
            // Remove 'mode: 'no-cors' if possible
        });

        // Remove loading indicator
        loadingMessage.remove();

        // Check response if you removed 'no-cors'
        if (response.ok) {
            // Success message with HTML
            const successMessage = document.createElement('div');
            successMessage.textContent = 'Correction submitted! Thanks for helping fix the web.';
            successMessage.style.backgroundColor = '#00ffcc';
            successMessage.style.padding = '10px';
            successMessage.style.marginTop = '10px';
            document.getElementById('errorForm').appendChild(successMessage);

            document.getElementById('errorForm').reset();
        } else {
            // Error message with HTML
            const errorMessage = document.createElement('div');
            errorMessage.textContent = 'Error submitting correction. Please try again.';
            errorMessage.style.backgroundColor = '#ffcccc';
            errorMessage.style.padding = '10px';
            errorMessage.style.marginTop = '10px';
            document.getElementById('errorForm').appendChild(errorMessage);
        }

    } catch (error) {
        console.error('Error:', error);
        // Error message with HTML
        const errorMessage = document.createElement('div');
        errorMessage.textContent = 'Error submitting correction. Please try again.';
        errorMessage.style.backgroundColor = '#ffcccc';
        errorMessage.style.padding = '10px';
        errorMessage.style.marginTop = '10px';
        document.getElementById('errorForm').appendChild(errorMessage);

        // Remove loading indicator if it exists
        loadingMessage.remove();
    }
});

// Add a reset button functionality
document.getElementById('resetButton').addEventListener('click', function() {
    document.getElementById('errorForm').reset();
});
