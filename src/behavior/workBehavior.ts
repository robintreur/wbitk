import Character from "../character";

export default class WorkBehavior implements CharacterBehavior {
    private character : Character

    constructor(character : Character){
        this.character = character;
    }

    public performUpdate(){
        let i = (Math.random() * 0.3) + 1;
        this.character.element.setAttribute("scale", "0.2 0.2 0.2");
        this.character.element.setAttribute("radius", i);
    }
}