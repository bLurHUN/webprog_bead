import { AppState } from "./state.js";
import { render as gameRender } from "./gameRenderer.js";
import { render  as prevRender } from "./previewRenderer.js";
import {FieldType} from "./field.js";

const state = new AppState()
const game= document.querySelector("#game")
const nextElem = document.querySelector("#nextElem")


state.init()
game.innerHTML = gameRender(state)
nextElem.innerHTML = state.nextElem.time
nextElem.innerHTML += prevRender(state)


game.addEventListener("click", handleFieldClick)

function handleFieldClick(event) {
    if (!event.target.matches("img")) {
        return
    }

    const td = event.target.parentNode
    const tr = td.parentNode
    const x = td.cellIndex
    const y = tr.rowIndex

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if ((x + j) >= 11 || (y + i) >= 11 || state.board[y + i][x + j].type !== FieldType.EMPTY) {
                console.log("nem jó :(")
                return
            } else {
                console.log("RENDER")
                state.board[y + i][x + j].type = state.preview[i][j].type
            }
        }
    }

    console.log("yay")
    game.innerHTML = gameRender(state)
}

