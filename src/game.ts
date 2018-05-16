import 'aframe'
import 'aframe-extras'

import Assets from "./assets";

export default class Game {
  private scene : any
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