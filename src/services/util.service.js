
export const utilService = {
    makeId,
    getRandomInt,
    makeLorem,
    getEmptyBoard
}

function makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; 
}

function makeLorem(size = 20) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn'];
    var txt = '';
    while (size > 0) {
        size--;
        txt += words[Math.floor(Math.random() * words.length)] + ' ';
    }
    return txt;
}



function getEmptyBoard() {
      return {
        title: 'New Board',
        createdAt: Date.now(),
        createdBy: null,
        groups: [
          {
            id: utilService.makeId(),
            title: 'Group Title',
            tasks: [
              {
                id: utilService.makeId(),
                title: 'Item 1'
              },
              {
                id: utilService.makeId(),
                title: 'Item 2'
              },
              {
                id: utilService.makeId(),
                title: 'Item 3'
              },
            ],
            style: {
              color: "#579bfc"
            }
          },
          {
            id: utilService.makeId(),
            title: 'Group Title',
            tasks: [
              {
                id: utilService.makeId(),
                title: 'Item 4'
              },
              {
                id: utilService.makeId(),
                title: 'Item 5'
              }
            ],
            style: {
              color: "#579bfc"
            }
          }
        ],
        members:[]
      }
  }