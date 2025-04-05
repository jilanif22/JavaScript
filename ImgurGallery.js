const CLIENT_ID = "CLIENT-ID 39abd6eeb72259b"; 

async function fetchGallery() {
    try {
        const response = await fetch("https://api.imgur.com/3/gallery/hot/viral/day/1", {
            headers: { Authorization: `Client-ID ${CLIENT_ID}` }
        });
        const data = await response.json();
        displayImages(data.data);
    } catch (error) {
        console.error("Error fetching images:", error);
    }
}

function displayImages(images) {
    const gallery = document.getElementById("gallery");
    gallery.innerHTML = ""; // Clear previous results

    images.forEach(img => {
        const card = document.createElement("div");
        card.className = "image-card";
        card.innerHTML = `
            <img src="${img.link}" alt="${img.title}">
            <h3>${img.title}</h3>
            <p>👍 ${img.ups} | 💬 ${img.comment_count} | 👀 ${img.views}</p>
        `;
        card.onclick = () => fetchComments(img.id);
        gallery.appendChild(card);
    });
}

async function fetchComments(imageId) {
    try {
        const response = await fetch(`https://api.imgur.com/3/gallery/${imageId}/comments/top`, {
            headers: { Authorization: `Client-ID ${CLIENT_ID}` }
        });
        const data = await response.json();
        displayComments(data.data);
    } catch (error) {
        console.error("Error fetching comments:", error);
    }
}

function displayComments(comments) {
    const commentSection = document.getElementById("comments");
    commentSection.innerHTML = "<h2>Comments</h2>";

    if (comments.length === 0) {
        commentSection.innerHTML += "<p>No comments found.</p>";
    } else {
        comments.forEach(comment => {
            const p = document.createElement("p");
            p.textContent = comment.comment;
            commentSection.appendChild(p);
        });
    }
    commentSection.style.display = "block"; // Show comments section
}

// Fetch images on page load
fetchGallery();

