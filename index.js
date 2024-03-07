"use strict";
class EtchASketch {
    constructor(colorPicker, currColour, isMousePressed, rainbow, eraser, lastColor) {
        this.colorPicker = colorPicker;
        this.currColour = currColour;
        this.isMousePressed = isMousePressed;
        this.rainbow = rainbow;
        this.eraser = eraser;
        this.lastColor = lastColor;
    }
    createGrid(size) {
        const gridSizeH2 = document.querySelector('.grid-size');
        gridSizeH2.textContent = `Current Grid Size: ${size} x ${size}`;
        let etchSketchGrid = document.querySelector('.etch-grid');
        if (etchSketchGrid !== null) {
            etchSketchGrid.innerHTML = '';
        }
        etchSketchGrid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
        for (var i = 0; i < size; ++i) {
            for (var j = 0; j < size; ++j) {
                const div = document.createElement('div');
                div.classList.add('grid-div');
                etchSketchGrid.appendChild(div);
            }
        }
    }
    updateButtonTextContent() {
        const eraseButton = document.querySelector('.eraser-button');
        const rainbowButton = document.querySelector('.rainbow-button');
        eraseButton.textContent = `Toggle Eraser ${etch.eraser ? 'off' : 'on'}`;
        rainbowButton.textContent = `Toggle Rainbow ${etch.rainbow ? 'off' : 'on'}`;
    }
    clear() {
        let divs = document.querySelectorAll('.grid-div');
        for (let i = 0; i < divs.length; ++i) {
            const currentDiv = divs[i];
            if (currentDiv.style.backgroundColor === 'white')
                continue;
            currentDiv.style.backgroundColor = 'white';
        }
    }
    getRandomRGBColor() {
        const getRandomComponent = () => Math.floor(Math.random() * 255);
        return [getRandomComponent(), getRandomComponent(), getRandomComponent()];
    }
    submitListener(e) {
        e.preventDefault();
        const number = document.querySelector('.number-input').value;
        console.log(number);
        etch.createGrid(parseFloat(number));
    }
    allowChangeColor(e) {
        const target = e.target;
        if (target.classList[0] === 'grid-div') {
            target.style.backgroundColor = `${etch.currColour}`;
        }
        etch.isMousePressed = true;
    }
    stopColourOnMouseUp() {
        etch.isMousePressed = false;
    }
    changeDivColours(e) {
        const target = e.target;
        console.log(etch.lastColor);
        if (etch.rainbow)
            etch.currColour = etch.getRandomRGBColor().toString();
        if (target.classList[0] !== 'grid-div' || !etch.isMousePressed)
            return;
        if (target.classList[0] === 'grid-div' && target.style.backgroundColor !== etch.currColour) {
            target.style.backgroundColor = etch.rainbow ? `rgb(${etch.currColour})` : `${etch.currColour}`;
        }
        if (!etch.eraser) {
            etch.lastColor = etch.rainbow ? 'rainbow' : etch.currColour;
        }
    }
    allowEraser() {
        etch.eraser = !etch.eraser;
        console.log('eraser toggled =  = ', etch.eraser);
        if (etch.eraser) {
            etch.currColour = `#FFFFFF`;
        }
        if (!etch.eraser) {
            if (etch.lastColor === 'rainbow') {
                etch.rainbow = true;
            }
            else {
                etch.currColour = etch.lastColor;
            }
        }
        if (etch.rainbow && etch.eraser) {
            etch.rainbow = false;
        }
        etch.updateButtonTextContent();
    }
    allowRainbow(e) {
        etch.rainbow = !etch.rainbow;
        if (!etch.rainbow) {
            etch.currColour = ` ${etch.colorPicker.value}`;
        }
        if (etch.rainbow) {
            etch.lastColor = 'rainbow';
        }
        etch.updateButtonTextContent();
    }
    updateColor(e) {
        const newColor = e.target.value;
        etch.currColour = newColor;
        etch.rainbow = false;
    }
    addListeners() {
        const rainbowButton = document.querySelector('.rainbow-button');
        etch.colorPicker.addEventListener('change', etch.updateColor);
        const eraseButton = document.querySelector('.eraser-button');
        const resetButton = document.querySelector('.clear');
        const addRowButton = document.querySelector('.row-button');
        rainbowButton.addEventListener('click', etch.allowRainbow);
        addRowButton.addEventListener('click', etch.submitListener);
        document.addEventListener('pointerover', etch.changeDivColours);
        document.addEventListener('mousedown', etch.allowChangeColor);
        document.addEventListener('mouseup', etch.stopColourOnMouseUp);
        resetButton.addEventListener('click', etch.clear);
        eraseButton.addEventListener('click', etch.allowEraser);
    }
}
const colorPicker = document.querySelector('.color-picker');
colorPicker.value = '#000000';
const etch = new EtchASketch(colorPicker, '#000000', false, false, false, '#000000');
etch.createGrid(16);
etch.addListeners();
