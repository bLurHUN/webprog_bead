import {Field, FieldType} from "./field.js";

export const GameStatus = {
    ACTIVE: 1,
    OVER: 2
}

export const Season = {
    SPRING: 1,
    SUMMER: 2,
    AUTUMN: 4,
    WINTER: 8
}

export class AppState {
    totalPoints = 0
    springPoints = 0
    summerPoints = 0
    autumnPoints = 0
    winterPoints = 0

    hatarvidekPoints = 0
    erdoSzelePoints = 0
    almosVolgykPoints = 0
    krumpliontozesPoints = 0
    fasorPoints = 0
    ontozocsatornaPoints = 0
    gazdagVarosPoints = 0
    magusokVolgyePoints = 0
    uresTelekPoints = 0
    sorhazPoints = 0
    paratlanSilokPoints = 0
    gazdagVidekPoints = 0

    season = Season
    board = []
    nextElem = []
    preview = []
    time
    status = GameStatus
    actMissions = []
    alreadySelectedNextElements = []

    init() {
        const saveData = JSON.parse(localStorage.getItem("save"))
        if (saveData !== null && saveData.status === GameStatus.ACTIVE) {
            this.totalPoints = saveData.totalPoints
            this.springPoints = saveData.springPoints
            this.summerPoints = saveData.summerPoints
            this.autumnPoints = saveData.autumnPoints
            this.winterPoints = saveData.winterPoints

            this.hatarvidekPoints = saveData.hatarvidekPoints
            this.erdoSzelePoints = saveData.erdoSzelePoints
            this.almosVolgykPoints = saveData.almosVolgykPoints
            this.krumpliontozesPoints = saveData.krumpliontozesPoints
            this.fasorPoints = saveData.fasorPoints
            this.ontozocsatornaPoints = saveData.ontozocsatornaPoints
            this.gazdagVarosPoints = saveData.gazdagVarosPoints
            this.magusokVolgyePoints = saveData.magusokVolgyePoints
            this.uresTelekPoints = saveData.uresTelekPoints
            this.sorhazPoints = saveData.sorhazPoints
            this.paratlanSilokPoints = saveData.paratlanSilokPoints
            this.gazdagVidekPoints = saveData.gazdagVidekPoints

            this.season = saveData.season
            this.board = saveData.board
            this.nextElem = saveData.nextElem
            this.preview = saveData.preview
            this.time = saveData.time
            this.status = saveData.status
            this.actMissions = saveData.actMissions
            this.alreadySelectedNextElements = saveData.alreadySelectedNextElements
            return
        }

        this.season = Season.SPRING
        this.time = 7
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

        localStorage.setItem("save", JSON.stringify(this))
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
            this.selectNextElement()
            localStorage.setItem("save", JSON.stringify(this))
        }
    }

    selectNextElement() {
        const currSeason = this.season
        this.setActiveSeason()
        if (currSeason !== this.season) {
            this.alreadySelectedNextElements = []
        }

        let r = Math.floor(Math.random() * elements.length)
        while (this.alreadySelectedNextElements.includes(r)) {
            r = Math.floor(Math.random() * elements.length)
        }
        this.nextElem = elements[r]
        this.alreadySelectedNextElements.push(r)

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

    rotateNextElement() {
        const rows = this.preview.length;
        const columns = this.preview[0].length;

        for (let i = 0; i < rows; i++) {
            for (let j = i; j < columns; j++) {
                const temp = this.preview[i][j];
                this.preview[i][j] = this.preview[j][i];
                this.preview[j][i] = temp;
            }
        }

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns / 2; j++) {
                const temp = this.preview[i][j];
                this.preview[i][j] = this.preview[i][columns - 1 - j];
                this.preview[i][columns - 1 - j] = temp;
            }
        }
    }

    mirrorNextElement() {
        for (const row of this.preview) {
            row.reverse()
        }
    }

    setActiveSeason() {
        if (this.time <= 0) {
            switch (this.season) {
                case (Season.SPRING):
                    this.season = Season.SUMMER
                    this.springPoints += this.calcMissions(this.actMissions.slice(0, 2))
                    console.log(this.springPoints)
                    break
                case (Season.SUMMER):
                    this.season = Season.AUTUMN
                    this.summerPoints += this.calcMissions(this.actMissions.slice(1, 3))
                    console.log(this.summerPoints)
                    break
                case (Season.AUTUMN):
                    this.season = Season.WINTER
                    this.autumnPoints += this.calcMissions(this.actMissions.slice(2, 4))
                    console.log(this.autumnPoints)
                    break
                case (Season.WINTER):
                    this.season = Season.SPRING
                    this.status = GameStatus.OVER
                    this.winterPoints += this.calcMissions([this.actMissions[3], this.actMissions[0]])
                    console.log(this.winterPoints)
                    break
            }
            this.time += 7
        }
    }

    calcMissions(arr) {
        let subPoints = 0
        console.log(arr)
        for (const mission of arr) {
            switch (mission) {
                case ("Határvidék"):
                    subPoints += this.missionHatarvidek()
                    break
                case ("Az erdő széle"):
                    subPoints += this.missionErdoSzele()
                    break
                case ("Álmos-völgy"):
                    subPoints += this.missionAlmosVolgy()
                    break
                case ("Krumpliöntözés"):
                    subPoints += this.missionKrumpliontozes()
                    break
                case ("Fasor"):
                    subPoints += this.missionFasor()
                    break
                case ("Gazdag Város"):
                    subPoints += this.missionGazdagVaros()
                    break
                case ("Öntözőcsatorna"):
                    subPoints += this.missionOntozocsatorna()
                    break
                case ("Mágusok völgye"):
                    subPoints += this.missionMagusokVolgye()
                    break
                case ("Üres telek"):
                    subPoints += this.missionUresTelek()
                    break
                case ("Sorház"):
                    subPoints += this.missionSorhaz()
                    break
                case ("Páratlan silók"):
                    subPoints += this.missionParatlanSilok()
                    break
                case ("Gazdag vidék"):
                    subPoints += this.missionGazdagVidek()
                    break
            }
        }
        this.calcSurroundedHills()
        return subPoints
    }

    calcSurroundedHills() {
        let points = 0

        let top
        let bot
        let left
        let right

        for (let i = 0; i < 11; i++) {
            top = false
            bot = false
            left = false
            right = false
            for (let j = 0; j < 11; j++) {
                if (this.board[i][j].type === FieldType.HILL) {
                    if (this.board[i-1][j].type !== FieldType.EMPTY) {
                        top = true
                    }
                    if (this.board[i+1][j].type !== FieldType.EMPTY) {
                        bot = true
                    }
                    if (this.board[i][j-1].type !== FieldType.EMPTY) {
                        left = true
                    }
                    if (this.board[i][j+1].type !== FieldType.EMPTY) {
                        right = true
                    }
                }
            }
            if (top && bot && left && right) {
                points++
            }
        }

        this.totalPoints += points
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

        this.hatarvidekPoints += points
        this.totalPoints += points
        return points
    }

    missionErdoSzele() {
        let points = 0
        for (let i = 0; i < 11; i++) {
            for (let j = 0; j < 11; j++) {
                if ((i === 0 || j=== 0 || i === 10 || j === 10) && this.board[i][j].type === FieldType.FOREST) {
                    points++
                }
            }
        }

        this.erdoSzelePoints += points
        this.totalPoints += points
        return points
    }

    missionAlmosVolgy() {
        let points = 0

        for (let i = 0; i < 11; i++) {
            let count = 0
            for (let j = 0; j < 11; j++) {
                if (this.board[i][j].type === FieldType.FOREST) {
                    count++
                }
            }
            if (count >= 3) {
                points += 4
            }
        }

        this.almosVolgykPoints += points
        this.totalPoints += points
        return points
    }

    missionKrumpliontozes() {
        let points = 0

        for (let i = 0; i < 11; i++) {
            for (let j = 0; j < 11; j++) {
                if (this.board[i][j].type === FieldType.FARM) {
                    if (i-1 >= 0 && this.board[i-1][j].type === FieldType.WATER) {
                        points += 2
                    }
                    if (i+1 <= 10 && this.board[i+1][j].type === FieldType.WATER) {
                        points += 2
                    }
                    if (j-1 >= 0 && this.board[i][j-1].type === FieldType.WATER) {
                        points += 2
                    }
                    if (j+1 <= 10 && this.board[i][j+1].type === FieldType.WATER) {
                        points += 2
                    }
                }
            }
        }

        this.krumpliontozesPoints += points
        this.totalPoints += points
        return points
    }

    missionFasor() {
        let longest = 0

        for (let i = 0; i < 11; i++) {
            let currentLongest = 0
            let streak = false
            for (let j = 0; j < 11; j++) {
                if (this.board[j][i].type === FieldType.FOREST) {
                    if (!streak) {
                        streak = true
                        currentLongest = 1
                    } else {
                        currentLongest++
                    }
                } else if (streak && currentLongest > longest) {
                    streak = false
                    longest = currentLongest
                    currentLongest = 0
                } else if (streak && currentLongest === longest) {
                    streak = false
                    currentLongest = 0
                }
            }
            if (currentLongest > longest) {
                longest = currentLongest
            } else if (currentLongest === longest) {
            }
        }

        return longest * 2
    }

    missionGazdagVaros() {
        let points = 0

        for (let i = 0; i < i; i++) {
            for (let j = 0; j < j; j++) {
                let arr = []
                if (this.board[i][j].type === FieldType.VILLAGE) {
                    if (i-1 >= 0 && this.board[i-1][j].type !== FieldType.EMPTY && !arr.includes(this.board[i-1][j].type)) {
                        arr.push(this.board[i-1][j].type)
                    }
                    if (i+1 <= 10 && this.board[i+1][j].type !== FieldType.EMPTY && !arr.includes(this.board[i+1][j].type)) {
                        arr.push(this.board[i+1][j].type)
                    }
                    if (j-1 >= 0 && this.board[i][j-1].type !== FieldType.EMPTY && !arr.includes(this.board[i][j-1].type)) {
                        arr.push(this.board[i][j-1].type)
                    }
                    if (j+1 <= 10 && this.board[i][j+1].type !== FieldType.EMPTY && !arr.includes(this.board[i][j+1].type)) {
                        arr.push(this.board[i][j+1].type)
                    }
                }
                if (arr.length >= 3) {
                    points += 3
                }
            }
        }

        this.gazdagVarosPoints += points
        this.totalPoints += points
        return points
    }

    missionOntozocsatorna() {
        let points = 0

        for (let i = 0; i < 11; i++) {
            let farmCount = 0
            let waterCount = 0
            for (let j = 0; j < 11; j++) {
                if (this.board[j][i].type === FieldType.FARM) {
                    farmCount++
                } else if (this.board[j][i].type === FieldType.WATER) {
                    waterCount++
                }
            }
            if (waterCount !== 0 && farmCount !== 0 && farmCount === waterCount) {
                points += 4
            }
        }

        this.ontozocsatornaPoints += points
        this.totalPoints += points
        return points
    }

    missionMagusokVolgye() {
        let points = 0

        for (let i = 0; i < 11; i++) {
            for (let j = 0; j < 11; j++) {
                if (this.board[i][j].type === FieldType.HILL) {
                    if (this.board[i-1][j].type === FieldType.WATER) {
                        points += 3
                    }
                    if (this.board[i+1][j].type === FieldType.WATER) {
                        points += 3
                    }
                    if (this.board[i][j-1].type === FieldType.WATER) {
                        points += 3
                    }
                    if (this.board[i][j+1].type === FieldType.WATER) {
                        points += 3
                    }
                }
            }
        }

        this.magusokVolgyePoints += points
        this.totalPoints += points
        return points
    }

    missionUresTelek() {
        let points = 0

        for (let i = 0; i < 11; i++) {
            for (let j = 0; j < 11; j++) {
                if (this.board[i][j].type === FieldType.VILLAGE) {
                    if (i-1 >= 0 && this.board[i-1][j].type === FieldType.EMPTY) {
                        points += 2
                    }
                    if (i+1 <= 10 && this.board[i+1][j].type === FieldType.EMPTY) {
                        points += 2
                    }
                    if (j-1 >= 0 && this.board[i][j-1].type === FieldType.EMPTY) {
                        points += 2
                    }
                    if (j+1 <= 10 && this.board[i][j+1].type === FieldType.EMPTY) {
                        points += 2
                    }
                }
            }
        }

        this.uresTelekPoints += points
        this.totalPoints += points
        return points
    }

    missionSorhaz() {
        let rowCount = 1
        let longest = 0

        for (let i = 0; i < 11; i++) {
            let currentLongest = 0
            let streak = false
            for (let j = 0; j < 11; j++) {
                if (this.board[i][j].type === FieldType.VILLAGE) {
                    if (!streak) {
                        streak = true
                        currentLongest = 1
                    } else {
                        currentLongest++
                    }
                } else if (streak && currentLongest > longest) {
                    streak = false
                    longest = currentLongest
                    currentLongest = 0
                    rowCount = 1
                } else if (streak && currentLongest === longest) {
                    streak = false
                    currentLongest = 0
                    rowCount++
                }
            }
            if (currentLongest > longest) {
                longest = currentLongest
                rowCount = 1
            } else if (currentLongest === longest) {
                rowCount++
            }
        }

        return rowCount * longest * 2
    }

    missionParatlanSilok() {
        let points = 0

        for (let i = 0; i < 11; i+=2) {
            let full = true
            for (let j = 0; j < 11; j++) {
                if (this.board[j][i].type === FieldType.EMPTY) {
                    full = false
                    break
                }
            }
            if (full) {
                points += 10
            }
        }

        this.paratlanSilokPoints += points
        this.totalPoints += points
        return points
    }

    missionGazdagVidek() {
        let points = 0

        for (let i = 0; i < 11; i++) {
            let arr = []
            for (let j = 0; j < 11; j++) {
                if (!arr.includes(this.board[i][j].type) && this.board[i][j].type !== FieldType.EMPTY) {
                    arr.push(this.board[i][j].type)
                }
            }
            if (arr.length >= 5) {
                points += 4
            }
        }

        this.gazdagVidekPoints += points
        this.totalPoints += points
        return points
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
