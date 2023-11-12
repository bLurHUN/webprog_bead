import {AppState, GameStatus, Season} from "./state.js";
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

    const season = state.season

    const td = event.target.parentNode
    state.place(td)
    game.innerHTML = gameRender(state)
    timer.innerHTML = state.time
    nextElem.innerHTML = state.nextElem.time
    nextElem.innerHTML += prevRender(state)

    if (season !== state.season) {
        let transSeason
        switch (state.season) {
            case (Season.SUMMER):
                transSeason = "Nyár"
                break
            case (Season.AUTUMN):
                transSeason = "Ősz"
                break
            case (Season.WINTER):
                transSeason = "Tél"
                break
        }

        missions.innerHTML = `
        <div class="col-12 border-bottom border-black border-2">
            <p class="mb-0">Jelenlegi évszak: ${transSeason}</p>
        </div>`
        const arr = missionRender(state)
        for (const arrElement of arr) {
            missions.appendChild(arrElement)
        }
    }


    if (state.status === GameStatus.OVER) {
        state.calcMissions([state.actMissions[3], state.actMissions[0]])
    }
}
