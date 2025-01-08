'use strict'

function renderGallery() {
    document.querySelector('.meme-container').hidden = true
    document.querySelector('.gallery').hidden = false
    const gallery = getGallery()
    const urls = gallery.map((img) => {
        console.log(img.url)
        return `<img src="${img.url}" onclick="onImgSelect(${img.id})">`
    })
    console.log(urls)
    document.querySelector('.gallery').innerHTML = urls.join('')

}

function onImgSelect(id) {
    setImg(id)
    renderMeme()
    document.querySelector('.meme-container').hidden = false
    document.querySelector('.gallery').hidden = true

}