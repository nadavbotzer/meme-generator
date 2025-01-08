'use strict'
var gImgs = [
    { id: 1, url: '/imgs/1.jpg', keywords: ['funny', 'cat'] },
    { id: 2, url: '/imgs/2.jpg', keywords: ['funny', 'cat'] }
]

var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            id: 1,
            txt: 'I sometimes eat Falafel',
            size: 20,
            color: 'red'
        },
        {
            id: 2,
            txt: 'and i like it',
            size: 15,
            color: 'red'
        }
    ]
}


function getMeme() {
    return gMeme
}

function setLineTxt(txt) {
    gMeme.lines[0].txt = txt
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