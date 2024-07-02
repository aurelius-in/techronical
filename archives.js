document.addEventListener('DOMContentLoaded', function() {
    const coversContainer = document.querySelector('.covers-container');
    const viewMoreButton = document.getElementById('view-more-button');
    let currentIndex = 0;
    const issuesPerLoad = 12;

    function loadIssues() {
        fetch('assets/thumbs/issues.json')
            .then(response => response.json())
            .then(issues => {
                const fragment = document.createDocumentFragment();

                for (let i = currentIndex; i < currentIndex + issuesPerLoad && i < issues.length; i++) {
                    const issue = issues[i];
                    const issueDiv = document.createElement('div');
                    issueDiv.classList.add('cover');
                    issueDiv.innerHTML = `
                        <div class="cover-date">${formatDate(issue)}</div>
                        <a href="issue.html?issue=${issue}">
                            <img src="assets/covers/thumbs/${issue}.png" alt="Issue ${issue}">
                        </a>
                    `;
                    fragment.appendChild(issueDiv);
                }

                coversContainer.appendChild(fragment);
                currentIndex += issuesPerLoad;

                if (currentIndex >= issues.length) {
                    viewMoreButton.style.display = 'none';
                }
            })
            .catch(error => console.error('Error loading issues:', error));
    }

    function formatDate(issue) {
        const year = `20${issue.slice(0, 2)}`;
        const monthIndex = parseInt(issue.slice(2, 4), 10) - 1;
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return `${monthNames[monthIndex]} ${year}`;
    }

    viewMoreButton.addEventListener('click', loadIssues);

    loadIssues();
});
