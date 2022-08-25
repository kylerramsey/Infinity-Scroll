const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let photosArr = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

count = 30;
apiKey = "PE3hBXu7AZvszpIq7SNUZevZC4-uF1fJtAFtrCOUjsY";

const apiLink = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

const imageLoaded = () => {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true
        loader.hidden = true
    }
};

const displayPhotos = () => {
    imagesLoaded = 0;
    totalImages = photosArr.length;

    photosArr.forEach((photo) => {
        const item = document.createElement('a');

        setAttributes(item, {
            href: photo.links.html,
            target: "_blank",
        });
        
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: `Likes: ${photo.likes}`,
        });

        img.addEventListener("load", imageLoaded);

        item.appendChild(img);
        imageContainer.appendChild(item);
    });
};

const setAttributes = (element, attributes) => {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
};

// getPhotos while writing code to prevent running out of calls

// const getPhotos = async () => {
//     const local = localStorage.getItem("local");
//     if (local) {
//         photosArr = JSON.parse(local);
//         displayPhotos();
//     } else {
//         try {
//             const response = await fetch(apiLink);
//             photosArr = await response.json();
//             localStorage.setItem("local", JSON.stringify(photosArr));
//             displayPhotos();
//         } catch (error) {}
//     }
// };

// getPhotos in production

const getPhotos = async () => {
    try {
        const response = await fetch(apiLink);
        photosArr = await response.json();
        console.log(photosArr)
        displayPhotos()
    } catch (error) {}
}


// Infinity Scroll
window.addEventListener("scroll", () => {
    if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 1000 && ready
    ) {
        ready = false
        getPhotos();
    }
});

getPhotos();
