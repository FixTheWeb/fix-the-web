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
  loadingMessage.className = 'loading';
  document.getElementById('errorForm').appendChild(loadingMessage);

  try {
    console.log('Sending request via proxy...');
    const response = await fetch('https://cors-anywhere.herokuapp.com/https://script.google.com/macros/s/AKfycbzaNyuysU2ZkQw1pJf9fND8kuzjaMcBjx5hNyY5R2YwUQJPZnqmmuIlQCyI-2NP6qVY/exec', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    console.log('Response received:', response);
    loadingMessage.remove();

    const responseData = await response.json();
    console.log('Response data:', responseData);

    if (response.ok && responseData.status === 'success') {
      displayFeedback('Correction submitted! Thanks for helping fix the web.', 'success');
      document.getElementById('errorForm').reset();
    } else {
      const errMsg = responseData?.message || 'Unexpected server response.';
      displayFeedback(`Error submitting correction: ${errMsg}`, 'error');
      console.error('Backend Error:', responseData);
    }
  } catch (error) {
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
    document.getElementById('errorForm').appendChild(feedbackDiv);
  }

  feedbackDiv.textContent = message;
  feedbackDiv.className = type;
}

document.getElementById('resetButton').addEventListener('click', function() {
  document.getElementById('errorForm').reset();
  displayFeedback('', '');
});
