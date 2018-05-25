export default class Model {
    constructor(scene:any, name:String, posWidth:number, posHeight:number, posLength:number, rotation:number, scale:number) {
        let model = document.createElement("a-obj-model")
        model.setAttribute("src", "#"+name+"-obj")
        model.setAttribute("mtl", "#"+name+"-mtl")
        model.setAttribute("scale", scale + " " + scale + " " + scale)
        model.setAttribute("rotation", 0 + " " + rotation + " " + 0)
        model.setAttribute("position",  + posWidth + " " + posHeight + " " + posLength)
        
        scene.appendChild(model)

    }
}