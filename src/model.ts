export default class Model {
    public model:any
    public isFloor:boolean; 
    public isWall:boolean;
    public isKitchen:boolean;
    public isSofa:boolean;

    constructor(scene:any, name:String, posWidth:number, posHeight:number, posLength:number, rotation:number, scale:number) {

        this.model = document.createElement("a-obj-model")
        this.model.setAttribute("src", "#"+name+"-obj")
        this.model.setAttribute("mtl", "#"+name+"-mtl")
        this.model.setAttribute("geometry")
        this.model.setAttribute("scale", scale + " " + scale + " " + scale)
        this.model.setAttribute("rotation", 0 + " " + rotation + " " + 0)
        this.model.setAttribute("position",  + posWidth + " " + posHeight + " " + posLength)

        scene.appendChild(this.model)

        this.isFloor = this.model.getAttribute("src").includes("floor")
        this.isWall =  this.model.getAttribute("src").includes("wall")
        this.isKitchen =  this.model.getAttribute("src").includes("kitchen")
        this.isSofa =  this.model.getAttribute("src").includes("Sofa")
    }
}