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
            let { txt, size, color, id } = line
            renderText(txt, size, color, id)
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

function renderText(text, size, color, id) {
    gCtx.font = `${size}px Impact`
    gCtx.fillStyle = color
    gCtx.strokeStyle = 'black'
    gCtx.textAlign = 'center'
    let textX
    let textY
    if (id === 1) {
        textX = gCanvas.width / 2
        textY = 50
    }
    else if (id === 2) {
        textX = gCanvas.width / 2
        textY = gCanvas.height - 50
    }
    else {
        textX = gCanvas.width / 2
        textY = gCanvas.height / 2
    }

    gCtx.fillText(text, textX, textY)
    gCtx.strokeText(text, textX, textY)
}

function onSetLineTxt(txt) {
    setLineTxt(txt)
    renderMeme()
}

function onDownloadCanvas(elLink) {
    const dataUrl = gCanvas.toDataURL()
    elLink.href = dataUrl
    elLink.download = 'canvas'
}

function onSetColor(color) {
    setColor(color)
    renderMeme()
}

function onChangeSize(factor) {
    changeSize(factor)
    renderMeme()
}