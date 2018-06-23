import Character from "./character";

export default class PosCharacter extends Character {
    public element:any

    constructor(scene:any, sort:number, pos:Array<number>, rotation:Array<number>) {
        super(scene, sort)

        this.element.setAttribute("position", pos[0] + " " + pos[1] + " " + pos[2] );
        this.element.setAttribute("rotation", rotation[0] + " " + rotation[1] + " " + rotation[2] );
    }
}