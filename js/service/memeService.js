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
            txt: 'I sometimes eat Falafel',
            size: 20,
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