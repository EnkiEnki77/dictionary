const TOGGLE_CONTAINER = document.querySelector('.toggle-container')

let toggleOn = false

function onClickLightDarkToggle(e){
    if (!toggleOn) {
        console.log('toggled true')
        toggleOn = true
        TOGGLE_CONTAINER.style.justifyContent = 'flex-end'
    } else {
        console.log('toggled false')
        toggleOn = false
        TOGGLE_CONTAINER.style.justifyContent = 'flex-start'
    }
}

TOGGLE_CONTAINER.addEventListener('click', onClickLightDarkToggle)