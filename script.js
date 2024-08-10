function getTemplate(state) {
    return `
    <div class="slider-before" data-type="resize">
        <div class="slider-resize" data-type="resize"></div>
    </div>
    <div class="slider-after"></div>
    `;
}

class Slider {
    constructor(selector, state) {
        this.$slider = document.getElementById(selector);
        this.state = state;
        this.#render(this.state);
        this.#initListeners();
    }

    #render(state) {
        this.$slider.innerHTML = getTemplate(state);
    }

    #initListeners() {
        this.mouseDownHandler = this.mouseDownHandler.bind(this);
        this.mouseUpHandler = this.mouseUpHandler.bind(this);
        this.moveHandler = this.moveHandler.bind(this);
        
        this.$slider.addEventListener('mousedown', this.mouseDownHandler);
        this.$slider.addEventListener('mouseup', this.mouseUpHandler);
    }

    mouseDownHandler(e) {
        if (e.target.dataset.type === 'resize') {
            this.$slider.addEventListener('mousemove', this.moveHandler);
            this.startX = e.clientX;
            this.startWidth = this.$slider.querySelector('.slider-before').offsetWidth;
            console.log('Mouse down');
        }
    }

    mouseUpHandler(e) {
        this.$slider.removeEventListener('mousemove', this.moveHandler);
        console.log('Mouse up');
    }

    moveHandler(e) {
        const newWidth = this.startWidth + (e.clientX - this.startX);
        this.$slider.querySelector('.slider-before').style.width = `${newWidth}px`;
    }
}

const slider = new Slider('slider', {});
