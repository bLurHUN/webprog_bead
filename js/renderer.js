import {FieldType} from "./field.js";

export function render(state) {
    return renderBoard(state.board)
}

function renderBoard(board) {
    return `<table class="table table-borderless">${board.map(renderRow).join("")}</table>`
}

function renderRow(row) {
    return `<tr>${row.map(renderField).join("")}</tr>`
}

function renderField(field) {
    switch (field.type) {
        case (FieldType.HILL):
            return `<td class="p-1"><img src="../assets/tiles/mountain_tile.png" alt="Hill" class="img-fluid"></td>`
        case (FieldType.WATER):
            return `<td class="p-1"><img src="../assets/tiles/water_tile.png" alt="Water" class="img-fluid"></td>`
        case (FieldType.FARM):
            return `<td class="p-1"><img src="../assets/tiles/plains_tile.png" alt="Farm" class="img-fluid"></td>`
        case (FieldType.FOREST):
            return `<td class="p-1"><img src="../assets/tiles/forest_tile.png" alt="Forest" class="img-fluid"></td>`
        case (FieldType.VILLAGE):
            return `<td class="p-1"><img src="../assets/tiles/village_tile.png" alt="Village" class="img-fluid"></td>`
        case (FieldType.EMPTY):
            return `<td class="p-1"><img src="../assets/tiles/base_tile.png" alt="Empty" class="img-fluid"></td>`
    }
}