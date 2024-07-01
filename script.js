document.addEventListener('DOMContentLoaded', function() {
    const thumbnailsContainer = document.getElementById('thumbnails-container');
    const viewMoreButton = document.getElementById('view-more-button');
    let issues = [];
    let loadedIssues = 0;
    const issuesPerPage = 12;

    function loadIssues() {
        const issuesToLoad = issues.slice(loadedIssues, loadedIssues + issuesPerPage);
        issuesToLoad.forEach(issue => {
            const thumbnailDiv = document.createElement('div');
            thumbnailDiv.classList.add('thumbnail');
            thumbnailDiv.innerHTML = `<img src="assets/covers/thumbs/${issue}" alt="Issue ${issue}">`;
            thumbnailsContainer.appendChild(thumbnailDiv);
        });
        loadedIssues += issuesPerPage;
        if (loadedIssues >= issues.length) {
            viewMoreButton.style.display = 'none';
        }
    }

    function fetchIssues() {
        fetch('assets/covers/thumbs/issues.json')
            .then(response => response.json())
            .then(data => {
                issues = data;
                loadIssues();
            })
            .catch(error => console.error('Error fetching issues:', error));
    }

    viewMoreButton.addEventListener('click', loadIssues);

    // Fetch issues and load the initial set
    fetchIssues();
});
