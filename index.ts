type RGBColor = [number, number, number];
class EtchASketch {
    colorPicker: HTMLInputElement;
    currColour: string;
    isMousePressed: boolean;
    rainbow: boolean;
    eraser: boolean;
    lastColor:string;

    constructor(colorPicker: HTMLInputElement,
        currColour: string,
        isMousePressed: boolean,
        rainbow: boolean,
        eraser: boolean,
        lastColor:string) {
        this.colorPicker = colorPicker;
        this.currColour = currColour;
        this.isMousePressed = isMousePressed;
        this.rainbow = rainbow;
        this.eraser = eraser;
        this.lastColor = lastColor;
    }

   
    
                createGrid(size:number) : void{
                    const gridSizeH2 = document.querySelector('.grid-size') as HTMLHeadingElement
                    gridSizeH2.textContent = `Current Grid Size: ${size} x ${size}`
                    let etchSketchGrid = document.querySelector('.etch-grid') as HTMLElement
                    if(etchSketchGrid !== null){
                        etchSketchGrid.innerHTML = '';
                    }
                
                        etchSketchGrid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
                        
                        for(var i =0;i < size;++i){
                            for(var j =0;j < size;++j){
                                const div = document.createElement('div')
                                div.classList.add('grid-div')
                            
                                etchSketchGrid.appendChild(div)
                            }
                        }
                    
                }

                updateButtonTextContent(){
                    const eraseButton = document.querySelector('.eraser-button') as HTMLButtonElement;
                    const rainbowButton = document.querySelector('.rainbow-button') as HTMLButtonElement;
                    eraseButton.textContent = `Toggle Eraser ${etch.eraser ? 'off' : 'on'}`
                    rainbowButton.textContent = `Toggle Rainbow ${etch.rainbow ? 'off' : 'on'}`
                }


                clear() : void{
                    let divs = document.querySelectorAll('.grid-div')

                    for(let i =0;i<divs.length;++i){
                        const currentDiv = divs[i] as HTMLDivElement
                        if(currentDiv.style.backgroundColor === 'white')continue;
                        currentDiv.style.backgroundColor = 'white'
                    }

                }

                getRandomRGBColor(): RGBColor {
                const getRandomComponent = () => Math.floor(Math.random() * 255);

                return [getRandomComponent(), getRandomComponent(), getRandomComponent()];
                }

            submitListener(e:MouseEvent){
                e.preventDefault()
                const number = (document.querySelector('.number-input') as HTMLInputElement).value 
                console.log(number)
                etch.createGrid(parseFloat(number))
            }


            allowChangeColor(e:MouseEvent){
                const target = (e.target as HTMLElement)
                if(target.classList[0] === 'grid-div'){
                    target.style.backgroundColor = `${etch.currColour}`
                }
                etch.isMousePressed = true
            }

            stopColourOnMouseUp(){
                etch.isMousePressed = false
            }

            changeDivColours(e:MouseEvent){
                const target = (e.target as HTMLElement)
                console.log(etch.lastColor)
                if(etch.rainbow)etch.currColour = etch.getRandomRGBColor().toString()

                if(target.classList[0] !== 'grid-div' || !etch.isMousePressed)return;

                if(target.classList[0] === 'grid-div' && target.style.backgroundColor !== etch.currColour){
                    target.style.backgroundColor = etch.rainbow ?`rgb(${etch.currColour})` : `${etch.currColour}`
                }

                if(!etch.eraser){
                    etch.lastColor = etch.rainbow ? 'rainbow'   :   etch.currColour;
                }

            }

                allowEraser(){
                    etch.eraser = !etch.eraser
                    console.log('eraser toggled =  = ',etch.eraser)
                    if(etch.eraser){
                        etch.currColour=`#FFFFFF`;
                    }

                    if(!etch.eraser){
                       if(etch.lastColor ==='rainbow'){
                        etch.rainbow = true
                       }else{
                        etch.currColour = etch.lastColor
                       }
                    }


                    if(etch.rainbow && etch.eraser){
                        etch.rainbow = false;
                    }
                    etch.updateButtonTextContent()
                }

                allowRainbow(e:MouseEvent){
                    etch.rainbow = !etch.rainbow
                    if(!etch.rainbow){
                        etch.currColour=` ${etch.colorPicker.value}`;
                    }
                    if(etch.rainbow){
                        etch.lastColor = 'rainbow'
                    }
                    etch.updateButtonTextContent()
                }

                updateColor(e: Event): void {
                const newColor = (e.target as HTMLInputElement).value;
                etch.currColour = newColor
                etch.rainbow=false;
            }

            addListeners(){
            const rainbowButton = document.querySelector('.rainbow-button') as HTMLButtonElement 
            etch.colorPicker.addEventListener('change', etch.updateColor);
            const eraseButton = document.querySelector('.eraser-button') as HTMLButtonElement
            const resetButton = document.querySelector('.clear') as HTMLButtonElement
            const addRowButton = document.querySelector('.row-button') as HTMLButtonElement
            rainbowButton.addEventListener('click', etch.allowRainbow);
            addRowButton.addEventListener('click', etch.submitListener)
            document.addEventListener('pointerover', etch.changeDivColours)
            document.addEventListener('mousedown', etch.allowChangeColor)
            document.addEventListener('mouseup', etch.stopColourOnMouseUp)
            resetButton.addEventListener('click', etch.clear)
            eraseButton.addEventListener('click', etch.allowEraser)
            
            }
  
}
const colorPicker = document.querySelector('.color-picker') as HTMLInputElement;
colorPicker.value = '#000000'

const etch = new EtchASketch(colorPicker,'#000000', false, false, false,'#000000')

etch.createGrid(16)
etch.addListeners()


