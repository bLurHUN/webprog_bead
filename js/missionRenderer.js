import {Season} from "./state.js";

export function render(state) {
    const arr = []
    let i = 0
    for (const m of state.actMissions) {
        const div = document.createElement("div")
        const img = document.createElement("img")
        const p = document.createElement("p")

        div.classList.add("col-6")
        div.classList.add("py-2")
        img.classList.add("img-fluid")
        p.classList.add("mission-text")
        p.classList.add("text-end")
        p.classList.add("me-4")
        switch (m) {
            case ("Határvidék"):
                img.alt = "Határvidék"
                img.src = "assets/missions_hun/hatarvidek.png"
                p.innerHTML = `${state.hatarvidekPoints} pont`
                break
            case ("Krumpliöntözés"):
                img.alt = "Krumpliöntözés"
                img.src = "assets/missions_hun/krumpliontozes.png"
                p.innerHTML = `${state.krumpliontozesPoints} pont`
                break
            case ("Az erdő széle"):
                img.alt = "Az erdő széle"
                img.src = "assets/missions_hun/az_erdo_szele.png"
                p.innerHTML = `${state.erdoSzelePoints} pont`
                break
            case ("Álmos-völgy"):
                img.alt = "Álmos-völgy"
                img.src = "assets/missions_hun/almos_volgy.png"
                p.innerHTML = `${state.almosVolgykPoints} pont`
                break
            case ("Fasor"):
                img.alt = "Fasor"
                img.src = "assets/missions_hun/fasor.png"
                p.innerHTML = `${state.fasorPoints} pont`
                break
            case ("Gazdag város"):
                img.alt = "Gazdag város"
                img.src = "assets/missions_hun/gazdag_varos.png"
                p.innerHTML = `${state.gazdagVarosPoints} pont`
                break
            case ("Öntözőcsatorna"):
                img.alt = "Öntözőcsatorna"
                img.src = "assets/missions_hun/ontozocsatorna.png"
                p.innerHTML = `${state.ontozocsatornaPoints} pont`
                break
            case ("Mágusok völgye"):
                img.alt = "Mágusok völgye"
                img.src = "assets/missions_hun/magusok_volgye.png"
                p.innerHTML = `${state.magusokVolgyePoints} pont`
                break
            case ("Üres telek"):
                img.alt = "Üres telek"
                img.src = "assets/missions_hun/ures_telek.png"
                p.innerHTML = `${state.uresTelekPoints} pont`
                break
            case ("Sorház"):
                img.alt = "Sorház"
                img.src = "assets/missions_hun/sorhaz.png"
                p.innerHTML = `${state.sorhazPoints} pont`
                break
            case ("Páratlan silók"):
                img.alt = "Páratlan silók"
                img.src = "assets/missions_hun/paratlan_silok.png"
                p.innerHTML = `${state.paratlanSilokPoints} pont`
                break
            case ("Gazdag vidék"):
                img.alt = "Gazdag vidék"
                img.src = "assets/missions_hun/gazdag_videk.png"
                p.innerHTML = `${state.gazdagVidekPoints} pont`
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
        div.appendChild(p)
        arr.push(div)
    }
    return arr
}