// https://api.unsplash.com/photos/?client_id=YOUR_ACCESS_KEY
const key = 'pylqNWCOTO3JryFoF3ySqTR-Q6JOiRgxYVbfktZ7qTg'
const search = 'spooky'
const count = 10
const url = `https://api.unsplash.com/photos/random/?client_id=${key}&query=${search}&count=${count}`

let imgs

let getPhotos = async () =>{
    try {
        const response = await fetch(url)
        imgs = await response.json()
        imgs.forEach(img =>genImg(img))
    } catch (error) {
        console.error(error)
    }
}

let genImg = (pic) =>{
    const imgContainer = document.getElementById('image-container')
    
    const anchor = document.createElement('a')
    setAttributes(anchor, {
        'href': pic.links.html,
        'target': '_blank',
    });
    // anchor.setAttribute('href', pic.links.html)
    // anchor.setAttribute('target', '_blank')
    
    const img = document.createElement('img')
    setAttributes(img, {
        'src': pic.urls.regular,
        'alt': pic.alt_description,
        'title': pic.alt_description,
    });
    // img.setAttribute('src', pic.urls.regular)
    // img.setAttribute('alt', pic.alt_description)
    // img.setAttribute('title', pic.alt_description)

    anchor.appendChild(img)
    imgContainer.appendChild(anchor)
}

function setAttributes(ele, attrs){
    
    for (const [key, val] of Object.entries(attrs)){        
        ele.setAttribute(key, val)
    }
}
getPhotos()
