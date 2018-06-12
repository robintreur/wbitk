import Model from './model'
import ClickableModel from './clickableModel'
import Furniture from './furniture'
import Character from './character';

export default class Room {

    constructor(scene:any, width:number, length:number, woman:Character) {

        let posWidth:number = -width
        let posLength:number = -4
        let wall = "wall"
        let wallWindow:Array<String> = ["wallWindow","wallWindowSlide"]
        let random:number
        let getWall

        /**
         * Left wall
         */
        for(let i = 0; i<length; i++){
            posLength-=2;
            random = Math.floor(Math.random() * 2);

            if(i == 1 || i == 4) getWall = wallWindow[random]
            else getWall = wall

            new Model(scene, getWall, posWidth, 0, posLength, 90, 0.2)
        }

        /**
         * Back wall
         */
        for(let i = 0; i<width; i++){
            posWidth+=2;
            
            if (i == 2)  new Model(scene, "wallDoorway", posWidth, 0, posLength, 0, 0.2)
            else new Model(scene, wall, posWidth, 0, posLength, 0, 0.2)
        }

        /**
         * Right wall
         */
        for(let i = 0; i<length; i++){
            posLength+=2;
            random = Math.floor(Math.random() * 2);

            if(i == 3 || i == 2) getWall = wallWindow[random]
            else getWall = wall

            new Model(scene, getWall, posWidth, 0, posLength, -90, 0.2)
        }

        /**
         * Floor
         */
        let som = width*length;
        posLength = -4;
        posWidth = -(width+2);

        for(let i = 0; i<som; i++){
            console.log(posWidth, posLength);

            if((i % width) == 0){ posWidth = -(width+2); posLength -=2 }
            posWidth+=2

            new Model(scene, "floorFull", posWidth, -0.1, posLength, 90, 0.2)
        }

        /**
         * Furniture 
         */
        let furniture : Furniture = new Furniture(scene, width, length, woman);

    }
}