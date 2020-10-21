'use strict' ;

const gMemes = [
  { id: 1, url: 'images/1.jpg', keywords: ['trump', 'angry', 'speach'] },
  { id: 2, url: 'images/2.jpg', keywords: ['dog','dogs', 'cute', 'happy', 'love', 'kiss'] },
  { id: 3, url: 'images/3.jpg', keywords: ['dog', 'baby', 'happy', 'smile'] },
  { id: 4, url: 'images/4.jpg', keywords: ['cat','sleep', 'computer'] },
  { id: 5, url: 'images/5.jpg', keywords: ['success', 'baby','sea'] },
  { id: 6, url: 'images/6.jpg', keywords: ['tv show', 'ancient', 'science', 'research'] },
  { id: 7, url: 'images/7.jpg', keywords: ['kid', 'black', 'happy', 'smile'] },
  { id: 8, url: 'images/8.jpg', keywords: ['hat', 'clown', 'man', 'smile'] },
  { id: 9, url: 'images/9.jpg', keywords: ['lol', 'baby', 'happy', 'smile'] },
  { id: 10, url: 'images/10.jpg', keywords: ['president', 'black', 'happy', 'smile', 'obama'] },
  { id: 11, url: 'images/11.jpg', keywords: ['kiss', 'black', 'love', 'smile', 'happy'] },
  { id: 12, url: 'images/12.jpg', keywords: ['old'] },
  { id: 13, url: 'images/13.jpg', keywords: ['wine', 'glass', 'happy', 'smile', 'actor'] },
  { id: 14, url: 'images/14.jpg', keywords: ['sunglasess', 'black', 'sad', 'actor'] },
  { id: 15, url: 'images/15.jpg', keywords: ['game of thrones', 'one', 'does', 'not','simply'] },
  { id: 16, url: 'images/16.jpg', keywords: ['star trek','bald','facepalm'] },
  { id: 17, url: 'images/17.jpg', keywords: ['putin', 'president', 'russia'] },
  { id: 18, url: 'images/18.jpg', keywords: ['toy', 'story', 'movie', 'game'] }
];


let gMeme = {
  id: 0,
  selectedImgId: 1, selectedTxtIdx: 0,
  txts: []
}



function findMemeById(memeId) {
  return gMemes.find((img) => {
    return parseInt(img.id) === memeId
  });
}
