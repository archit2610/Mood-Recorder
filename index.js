document.addEventListener("DOMContentLoaded", () => {
    const moodButtons = document.querySelectorAll(".mood_option");
    const saveButton = document.getElementById("save");
    const goBackButton = document.getElementById("back"); 
    let selectedMood = null;


    const savedMood = localStorage.getItem("selectedMood");
    if (savedMood) {
        highlightMood(savedMood);
        selectedMood = savedMood;
    }

    moodButtons.forEach(button => {
        button.addEventListener("click", () => {
            selectedMood = button.querySelector(".mood_emoji").textContent;
            highlightMood(selectedMood);
        });
    });

    if (saveButton) {
        saveButton.addEventListener("click", () => {
            if (selectedMood) {
                const today = new Date().toLocaleDateString("en-US", { weekday: 'long' });
                let weekMoods = JSON.parse(localStorage.getItem("weekMoods")) || {};
                weekMoods[today] = selectedMood;
                localStorage.setItem("weekMoods", JSON.stringify(weekMoods));
                localStorage.setItem("selectedMood", selectedMood);
                window.location.href = "mood-summary.html";
            } else {
                alert("Please select a mood before saving.");
            }
        });
    }

    function highlightMood(mood) {
        moodButtons.forEach(button => {
            if (button.querySelector(".mood_emoji").textContent === mood) {
                button.classList.add("selected");
            } else {
                button.classList.remove("selected");
            }
        });
    }

    function displayWeekMoods() {
        const container = document.getElementById("weekMoods");
        if (!container) return; // Ensure this runs only on mood-summary.html

        const weekData = JSON.parse(localStorage.getItem("weekMoods")) || {};
        container.innerHTML = "";

        Object.entries(weekData).forEach(([date, mood]) => {
            const dayDiv = document.createElement("div");
            dayDiv.className = "day";
            dayDiv.innerHTML = `<strong>${date}</strong><br>${mood}`;
            container.appendChild(dayDiv);
        });
    }

    function navigateBack() {
        console.log("Go Back button clicked!");
        window.location.href = "index.html";
    }

    displayWeekMoods();

    if (goBackButton) {
        console.log("Go Back button found! Adding event listener.");
        goBackButton.addEventListener("click", navigateBack);
    } else {
        console.warn("Go Back button NOT found in the DOM!");
    }
});
