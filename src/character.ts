import WalkBehavior from "./behavior/walkBehavior";
import WorkBehavior from "./behavior/workBehavior";

export default class Character {
    public character:any
    private behavior:any
    public observers:Array<any> = new Array<any>();

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

        this.cursorEnter();
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

    private cursorEnter(){
    
        this.character.addEventListener("mouseenter", () => {

            document.body.onkeydown = (e) =>{
                if(e.keyCode == 32){
                    this.setNotify()
                }
            }
        })
    }

    public setNotify(){
        for(let i = 0; i < this.observers.length; i++){
            this.observers[i].notify()
        }
    }

    public subscribe(o:any):void {
        this.observers.push(o)
    }
}