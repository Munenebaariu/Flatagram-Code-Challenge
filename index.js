

document.addEventListener("DOMContentLoaded", () => {
  fetchImage();
  fetchComments();
});

function fetchImage() {
  fetch("http://localhost:3000/images/1")
    .then(res => res.json())
    .then(image => renderImage(image))
    .catch(err => console.error("Error fetching image:", err));
}


function renderImage(image) {
  document.getElementById("title").textContent = image.title;
  document.getElementById("image").src = image.image;
  document.getElementById("likes").textContent = image.likes;

  const imageSection = document.getElementById("image-section");
  imageSection.addEventListener("click", () => {
    image.likes++;
    document.getElementById("likes").textContent = image.likes;
    updateLikes(image.id, image.likes);
  });
}


function fetchComments() {
  fetch("http://localhost:3000/comments?imageId=1")
    .then(res => res.json())
    .then(comments => renderComments(comments))
    .catch(err => console.error("Error fetching comments:", err));
}


function renderComments(comments) {
  const commentsList = document.getElementById("comments-list");
  commentsList.innerHTML = "";

  comments.forEach(comment => {
    const li = document.createElement("li");
    li.textContent = comment.content;
    commentsList.appendChild(li);
  });
}


const form = document.getElementById("comment-form");
form.addEventListener("submit", e => {
  e.preventDefault();
  const input = document.getElementById("comment-input");
  const newComment = input.value.trim();
  if (newComment) {
    postComment(newComment);
    input.value = "";
  }
});

function postComment(content) {
  fetch("http://localhost:3000/comments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      imageId: 1,
      content
    })
  })
    .then(res => res.json())
    .then(comment => {
      const li = document.createElement("li");
      li.textContent = comment.content;
      document.getElementById("comments-list").appendChild(li);
    });
}

function updateLikes(id, likes) {
  fetch(`http://localhost:3000/images/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ likes })
  });
}
