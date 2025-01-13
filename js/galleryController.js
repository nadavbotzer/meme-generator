'use strict'

function renderGallery() {
    setActiveNavLink('Gallery')
    const gallery = getGallery()
    document.querySelector('.meme-container').classList.add('hidden')
    document.querySelector('.options').classList.add('hidden')
    document.querySelector('.saved-gallery').classList.add('hidden')
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
    if (meme.memeData.lines.length > 0) {
        selectedLineIdx(0)
        setValuesToCurrentLine()
    }
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


function onSaveMeme() {
    onUmMarkText(-1)
    setTimeout(() => {
        const memeData = getMeme()
        const meme = {
            image: gCanvas.toDataURL(),
            memeData: memeData
        }
        const savedMemes = JSON.parse(localStorage.getItem(MEME_KEY)) || []
        savedMemes.push(meme)
        localStorage.setItem(MEME_KEY, JSON.stringify(savedMemes))
        onShowGallery()

    }, 50)
}

function renderSavedMemes() {
    const savedMemesContainer = document.querySelector('.saved-memes')
    const savedMemes = JSON.parse(localStorage.getItem(MEME_KEY)) || []
    savedMemesContainer.innerHTML = ''

    if (savedMemes.length === 0) {
        showEmptyGalleryDialog()
    } else {
        savedMemes.forEach((meme, idx) => {
            const memeElement = document.createElement('div')
            memeElement.classList.add('saved-meme')
            // Create the meme image
            const memeImage = new Image()
            memeImage.src = meme.image
            memeImage.alt = `Saved Meme ${idx + 1}`
            memeImage.onload = () => {
                memeElement.appendChild(memeImage)
                //"X" delete button
                const deleteBtn = document.createElement('button')
                deleteBtn.classList.add('delete-btn')
                deleteBtn.textContent = 'x'
                deleteBtn.addEventListener('click', () => onDeleteMemeFromSaved(idx, event))
                memeElement.appendChild(deleteBtn)
                savedMemesContainer.appendChild(memeElement)
            }
            memeElement.onclick = () => onLoadMemeFromGallery(idx)
        })
    }
}