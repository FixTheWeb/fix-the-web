document.getElementById('errorForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const url = document.getElementById('url').value;
    const wrong = document.getElementById('wrong').value;
    const correct = document.getElementById('correct').value;
    const email = document.getElementById('email').value;

    const data = { url, wrong, correct, email };

    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbxrTIlNjN7GiP3Q5_PdPFCgU0GQNW_uovQwVDQsNEwZHDsdizjguqz4Eb8SpE_mO3o/exec', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        if (result.status === 'success') {
            alert('Correction submitted! Thanks for helping fix the web.');
            document.getElementById('errorForm').reset();
        } else {
            throw new Error(result.message || 'Unknown error');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error submitting correction. Please try again.');
    }
});
