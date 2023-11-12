import {AppState, GameStatus, Season} from "./state.js";
import { render as gameRender } from "./gameRenderer.js";
import { render as prevRender } from "./previewRenderer.js";
import { render as missionRender } from "./missionRenderer.js";

const state = new AppState()
const game= document.querySelector("#game")
const nextElem = document.querySelector("#nextElem")
const timer = document.querySelector('#timer')
const missions = document.querySelector('#missions')
const springScore = document.querySelector('#springScore')
const summerScore = document.querySelector('#summerScore')
const autumnScore = document.querySelector('#autumnScore')
const winterScore = document.querySelector('#winterScore')
const totalScore = document.querySelector('#totalScore')
const rotate = document.querySelector('#rotate')
const mirror = document.querySelector('#mirror')

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
rotate.addEventListener("click", rotateElement)
mirror.addEventListener("click", mirrorElement)

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
                springScore.innerHTML = `<p class="text-center" id="springScore">${state.springPoints} pont</p>`
                summerScore.innerHTML = `<p class="text-center" id="summerScore">${state.summerPoints} pont</p>`
                break
            case (Season.AUTUMN):
                transSeason = "Ősz"
                summerScore.innerHTML = `<p class="text-center" id="summerScore">${state.summerPoints} pont</p>`
                autumnScore.innerHTML = `<p class="text-center" id="autumnScore">${state.autumnPoints} pont</p>`
                break
            case (Season.WINTER):
                transSeason = "Tél"
                autumnScore.innerHTML = `<p class="text-center" id="autumnScore">${state.autumnPoints} pont</p>`
                winterScore.innerHTML = `<p class="text-center" id="winterScore">${state.winterPoints} pont</p>`
                break
            case (Season.SPRING):
                transSeason = "Tavasz"
                winterScore.innerHTML = `<p class="text-center" id="winterScore">${state.winterPoints} pont</p>`
                springScore.innerHTML = `<p class="text-center" id="springScore">${state.springPoints} pont</p>`
                break
        }
        totalScore.innerHTML = `<p class="text-center" id="totalScore">Összesen: ${state.totalPoints} pont</p>`

        missions.innerHTML = `
        <div class="col-12 border-bottom border-black border-2">
            <p class="mb-0">Jelenlegi évszak: ${transSeason}</p>
        </div>`
        const arr = missionRender(state)
        for (const arrElement of arr) {
            missions.appendChild(arrElement)
        }
    }
}

function rotateElement() {
    state.rotateNextElement()
    nextElem.innerHTML = state.nextElem.time
    nextElem.innerHTML += prevRender(state)
}

function mirrorElement() {
    state.mirrorNextElement()
    nextElem.innerHTML = state.nextElem.time
    nextElem.innerHTML += prevRender(state)
}
