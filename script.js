const audioContext = new AudioContext();
const API_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/"
const SEARCH_FORM = document.querySelector('form')
const SEARCH_INPUT = document.querySelector('.search-input')
const SEARCHED_WORD = document.querySelector('.searched-word')
const SEARCHED_WORD_PHONETIC = document.querySelector('.searched-word-phonetic')
const SEARCHED_WORD_AUDIO = document.querySelector('.searched-word-audio')
const AUDIO = document.createElement("audio")
const PRONUNCIATION_AUDIO = document.querySelector('.pronunciation-audio')
const NOUN_MEANING_LIST = document.querySelector('.noun')
const SYNONYMS_LIST = document.querySelector('.synonyms-list')
const VERB_MEANING_LIST = document.querySelector('.verbs')
const EXAMPLE_SENTENCE = document.querySelector('.example_sentence')

function onSubmitSearchHandler(e){
   
    fetch(API_URL + SEARCH_INPUT.value)
        .then(res => res.json())
        .then(json => {
            AUDIO.setAttribute("src", json[0].phonetics[0].audio)
            AUDIO.setAttribute("crossorigin", true)
            const track = audioContext.createMediaElementSource(AUDIO);
            track.connect(audioContext.destination);
            // console.log(json[0].meanings[0].definitions)
            SEARCHED_WORD.innerText = json[0].word
            SEARCHED_WORD_PHONETIC.innerText = json[0].phonetic
            SEARCHED_WORD_AUDIO.appendChild(AUDIO) 
            json[0].meanings[0].definitions.forEach(defObj => {
                // console.log(defObj.definition)
                const MEANING_LIST_ITEM = document.createElement('li')
                MEANING_LIST_ITEM.setAttribute('class', 'meaning')
                MEANING_LIST_ITEM.appendChild(document.createTextNode(defObj.definition))
                // console.log(MEANING_LIST_ITEM)

                NOUN_MEANING_LIST.appendChild(MEANING_LIST_ITEM)
            })
            
        })
    e.preventDefault()
}

function onClickPlayHandler(e) {
    // // Check if context is in suspended state (autoplay policy)
    if (audioContext.state === "suspended") {
      audioContext.resume();
    }

    // Play or pause track depending on state
    if (SEARCHED_WORD_AUDIO.dataset.playing === "false") {
      AUDIO.play();
      SEARCHED_WORD_AUDIO.dataset.playing = "true";
    } else if (SEARCHED_WORD_AUDIO.dataset.playing === "true") {
      AUDIO.pause();
      SEARCHED_WORD_AUDIO.dataset.playing = "false";
    }
}

function onEndedAudioHandler(e){
    SEARCHED_WORD_AUDIO.dataset.playing = "false";
}
  
SEARCH_FORM.addEventListener("submit", onSubmitSearchHandler)

SEARCHED_WORD_AUDIO.addEventListener("click", onClickPlayHandler)

AUDIO.addEventListener("ended", onEndedAudioHandler);

