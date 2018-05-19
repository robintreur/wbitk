import Model from './model'

export default class Room {
    constructor(scene:any, width:number, length:number) {

        let posWidth = -width;
        let posLength = -4;

        for(let i = 0; i<=length; i++){
            posLength-=2;
            new Model(scene, "wall", posWidth, posLength, 90)
        }

        for(let i = 0; i<=width; i++){
            posWidth+=2;
            new Model(scene, "wall", posWidth, posLength, 0)
        }

        for(let i = 0; i<=length; i++){
            posLength+=2;
            new Model(scene, "wall", posWidth, posLength, -90)
        }

    }
}