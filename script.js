document.getElementById("errorForm").addEventListener("submit", function(e) {
    e.preventDefault();
    var url = document.getElementById("url").value;
    var wrong = document.getElementById("wrong").value;
    var correct = document.getElementById("correct").value;
    var email = document.getElementById("email").value || "contact@" + url.split('/')[2]; // Fallback email

    fetch("https://script.google.com/macros/s/AKfycbwgV4jekr23wytLzdfu9e7pBDwf1byBR3Gjxi9M7KstX2HwgJ5u6JKkM5AqM-5k5K8/exec", {
        method: "POST",
        body: JSON.stringify({ url: url, wrong: wrong, correct: correct, email: email }),
        headers: { "Content-Type": "application/json" }
    })
    .then(response => response.text())
    .then(data => alert("Correction submitted! Thanks for helping fix the web."))
    .catch(error => alert("Error: " + error));
});
