'use strict'
var gImgs = createGallery()
var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: -1,
    lines: [],
    linesCounter: 0
}

function createGallery() {
    const imgs = []
    for (let i = 0; i < 18; i++) {
        const img = {
            id: i + 1,
            url: `./imgs/${i + 1}.jpg`,
            keywords: ['key', 'word']
        }
        imgs.push(img)
    }
    return imgs
}

function getMeme() {
    return gMeme
}

function setMeme(meme) {
    gMeme = meme
}
function getSelectedLineIdx() {

    return gMeme.selectedLineIdx
}
function setLineTxt(txt) {
    if (gMeme.lines.length && getSelectedLineIdx() !== -1) gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

function getGallery() {
    return gImgs
}

function setImg(id) {
    gMeme.selectedImgId = id
}

function setColor(color) {
    if (gMeme.lines.length) {
        gMeme.lines[gMeme.selectedLineIdx].color = color
    }
}

function changeSize(factor) {
    if (gMeme.lines.length === 0) return
    if (factor < 0 && gMeme.lines[gMeme.selectedLineIdx].size < 12) return
    gMeme.lines[gMeme.selectedLineIdx].size += factor
}

function addLine(txt = 'Edit your text') {
    const line = {
        id: ++gMeme.linesCounter,
        txt,
        size: 34,
        color: '#ffffff',
        font: 'Impact',
        align: 'center'
    }
    gMeme.lines.push(line)
    gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function deleteLine() {
    const idx = gMeme.selectedLineIdx
    if (idx !== -1 && gMeme.lines.length > 0) {
        gMeme.lines.splice(idx, 1)
        gMeme.linesCounter--
        gMeme.lines.forEach((line, i) => line.id = i + 1)
        selectedLineIdx(-1)
    }
}

function setCurrLineIdx() {
    if (gMeme.lines.length === 0) return
    gMeme.selectedLineIdx = (gMeme.selectedLineIdx + 1) % gMeme.lines.length
}

function selectedLineIdx(idx) {
    gMeme.selectedLineIdx = idx
}

function setLineCords(id, x, y, actualX, actualY) {
    const line = gMeme.lines.find(line => line.id === id)
    if (line) {
        line.x = x
        line.y = y
        line.actualX = actualX
        line.actualY = actualY
    }
}

function setLineMeasures(id, w, h) {
    const line = gMeme.lines.find(line => line.id === id)
    if (line) {
        line.width = w
        line.height = h
    }
}

function getClickedLine(clickedPos) {
    const clickedLine = gMeme.lines.find(line =>
        line.actualX < clickedPos.x && clickedPos.x < line.actualX + line.width &&
        line.actualY < clickedPos.y && clickedPos.y < line.actualY + line.height
    )
    if (clickedLine) {
        gMeme.selectedLineIdx = gMeme.lines.findIndex(line => line.id === clickedLine.id)
    }
    return clickedLine
}

function setSelectedLineByIndex(idx) {
    if (idx >= 0 && idx < gMeme.lines.length) {
        selectedLineIdx(idx)
    }
}

function setSelectedLine(line) {
    const idx = gMeme.lines.findIndex(l => l.id === line.id)
    if (idx !== -1) {
        selectedLineIdx(idx)
    }
}

function changeY(factor) {
    if (gMeme.lines.length) {
        gMeme.lines[gMeme.selectedLineIdx].y -= factor
    }
}

function setY(idx, y) {
    if (idx >= 0 && idx < gMeme.lines.length) {
        gMeme.lines[idx].y = y
    }
}

function setX(idx, x) {
    if (idx >= 0 && idx < gMeme.lines.length) {
        gMeme.lines[idx].x = x
    }
}


////util////
function saveMemeToGallery() {
    const meme = getMeme()
    const savedMemes = JSON.parse(localStorage.getItem(MEME_KEY)) || [];

    savedMemes.push({
        imageSrc: gCanvas.toDataURL(),
        memeData: meme
    })

    localStorage.setItem(MEME_KEY, JSON.stringify(savedMemes))
}


