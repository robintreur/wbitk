import 'aframe'
import 'aframe-extras'

import Assets from "./assets";
import Room from './room';
import Character from './character';
import PosCharacter from './posCharacter';
import Furniture from './furniture';
import ClickableModel from './clickableModel';
import WalkBehavior from './behavior/walkBehavior';
import WorkBehavior from './behavior/workBehavior';

export default class Game {
  private static instance: Game
  private scene : any
  private cursor : any
  private camera : any
  public roomWidth:number
  public roomLength:number
  private gameRequestAnimationFrame:number

  // public game:any;

  public man:Character;
  public woman:Character;
  public womanToPosition:any;
  public womanPosition:any;
  public furniture:Furniture;
  public furnitureItem = new Array()
  private gameLoopCounter:number = 0

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
    this.roomWidth = 6
    this.roomLength = 4

    /**
     * Characters
     */
    this.woman = new Character(this.scene, 0)
    this.man = new PosCharacter(this.scene, 1, [(this.roomWidth - 3), 0.7 , (-3.5 - this.roomLength * 2)], [0, 0, 90])
    
    /**
     * Furniture 
     */
    this.furniture = new Furniture(this.scene, this.roomWidth, this.roomLength, this.woman)
    
    /**
     * Create models from furniture
     */
    this.furniture.furniture.forEach(element => {
      this.furnitureItem.push(new ClickableModel(this.scene, element[0], element[1], element[2], element[3], element[4], element[5], this.woman))
    });

    /**
     * Create full room
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

    this.gameRequestAnimationFrame = requestAnimationFrame(() => this.gameLoop())

  }

  private gameLoop(){
    this.gameLoopCounter++;

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
      this.womanGoToPosition(this.womanToPosition, this.womanPosition)
    }
    
    /**
     * countDown for cleaning the furniture
     */
    setInterval(() =>{
      for(let i = 0; i < this.furnitureItem.length; i++){ 
        this.furnitureItem[i].countDownCounter--

        if(this.furnitureItem[i].countDownCounter <= 0){
          this.gameOver();
        }else if(this.furnitureItem[i].countDownInner){
          this.furnitureItem[i].countDownInner.setAttribute("style", "height:"+this.furnitureItem[i].countDownCounter+"%;top: calc(100% - "+this.furnitureItem[i].countDownCounter+"%);")
        }
      }
    }, 2500 * this.gameLoopCounter)
    
    this.gameRequestAnimationFrame = requestAnimationFrame(() => this.gameLoop())

  }

  /**
   * Let woman walk to clicked position
   * @param toPosition 
   * @param womanPosition 
   */
  public womanGoToPosition(toPosition:any, womanPosition:any){
    let steps = 0.1;
    this.womanToPosition = toPosition
    this.womanPosition = womanPosition
    
    let walkingX = this.womanPosition.x > this.womanToPosition.x + steps || this.womanPosition.x < this.womanToPosition.x - steps
    let walkingZ = this.womanPosition.z > this.womanToPosition.z + steps || this.womanPosition.z < this.womanToPosition.z - steps

    if(walkingX){
      if(this.womanPosition.x > this.womanToPosition.x){
        this.womanPosition.x = this.womanPosition.x - steps
      }else if(this.womanPosition.x < this.womanToPosition.x){
        this.womanPosition.x = this.womanPosition.x + steps
      }

      this.woman.setBehavior(new WalkBehavior(this.woman))
    }

    if(walkingZ){
      if(this.womanPosition.z > this.womanToPosition.z){
        this.womanPosition.z = this.womanPosition.z - steps
      }else if(this.womanPosition.z < this.womanToPosition.z){
        this.womanPosition.z = this.womanPosition.z + steps
      }

      this.woman.setBehavior(new WalkBehavior(this.woman))
    }

    if(!walkingX && !walkingZ){
      this.woman.setBehavior(new WorkBehavior(this.woman))
    }

    this.woman.update()
    this.woman.element.setAttribute("position", womanPosition.x + " " + 0.7 + " " + womanPosition.z)
  }

  /**
   * Game over
   */
  public gameOver(){
    console.log("GAME OVER")
    if(this.woman.element){
      this.woman.element = undefined;
    }
  }

  /**
   * Singleton
   */
  static getInstance() {
      if(! Game.instance) {
        Game.instance = new Game()
      }
      return Game.instance
  }
}

window.addEventListener("load", () => Game.getInstance())