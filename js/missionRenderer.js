import {Season} from "./state.js";

export function render(state) {
    const arr = []
    let i = 0
    for (const m of state.actMissions) {
        const div = document.createElement("div")
        const img = document.createElement("img")

        img.classList.add("img-fluid")
        div.classList.add("col-6")
        div.classList.add("py-2")
        switch (m) {
            case ("Határvidék"):
                img.alt = "Határvidék"
                img.src = "assets/missions_hun/hatarvidek.png"
                break
            case ("Krumpliöntözés"):
                img.alt = "Krumpliöntözés"
                img.src = "assets/missions_hun/krumpliontozes.png"
                break
            case ("Az erdő széle"):
                img.alt = "Az erdő széle"
                img.src = "assets/missions_hun/az_erdo_szele.png"
                break
            case ("Álmos-völgy"):
                img.alt = "Álmos-völgy"
                img.src = "assets/missions_hun/almos-volgy.png"
                break
            case ("Fasor"):
                img.alt = "Fasor"
                img.src = "assets/missions_hun/fasor.png"
                break
            case ("Gazdag város"):
                img.alt = "Gazdag város"
                img.src = "assets/missions_hun/gazdag-varos.png"
                break
            case ("Öntözőcsatorna"):
                img.alt = "Öntözőcsatorna"
                img.src = "assets/missions_hun/ontozocsatorna.png"
                break
            case ("Mágusok völgye"):
                img.alt = "Mágusok völgye"
                img.src = "assets/missions_hun/magusok-volgye.png"
                break
            case ("Üres telek"):
                img.alt = "Üres telek"
                img.src = "assets/missions_hun/ures-telek.png"
                break
            case ("Sorház"):
                img.alt = "Sorház"
                img.src = "assets/missions_hun/sorhaz.png"
                break
            case ("Páratlan silók"):
                img.alt = "Páratlan silók"
                img.src = "assets/missions_hun/paratlan-silok.png"
                break
            case ("Gazdag vidék"):
                img.alt = "Gazdag vidék"
                img.src = "assets/missions_hun/gazdag-videk.png"
                break
        }

        switch (state.season) {
            case (Season.SPRING):
                if ((i === 0 || i === 1)) {
                    img.classList.add("border")
                    img.classList.add("border-5")
                    img.classList.add("border-success")
                    img.classList.add("rounded-5")
                }
                break
            case (Season.SUMMER):
                if ((i === 1 || i === 2)) {
                    img.classList.add("border")
                    img.classList.add("border-5")
                    img.classList.add("border-success")
                    img.classList.add("rounded-5")
                }
                break
            case (Season.AUTUMN):
                if ((i === 2 || i === 3)) {
                    img.classList.add("border")
                    img.classList.add("border-5")
                    img.classList.add("border-success")
                    img.classList.add("rounded-5")
                }
                break
            case (Season.WINTER):
                if ((i === 3 || i === 0)) {
                    img.classList.add("border")
                    img.classList.add("border-5")
                    img.classList.add("border-success")
                    img.classList.add("rounded-5")
                }
                break
        }

        i++
        div.appendChild(img)
        arr.push(div)
    }
    return arr
}