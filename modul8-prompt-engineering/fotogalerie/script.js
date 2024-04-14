let images = [
  "./img/1.jpg",
  // "./img/2.jpg",
  // "./img/3.jpg",
  // "./img/4.jpg",
  // "./img/5.jpg",
  // "./img/6.jpg",
  // "./img/7.jpg",
  // "./img/8.jpg",
  // "./img/9.jpg",
  // "./img/10.jpg",
  // "./img/11.jpg",
  // "./img/12.jpg",
  // "./img/13.jpg",
  // "./img/14.jpg",
  // "./img/15.jpg",
];

// Function to initialize and load images
function init() {
  // Get the container element
  let container = document.getElementById("image-container");

  // Loop through each image path
  images.forEach(function (imagePath) {
    // Create a div element
    let div = document.createElement("div");

    // Create an img element
    let img = document.createElement("img");

    img.src = imagePath; // Set the src attribute of the img element

    img.classList.add("gallery-image"); // Add a class to the img element

    div.appendChild(img); // Append the img element to the div

    // Append the div to the container
    container.appendChild(div);
  });

  setProgress(100);
}

function setProgress(percentage) {
  const progressBar = document.getElementById("progress-bar");
  const circumference = 2 * Math.PI * 40;
  const offset = circumference - (percentage / 100) * circumference;
  progressBar.setAttribute("stroke-dashoffset", offset);
}

// Example: Change the percentage after 2 seconds
setTimeout(() => {
  setProgress(50); // Change the percentage to 50%
}, 2000);
