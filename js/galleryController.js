'use strict'

function renderGallery() {
    const gallery = getGallery()
    const urls = gallery.map((img) => {
        console.log(img.url)
        return `<img src="${img.url}">`
    })
    console.log(urls)
    document.querySelector('.gallery').innerHTML = urls.join('')

}