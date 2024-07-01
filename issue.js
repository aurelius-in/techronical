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
                        <h3 class="article
