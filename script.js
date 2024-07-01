document.addEventListener('DOMContentLoaded', function() {
    const categories = ['biz', 'ai', 'security', 'gadgets', 'robotics', 'health'];
    const currentIssue = '2407'; // Change this to dynamically get the latest issue
    let loadedArticles = {};

    function loadArticles(category, articles) {
        const container = document.getElementById(`${category}-articles`);
        articles.forEach(article => {
            const articleDiv = document.createElement('div');
            articleDiv.classList.add('article');
            articleDiv.innerHTML = `
                <h3>${article.title}</h3>
                <p>By ${article.author}</p>
                <img src="${article.image}" alt="${article.title}">
                <p>${article.body}</p>
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
                covers.forEach(cover => {
                    const coverDiv = document.createElement('div');
                    coverDiv.classList.add('cover');
                    coverDiv.innerHTML = `<img src="assets/covers/thumbs/${cover}" alt="${cover}">`;
                    container.appendChild(coverDiv);
                });
            })
            .catch(error => console.error('Error fetching covers:', error));
    }

    categories.forEach(category => {
        fetchArticles(category);
    });

    loadCovers();

    document.getElementById('latest-issue').addEventListener('click', () => {
        document.getElementById('categories-container').scrollIntoView({ behavior: 'smooth' });
    });

    document.getElementById('archives').addEventListener('click', () => {
        document.getElementById('covers-container').scrollIntoView({ behavior: 'smooth' });
    });
});
