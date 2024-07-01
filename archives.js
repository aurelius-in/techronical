document.addEventListener('DOMContentLoaded', function() {
    function loadCovers() {
        fetch('assets/covers/thumbs/issues.json')
            .then(response => response.json())
            .then(covers => {
                const container = document.getElementById('covers-container');
                container.innerHTML = '';  // Clear any existing covers
                covers.forEach(cover => {
                    const issue = cover.replace('-', '').split('.')[0]; // Remove '-' and extension
                    const coverDiv = document.createElement('div');
                    coverDiv.classList.add('cover');
                    coverDiv.innerHTML = `<img src="assets/covers/thumbs/${cover}" alt="${cover}">`;
                    coverDiv.addEventListener('click', () => {
                        window.location.href = `issue.html?issue=${issue}`;
                    });
                    container.appendChild(coverDiv);
                });
            })
            .catch(error => console.error('Error fetching covers:', error));
    }

    loadCovers();
});
