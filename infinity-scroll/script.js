const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
let phtosArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

//unsplash API
const apiKey='lzwF9DnAgFg4aMCwcD48TH07Z69AA0h68lIITGa0Xxk';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=30`;

function imageLoaded(){
    imageLoaded++;
    if (imageLoaded === totalImages){
        ready = true;
        loader.hidden = true;
    }
}

function setAttributes(element,attributes){
    for(const key in attributes) {
        element.setAttribute(key,attributes[key]);
    }
}

displayPhtos = () =>{
    imagesLoaded = 0;
    totalImages = photosArray.length;
    phtosArray.forEach((photo) => {
        const item = document.createElement('a');
        // item.setAttribute('href',photo.link.html);
        // item.setAttribute('target','_blank');
        setAttributes(item,{
            href:photo.link.html,
            target:'_blank'
        });
        const img = document.createElement(img);
        // img.setAttribute('src',photo.urls.regular);
        // img.setAttribute('alt',photo.alt_description);
        // img.setAttribute('title',photo.alt_description);
        setAttributes(img,{
            src:photo.urls.regular,
            alt:photo.alt_description,
            title:photo.alt_description
        });
        // Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);
        //Put <img> inside <a> , and put img inside imagecontainer.
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        const phtosArray = await response.json();
        displayPhtos();

    } catch(error){

    }
}

window.addEventListener('scroll',() => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight-1000 && ready){
        getPhotos();
    }
});
getPhotos();