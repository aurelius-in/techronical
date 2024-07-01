document.addEventListener('DOMContentLoaded', function() {
    const categories = ['biz', 'ai', 'security', 'gadgets', 'robotics', 'health'];
    const currentIssue = '2407'; // Change this to the current issue date
    const articlesPerPage = 12;
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
                loadArticles(category, data.slice(0, articlesPerPage));
            })
            .catch(error => console.error(`Error fetching articles for ${category}:`, error));
    }

    function loadMoreArticles() {
        categories.forEach(category => {
            if (loadedArticles[category]) {
                const container = document.getElementById(`${category}-articles`);
                const currentLength = container.childNodes.length;
                const newArticles = loadedArticles[category].slice(currentLength, currentLength + articlesPerPage);
                loadArticles(category, newArticles);
            }
        });
    }

    function loadBooks() {
        fetch('assets/articles/books2407.json')
            .then(response => response.json())
            .then(books => {
                const container = document.getElementById('books-articles');
                books.forEach(book => {
                    const bookDiv = document.createElement('div');
                    bookDiv.classList.add('article');
                    bookDiv.innerHTML = `
                        <h3>${book.title}</h3>
                        <p>By ${book.author}</p>
                        <img src="${book.image}" alt="${book.title}">
                        <p>${book.description}</p>
                    `;
                    container.appendChild(bookDiv);
                });
            })
            .catch(error => console.error('Error fetching books:', error));
    }

    categories.forEach(category => {
        fetchArticles(category);
    });

    document.getElementById('view-more-button').addEventListener('click', loadMoreArticles);

    // Fetch and load books
    loadBooks();
});
