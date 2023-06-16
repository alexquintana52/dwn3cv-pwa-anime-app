let URLManga = document.URL.split("#").pop();
console.log(document.URL);
console.log(URLManga);

const getMangaDetail = () => {
    fetch(`https://api.jikan.moe/v4/manga/${URLManga}/full`)
    .then(response => response.json())
    .then(data => {

        console.log(data.data)

        document.title = `
            Quintana Alex | Anime.io | ${data.data.title}
        `;

        const mangaTitle = document.querySelector('.manga-title');
        const mangaTitleJP = document.querySelector('.manga-title-jp');
        const mangaDemographic = document.querySelector('.manga-demographic');
        const mangaImg = document.querySelector('.manga-img');
        const mangaSyn = document.querySelector('.manga-synopsis');
        const mangaInfo = document.querySelector('.manga-info');
        const mangaGenre = document.querySelector('.manga-genres');
        const mangaState = document.querySelector('.manga-state');

        const mangaType = document.querySelector('.manga-type');
        const mangaCh = document.querySelector('.manga-chapters');
        const mangaVol = document.querySelector('.manga-volumes');
        const mangaAuthor = document.querySelector('.manga-author');

        mangaTitle.innerHTML = data.data.title;
        mangaTitleJP.innerHTML = data.data.title_japanese;

        data.data.demographics.forEach(demo => {
            mangaDemographic.innerHTML += `
            <span class="badge text-bg-danger rounded-pill py-2 px-3 my-1 me-1">${demo.name}</span>
            `;
        });

        mangaImg.src = data.data.images.webp.large_image_url;

        if(data.data.synopsis == null){
            mangaSyn.innerHTML = "No Synopsis";
        } else if(data.data.synopsis){
            mangaSyn.innerHTML = data.data.synopsis;
        };

        mangaInfo.innerHTML = data.data.background == null ? "No Info" : data.data.background;

        data.data.genres.forEach(genre => {
            mangaGenre.innerHTML += `
                <span class="badge text-bg-danger rounded-pill py-2 px-3 my-1 me-1">${genre.name}</span>
            `;
        });

        if(data.data.status == "Finished") {
            mangaState.innerHTML = "Finished";
            mangaState.classList.add("state-red");
        } else if (data.data.status == "Publishing") {
            mangaState.innerHTML = "Publishing";
            mangaState.classList.add("state-green");
        } else if (data.data.status == "Not yet aired") {
            mangaState.innerHTML = "Not Yet Aired";
            mangaState.classList.add("state-purple");
        };
        
        mangaType.innerHTML = data.data.type;
        mangaCh.innerHTML = data.data.chapters == null ? "Publishing" : data.data.chapters;
        mangaVol.innerHTML = data.data.volumes == null ? "No Volume" : data.data.volumes;

        data.data.authors.forEach(author => {
            mangaAuthor.innerHTML += `
                ${author.name}
            `;
        })
    })
    .catch(error => console.log(error));
};

getMangaDetail();