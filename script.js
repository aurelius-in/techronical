document.addEventListener('DOMContentLoaded', function() {
    const thumbnailsContainer = document.getElementById('thumbnails-container');
    const issues = ['24-06', '24-05']; // Add more issues as needed

    issues.forEach(issue => {
        const thumbnailDiv = document.createElement('div');
        thumbnailDiv.classList.add('thumbnail');
        thumbnailDiv.innerHTML = `<img src="assets/covers/thumbs/${issue}.png" alt="Issue ${issue}">`;
        thumbnailsContainer.appendChild(thumbnailDiv);
    });
});
