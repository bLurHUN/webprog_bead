import { AppState } from "./state.js";
import {render} from "./renderer.js";

const state = new AppState()
const game= document.querySelector("#game")

state.init()
game.innerHTML += render(state)