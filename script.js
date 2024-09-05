// Select the cards container and the attempts display element
const cards = document.querySelector("#cards");
const attempts = document.querySelector("#attempt");
const restart = document.querySelector("#restart");

// Data array representing the cards, each card has an emoji, name, show status, and new status
var data = [
  { emoji: "🚗", name: "car", show: false, new: false },
  { emoji: "🐶", name: "dog", show: false, new: false },
  { emoji: "🐵", name: "monkey", show: false, new: false },
  { emoji: "🍭", name: "lolly", show: false, new: false },
  { emoji: "🪔", name: "diya", show: false, new: false },
  { emoji: "🚗", name: "car", show: false, new: false },
  { emoji: "🪔", name: "diya", show: false, new: false },
  { emoji: "🍭", name: "lolly", show: false, new: false },
  { emoji: "🦀", name: "lobster", show: false, new: false },
  { emoji: "🐶", name: "dog", show: false, new: false },
  { emoji: "🦀", name: "lobster", show: false, new: false },
  { emoji: "🐵", name: "monkey", show: false, new: false },
  { emoji: "⭐", name: "star", show: false, new: false },
  { emoji: "🍔", name: "Burger", show: false, new: false },
  { emoji: "⭐", name: "star", show: false, new: false },
  { emoji: "🍔", name: "Burger", show: false, new: false },
];

// Variables to keep track of the first and second selected cards, score, and attempts
var first = -1; 
var second = -1; 
var score = 0;
var attempt = 0;

// Event listener for the restart button to reset the game
restart.addEventListener("click", () => {
    console.log("res");
    first = -1; 
    second = -1; 
    score = 0;
    document.getElementById("score").innerText = score;

    attempt = 0;
    // Reset the show status of all cards
    data.forEach((ele) => {
        ele["show"] = false;
    });
    // Display the cards and shuffle them
    displayData();
    shuffle();
});

// Function to display the cards
function displayData() {
    cards.innerHTML = ""; // Clear the cards container
    data.forEach((data, index) => {
        if (data["show"] == true) {
            // Create a card for revealed cards
            let div = document.createElement("div");
            if (data["new"] == true) {
              div.classList.add("flip");
            }
            div.classList.add("active-box");
            let emoji = document.createElement("h1");
            emoji.classList.add("emoji");
            emoji.innerHTML = data["emoji"];
            div.append(emoji);
            cards.append(div);
        } else {
            // Create a card for hidden cards
            let div = document.createElement("div");
            div.classList.add("box");
            div.addEventListener("click", () => {
                handleClick(index);
            });
            cards.append(div);
        }
    });
    attempts.innerHTML = attempt; // Update the attempts display
} 

// Function to handle card click events
function handleClick(index) {
    data.forEach((e) => {
        e.new = false; // Reset the new status of all cards
    });

    attempt++;
    if (first == -1) {
        // Set the first selected card
        data[index]["new"] = true;
        data[index]["show"] = true;
        displayData();
        first = index;
    } else if (second == -1) {
        // Set the second selected card
        data[index]["new"] = true;
        data[index]["show"] = true;
        displayData();
        second = index;
        setTimeout(checkImages, 1000); // Check if the cards match after 1 second
    }
}

// Function to check if the selected cards match
function checkImages() {
    if (data[first].name == data[second].name) {
        // If the cards match, reset the selected cards and update the score
        first = -1;
        second = -1;
        score += 10;
        document.getElementById("score").innerText = score;
    } else {
        // If the cards do not match, hide them again
        data[first].show = false;
        data[second].show = false;
        first = -1;
        second = -1;
        displayData();
    }
}

// Function to shuffle the cards
function shuffle() {
    let len = data.length;
    let ans = [];
    for (let i = 0; i < len; i++) {
        let randomIndex = Math.floor(Math.random() * data.length);
        ans.push(data[randomIndex]);
        data.splice(randomIndex, 1);
    }
    data = [...ans];
}

// Event listener for when the page loads to display and shuffle the cards
window.addEventListener("load", () => {
    displayData();
    shuffle();
});