document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("errorForm");
    const darkModeToggle = document.getElementById("darkModeToggle");

    // Dark mode toggle
    darkModeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });

    // Form submission
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const url = document.getElementById("url").value;
        const wrongInfo = document.getElementById("wrong").value;
        const correctInfo = document.getElementById("correct").value;
        const email = document.getElementById("email").value;

        if (!url || !wrongInfo || !correctInfo) {
            alert("Please fill out all required fields!");
            return;
        }

        const reportData = {
            url: url,
            wrongInfo: wrongInfo,
            correctInfo: correctInfo,
            email: email || "Not provided",
        };

        fetch("https://script.google.com/macros/s/AKfycbw5vy93SbKakv0uRUX-ND_kx00SK6fz6lBqdyNA4kWdKiZQ1QXwMw5lFlQYXrbLkQ/exec", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(reportData),
        })
        .then(response => response.json())
        .then(data => {
            alert("Report submitted successfully!");
            form.reset();
        })
        .catch(error => {
            console.error("Error:", error);
            alert("There was an issue submitting your report.");
        });
    });
});
