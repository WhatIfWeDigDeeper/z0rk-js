class Room {
  constructor(data) {
    this.data = data;
  }

  handleCommand(text) {
    switch (text.toLowerCase()) {
      case "___entry":
      case "look":
        return {message: `<p>${this.data.name}</p><br/>${this.data.description}<br/>`};
      case "help":
        return {message: `<p>Available commands: ${this.data.commands.map(x=>x.cmd).join(',')}</p><br/>`};
      // case "go":
      //   return {message: `<p>Available directions: ${this.navigation.map(x=>x.name).join(',')}</p><br/>`};
      default:
        const command = _.find(x=>x.cmd === text)(this.data.commands);
        if (command) {
          return command.result;
        }
        return {message: `<p>Unknown command: ${text}</p><br/>`};
    }
  }
}


// todo: add precondition logic return {true} or {false, msg} for invoking commands
const westOfHouse = {
  id: 'westOfHouse',
  name: 'West of House',
  description: '<p>You are standing in an open field west of a white house, with a boarded front door.</p><p>There is a small mailbox here.</p>',
  commands: [{
      cmd: 'open mailbox',
      result: {
        message: '<p>Opening the small mailbox reveals a leaflet!!!!</p><br>'
      }
    }, {
      cmd: 'read leaflet',
      result: {
        score: 1,
        message: '<p>(Taken)<br>"WELCOME TO ZORK!<br><br>ZORK is a game of adventure, danger, and low cunning. In it you will explore some of the most amazing territory ever seen by mortals. No computer should be without one!</p><br>'
      }
    }
  ]

};

let currentRoom = new Room(westOfHouse);

function main(text) {
  // console.log(text);
  return currentRoom.handleCommand(text);
}
