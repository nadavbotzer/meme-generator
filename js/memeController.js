'use strict'

let gCanvas
let gCtx

function onInit() {
    gCanvas = document.querySelector('canvas')
    gCtx = gCanvas.getContext('2d')
}

function renderMeme(meme) {
    let path = `/imgs/${meme.selectedImgId}.jpg`
    renderImage(path)
    renderText('hi')

}

function renderImage(imageSrc) {
    const img = new Image()
    img.src = imageSrc

    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
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
