const form             = document.querySelector( '#form' ),
      lettersContainer = document.querySelector( '#letters-container' ),
      gameOverPopUp    = document.querySelector( '#gameOverPopUp' ),
      winPopUp         = document.querySelector( '#winPopUp' ),
      againButtons     = document.querySelectorAll( 'dialog #again' ),
      wordContainers   = document.querySelectorAll( 'dialog #word' );

const urlParams = new URLSearchParams(window.location.search);

let hp = urlParams.get('hp');
const indicatorStep = 255 / hp;

let gColor, bColor;
gColor = bColor = 255;

let randomWord = null; 

function showGameOver() {
    gameOverPopUp.classList.add( 'active' );
}

function showWin() {
    winPopUp.classList.add( 'active' );
}

async function getRandomWordPromise() {
    const request = await fetch( 'https://random-word-api.herokuapp.com/word?length=10' ).then( response => response.json() );

    let [word] = request;
    return word;
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

getRandomWordPromise()
    .then( word => {
        randomWord = word;
        console.log( randomWord );
        
        AddLetterCells( randomWord, lettersContainer );
        
        wordContainers.forEach( container => container.textContent = randomWord );
    });


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
