const form             = document.querySelector( '#form' ),
      lettersContainer = document.querySelector( '#letters-container' ),
      gameOverPopUp    = document.querySelector( '#gameOverPopUp' ),
      winPopUp         = document.querySelector( '#winPopUp' ),
      againButtons     = document.querySelectorAll( 'dialog #again' ),
      wordContainers   = document.querySelectorAll( 'dialog #word' );

const words = [
    'sunshine',
    'butterfly',
    'adventure',
    'harmony',
    'serendipity',
    'radiant',
    'tranquility',
    'whimsical',
    'enchantment',
    'blissful'
];

const urlParams = new URLSearchParams(window.location.search);

let hp = urlParams.get('hp');
const indicatorStep = 255 / hp;

let gColor, bColor;
gColor = bColor = 255;

const currentWord = getRandomWord();

function showGameOver() {
    gameOverPopUp.classList.add( 'active' );
}

function showWin() {
    winPopUp.classList.add( 'active' );
}

function getRandomWord() {
    const randomIndex = Math.floor( Math.random() * words.length );

    return words[ randomIndex ];
}

function AddLetterCells( word, container ) {
    let cells = '';
    for (const letter of word) {
        cells += `
            <div class='cell hide' data-letter='${ letter }'>
                <span>${ letter }</span>
            </div>
        `;
    }

    container.insertAdjacentHTML( 'beforeend', cells );
}

function updateHPIndicator() {
    gColor = bColor -= indicatorStep;
    document.body.style.background = `rgb( 255, ${gColor}, ${bColor})`;
}

function subtractAttempt() {
    hp--;
    if ( hp == 0 ) showGameOver();

    updateHPIndicator();
}

const randomWord = getRandomWord();

AddLetterCells( randomWord, lettersContainer );

form.onsubmit = event => {
    event.preventDefault();

    const letter = event.target.letter.value.toLowerCase();
    let matches = null;

    try {
        matches = lettersContainer.querySelectorAll( `div[data-letter=${ letter }]` );        

    } catch (error) {
        alert( 'Please, type a letter' );
        return;
    }

    if ( matches.length == 0 ) subtractAttempt();
    else {
        matches.forEach( element => element.classList.remove( 'hide' ) ); 

        if ( lettersContainer.querySelectorAll( '.hide' ).length == 0 ) showWin();
    }

}

againButtons.forEach( button => {
    button.onclick = event => window.location.reload();

 });

wordContainers.forEach( container => container.textContent = randomWord );