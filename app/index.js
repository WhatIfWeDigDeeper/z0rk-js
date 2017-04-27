class Room {
    constructor(name, description, availableCommands, processCommand) {
        this.name = name;
        this.description = description;
        this.availableCommands = availableCommands;
        this.processCommand = processCommand;
    }

    handleCommand(text) {
        switch (text.toLowerCase()) {
            case "___entry":
            case "look":
                return { message: `<p>${this.name}</p><br/>${this.description}<br/>`};
            case "help":
                return { message: `<p>Available commands: ${this.availableCommands.join(',')}</p><br/>`};
            default:
                return this.processCommand(text);
        }
    }
}

const createWestOfHouse = () => {
    const description = `<p>You are standing in an open field west of a white house, with a boarded front door.</p>
<p>There is a small mailbox here.</p>`;

    const handleCommand = (text) => {
        if (text === 'open mailbox') {
            return { message: '<p>Opening the small mailbox reveals a leaflet!!!!</p><br>' };
        } else if (text === 'read leaflet') {
            return {
                score: 1,
                message: `<p>(Taken)<br>"WELCOME TO ZORK!<br><br>
ZORK is a game of adventure, danger, and low cunning. In it you will explore
some of the most amazing territory ever seen by mortals. No computer should be without one!"
</p><br>`};
        }
    };

    return new Room("West of House",
        description,
        ['open mailbox','read leaflet'],
        handleCommand);
};


let currentRoom = createWestOfHouse();

function main(text) {
    // console.log(text);
    return currentRoom.handleCommand(text);
}
