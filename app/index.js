$(function () {
    'use strict';

    function parse(text, $line) {
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

    function updateMoves() {
        let moves = +$('#moves').text();
        $('#moves').text(++moves)
    }

    $('body').on('keydown', (e) => {
        e.preventDefault();
        e.stopPropagation();

        let $lineActive = $('.line-active');
        let $activeInput = $lineActive.find('#userInput');

        let char = String.fromCharCode(e.which).toLowerCase();
        let text = $activeInput.text();

        // a-z A-Z 0-9 _
        if (/\w/.test(char)) {
            $activeInput.text(text + char)
        }

        // backspace
        else if (e.which === 8) {
            let arr = text.split('');
            arr.splice(-1, 1);
            $activeInput.text(arr.join(''))
        }

        // enter
        else if (e.which === 13) {
            let $line = $('.line-active').clone();
            $lineActive.before($line);
            $line.removeClass('line-active');
            $line.find('.cursor').remove();
            $('.line-active').find('#userInput').text('');
            parse(text, $line);
            updateMoves()
        }

        // space
        else if (e.which === 32) {
            $activeInput.text(text + ' ')
        }

        // debug
        else {
            $activeInput.text(text + e.which)
        }
    })
});