export default class Object {
    windowWidth;
    windowHeight;
    dx;
    dy;
    randVX;
    randVY;
    img;
    x;
    y;

    constructor(w, h, speed, windowWidth, windowHeight) {
        this.windowWidth = windowWidth;
        this.windowHeight = windowHeight;
        this.w = w;
        this.h = h;
        this.speed = speed;
        this.setRandomPosition();
        this.setInitialDirection();
        this.randVX = Math.floor( Math.random() * 2) - 0.5;
        this.randVY = Math.floor( Math.random() * 2) - 0.5;
        this.createElem();
    }

    createElem() {
        this.img = document.createElement("img");
        this.img.setAttribute('src', "./img.png");
        this.img.style.cssText = `
            width: ${this.w}px;
            height: ${this.h}px;
            position: absolute;
            left: ${this.x}px;
            top: ${this.y}px;
        `
    }

    setRandomPosition() {
        this.x = Math.floor(Math.random() * ( this.windowWidth - this.w ));
        this.y = Math.floor(Math.random() * ( this.windowHeight - this.h ));
    }

    setInitialDirection() {
        this.dx = Math.floor( Math.random() * 2 );
        this.dy = Math.floor( Math.random() * 2 );
        this.dx === 0 ? this.dx = -1 : this.dx = 1;
        this.dy === 0 ? this.dy = -1 : this.dy = 1;
    }

    checkEdge = () => {

        if ( this.top < 0 ) {
            this.dy *= -1;
        }

        if ( this.right > this.windowWidth ) {
            this.dx *= -1;
        }

        if ( this.down > this.windowHeight ) {
            this.dy *= -1;
        }

        if ( this.left < 0 ) {
            this.dx *= -1;
        }
    }

    checkCollision( item ) {
        if (item !== this) {

            let leftRight_Check = item.left <= this.left && this.left <= item.right ||
                                  item.left <= this.right && this.right <= item.right;

            let topDown_Check = item.top <= this.top && this.top <= item.down ||
                                item.top <= this.down && this.down <= item.down;


            if ( Math.abs(this.top - item.down) <= 10 &&  leftRight_Check) {

                this.dy *= -1;
            }

            if ( Math.abs(this.right - item.left) <= 10 && topDown_Check) {

                this.dx *= -1;
            }

            if ( Math.abs(this.down - item.top) <= 10 && leftRight_Check) {

                this.dy *= -1;
            }

            if ( Math.abs(this.left - item.right) <= 10 && topDown_Check) {
                this.dx *= -1;
            }
        }
    }

    updatePosition() {
        this.img.style.left = `${this.x}px`;
        this.img.style.top = `${this.y}px`;
    }

    moveElem() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.img.style.left = `${this.x}px`;
        this.img.style.top = `${this.y}px`;
        this.checkEdge();
    }

    get left() {
        return this.x;
    }

    get top() {
        return this.y;
    }

    get right() {
        return this.x + this.w;
    }

    get down() {
        return this.y + this.h;
    }

    get velocity() {
        return {
            x: this.dx * this.speed * this.randVX,
            y: this.dy * this.speed * this.randVY
        };
    }
}
