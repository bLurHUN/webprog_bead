import {AppState, GameStatus} from "./state.js";
import { render as gameRender } from "./gameRenderer.js";
import { render as prevRender } from "./previewRenderer.js";
import { render as missionRender } from "./missionRenderer.js";

const state = new AppState()
const game= document.querySelector("#game")
const nextElem = document.querySelector("#nextElem")
const timer = document.querySelector('#timer')
const missions = document.querySelector('#missions')

state.init()
game.innerHTML = gameRender(state)
nextElem.innerHTML = state.nextElem.time
nextElem.innerHTML += prevRender(state)
timer.innerHTML = state.time
const arr = missionRender(state)
for (const arrElement of arr) {
    missions.appendChild(arrElement)
}


game.addEventListener("click", handleFieldClick)

function handleFieldClick(event) {
    if (!event.target.matches("img")) {
        return
    }

    if (state.status === GameStatus.OVER) {
        return
    }

    const td = event.target.parentNode
    state.place(td)
    game.innerHTML = gameRender(state)
    timer.innerHTML = state.time
    nextElem.innerHTML = state.nextElem.time
    nextElem.innerHTML += prevRender(state)

    if (state.status === GameStatus.OVER) {
        state.calcMissions()
    }
}
