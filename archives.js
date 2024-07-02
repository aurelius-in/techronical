document.addEventListener('DOMContentLoaded', function() {
     const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    function getMonthYear(issue) {
        const monthIndex = parseInt(issue.slice(2, 4), 10) - 1;
        const year = `20${issue.slice(0, 2)}`;
        return `${monthNames[monthIndex]} ${year}`;
    }

    function loadCovers() {
        fetch('assets/covers/thumbs/issues.json')
            .then(response => response.json())
            .then(covers => {
                const container = document.getElementById('covers-container');
                container.innerHTML = '';  // Clear any existing covers
                covers.forEach(cover => {
                    const issue = cover.replace('-', '').split('.')[0]; // Remove '-' and extension
                    const monthYear = getMonthYear(issue);
                    const coverDiv = document.createElement('div');
                    coverDiv.classList.add('cover');
                    coverDiv.innerHTML = `
                        <div class="cover-date">${monthYear}</div>
                        <img src="assets/covers/thumbs/${cover}" alt="${cover}">
                    `;
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
