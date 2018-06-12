import 'aframe'
import 'aframe-extras'

import Assets from "./assets";
import Room from './room';
import Character from './character';
import PosCharacter from './posCharacter';

export default class Game {
  private scene : any
  private cursor : any
  private camera : any
  roomWidth:number
  roomLength:number
  private static instance: Game
  private gameRequestAnimationFrame:number;

  public game:any;

  public man:Character;
  public woman:Character;
  public womanToPosition:any;
  public womanPosition:any;

  private constructor() {

    /**
     * Create scene for Aframe
     */
    this.scene = document.createElement("a-scene")

    /**
     * Load all 3d objects
     */
    new Assets(this.scene)

    /**
     * Create Room
     */
    this.roomWidth = 5;
    this.roomLength = 3;

    /**
     * Characters
     */
    this.woman = new Character(this.scene, 0);
    this.man = new PosCharacter(this.scene, 1, [(this.roomWidth - 3), 0.7 , (-3.5 - this.roomLength * 2)], [0, 0, 90]);
    
    /**
     * kitchen
     */
    let room = new Room(this.scene, this.roomWidth, this.roomLength, this.woman)

    /**
     * Create cursor & camera
     */
    this.cursor = document.createElement("a-cursor")

    this.camera = document.createElement("a-camera")
    this.camera.appendChild(this.cursor)
    this.scene.appendChild(this.camera)

    /**
     * Append full scene
     */
    document.body.appendChild(this.scene)

    this.gameRequestAnimationFrame = requestAnimationFrame(() => this.gameLoop());
  }

  private gameLoop(){

    let cameraPos = this.camera.getAttribute("position");
    let cameraPosZ : number = cameraPos.z
    let cameraPosX : number = cameraPos.x
    let cameraPosY : number = cameraPos.y
    let littleSpacing : number = 0.3

    let maxPosX = this.roomWidth - littleSpacing
    let minPosX = -this.roomWidth + littleSpacing
    let maxPosZ = 2
    let minPosZ = -6 - this.roomLength - littleSpacing
    
    if(cameraPosZ >= maxPosZ) this.camera.setAttribute("position", cameraPosX + " " + cameraPosY + " " + maxPosZ)
    if(cameraPosZ <= minPosZ) this.camera.setAttribute("position", cameraPosX + " " + cameraPosY + " " + minPosZ)
    if(cameraPosX >= maxPosX) this.camera.setAttribute("position", maxPosX + " " + cameraPosY + " " + cameraPosZ)
    if(cameraPosX <= minPosX) this.camera.setAttribute("position", minPosX + " " + cameraPosY + " " + cameraPosZ)

    if(this.womanToPosition != undefined){
      this.womanGoToPosition(this.womanToPosition, this.womanPosition);
    }
    
    this.gameRequestAnimationFrame = requestAnimationFrame(() => this.gameLoop());

  }

  public womanGoToPosition(toPosition:any, womanPosition:any){
    let staps = 0.1;
    this.womanToPosition = toPosition;
    this.womanPosition = womanPosition;
    
    if(this.womanPosition.x > this.womanToPosition.x + staps || this.womanPosition.x < this.womanToPosition.x - staps){
      if(this.womanPosition.x > this.womanToPosition.x){
        this.womanPosition.x = this.womanPosition.x - staps;
      }else if(this.womanPosition.x < this.womanToPosition.x){
        this.womanPosition.x = this.womanPosition.x + staps;
      }
    }

    if(this.womanPosition.z > this.womanToPosition.z + staps || this.womanPosition.z < this.womanToPosition.z - staps){
      if(this.womanPosition.z > this.womanToPosition.z){
        this.womanPosition.z = this.womanPosition.z - staps;
      }else if(this.womanPosition.z < this.womanToPosition.z){
        this.womanPosition.z = this.womanPosition.z + staps;
      }
    }

    this.woman.character.setAttribute("position", womanPosition.x + " " + 0.7 + " " + womanPosition.z);
  }

  /**
   * Singleton
   */
  public static getInstance() {
    if (! Game.instance) {
    Game.instance = new Game()  
    }
    return Game.instance
  }
}

window.addEventListener("load", () => Game.getInstance())