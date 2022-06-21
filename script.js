// https://api.unsplash.com/photos/?client_id=YOUR_ACCESS_KEY
const key = 'pylqNWCOTO3JryFoF3ySqTR-Q6JOiRgxYVbfktZ7qTg'
const search = 'spooky'
const count = 10
const url = `https://api.unsplash.com/photos/random/?client_id=${key}&query=${search}&count=${count}`
const loader = document.getElementById('loader')

let ready = false
let imagesLoaded = 0
let totalImages
let imgs

let getPhotos = async () =>{
    try {
        const response = await fetch(url)
        imgs = await response.json()
        imgs.forEach(img =>genImg(img))
        totalImages = imgs.length
    } catch (error) {
        console.error(error)
    }
}

let imgLoaded = ()=>{
    imagesLoaded++
    
    if (imagesLoaded == totalImages){
        ready = true
        loader.hidden = true
        console.log('ready =', ready)
    }
}

let genImg = (pic) =>{
    const imgContainer = document.getElementById('image-container')
    
    const anchor = document.createElement('a')
    setAttributes(anchor, {
        'href': pic.links.html,
        'target': '_blank',
    });

    
    const img = document.createElement('img')
    setAttributes(img, {
        'src': pic.urls.regular,
        'alt': pic.alt_description,
        'title': pic.alt_description,
    });
   

    anchor.appendChild(img)
    imgContainer.appendChild(anchor)

    img.addEventListener('load', imgLoaded)
}

function setAttributes(ele, attrs){
    
    for (const [key, val] of Object.entries(attrs)){        
        ele.setAttribute(key, val)
    }
}

window.addEventListener('scroll',()=>{
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false
        imagesLoaded = 0
        getPhotos()
    }
})

getPhotos()
