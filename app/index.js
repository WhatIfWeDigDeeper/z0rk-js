class Room {
  constructor(data) {
    this.data = data;
  }

  handleCommand(text, player) {
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
        if (!command) {
          return { isInvalid:true, message: `<p>Unknown command: ${text}</p><br/>`};
        }
        return command.invoke(player);
    }
  }
}

class Player {
  constructor(name) {
    this.name = name;
    this.history = [];
    //this.inventory = [];
  }

  // addItem(item){
  //   this.inventory.push(item);
  // }

  logCommand(command) {
    this.history.push(command.toLowerCase());
  }

  hasCalled(command) {
    return !!_.find(x=>x === command)(this.history);
  }


}

// todo: add precondition logic return {true} or {false, msg} for invoking commands
const westOfHouse = {
  id: 'westOfHouse',
  name: 'West of House',
  description: '<p>You are standing in an open field west of a white house, with a boarded front door.</p><p>There is a small mailbox here.</p>',
  actions: [],
  commands: [{
      cmd: 'open mailbox',
      invoke: () => {
        return {
          message: '<p>Opening the small mailbox reveals a leaflet!!!!</p><br>'
        }
      },
    }, {
      cmd: 'read leaflet',
      invoke: (player) => {
        return player.hasCalled('read leaflet')
          ? {
            score: 1,
            message: '<p>(Taken)<br>"WELCOME TO ZORK!<br><br>ZORK is a game of adventure, danger, and low cunning. In it you will explore some of the most amazing territory ever seen by mortals. No computer should be without one!</p><br>'
          }
          : {
            message: '<p>There is no leaflet visible</p>'
          };
      }
    }
  ]

};

let currentRoom = new Room(westOfHouse);
let player1 = new Player('Adventurer');

function main(text) {
  // console.log(text);
  let result = currentRoom.handleCommand(text, player1);
  if (!result.isInvalid) {
    player1.logCommand(text);
  }
  return result;
}
