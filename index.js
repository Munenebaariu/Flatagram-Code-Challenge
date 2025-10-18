

// STEP 1: Run this code only after the HTML has loaded
document.addEventListener("DOMContentLoaded", () => {
  // STEP 2: Get elements from the HTML so we can change them later
  const titleElement = document.getElementById("title");
  const imageElement = document.getElementById("image");
  const likesElement = document.getElementById("likes");
  const commentsList = document.getElementById("comments-list");
  const commentForm = document.getElementById("comment-form");
  const commentInput = document.getElementById("comment-input");

  // STEP 3: Get the image data from the backend (db.json)
  fetch("http://localhost:3000/images/1")
    .then(response => response.json())
    .then(imageData => {
      // Show the image title, number of likes, and the image itself
      titleElement.textContent = imageData.title;
      likesElement.textContent = imageData.likes;
      imageElement.src = imageData.image; // <-- this loads the image
    });

  // STEP 4: Get all comments
  fetch("http://localhost:3000/comments")
    .then(response => response.json())
    .then(commentsData => {
      // Clear "Loading comments..."
      commentsList.innerHTML = "";
      commentsData.forEach(comment => {
        const li = document.createElement("li");
        li.textContent = comment.content;
        commentsList.appendChild(li);
      });
    });

  // STEP 5: Handle the form submission
  commentForm.addEventListener("submit", (event) => {
    event.preventDefault(); // prevent page reload

    const newComment = commentInput.value;

    // Create a new list item and add it to the page
    const li = document.createElement("li");
    li.textContent = newComment;
    commentsList.appendChild(li);

    // Clear the input field
    commentInput.value = "";
  });
});
