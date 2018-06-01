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
            let scale = this.scale + 0.02
            this.model.setAttribute("scale",  this.scale + " " + scale + " " + this.scale)
        })
        this.model.addEventListener("mouseleave", () => {
            this.model.setAttribute("scale",  this.scale + " " + this.scale + " " + this.scale)
        })
    }
}