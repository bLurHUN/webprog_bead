import {Field, FieldType} from "./field.js";

export const GameStatus = {
    ACTIVE: 1,
    OVER: 2
}
export class AppState {
    board = []
    nextElem = []
    preview = []
    time
    status = GameStatus
    actMissions = []
    r

    init() {
        this.time = 28
        this.status = GameStatus.ACTIVE

        //Board
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

        //Next element
        this.selectNextElement()

        //Missions
        let selected = []
        let mr
        while (this.actMissions.length < 4) {
            mr = Math.floor(Math.random() * missions.basic.length)
            if (!selected.includes(mr)) {
                selected.push(mr)
                this.actMissions.push(missions.basic[mr].title)
            }
        }
    }

    selectNextElement() {
        if (elements.length === 0) {
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    this.preview[i] = []
                    for (let j = 0; j < 3; j++) {
                        this.preview[i][j] = new Field()
                        this.preview[i][j].type = FieldType.EMPTY
                    }
                }
            }
            this.status = GameStatus.OVER
            return
        }

        this.r = Math.floor(Math.random() * elements.length)
        this.nextElem = elements[this.r]

        for (let i = 0; i < 3; i++) {
            this.preview[i] = []
            for (let j = 0; j < 3; j++) {
                this.preview[i][j] = new Field()
                if (this.nextElem.shape[i][j] === 1) {
                    switch (this.nextElem.type) {
                        case 'town':
                            this.preview[i][j].type = FieldType.VILLAGE
                            break
                        case 'water':
                            this.preview[i][j].type = FieldType.WATER
                            break
                        case 'forest':
                            this.preview[i][j].type = FieldType.FOREST
                            break
                        case 'farm':
                            this.preview[i][j].type = FieldType.FARM
                            break
                    }
                } else {
                    this.preview[i][j].type = FieldType.EMPTY
                }
            }
        }
    }

    place(td) {
        const tr = td.parentNode
        const x = td.cellIndex
        const y = tr.rowIndex
        let valid = true

        //Check viability
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (this.preview[i][j].type !== FieldType.EMPTY && (y + i >= 11 || x + j >= 11)) {
                    valid = false
                    return
                }
                if (y + i < 11 && x + j < 11) {
                    if (this.board[y + i][x + j].type !== FieldType.EMPTY && this.preview[i][j].type !== FieldType.EMPTY) {
                        valid = false
                        return
                    }
                }
            }
            if (!valid) {
                return
            }
        }

        //Place element
        if (valid) {
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (y + i < 11 && x + j < 11) {
                        this.board[y + i][x + j].type = (this.preview[i][j].type !== FieldType.EMPTY ? this.preview[i][j].type : this.board[y + i][x + j].type)
                    }
                }
            }
            this.time -= this.nextElem.time
            elements.splice(this.r, 1)
            this.selectNextElement()
        }
    }


    addMission(m) {
        missions.push(m)
    }
    calcMissions() {
        for (const mission of this.actMissions) {
            switch (mission) {
                case ("Határvidék"):
                    this.missionHatarvidek()
                    break
            }
        }


    }
    missionHatarvidek() {
        let valid
        let points = 0

        for (let i = 0; i < 11; i++) {
            valid = true
            for (let j = 0; j < 11; j++) {
                if (this.board[i][j].type === FieldType.EMPTY) {
                    valid = false
                    break
                }
            }
            if (valid) {
                points += 6
            }
        }

        for (let i = 0; i < 11; i++) {
            valid = true
            for (let j = 0; j < 11; j++) {
                if (this.board[j][i].type === FieldType.EMPTY) {
                    valid = false
                    break
                }
            }
            if (valid) {
                points += 6
            }
        }

        console.log(points)
    }
}

const elements = [
    {
        time: 2,
        type: 'water',
        shape: [[1,1,1],
            [0,0,0],
            [0,0,0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'town',
        shape: [[1,1,1],
            [0,0,0],
            [0,0,0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 1,
        type: 'forest',
        shape: [[1,1,0],
            [0,1,1],
            [0,0,0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'farm',
        shape: [[1,1,1],
            [0,0,1],
            [0,0,0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'forest',
        shape: [[1,1,1],
            [0,0,1],
            [0,0,0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'town',
        shape: [[1,1,1],
            [0,1,0],
            [0,0,0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'farm',
        shape: [[1,1,1],
            [0,1,0],
            [0,0,0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 1,
        type: 'town',
        shape: [[1,1,0],
            [1,0,0],
            [0,0,0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 1,
        type: 'town',
        shape: [[1,1,1],
            [1,1,0],
            [0,0,0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 1,
        type: 'farm',
        shape: [[1,1,0],
            [0,1,1],
            [0,0,0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 1,
        type: 'farm',
        shape: [[0,1,0],
            [1,1,1],
            [0,1,0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'water',
        shape: [[1,1,1],
            [1,0,0],
            [1,0,0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'water',
        shape: [[1,0,0],
            [1,1,1],
            [1,0,0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'forest',
        shape: [[1,1,0],
            [0,1,1],
            [0,0,1]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'forest',
        shape: [[1,1,0],
            [0,1,1],
            [0,0,0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'water',
        shape: [[1,1,0],
            [1,1,0],
            [0,0,0]],
        rotation: 0,
        mirrored: false
    },
]
const missions = {
        "basic": [
            {
                "title": "Az erdő széle",
                "description": "A térképed szélével szomszédos erdőmezőidért egy-egy pontot kapsz."
            },
            {
                "title": "Álmos-völgy",
                "description": "Minden olyan sorért, amelyben három erdőmező van, négy-négy pontot kapsz."
            },
            {
                "title": "Krumpliöntözés",
                "description": "A farmmezőiddel szomszédos vízmezőidért két-két pontot kapsz."
            },
            {
                "title": "Határvidék",
                "description": "Minden teli sorért vagy oszlopért 6-6 pontot kapsz."
            }
        ],
        "extra": [
            {
                "title": "Fasor",
                "description": "A leghosszabb, függőlegesen megszakítás nélkül egybefüggő erdőmezők mindegyikéért kettő-kettő pontot kapsz. Két azonos hosszúságú esetén csak az egyikért."
            },
            {
                "title": "Gazdag város",
                "description": "A legalább három különböző tereptípussal szomszédos falurégióidért három-három pontot kapsz."
            },
            {
                "title": "Öntözőcsatorna",
                "description": "Minden olyan oszlopodért, amelyben a farm illetve a vízmezők száma megegyezik, négy-négy pontot kapsz. Mindkét tereptípusból legalább egy-egy mezőnek lennie kell az oszlopban ahhoz, hogy pontot kaphass érte."
            },
            {
                "title": "Mágusok völgye",
                "description": "A hegymezőiddel szomszédos vízmezőidért három-három pontot kapsz."
            },
            {
                "title": "Üres telek",
                "description": "A városmezőiddel szomszédos üres mezőkért 2-2 pontot kapsz."
            },
            {
                "title": "Sorház",
                "description": "A leghosszabb, vízszintesen megszakítás nélkül egybefüggő falumezők mindegyikéért kettő-kettő pontot kapsz."
            },
            {
                "title": "Páratlan silók",
                "description": "Minden páratlan sorszámú teli oszlopodért 10-10 pontot kapsz."
            },
            {
                "title": "Gazdag vidék",
                "description": "Minden legalább öt különböző tereptípust tartalmazó sorért négy-négy pontot kapsz."
            }
        ],
    }
