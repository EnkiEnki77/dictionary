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
        FONT_LIST.style.display = "block"
        toggle= true
    }
    
}

function onClicFontkHandler(e) {
    console.log(e.target.textContent)
   
  
    if (e.target.textContent == 'sans-serif') {
        document.body.style.font = "var(--body-m-mobile) var(--inter)"
        CURRENT_FONT.innerText = 'sans-serif'
    } else if (e.target.textContent == 'serif') {
        document.body.style.font = "var(--body-m-mobile) var(--lora)"
        CURRENT_FONT.innerText = 'serif'
    } else if (e.target.textContent == 'mono') {
        document.body.style.font = "var(--body-m-mobile) var(--inconsolata)"
        CURRENT_FONT.innerText = 'mono'
    }
    
}

FONT_PICKER.addEventListener('click', onToggleHandler)

SANS.addEventListener('click', onClicFontkHandler)

SERIF.addEventListener('click', onClicFontkHandler)

MONO.addEventListener('click', onClicFontkHandler)

