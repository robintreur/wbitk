import Model from "./model";
import Character from "./character";
import Game from "./game";

export default class ClickableModel extends Model {
    public model:any
    private posWidth:number
    private posLength:number
    private posHeight:number
    private scale:number
    private woman:Character;
    private count:number = 0;
    public countDown:any;
    public countDownInner:any;
    public countDownCounter:number = 100;

    constructor(scene:any, name:String, posWidth:number, posHeight:number, posLength:number, rotation:number, scale:number, woman:Character) {
        super(scene, name, posWidth, posHeight, posLength, rotation, scale);
        
        this.posWidth = posWidth
        this.posLength = posLength
        this.posHeight = posHeight
        this.scale = scale
        this.woman = woman;
            
        woman.subscribe(this);

        this.cursorEnter();
    }

    public notify(){
        if(this.countDownCounter <= 50){
            this.countDownCounter += 5;
        }
    }

    private cursorEnter(){
    
        this.model.addEventListener("mouseenter", () => {
            if(!this.isFloor){
                let scale = this.scale + 0.02
                this.model.setAttribute("scale",  this.scale + " " + scale + " " + this.scale)

                this.count++
                if(this.count == 1){
                    this.createCountDown();
                }

                this.showCountDown();
            }

            document.body.onkeydown = (e) =>{
                if(e.keyCode == 32){
                    let position = 2;
                    if(this.isFloor) position = 5
                    if(this.isSofa) position = 4

                    let clicked = document.createElement("a-box")
                    clicked.setAttribute("scale", 1 + " " + 1 + " " + 0.5)
                    clicked.setAttribute("position",  + -position + " " + 0 + " " + position)
                    clicked.setAttribute("rotation", -90 + " " + 0.1 + " " + 0)

                    let AnimationLength = 30;
                    for (let i = 0; i <= AnimationLength; i++) {
                        setTimeout(() =>{
                            clicked.setAttribute("scale", i*0.2 + " " + i*0.2 + " " + i*0.4);
                            clicked.setAttribute("material", "transparent: true; opacity:" + (1 - ((1 / AnimationLength) * i)));
                            
                            if (i==AnimationLength) this.model.removeChild(clicked)
                        }, i * 10);
                    }

                    this.model.appendChild(clicked)

                    let getPosition = this.model.getAttribute("position");
                    let womanPosition = this.woman.element.getAttribute("position");

                    this.resetCountDown();

                    Game.getInstance().womanGoToPosition(getPosition, womanPosition);
                }
            }
        })
        this.model.addEventListener("mouseleave", () => {
            if(!this.isFloor){
                this.model.setAttribute("scale",  this.scale + " " + this.scale + " " + this.scale)
            }

            this.hideCountDown();

            document.body.onkeydown = null;
        })
    }

    public createCountDown(){
        this.countDown = document.createElement('count-down')
        this.countDownInner = document.createElement('counter')
        this.countDown.appendChild(this.countDownInner);
        document.body.appendChild(this.countDown);
    }

    public resetCountDown(){
        this.countDownCounter = 100;
    }

    public showCountDown(){
        this.countDown.classList.add("show");
    }

    public hideCountDown(){
        this.countDown.classList.remove("show");
    }
}