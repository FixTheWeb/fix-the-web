document.getElementById('errorForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const url = document.getElementById('url').value;
    const wrong = document.getElementById('wrong').value;
    const correct = document.getElementById('correct').value;
    const email = document.getElementById('email').value;

    const data = { url, wrong, correct, email };

    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbzt4bV03GTm5h0-zrkajavnovue_FiX-the-web/1', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            mode: 'no-cors' // Use no-cors to bypass CORS issue
        });

        // Since mode is 'no-cors', we can't read the response status
        alert('Correction submitted! Thanks for helping fix the web.');
        document.getElementById('errorForm').reset();
    } catch (error) {
        console.error('Error:', error);
        alert('Error submitting correction. Please try again.');
    }
});
