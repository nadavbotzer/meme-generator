'use strict'

function renderGallery() {
    const gallery = getGallery()
    document.querySelector('.meme-container').classList.add('hidden')
    document.querySelector('.options').classList.add('hidden')
    document.querySelector('.gallery').classList.remove('hidden')
    const urls = gallery.map((img) => {
        return `<img src="${img.url}" onclick="onImgSelect(${img.id})">`
    })
    document.querySelector('.gallery').innerHTML = urls.join('')

}

function onImgSelect(id) {
    const meme = getMeme()
    setImg(id)
    renderMeme()
    if (meme.linesCounter === 0) addLine()
    setValuesToCurrentLine()
}