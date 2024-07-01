document.addEventListener('DOMContentLoaded', function() {
    const issueParam = new URLSearchParams(window.location.search).get('issue');
    const categories = ['biz', 'ai', 'security', 'gadgets', 'robotics', 'health'];
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    console.log(`Issue Param: ${issueParam}`);  // Debugging

    function formatDate(issueParam) {
        const monthIndex = parseInt(issueParam.slice(2, 4), 10) - 1;
        const year = `20${issueParam.slice(0, 2)}`;
        return `${monthNames[monthIndex]} ${year}`;
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
                console.log(`Loaded data for ${category}:`, data);  // Debugging
                const issueContainer = document.getElementById('issue-container');
                data.forEach(article => {
                    const date = formatDate(issueParam);
                    const articleDiv = document.createElement('div');
                    articleDiv.classList.add('article');
                    articleDiv.innerHTML = `
                        <h3 class="article-title" data-category="${category}" data-title="${article.title}">${article.title}</h3>
                        <p class="article-author">By ${article.author}, ${date}</p>
                        <img src="${article.image}" alt="${article.title}">
                        <p>${article.body.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>')}</p>
                    `;
                    issueContainer.appendChild(articleDiv);
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
                booksSection.classList.add('category');
                booksSection.innerHTML = `<h2>Best New Tech Books</h2>`;
                books.forEach(book => {
                    const bookDiv = document.createElement('div');
                    bookDiv.classList.add('article');
                    bookDiv.innerHTML = `
                        <h3 class="article-title">${book.title}</h3>
                        <p class="article-author">By ${book.author}</p>
                        <img src="${book.image}" alt="${book.title}">
                        <p>${book.description.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>')}</p>
                    `;
                    booksSection.appendChild(bookDiv);
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
