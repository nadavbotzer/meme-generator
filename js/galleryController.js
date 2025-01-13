'use strict'

function renderGallery() {
    setActiveNavLink('Gallery')
    const gallery = getGallery()
    document.querySelector('.meme-container').classList.add('hidden')
    document.querySelector('.options').classList.add('hidden')
    document.querySelector('.gallery').classList.remove('hidden')
    document.querySelector('.saved-gallery').classList.add('hidden')
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

function showEmptyGalleryDialog() {
    const dialog = document.getElementById('emptyGalleryDialog')
    dialog.showModal()
}

function redirectToMemeEditor() {
    const dialog = document.getElementById('emptyGalleryDialog')
    dialog.close()
    renderMeme()
}

function onDeleteMemeFromSaved(idx, ev) {
    ev.stopPropagation()
    const savedMemes = JSON.parse(localStorage.getItem(MEME_KEY)) || []
    savedMemes.splice(idx, 1)
    localStorage.setItem(MEME_KEY, JSON.stringify(savedMemes))
    onShowGallery()
}


function onLoadMemeFromGallery(idx) {
    const savedMemes = JSON.parse(localStorage.getItem(MEME_KEY)) || []
    const meme = savedMemes[idx]
    setMeme(meme.memeData)
    renderMeme()
}

function onShowGallery() {
    setActiveNavLink('Saved Memes')
    renderSavedMemes()
    document.querySelector('.saved-gallery').classList.remove('hidden')
    document.querySelector('.meme-container').classList.add('hidden')
    document.querySelector('.options').classList.add('hidden')
    document.querySelector('.gallery').classList.add('hidden')

}