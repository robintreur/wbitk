export default class Model {
    public model:any

    constructor(scene:any, name:String, posWidth:number, posHeight:number, posLength:number, rotation:number, scale:number) {

        this.model = document.createElement("a-obj-model")
        this.model.setAttribute("src", "#"+name+"-obj")
        this.model.setAttribute("mtl", "#"+name+"-mtl")
        this.model.setAttribute("scale", scale + " " + scale + " " + scale)
        this.model.setAttribute("rotation", 0 + " " + rotation + " " + 0)
        this.model.setAttribute("position",  + posWidth + " " + posHeight + " " + posLength)

        scene.appendChild(this.model)
    }
}