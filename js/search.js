/*=== Search Data ===*/
const searchBox = document.getElementById('search-box');
const searchRes = document.getElementById('search-results');
const searchBtn = document.getElementById('search-btn');
const noResults = document.querySelector('.no-results');

searchBtn.addEventListener('click', () => {
    event.preventDefault();
    searchAnime();
    searchBox.value = "";
})

const searchAnime = () => {
    fetch(`https://api.jikan.moe/v4/anime?q=${searchBox.value}&limit=24`)
    .then(response => response.json())
    .then(data => {
        let searchAnime = '';
        data.data.forEach(anime => {
            searchAnime += `
                <a href="anime.html#${anime.mal_id}" class="col-12 col-md-6 col-lg-3" id="${anime.mal_id}">
                    <div class="anime-card anime-search-card">
                        <img src="${anime.images.webp.large_image_url}" class="img-fluid search-anime-img" alt="Portada de ${anime.title}">
                        <p class="py-3">${anime.title}</p>
                    </div>
                </a>
            `
        });

        searchRes.innerHTML = searchAnime;
    })
    .catch(error => console.log(error))
};
searchAnime();
