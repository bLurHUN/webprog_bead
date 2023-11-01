import {Field, FieldType} from "./field.js";

export class AppState {
    board = []

    init() {
        this.board = []
        for (let i = 0; i < 11; i++) {
            this.board[i] = []
            for (let j = 0; j < 11; j++) {
                this.board[i][j] = new Field()
            }
        }
        this.board[1][1].type = FieldType.HILL
        this.board[3][8].type = FieldType.HILL
        this.board[5][3].type = FieldType.HILL
        this.board[8][9].type = FieldType.HILL
        this.board[9][5].type = FieldType.HILL
    }
}