import { AppState } from "./state.js";
import { render as gameRender } from "./gameRenderer.js";
import { render  as prevRender } from "./previewRenderer.js";

const state = new AppState()
const game= document.querySelector("#game")
const nextElem = document.querySelector("#nextElem")

state.init()
game.innerHTML += gameRender(state)
nextElem.innerHTML += state.nextElem.time
nextElem.innerHTML += prevRender(state)