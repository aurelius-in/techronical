document.addEventListener('DOMContentLoaded', function() {
    const categories = ['biz', 'ai', 'security', 'gadgets', 'robotics', 'health'];
    const currentIssue = '2407'; // This should dynamically get the latest issue
    let loadedArticles = {};

    function loadArticles(category, articles) {
        const container = document.getElementById(`${category}-articles`);
        articles.forEach(article => {
            const date = formatDate(currentIssue);
            const articleDiv = document.createElement('div');
            articleDiv.classList.add('article');
            articleDiv.innerHTML = `
                <h3 class="article-title" data-category="${category}" data-title="${article.title}">${article.title}</h3>
                <p class="article-author">By ${article.author}, ${date}</p>
                <p>${article.body.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>')}</p>
            `;
            container.appendChild(articleDiv);
        });
    }

    function fetchArticles(category) {
        fetch(`assets/articles/${category}${currentIssue}.json`)
            .then(response => response.json())
            .then(data => {
                loadedArticles[category] = data;
                const categoryContainer = document.createElement('div');
                categoryContainer.classList.add('category');
                categoryContainer.innerHTML = `
                    <h2>${category.charAt(0).toUpperCase() + category.slice(1)}</h2>
                    <div class="articles-container" id="${category}-articles"></div>
                `;
                document.getElementById('categories-container').appendChild(categoryContainer);
                loadArticles(category, data);
            })
            .catch(error => console.error(`Error fetching articles for ${category}:`, error));
    }

    function loadCovers() {
        fetch('assets/covers/thumbs/issues.json')
            .then(response => response.json())
            .then(covers => {
                const container = document.getElementById('covers-container');
                container.innerHTML = '';  // Clear any existing covers
                covers.slice(0, 12).forEach(cover => {
                    const issue = cover.replace('-', '').split('.')[0]; // Remove '-' and extension
                    const coverDiv = document.createElement('div');
                    coverDiv.classList.add('cover');
                    coverDiv.innerHTML = `<img src="assets/covers/thumbs/${cover}" alt="${cover}">`;
                    coverDiv.addEventListener('click', () => {
                        window.location.href = `issue.html?issue=${issue}`;
                    });
                    container.appendChild(coverDiv);
                });
                if (covers.length > 12) {
                    const viewMoreButton = document.createElement('button');
                    viewMoreButton.classList.add('view-more-button');
                    viewMoreButton.innerText = 'View More';
                    viewMoreButton.addEventListener('click', () => {
                        container.innerHTML = '';
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
                        viewMoreButton.remove();
                    });
                    container.appendChild(viewMoreButton);
                }
            })
            .catch(error => console.error('Error fetching covers:', error));
    }

    function loadLatestIssue() {
        categories.forEach(category => {
            fetchArticles(category);
        });
    }

    function formatDate(issueParam) {
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const monthIndex = parseInt(issueParam.slice(2, 4), 10) - 1;
        const year = `20${issueParam.slice(0, 2)}`;
        return `${monthNames[monthIndex]} ${year}`;
    }

    loadLatestIssue();

    document.getElementById('archives').addEventListener('click', () => {
        document.getElementById('categories-container').style.display = '
