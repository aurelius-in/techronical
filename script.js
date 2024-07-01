document.addEventListener('DOMContentLoaded', function() {
    const thumbnailsContainer = document.getElementById('thumbnails-container');
    const viewMoreButton = document.getElementById('view-more-button');
    const issues = [
        '24-06', '24-05', '24-04', '24-03', '24-02', '24-01',
        '23-12', '23-11', '23-10', '23-09', '23-08', '23-07',
        '23-06', '23-05', '23-04', '23-03', '23-02', '23-01',
        '22-12', '22-11', '22-10', '22-09', '22-08', '22-07'
    ]; // Add more issues as needed
    let loadedIssues = 0;
    const issuesPerPage = 12;

    function loadIssues() {
        const issuesToLoad = issues.slice(loadedIssues, loadedIssues + issuesPerPage);
        issuesToLoad.forEach(issue => {
            const thumbnailDiv = document.createElement('div');
            thumbnailDiv.classList.add('thumbnail');
            thumbnailDiv.innerHTML = `<img src="assets/covers/thumbs/${issue}.png" alt="Issue ${issue}">`;
            thumbnailsContainer.appendChild(thumbnailDiv);
        });
        loadedIssues += issuesPerPage;
        if (loadedIssues >= issues.length) {
            viewMoreButton.style.display = 'none';
        }
    }

    viewMoreButton.addEventListener('click', loadIssues);

    // Load the initial set of issues
    loadIssues();
});
