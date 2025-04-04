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
    const response = await fetch('https://script.google.com/macros/s/AKfycbzaNyuysU2ZkQw1pJf9fND8kuzjaMcBjx5hNyY5R2YwUQJPZnqmmuIlQCyI-2NP6qVY/exec', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    // Remove loading indicator
    loadingMessage.remove();

    const responseData = await response.json();

    if (response.ok && responseData.status === 'success') {
      displayFeedback('Correction submitted! Thanks for helping fix the web.', 'success');
      document.getElementById('errorForm').reset(); // Reset the form after successful submission
    } else {
      const errMsg = responseData?.message || 'Unexpected server response.';
      displayFeedback(`Error submitting correction: ${errMsg}`, 'error');
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
  let feedbackDiv = document.getElementById('feedback');
  if (!feedbackDiv) {
    feedbackDiv = document.createElement('div');
    feedbackDiv.id = 'feedback';
    document.body.appendChild(feedbackDiv);
  }

  feedbackDiv.textContent = message;
  feedbackDiv.className = type; // 'success' or 'error' class for styling
}

document.getElementById('resetButton').addEventListener('click', function() {
  document.getElementById('errorForm').reset();
  displayFeedback('', '');
});
