const FONT_PICKER = document.querySelector(".font-picker")
const CURRENT_FONT = document.querySelector(".current-font")
const SANS = document.querySelector(".sans")
const SERIF = document.querySelector(".serif")
const MONO = document.querySelector(".mono")


let toggle = false
function onToggleHandler(e) {
    const FONT_LIST = document.querySelector('.font-list')
    
    if (toggle) {
        FONT_LIST.style.display = "none"
        toggle = false
    } else {
        FONT_LIST.style.display = "flex"
        toggle= true
    }
    
}

function onClicFontkHandler(e) {
    console.log(e.target.textContent)

    const ROOT = document.querySelector(':root')
   
  
    if (e.target.textContent == 'sans-serif') {
        ROOT.style.setProperty('--current-font', '"Inter", serif')
        CURRENT_FONT.innerText = 'sans-serif'
    } else if (e.target.textContent == 'serif') {
        ROOT.style.setProperty('--current-font', '"Lora", serif')
        CURRENT_FONT.innerText = 'serif'
    } else if (e.target.textContent == 'mono') {
        ROOT.style.setProperty('--current-font', '"Inconsolata", serif')
        CURRENT_FONT.innerText = 'mono'
    }
    
}

FONT_PICKER.addEventListener('click', onToggleHandler)

SANS.addEventListener('click', onClicFontkHandler)

SERIF.addEventListener('click', onClicFontkHandler)

MONO.addEventListener('click', onClicFontkHandler)

