'use strict'
var gImgs = [
    { id: 1, url: './imgs/1.jpg', keywords: ['funny', 'cat'] },
    { id: 2, url: './imgs/2.jpg', keywords: ['funny', 'cat'] }
]
var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [],
    linesCounter: 0
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
        color: 'red'
    }
    gMeme.lines.push(line)
    gMeme.selectedLineIdx = gMeme.linesCounter - 1
}

function setCurrLineIdx() {
    gMeme.selectedLineIdx++
    if (gMeme.selectedLineIdx >= gMeme.lines.length) gMeme.selectedLineIdx = 0
}