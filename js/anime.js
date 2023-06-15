let URLAnime = document.URL.split("#").pop();
console.log(document.URL);
console.log(URLAnime);

const getAnimeDetail = () => {
    fetch(`https://api.jikan.moe/v4/anime/${URLAnime}/full`)
    .then(response => response.json())
    .then(data => {
        console.log(data);

        const animeTitle = document.querySelector('.anime-title');
        const animeTitleJP = document.querySelector('.anime-title-jp');
        const animeDemographic = document.querySelector('.anime-demographic');
        const animeImg = document.querySelector('.anime-img');
        const animeSyn = document.querySelector('.anime-synopsis');
        const animeGenre = document.querySelector('.anime-genres');
        const animeState = document.querySelector('.anime-state');
        const animeVideo = document.querySelector('.anime-trailer');

        const animeType = document.querySelector('.anime-type');
        const animeEps = document.querySelector('.anime-episodes');
        const animePremier = document.querySelector('.anime-premier');

        animeTitle.innerHTML = data.data.title;
        animeTitleJP.innerHTML = data.data.title_japanese;
        data.data.demographics.forEach(demo => {
            animeDemographic.innerHTML += `
            <span class="badge text-bg-danger rounded-pill py-2 px-3 my-1 me-1">${demo.name}</span>
            `;
        })
        animeImg.src = data.data.images.jpg.large_image_url;
        if(data.data.synopsis == null){
            animeSyn.innerHTML = "No Synopsis";
        } else if(data.data.synopsis){
            animeSyn.innerHTML = data.data.synopsis;
        }
        data.data.genres.forEach(genre => {
            animeGenre.innerHTML += `
                <span class="badge text-bg-danger rounded-pill py-2 px-3 my-1 me-1">${genre.name}</span>
            `;
        });
        if(data.data.status == "Finished Airing") {
            animeState.innerHTML = "Finished Airing";
            animeState.classList.add("state-red");
        } else if (data.data.status == "Currently Airing") {
            animeState.innerHTML = "Currently Airing";
            animeState.classList.add("state-green");
        } else if (data.data.status == "Not yet aired") {
            animeState.innerHTML = "Not Yet Aired";
            animeState.classList.add("state-purple");
        };
        if(data.data.trailer.embed_url == null){
            document.querySelector('.anime-video').innerHTML = `
                <span class="text-danger-2 d-flex align-items-center gap-1">
                    <i class='bx bxs-x-circle'></i>
                    No Video Available
                </span>
            `;
        } else if(data.data.trailer.embed_url){
            animeVideo.src = data.data.trailer.embed_url;
        }
        
        animeType.innerHTML = data.data.type;
        animeEps.innerHTML = data.data.episodes;
        animePremier.innerHTML = `
            ${data.data.season} ${data.data.year}
        `
    });
};

getAnimeDetail();

/**
 * ${data.data.synopsis = 'null' ? 'No Synopsis' : data.data.synopsis}
 */