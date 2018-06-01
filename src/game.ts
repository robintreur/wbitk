import 'aframe'
import 'aframe-extras'

import Assets from "./assets";
import Room from './room';

export default class Game {
  private scene : any
  private cursor : any
  private camera : any
  private static instance: Game

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
    let roomWidth:number = 5;
    let roomLength:number = 3;
    
    /**
     * kitchen
     */
    new Room(this.scene, roomWidth, roomLength)



    /**
     * Create cursor & camera
     */
    this.cursor = document.createElement("a-cursor")

    this.camera = document.createElement("a-camera")
    this.camera.setAttribute("look-controls");
    this.camera.setAttribute("wasd-controls");
    this.camera.appendChild(this.cursor)
    this.scene.appendChild(this.camera)


    /**
     * Append full scene
     */
    document.body.appendChild(this.scene)
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