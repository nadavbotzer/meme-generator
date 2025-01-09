'use strict'
var gImgs = createGallery()
var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
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

function setLineTxt(txt) {
    if (gMeme.lines.length) gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

function getGallery() {
    return gImgs
}

function setImg(id) {
    gMeme.selectedImgId = id
}

function setColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color
}

function changeSize(factor) {
    if (factor < 0 && gMeme.lines[gMeme.selectedLineIdx].size < 12) return
    gMeme.lines[gMeme.selectedLineIdx].size += factor
}

function addLine() {
    const line = {
        id: ++gMeme.linesCounter,
        txt: 'Edit your text',
        size: 20,
        color: '#ffffff',
        font: 'Impact',
        align: 'center'
    }
    gMeme.lines.push(line)
    gMeme.selectedLineIdx = gMeme.linesCounter - 1
}

function deleteLine() {
    const idx = gMeme.selectedLineIdx
    if (idx !== -1 && gMeme.lines.length > 0) {
        gMeme.lines.splice(idx, 1)
        gMeme.linesCounter--
        onUmMarkText()
    }
}

function setCurrLineIdx() {
    gMeme.selectedLineIdx++
    if (gMeme.selectedLineIdx >= gMeme.lines.length) gMeme.selectedLineIdx = 0
}

function selectedLineIdx(idx) {
    gMeme.selectedLineIdx = idx
}
function setLineCords(id, x, y, actualX, actualY) {
    gMeme.lines[id - 1].x = x
    gMeme.lines[id - 1].y = y
    gMeme.lines[id - 1].actualX = actualX
    gMeme.lines[id - 1].actualY = actualY

}

function setLineMeasures(id, w, h) {
    gMeme.lines[id - 1].width = w
    gMeme.lines[id - 1].height = h
}

function getClickedLine(clickedPos) {
    const lines = gMeme.lines
    return lines.find((line) => {
        return line.actualX < clickedPos.x && clickedPos.x < line.actualX + line.width && line.actualY < clickedPos.y && clickedPos.y < line.actualY + line.height

    })
}


function setSelectedLineByIndex(idx) {
    const meme = getMeme()
    if (idx >= 0 && idx < meme.lines.length) {
        meme.selectedLineIdx = idx
    }
}

function setSelectedLine(line) {
    gMeme.selectedLineIdx = line.id - 1
}

function changeY(factor) {
    gMeme.lines[gMeme.selectedLineIdx].y -= factor
}

function setY(idx, y) {
    gMeme.lines[idx].y = y
}

function setX(idx, x) {
    gMeme.lines[idx].x = x
}
