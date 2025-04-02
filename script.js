document.getElementById('errorForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const url = document.getElementById('url').value;
    const wrong = document.getElementById('wrong').value;
    const correct = document.getElementById('correct').value;
    const email = document.getElementById('email').value;

    const data = { url, wrong, correct, email };

    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbw5vy93SbKakv0uRUX-ND_kx00SK6fz6lBqdyNA4kWdKiZQ1QXwMw5lFlQYXrbLkQ/exec', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
            mode: 'no-cors' // ✅ Fixes CORS error but prevents response reading
        });

        alert('Correction submitted! Thanks for helping fix the web.');
        document.getElementById('errorForm').reset();

    } catch (error) {
        console.error('Error:', error);
        alert('Error submitting correction. Please try again.');
    }
});
