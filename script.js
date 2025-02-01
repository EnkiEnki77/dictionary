const API_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/"
const SEARCH_FORM = document.querySelector('form')
const SEARCH_INPUT = document.querySelector('.search-input')

function onSubmitHandler(e){
   
    fetch(API_URL + SEARCH_INPUT.value)
        .then(res => res.json())
        .then(json => console.log(json))
    e.preventDefault()
}

SEARCH_FORM.addEventListener("submit", onSubmitHandler)
