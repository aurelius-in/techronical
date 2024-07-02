document.addEventListener('DOMContentLoaded', function() {
    const issueParam = new URLSearchParams(window.location.search).get('issue');
    const categories = ['biz', 'ai', 'security', 'gadgets', 'robotics', 'health'];
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    function formatDate(issueParam) {
        const monthIndex = parseInt(issueParam.slice(2, 4), 10) - 1;
        const year = `20${issueParam.slice(0, 2)}`;
        return `${monthNames[monthIndex]} ${year}`;
    }

    function truncateText(text, wordLimit) {
        const words = text.split(' ');
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(' ') + '...';
        }
        return text;
    }

    function loadIssueArticles(category) {
        fetch(`assets/articles/${category}${issueParam}.json`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                const issueContainer = document.getElementById('issue-container');
                data.forEach(article => {
                    const date = formatDate(issueParam);
                    const articleDiv = document.createElement('div');
                    articleDiv.classList.add('article');
                    const truncatedBody = truncateText(article.body, 120);
                    articleDiv.innerHTML = `
                        <img src="assets/logos/${category}.png" alt="${category}" style="width: 100%; max-width: 400px; margin-bottom: 10px;">
                        <h3 class="article-title" data-category="${category}" data-title="${article.title}">${article.title}</h3>
                        <p class="article-author">By ${article.author}, ${date}</p>
                        <p class="article-body">${truncatedBody}</p>
                        <span class="read-more-button" data-fulltext="${article.body}">Read More</span>
                    `;
                    issueContainer.appendChild(articleDiv);
                });

                document.querySelectorAll('.read-more-button').forEach(button => {
                    button.addEventListener('click', function() {
                        const fullText = this.getAttribute('data-fulltext');
                        this.previousElementSibling.innerHTML = fullText.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>');
                        this.style.display = 'none';
                    });
                });
            })
            .catch(error => console.error(`Error fetching articles for ${category}:`, error));
    }

    function loadBooks() {
        fetch(`assets/articles/books${issueParam}.json`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(books => {
                const issueContainer = document.getElementById('issue-container');
                const booksSection = document.createElement('div');
                booksSection.classList.add('article'); // Use the same class as other articles for consistent styling
                booksSection.innerHTML = `
                    <img src="assets/logos/books.png" alt="books" style="width: 100%; max-width: 400px; margin-bottom: 10px;">
                    <h2><i>Top Reads</i></h2>
                    <div class="books-container"></div>
                `;
                books.forEach(book => {
                    const bookDiv = document.createElement('div');
                    bookDiv.classList.add('book');
                    bookDiv.innerHTML = `
                        <h3 class="book-title">${book.title}</h3>
                        <p class="book-author">By ${book.author}</p>
                        <img src="${book.image}" alt="${book.title}">
                        <p>${book.description.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>')}</p>
                    `;
                    booksSection.querySelector('.books-container').appendChild(bookDiv);
                });
                issueContainer.appendChild(booksSection);
            })
            .catch(error => console.error('Error fetching books:', error));
    }

    categories.forEach(category => {
        loadIssueArticles(category);
    });

    loadBooks();
});
