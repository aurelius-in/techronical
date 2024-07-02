document.addEventListener('DOMContentLoaded', function() {
    const coversContainer = document.getElementById('covers-container');
    const viewMoreButton = document.getElementById('view-more-button');
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let loadedIssues = 0;
    const issuesPerLoad = 12;

    function formatDate(issue) {
        const monthIndex = parseInt(issue.slice(2, 4), 10) - 1;
        const year = `20${issue.slice(0, 2)}`;
        return `${monthNames[monthIndex]} ${year}`;
    }

    function loadCovers() {
        fetch('assets/articles/issues.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(issues => {
                const issuesToLoad = issues.slice(loadedIssues, loadedIssues + issuesPerLoad);
                issuesToLoad.forEach(issue => {
                    const coverDiv = document.createElement('div');
                    coverDiv.classList.add('cover');
                    coverDiv.innerHTML = `
                        <div class="cover-date">${formatDate(issue)}</div>
                        <a href="issue.html?issue=${issue.replace('-', '')}">
                            <img src="assets/covers/thumbs/${issue}.png" alt="${issue}">
                        </a>
                    `;
                    coversContainer.appendChild(coverDiv);
                });

                loadedIssues += issuesPerLoad;

                if (loadedIssues >= issues.length) {
                    viewMoreButton.style.display = 'none';
                }
            })
            .catch(error => console.error('Error fetching issues:', error));
    }

    viewMoreButton.addEventListener('click', loadCovers);

    // Initial load
    loadCovers();
});
