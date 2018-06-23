/// <reference path="behavior/characterBehavior.ts" />

import WalkBehavior from "./behavior/walkBehavior";
import WorkBehavior from "./behavior/workBehavior";

export default class Character {
    public element:any
    private behavior:any
    public observers:Array<any> = new Array<any>();

    constructor(scene:any, sort:number) {
        let color:String = "#cc0099";

        this.element = document.createElement("a-cylinder")
        this.element.setAttribute("geometry")
        this.element.setAttribute("height", "7")
        this.element.setAttribute("scale", "0.2 0.2 0.2")
        if(sort){
            color = "#0066ff"
        }
        this.element.setAttribute("color", color);
        this.element.setAttribute("position",  + 1 + " " + 0.7 + " " + -5)

        scene.appendChild(this.element)

        this.cursorEnter();
    }

    public setBehavior(b: CharacterBehavior) {
        this.behavior = b
    }

    public update() : void {
        this.behavior.performUpdate();
    }

    private cursorEnter(){
    
        this.element.addEventListener("mouseenter", () => {

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