class Planet {
    constructor(name,year,size,startPos, color){
        this.name = name
        this.year = year // in years
        this.size = size / 12742 // in kilometrs
        this.startPos = startPos // in radians
        this.color = color // using for planets and orbits
        this.planet = document.querySelector(`.p-${this.name}`)
        this.orbite = document.querySelector(`.o-${this.name[0] + this.name[1]}`)
    }
    setRotatePlanet(day){
        const pl = document.querySelector(`.${this.name}`)
        pl.style.rotate = `${day * (360 / this.year)}deg`
    }
    setSizePlanet(){ // function get real size planet experemental!
        this.planet.style.height = `${this.size * 10}px`
        this.planet.style.width = `${this.size * 10}px`
        this.planet.style.left = `-${this.size * 10 / 2}px`
    }

    setTexture(flag){//!
        if(flag === true){
            // this event about beautiful texture 
            this.planet.style.backgroundImage = `url(img/${this.name}.png)` 
            this.planet.style.backgroundColor = 'transparent'
        } else {
            // this event about bad texture 
            this.planet.style.backgroundImage = 'none'
            this.planet.style.backgroundColor = this.color
        }
    }
    setOrbites(flag){
        if(flag === true){
            this.orbite.style.border = `1px solid ${this.color}`
        } else {
            this.orbite.style.border = `1px dashed ${this.color}`
        }
    }
}

class ViewerDate {
    constructor(){
        this.day = new Date().getDate()
        this.month = new Date().getMonth()
        this.year = new Date().getFullYear()
        this.monthList = [31, 28, 31, 30, 31, 30, 31,31 ,30 ,31 ,30 ,31]
    }   
    setForwardDay(){
        this.day++
        if(this.day > this.monthList[this.month] ){
            this.day = 1
            this.month++

            if(this.month > 11){
            this.month = 0
            this.year++
            }
        }
        return `${this.day}.${this.month+1}.${this.year}`
    }
    setBackDay(){
        this.day--
        if(this.day < 1 ){
            this.month--
            this.day = this.monthList[this.month]
            

            if(this.month < 0){
            this.month = 11
            this.day = this.monthList[this.month]
            this.year--
            }
        }
        return `${this.day}.${this.month+1}.${this.year}`
    }
    getNowDate(){
        return new Date().getFullYear() * 365 + this.monthList[new Date().getMonth()] + new Date().getDate()
    }

}

//init button
const rewP = document.querySelector('#rew-p')
const rewM = document.querySelector('#rew-m')
const dayP = document.querySelector('#dayP')
const dayM = document.querySelector('#dayM')
const weekP = document.querySelector('#weekP')
const weekM = document.querySelector('#weekM')
const yearP = document.querySelector('#yearP')
const yearM = document.querySelector('#yearM')
const realsize = document.querySelector('#realsize')
const reset = document.querySelector('#reset')
const test = document.querySelector('#test')
const windowStyle = document.querySelector('.style')
const btnStyle = document.querySelector('#btn-style')
const btnCls = document.querySelector('#btn-cls')
const btnBoxTexturePl = document.querySelector('#texture-planet') 
const btnBoxStyleOrb= document.querySelector('#style-orbite')
const btnBoxRealsizePl = document.querySelector('#realsize-planet')
//init labels
const monitorDateNow = document.querySelector('#date-now')
const monitorDateView = document.querySelector('#date-view')


const dateMonitor = new ViewerDate()
let date = dateMonitor.getNowDate()
// === flags in settings styles ===
let modale = false
let texturePlanet = true
let styleOrbit = true
let realSize = false

Rotate(date)
ModaleStyle()
monitorDateNow.innerHTML = `${new Date().getDate()}.${new Date().getMonth()+1}.${new Date().getFullYear()}`
monitorDateView.innerHTML = `${new Date().getDate()}.${new Date().getMonth()+1}.${new Date().getFullYear()}`

function Planets(){  // init planets parametrs
        const mercury = new Planet('mercury', 88, 4879, 0, '#EC7063')
        const venus = new Planet('venus', 255, 12104 , 0, '#EB984E')
        const earth = new Planet('earth', 365, 12742, 0, '#3498DB') // efemirids default 
        const mars = new Planet('mars', 687, 6779, 0, '#C0392B')
        const jupiter = new Planet('jupiter', 4333, 139820, 0, '#E59866')
        const saturn = new Planet('saturn', 10585, 116460, 0, '#E59866')
        const uranus = new Planet('uranus', 30660, 50724, 0, '#82E0AA')
        const neptune = new Planet('neptune', 60225, 49244, 0, '#3498DB')
        const pluto = new Planet('pluto', 90520, 2376, 0, '#515A5A')

    return [mercury, venus, earth, mars, jupiter, saturn, uranus, neptune, pluto]
}
function Rotate(date){ // rotate planets
    for (const planet of Planets()) {
        planet.setRotatePlanet(date)
    }
}
function ModaleStyle(){
    for (const planet of Planets()) {
        planet.setTexture(texturePlanet)
        planet.setOrbites(styleOrbit)
    }
}


rewP.addEventListener('mousemove', () => {
    date++
    Rotate(date)
    monitorDateView.innerHTML = dateMonitor.setForwardDay()
})
rewM.addEventListener('mousemove', () => {
    date--
    Rotate(date)
    monitorDateView.innerHTML = dateMonitor.setBackDay()
})

dayP.addEventListener('click', () => {
    date++
    Rotate(date)
    monitorDateView.innerHTML = dateMonitor.setForwardDay()
})
dayM.addEventListener('click', () => {
    date--
    Rotate(date)
    monitorDateView.innerHTML = dateMonitor.setBackDay()
})
weekP.addEventListener('click', () => {
    for(i = 0; i < 7; i++){
        date++
        Rotate(date)
        monitorDateView.innerHTML = dateMonitor.setForwardDay()    
    }
})
weekM.addEventListener('click', () => {
    for(i = 0; i < 7; i++){
        date--
        Rotate(date)
        monitorDateView.innerHTML = dateMonitor.setForwardDay()    
    }
})
yearP.addEventListener('click', () => {
    for(i = 0; i < 365; i++){
        date++
        Rotate(date)
        monitorDateView.innerHTML = dateMonitor.setForwardDay()    
    }
})
yearM.addEventListener('click', () => {
    for(i = 0; i < 365; i++){
        date--
        Rotate(date)
        monitorDateView.innerHTML = dateMonitor.setForwardDay()    
    }
})
btnStyle.addEventListener('click', () => {  
    modale = !modale
    if(modale === true){
        windowStyle.style.opacity = 1    
    } else {
        windowStyle.style.opacity = 0
    }
})
reset.addEventListener('click', () => {
    location.reload()
})
btnCls.addEventListener('click', () => {  
    modale = !modale
    if(modale === true){
        windowStyle.style.opacity = 1    
    } else {
        windowStyle.style.opacity = 0
    }
})
btnBoxTexturePl.addEventListener('click', () => {
   texturePlanet = !texturePlanet
   ModaleStyle()    
})
btnBoxStyleOrb.addEventListener('click', () => {
    styleOrbit = !styleOrbit
    ModaleStyle()
})
btnBoxRealsizePl.addEventListener('click', () => {
    for (const planet of Planets()) {
        planet.setSizePlanet()
    }
})