// Elements
const searchInput = document.getElementById("search");
const emojiListContainer = document.getElementById("emoji-list");
const categoryButtons = document.querySelectorAll(".item");

// Display emojis
function displayEmoji(emojis) {
    emojiListContainer.innerHTML = "";

    emojis.forEach(item => {
        const div = document.createElement("div");
        div.className = "emoji-cell";

        const span = document.createElement("span");
        span.className = "emoji";
        span.textContent = item.emoji;

        // Click to copy emoji
        span.addEventListener("click", () => {
            navigator.clipboard.writeText(item.emoji);
            alert(`Copied ${item.emoji}`);
        });

        div.appendChild(span);
        emojiListContainer.appendChild(div);
    });
}

// Filter by search OR category
function filterEmoji(value) {
    let filteredData;

    if (value === "all") {
        filteredData = emojiList;
    } else {
        filteredData = emojiList.filter(e =>
            e.description.toLowerCase().includes(value.toLowerCase()) ||
            e.aliases.some(a => a.toLowerCase().includes(value.toLowerCase())) ||
            e.tags.some(t => t.toLowerCase().includes(value.toLowerCase()))
        );
    }

    displayEmoji(filteredData);
}

// Search event
searchInput.addEventListener("input", (e) => {
    filterEmoji(e.target.value);
});

// Category buttons
categoryButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const category = btn.getAttribute("data-category");
        filterEmoji(category);
    });
});

// Initial load
displayEmoji(emojiList);
