'use strict'

let gCanvas
let gCtx
let gIsMouseIsDown = false

function onInit() {
    gCanvas = document.querySelector('canvas')
    gCtx = gCanvas.getContext('2d')
    renderMeme()
    addLine()
}

function renderMeme() {
    document.querySelector('.meme-container').classList.remove('hidden')
    document.querySelector('.gallery').classList.add('hidden')
    const meme = getMeme()
    let path = `./imgs/${meme.selectedImgId}.jpg`
    const lines = meme.lines

    renderImage(path, () => {
        lines.forEach(line => {
            renderText(line)
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

function renderText({ txt, size, color, id, font, align, x, y }) {
    const meme = getMeme()

    gCtx.font = `bold ${size}px ${font}`
    gCtx.fillStyle = color
    gCtx.strokeStyle = 'black'
    gCtx.textAlign = align
    let textX
    let textY
    let textSizes = gCtx.measureText(txt)
    if (!x && !y) {
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
    }
    else {
        textX = x
        textY = y
    }

    gCtx.fillText(txt, textX, textY)
    gCtx.strokeText(txt, textX, textY)
    const actualX = textX - textSizes.actualBoundingBoxLeft
    const actualY = textY - textSizes.actualBoundingBoxAscent
    const width = textSizes.width
    const height = textSizes.actualBoundingBoxAscent + textSizes.actualBoundingBoxDescent
    setLineMeasures(id, width, height)
    setLineCords(id, textX, textY, actualX, actualY)
    if (meme.selectedLineIdx + 1 === id && meme.selectedLineIdx !== null) {
        drawRect(
            actualX - 5,
            actualY - 5,
            width + 10,
            height + 10
        )
    }
}

function onSetLineTxt(txt) {
    setLineTxt(txt)
    renderMeme()
}

function onDeleteText() {
    deleteLine()
    renderMeme()
}

function onDownloadCanvas(elLink) {
    const dataUrl = gCanvas.toDataURL()
    elLink.href = dataUrl
    elLink.download = 'meme'
}

function onSetColor(color) {
    setColor(color)
    renderMeme()
}

function onChangeSize(factor) {
    changeSize(factor)
    renderMeme()
}

function onAddLine() {
    addLine()
    renderMeme()
    setValuesToCurrentLine()
}

function onSwitchLine() {
    setCurrLineIdx()
    renderMeme()
    setValuesToCurrentLine()
}

function drawRect(x, y, width, height) {
    gCtx.strokeStyle = 'black'
    gCtx.strokeRect(x, y, width, height)
}

function onSetFont(font) {
    const meme = getMeme()
    meme.lines[meme.selectedLineIdx].font = font
    renderMeme()
}

function onSetAlign(align) {
    console.log('aligning')
    const meme = getMeme()
    const currLineId = meme.selectedLineIdx
    const line = meme.lines[currLineId]
    switch (align) {
        case 'center': setX(currLineId, gCanvas.width / 2)
            break;
        case 'start': setX(currLineId, line.width / 2 + 10)
            break;
        case 'end': setX(currLineId, gCanvas.width - 20 - (line.width / 2))
            break;
    }
    renderMeme()
}

function setValuesToCurrentLine() {
    const meme = getMeme()
    document.querySelector('.text').value = meme.lines[meme.selectedLineIdx].txt
    document.querySelector('.color').value = meme.lines[meme.selectedLineIdx].color
    document.querySelector('.font').value = meme.lines[meme.selectedLineIdx].font
    document.querySelector('.text-align').value = meme.lines[meme.selectedLineIdx].align
}

function onChangeHeight(factor) {
    changeY(factor)
    renderMeme()
}

function onUmMarkText(idx) {
    selectedLineIdx(idx)
    renderMeme()
}


function onDown(ev) {
    gIsMouseIsDown = true
    const clickedPos = getEvPos(ev)
    const clickedLine = getClickedLine(clickedPos)
    if (clickedLine) {
        setSelectedLine(clickedLine)
        renderMeme()
    }
}

function onUp() {
    gIsMouseIsDown = false
}

function getEvPos(ev) {
    const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']
    const rect = ev.target.getBoundingClientRect()

    if (TOUCH_EVS.includes(ev.type)) {
        ev.preventDefault()
        const touch = ev.changedTouches[0]
        return {
            x: ((touch.clientX - rect.left) / rect.width) * ev.target.width,
            y: ((touch.clientY - rect.top) / rect.height) * ev.target.height,
        }
    } else {
        return {
            x: ((ev.clientX - rect.left) / rect.width) * ev.target.width,
            y: ((ev.clientY - rect.top) / rect.height) * ev.target.height,
        }
    }
}