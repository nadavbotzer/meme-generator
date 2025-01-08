'use strict'

function renderGallery() {
    document.querySelector('.meme-container').classList.add('hidden')
    document.querySelector('.gallery').classList.remove('hidden')
    const gallery = getGallery()
    const urls = gallery.map((img) => {
        return `<img src="${img.url}" onclick="onImgSelect(${img.id})">`
    })
    document.querySelector('.gallery').innerHTML = urls.join('')

}

function onImgSelect(id) {
    setImg(id)
    renderMeme()
    console.log("Meme container should be visible, gallery hidden")
}