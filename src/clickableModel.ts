import Model from "./model";

export default class ClickableModel extends Model {
    public model:any
    private posWidth:number
    private posLength:number
    private posHeight:number
    private scale:number

    constructor(scene:any, name:String, posWidth:number, posHeight:number, posLength:number, rotation:number, scale:number) {
        super(scene, name, posWidth, posHeight, posLength, rotation, scale);

        this.posWidth = posWidth
        this.posLength = posLength
        this.posHeight = posHeight
        this.scale = scale

        this.cursorEnter();

    }

    private cursorEnter(){

        this.model.addEventListener("mouseenter", () => {
            if(this.isKitchen){
                let scale = this.scale + 0.02
                this.model.setAttribute("scale",  this.scale + " " + scale + " " + this.scale)
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
                }
            }
        })
        this.model.addEventListener("mouseleave", () => {
            if(this.isKitchen){
                this.model.setAttribute("scale",  this.scale + " " + this.scale + " " + this.scale)
            }

            document.body.onkeydown = null;
        })
    }
}