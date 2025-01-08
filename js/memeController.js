'use strict'

let gCanvas
let gCtx

function onInit() {
    gCanvas = document.querySelector('canvas')
    gCtx = gCanvas.getContext('2d')
    renderMeme()
}

function renderMeme() {
    const meme = getMeme()
    let path = `/imgs/${meme.selectedImgId}.jpg`
    const lines = meme.lines

    renderImage(path, () => {
        lines.forEach(line => {
            renderText(line.txt)
        })
    })
}

function renderImage(imageSrc, callback) {
    const img = new Image()
    img.src = imageSrc
    img.onload = () => {
        gCanvas.height = (img.naturalHeight / img.naturalWidth) * gCanvas.width
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
        callback()
    }
}

function renderText(text) {
    console.log('im rendering text')
    gCtx.font = '30px Impact'
    gCtx.fillStyle = 'white'
    gCtx.strokeStyle = 'black'
    gCtx.textAlign = 'center'
    const textX = gCanvas.width / 2
    const textY = 50
    gCtx.fillText(text, textX, textY)
    gCtx.strokeText(text, textX, textY)
}

function onSetLineTxt(txt) {
    setLineTxt(txt)
    renderMeme()
}
