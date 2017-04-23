function parseCommand(text, $line) {
    if (text === 'open mailbox') {
        $line.append('<p>Opening the small mailbox reveals a leaflet.</p><br>')
    } else if (text === 'read leaflet') {
        let score = +$('#score').text();
        $('#score').text(++score);
        $line.append(`<p>
(Taken)<br>
"WELCOME TO ZORK!<br>
<br>
ZORK is a game of adventure, danger, and low cunning. In it you will explore
some of the most amazing territory ever seen by mortals. No computer should be without one!"
</p><br>`)
    }
}