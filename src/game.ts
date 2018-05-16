import 'aframe'
import 'aframe-extras'

import Assets from "./assets";

export default class Game {
  private scene : any;

  constructor() {
    /**
     * Create scene for Aframe
     */
    this.scene = document.createElement("a-scene")

    /**
     *  Load all 3d objects
     */
    new Assets(this.scene)

    document.body.appendChild(this.scene)
  }
}

window.addEventListener("load", () => new Game())