document.addEventListener('DOMContentLoaded', function() {
    const issueParam = new URLSearchParams(window.location.search).get('issue');
    const categories = ['biz', 'ai', 'security', 'gadgets', 'robotics', 'health'];

    function loadIssueArticles(category) {
        fetch(`assets/articles/${category}${issueParam}.json`)
            .then(response => response.json())
            .then(data => {
                const issueContainer = document.getElementById('issue-container');
                data.forEach(article => {
                    const articleDiv = document.createElement('div');
                    articleDiv.classList.add('article');
                    articleDiv.innerHTML = `
                        <h3 class="article-title" data-category="${category}" data-title="${article.title}">${article.title}</h3>
                        <p class="article-author">By ${article.author}</p>
                    `;
                    issueContainer.appendChild(articleDiv);
                });

                document.querySelectorAll('.article-title').forEach(title => {
                    title.addEventListener('click', function() {
                        const category = this.getAttribute('data-category');
                        const title = this.getAttribute('data-title');
                        showFullArticle(category, title);
                    });
                });
            })
            .catch(error => console.error(`Error fetching articles for ${category}:`, error));
    }

    function showFullArticle(category, title) {
        fetch(`assets/articles/${category}${issueParam}.json`)
            .then(response => response.json())
            .then(data => {
                const article = data.find(article => article.title === title);
                if (article) {
                    const articleContainer = document.getElementById('article-container');
                    articleContainer.style.display = 'block';
                    articleContainer.innerHTML = `
                        <div class="full-article">
                            <h2>${article.title}</h2>
                            <p>By ${article.author}</p>
                            <img src="${article.image}" alt="${article.title}">
                            <p>${article.body.replace(/\n/g, '<br>')}</p>
                        </div>
                    `;
                    document.getElementById('issue-container').style.display = 'none';
                }
            })
            .catch(error => console.error('Error fetching full article:', error));
    }

    categories.forEach(category => {
        loadIssueArticles(category);
    });

    document.getElementById('latest-issue').addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    document.getElementById('archives').addEventListener('click', () => {
        window.location.href = 'index.html#archives';
    });
});
