const body = document.querySelector('#gymList');
const moreButton = document.querySelector('#moreButton');
let counter = 0;

async function infiniteScroll() {
    counter += 4;
    let gyms = await searchGym(counter);
    if (gyms.length > 0) {
        addGym(gyms);
    }
}

async function searchGym(counter) {
    const response = await fetch(`/gyms/search?counter=${counter}`);
    const gyms = await response.json();
    return gyms;
}

function addGym(gyms) {
    if (gyms) {
        for (let gym of gyms) {
            const column = document.createElement('div');
            column.classList.add('col-lg-6');

            const card = document.createElement('div');
            card.classList.add('card', 'bg-dark', 'text-white', 'mb-3');

            const image = document.createElement('img');
            image.classList.add('card-img');
            if (gym.images.length > 0) {
                image.src = gym.images[0].url;
                image.alt = gym.title;
            } else {
                image.src = 'https://images.unsplash.com/photo-1544033527-b192daee1f5b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80';
            }

            const cardOverlay = document.createElement('div');
            cardOverlay.classList.add('card-img-overlay', 'd-flex', 'flex-column');

            const cardTitle = document.createElement('h2');
            cardTitle.classList.add('card-title');
            cardTitle.innerText = gym.title;

            const cardDescription = document.createElement('p');
            cardDescription.classList.add('card-text');
            cardDescription.innerText = `${gym.description.substring(0, 100)}...`;

            const cardLocation = document.createElement('p');
            cardLocation.classList.add('card-text', 'fw-bold');
            cardLocation.innerText = gym.location;

            const cardLink = document.createElement('a');
            cardLink.classList.add('btn', 'btn-info', 'btn-sm', 'fw-bold', 'mt-auto');
            cardLink.href = `/gyms/${gym._id}`;
            cardLink.innerText = `View ${gym.title}`;

            cardOverlay.append(cardTitle, cardDescription, cardLocation, cardLink);
            card.append(image, cardOverlay);
            column.append(card);
            body.append(column);
        }
    }
}

window.addEventListener('scroll', () => {
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
        infiniteScroll();
        moreButton.classList.contains('no-display') || moreButton.classList.add('no-display');
    }
});

moreButton.addEventListener('click', () => {
    infiniteScroll();
});