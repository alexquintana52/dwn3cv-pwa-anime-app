const charRes = document.getElementById('char-list');
const searchBox = document.getElementById('search-box');
const searchBtn = document.getElementById('search-btn');
const searchRes = document.getElementById('manga-results');

searchBtn.addEventListener('click', () => {
    event.preventDefault();
    searchManga();
    searchBox.value = "";
})

const searchManga = () => {
    fetch(`https://api.jikan.moe/v4/manga?sfw&q=${searchBox.value}&limit=24`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        let searchMangaRes = '';
        data.data.forEach(manga => {
            searchMangaRes += `
                <a href="manga.html#${manga.mal_id}" class="col-12 col-md-6 col-lg-3" id="${manga.mal_id}">
                    <div class="anime-card anime-search-card">
                        <img src="${manga.images.webp.large_image_url}" class="img-fluid search-anime-img" alt="Portada de ${manga.title}">
                        <p class="py-3">${manga.title}</p>
                    </div>
                </a>
            `
        });

        searchRes.innerHTML = searchMangaRes;
    })
    .catch(error => console.log(error))
};
searchManga();