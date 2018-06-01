import 'aframe'
import 'aframe-extras'

import Assets from "./assets";
import Room from './room';

export default class Game {
  private scene : any
  private cursor : any
  private camera : any
  roomWidth:number
  roomLength:number
  private static instance: Game
  private gameRequestAnimationFrame:number;

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
     * kitchen
     */
    new Room(this.scene, this.roomWidth, this.roomLength)



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

    let maxPosX = this.roomWidth
    let minPosX = -this.roomWidth
    let maxPosZ = 2
    let minPosZ = -6 - this.roomLength
    
    console.log(cameraPos)
    if(cameraPosZ >= maxPosZ) this.camera.setAttribute("position", cameraPosX + " " + cameraPosY + " " + maxPosZ)
    if(cameraPosZ <= minPosZ) this.camera.setAttribute("position", cameraPosX + " " + cameraPosY + " " + minPosZ)
    if(cameraPosX >= maxPosX) this.camera.setAttribute("position", maxPosX + " " + cameraPosY + " " + cameraPosZ)
    if(cameraPosX <= minPosX) this.camera.setAttribute("position", minPosX + " " + cameraPosY + " " + cameraPosZ)
    
    this.gameRequestAnimationFrame = requestAnimationFrame(() => this.gameLoop());
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