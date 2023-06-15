/*=== Home Data ===*/
let page = 1;
const btnPrev = document.getElementById('btnPrev');
const btnNext = document.getElementById('btnNext');
const results = document.getElementById('results');


btnPrev.addEventListener('click', () => {
    if(page > 1){
        page -= 1;
        getAnimeList();
    };
});

btnNext.addEventListener('click', () => {
    if(page < 3){
        page += 1;
        getAnimeList();
    };
});

const getAnimeList = () => {
    fetch(`https://api.jikan.moe/v4/seasons/now?page=${page}&limit=20`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        let animes = '';
        data.data.forEach(anime => {
            animes += `
                <a href="anime.html#${anime.mal_id}" class="col-12 col-md-6 col-lg-3" id="${anime.mal_id}">
                    <div class="anime-card">
                        <img src="${anime.images.jpg.large_image_url}" class="img-fluid" alt="Portada de ${anime.title}">
                        <p class="py-3">${anime.title}</p>
                    </div>
                </a>
            `;
        });

        results.innerHTML = animes;
    });

}
getAnimeList();