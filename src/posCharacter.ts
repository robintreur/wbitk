import Character from "./character";

export default class PosCharacter extends Character {
    public character:any

    constructor(scene:any, sort:number, pos:Array<number>, rotation:Array<number>) {
        super(scene, sort)

        console.log(pos[1]);
        this.character.setAttribute("position", pos[0] + " " + pos[1] + " " + pos[2] );
        this.character.setAttribute("rotation", rotation[0] + " " + rotation[1] + " " + rotation[2] );
    }
}