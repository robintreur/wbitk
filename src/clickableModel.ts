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
        let enter = false
        this.model.addEventListener("mouseenter", () => {
            console.log(this.model);
            let scale = this.scale + 0.02
            this.model.setAttribute("scale",  scale + " " + scale + " " + scale)
            
        })
        this.model.addEventListener("mouseleave", () => {
            let scale = this.scale
            this.model.setAttribute("scale",  scale + " " + scale + " " + scale)
        })
    }
}