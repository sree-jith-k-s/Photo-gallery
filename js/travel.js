document.addEventListener("DOMContentLoaded", function() {
    const folderPath = "images/travel/"; // Updated folder path
    const imagePrefix = "image_"; // Image filename prefix
    const imageExtension = "jpg"; // Image extension (e.g., jpg, png)
    let imageIndex = 1;
    let imageArray = [];

    // Function to check if an image exists
    function imageExists(url, callback) {
        const img = new Image();
        img.onload = () => callback(true);
        img.onerror = () => callback(false);
        img.src = url;
    }

    // Try loading images until one fails
    function loadImages() {
        const imageUrl = `${folderPath}${imagePrefix}${imageIndex}.${imageExtension}`;
        imageExists(imageUrl, function(exists) {
            if (exists) {
                imageArray.push(imageUrl);
                imageIndex++;
                loadImages(); // Recursively load next image
            } else if (imageArray.length > 0) {
                // Start displaying images in grid
                displayImages();
            }
        });
    }

    // Function to display images in a grid
    function displayImages() {
        const gridSection = document.querySelector('.grid-container');

        imageArray.forEach((imageSrc) => {
            const gridItem = document.createElement('div');
            gridItem.classList.add('grid-item'); // Add grid-item class

            const imgElement = document.createElement('img');
            imgElement.src = imageSrc;
            imgElement.alt = "Album Image";

            gridItem.appendChild(imgElement); // Append the image to the grid item
            gridSection.appendChild(gridItem); // Append the grid item to the grid container
        });
    }

    // Start loading images
    loadImages();
});
