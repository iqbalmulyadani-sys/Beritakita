document.addEventListener('DOMContentLoaded', async () => {
    const topStoriesContainer = document.getElementById('top-stories-container');
    const latestNewsContainer = document.getElementById('latest-news-container');

    // GANTI URL DI BAWAH INI DENGAN URL ASLI PROYEK REPLIT ANDA
    const apiUrl = 'https://https://replit.com/@iqbalmulyadani/Contoh-bagian-2?s=app/api/articles';

    const renderArticleCard = (article, isFeatured = false) => {
        const title = article.title;
        const imageUrl = article.image || 'https://via.placeholder.com/300x200.png?text=Tidak+Ada+Gambar';
        const contentSnippet = article.content ? article.content.substring(0, 100) + '...' : '';
        const articleLink = `article.html?id=${article._id}`;
        
        if (isFeatured) {
            return `
                <article class="article-card featured-story">
                    <a href="${articleLink}"><img src="${imageUrl}" alt="${title}"></a>
                    <h3><a href="${articleLink}">${title}</a></h3>
                    <p>${contentSnippet}</p>
                </article>
            `;
        } else {
            return `
                <article class="article-card">
                    <a href="${articleLink}"><img src="${imageUrl}" alt="${title}"></a>
                    <h4><a href="${articleLink}">${title}</a></h4>
                </article>
            `;
        }
    };

    const renderArticleListItem = (article) => {
        const title = article.title;
        const imageUrl = article.image || 'https://via.placeholder.com/100x100.png?text=Tidak+Ada+Gambar';
        const contentSnippet = article.content ? article.content.substring(0, 80) + '...' : '';
        const articleLink = `article.html?id=${article._id}`;
        
        return `
            <div class="list-item">
                <a href="${articleLink}"><img src="${imageUrl}" alt="${title}"></a>
                <div class="item-content">
                    <h5><a href="${articleLink}">${title}</a></h5>
                    <p>${contentSnippet}</p>
                </div>
            </div>
        `;
    };

    const fetchAndRenderArticles = async () => {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Gagal mengambil data dari server.');
            }
            const articles = await response.json();
            
            if (articles.length === 0) {
                topStoriesContainer.innerHTML = '<p>Belum ada artikel yang tersedia.</p>';
                latestNewsContainer.innerHTML = '';
                return;
            }

            // Tampilkan 1 artikel pertama sebagai 'Berita Utama'
            const featuredArticle = articles[0];
            topStoriesContainer.innerHTML = renderArticleCard(featuredArticle, true);

            // Tampilkan 2 artikel berikutnya di grid
            const gridArticles = articles.slice(1, 3);
            gridArticles.forEach(article => {
                topStoriesContainer.innerHTML += renderArticleCard(article);
            });

            // Tampilkan sisa artikel sebagai 'Berita Terbaru' dalam daftar
            const latestArticles = articles.slice(3, 7);
            latestArticles.forEach(article => {
                latestNewsContainer.innerHTML += renderArticleListItem(article);
            });

        } catch (error) {
            console.error('Error:', error);
            topStoriesContainer.innerHTML = `<p>Gagal memuat berita. Mohon coba lagi nanti.</p>`;
            latestNewsContainer.innerHTML = '';
        }
    };

    fetchAndRenderArticles();
});
