import WalkBehavior from "./behavior/walkBehavior";
import WorkBehavior from "./behavior/workBehavior";

export default class Character {
    public character:any
    private behavior:any

    constructor(scene:any, sort:number) {
        let color:String = "#cc0099";

        this.character = document.createElement("a-cylinder")
        this.character.setAttribute("geometry")
        this.character.setAttribute("height", "7")
        this.character.setAttribute("scale", "0.2 0.2 0.2")
        if(sort){
            color = "#0066ff"
        }
        this.character.setAttribute("color", color);
        this.character.setAttribute("position",  + 1 + " " + 0.7 + " " + -5)

        scene.appendChild(this.character)
    }

    public update(type:String) : void {
        if(type == "walk"){
            this.behavior = new WalkBehavior(this);
        }
        if(type == "work"){
            this.behavior = new WorkBehavior(this);
        }
        this.behavior.performUpdate();
    }
}