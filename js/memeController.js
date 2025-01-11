'use strict'

let gCanvas
let gCtx
let gIsMouseIsDown = false
const MEME_KEY = 'savedMemes'

function onInit() {
    gCanvas = document.querySelector('canvas')
    gCtx = gCanvas.getContext('2d')
    renderMeme()
    addLine()
}

function renderMeme() {
    document.querySelector('.meme-container').classList.remove('hidden')
    document.querySelector('.options').classList.remove('hidden')
    document.querySelector('.gallery').classList.add('hidden')
    document.querySelector('.saved-gallery').classList.add('hidden')

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
        } else if (id === 2) {
            textX = gCanvas.width / 2
            textY = gCanvas.height - 50
        } else {
            textX = gCanvas.width / 2
            textY = gCanvas.height / 2
        }
    } else {
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
    if (meme.selectedLineIdx === id - 1) {
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
    document.querySelector('.text').value = ''
}

function onAddLine(txt = 'Edit your text') {
    addLine(txt)
    renderMeme()
    setValuesToCurrentLine()
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
    if (getSelectedLineIdx() === -1) return
    const meme = getMeme()
    meme.lines[meme.selectedLineIdx].font = font
    renderMeme()
}

function onSetAlign(align) {
    if (getSelectedLineIdx() === -1) return
    const meme = getMeme()
    const currLineId = meme.selectedLineIdx
    const line = meme.lines[currLineId]
    switch (align) {
        case 'center': setX(currLineId, gCanvas.width / 2)
            break;
        case 'start': setX(currLineId, line.width / 2 + 15)
            break;
        case 'end': setX(currLineId, gCanvas.width - 15 - (line.width / 2))
            break;
    }
    renderMeme()
}

function setValuesToCurrentLine() {
    if (getSelectedLineIdx() === -1) return
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
    document.querySelector('.text').value = ''

}

function onSubmitText(txt) {
    if (txt === '') {
        deleteLine()
    }
    else if (getSelectedLineIdx() === -1) addLine(txt)
    renderMeme()
}

function onDown(ev) {
    gIsMouseIsDown = true
    const meme = getMeme()
    const clickedPos = getEvPos(ev)
    const clickedLine = getClickedLine(clickedPos)

    if (clickedLine) {
        const idx = meme.lines.findIndex(line => line.id === clickedLine.id)
        selectedLineIdx(idx)
        renderMeme()
        setValuesToCurrentLine()
    } else {
        onUmMarkText(-1)
    }
}

function onMoveText(ev) {
    if (!gIsMouseIsDown) return
    const meme = getMeme()
    const selectedLineIdx = meme.selectedLineIdx
    if (selectedLineIdx === -1) return
    const pos = getEvPos(ev)
    meme.lines[selectedLineIdx].x = pos.x
    meme.lines[selectedLineIdx].y = pos.y

    renderMeme()
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

function onSaveMeme() {
    const memeData = getMeme()
    const meme = {
        image: gCanvas.toDataURL(),
        memeData: memeData
    }
    const savedMemes = JSON.parse(localStorage.getItem(MEME_KEY)) || []
    savedMemes.push(meme)
    localStorage.setItem(MEME_KEY, JSON.stringify(savedMemes))
    onShowGallery()
}

function renderSavedMemes() {
    const savedMemesContainer = document.querySelector('.saved-memes')
    const savedMemes = JSON.parse(localStorage.getItem(MEME_KEY)) || []
    savedMemesContainer.innerHTML = ''

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
    renderSavedMemes()
    document.querySelector('.saved-gallery').classList.remove('hidden')
    document.querySelector('.meme-container').classList.add('hidden')
    document.querySelector('.options').classList.add('hidden')
    document.querySelector('.gallery').classList.add('hidden')

}




