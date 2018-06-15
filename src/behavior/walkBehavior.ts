import Character from "../character";

export default class WalkBehavior implements CharacterBehavior {
    private character : Character
    private positionX = 1;
    private speedX = 1;

    constructor(character : Character){
        this.character = character;
    }

    public performUpdate(){
        let i = (Math.random() * 0.1) + 0.2;
        this.character.character.setAttribute("radius", "1");
        this.character.character.setAttribute("scale", "0.2 "+i+" 0.2");
    }
}