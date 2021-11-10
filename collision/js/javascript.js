import Object from "./Object.js";

const w = prompt('Ширина НЛО: ', "100");
const h = prompt('Высота НЛО: ', "100");
const count = prompt('Количество: ', "20");
const speed = prompt('Скорость: ', "2");

const windowWidth = document.documentElement.clientWidth,
    windowHeight = document.documentElement.clientHeight,
    container = document.querySelector(".container");

let array = [],
    needCheck = true;

function checkSpawn() {
    while (needCheck) {
        needCheck = false;

        for ( const mainObj of array ) {
        for ( const secondObj of array ) {
            if ( mainObj !== secondObj ) {
                let left_topCorner = (secondObj.left <= mainObj.left && mainObj.left <= secondObj.right) &&
                                     (secondObj.top <= mainObj.top && mainObj.top <= secondObj.down);

                let right_topCorner = (secondObj.left <= mainObj.right && mainObj.right <= secondObj.right) &&
                                      (secondObj.top <= mainObj.top && mainObj.top <= secondObj.down);

                let left_downCorner = (secondObj.left <= mainObj.left && mainObj.left <= secondObj.right) &&
                                      (secondObj.top <= mainObj.down && mainObj.down <= secondObj.down);

                let right_downCorner = (secondObj.left <= mainObj.right && mainObj.right <= secondObj.right) &&
                                       (secondObj.top <= mainObj.down && mainObj.down <= secondObj.down);

                if ( left_topCorner || right_topCorner || left_downCorner || right_downCorner ) {

                    mainObj.setRandomPosition();
                    mainObj.updatePosition();
                    console.log('Respawn');
                    needCheck = true;
                }
            }
        }
        }
    }
}

function createObjs (w, h, count, speed) {

    for (let i = 0; i < count; i++) {
        let obj = new Object(w, h, speed, windowWidth, windowHeight);
        array.push(obj);
        container.appendChild(obj.img);
    }

    checkSpawn();
}

function moveObj () {

    for ( const obj of array ) {
        obj.moveElem();
    }
}

function checkCol() {

    for ( const mainObj of array ) {
        for ( const secondObj of array ) {
            mainObj.checkCollision( secondObj );
        }
    }
}

function update() {
    moveObj();
    checkCol();
    requestAnimationFrame(update);
}


createObjs(+w, +h, +count, +speed);
update();
