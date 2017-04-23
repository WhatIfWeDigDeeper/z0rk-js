function handleCommand(text) {
    if (text === 'open mailbox') {
        return { message: '<p>Opening the small mailbox reveals a leaflet.</p><br>' };
    } else if (text === 'read leaflet') {
        return {
            score: 1,
            message: `<p>(Taken)<br>"WELCOME TO ZORK!<br><br>
ZORK is a game of adventure, danger, and low cunning. In it you will explore
some of the most amazing territory ever seen by mortals. No computer should be without one!"
</p><br>`};
    }
}