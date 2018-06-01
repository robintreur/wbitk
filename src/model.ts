export default class Model {
    private model:any
    private posWidth:number
    private posLength:number
    private posHeight:number
    private scale:number

    constructor(scene:any, name:String, posWidth:number, posHeight:number, posLength:number, rotation:number, scale:number) {
        this.posWidth = posWidth
        this.posLength = posLength
        this.posHeight = posHeight
        this.scale = scale

        this.model = document.createElement("a-obj-model")
        this.model.setAttribute("src", "#"+name+"-obj")
        this.model.setAttribute("mtl", "#"+name+"-mtl")
        this.model.setAttribute("scale", this.scale + " " + this.scale + " " + this.scale)
        this.model.setAttribute("rotation", 0 + " " + rotation + " " + 0)
        this.model.setAttribute("position",  + this.posWidth + " " + this.posHeight + " " + this.posLength)

        scene.appendChild(this.model)

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