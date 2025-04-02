document.getElementById('errorForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const url = document.getElementById('url').value;
    const wrong = document.getElementById('wrong').value;
    const correct = document.getElementById('correct').value;
    const email = document.getElementById('email').value;

    const data = { url, wrong, correct, email };

    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbwgV4jekr23wytLzdfu9e7pBDwf1byBR3Gjxi9M7KstX2HwgJ5u6JKkM5AqM-5k5K8/exec', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            mode: 'cors'
        });

        if (response.ok) {
            alert('Correction submitted! Thanks for helping fix the web.');
            document.getElementById('errorForm').reset();
        } else {
            alert('Error submitting correction. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error submitting correction. Please try again.');
    }
});
