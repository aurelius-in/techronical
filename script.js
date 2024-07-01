document.addEventListener('DOMContentLoaded', function() {
    const categories = ['biz', 'ai', 'security', 'gadgets', 'robotics', 'health'];
    const currentIssue = '2407'; // Change this to the current issue date

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
                loadArticles(category, data);
            })
            .catch(error => console.error(`Error fetching articles for ${category}:`, error));
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

    function loadThumbnails() {
        fetch('assets/covers/thumbs/issues.json')
            .then(response => response.json())
            .then(issues => {
                const container = document.getElementById('thumbnails-container');
                issues.forEach(issue => {
                    const thumbnailDiv = document.createElement('div');
                    thumbnailDiv.classList.add('thumbnail');
                    thumbnailDiv.innerHTML = `<img src="assets/covers/thumbs/${issue}.png" alt="Issue ${issue}">`;
                    container.appendChild(thumbnailDiv);
                });
            })
            .catch(error => console.error('Error fetching thumbnails:', error));
    }

    categories.forEach(category => {
        fetchArticles(category);
    });

    loadBooks();
    loadThumbnails();
});
