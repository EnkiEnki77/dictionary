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
const MAIN = document.querySelector('main')

function onSubmitSearchHandler(e){
   
    fetch(API_URL + SEARCH_INPUT.value)
        .then(res => res.json())
        .then(json => {
            AUDIO.setAttribute("src", json[0].phonetics[0].audio)
            AUDIO.setAttribute("crossorigin", true)
            const track = audioContext.createMediaElementSource(AUDIO);
            track.connect(audioContext.destination);
            // console.log(json[0])
            SEARCHED_WORD.innerText = json[0].word
            SEARCHED_WORD_PHONETIC.innerText = json[0].phonetic
            SEARCHED_WORD_AUDIO.appendChild(AUDIO) 
            json[0].meanings.forEach(meaning => {
                console.log(meaning)
                const DEFINITION_CONT = document.createElement('section')
                DEFINITION_CONT.setAttribute('class', 'definition-cont')
                
                const PART_OF_SPEECH = document.createElement('h2')
                PART_OF_SPEECH.setAttribute('class', 'part-of-speech')
                PART_OF_SPEECH.appendChild(document.createTextNode(meaning.partOfSpeech))
                
                const MEANING_LIST_TITLE = document.createElement('h3')
                MEANING_LIST_TITLE.setAttribute('class', 'meaning-list-title')
                MEANING_LIST_TITLE.appendChild(document.createTextNode("meaning"))

                const MEANING_LIST = document.createElement('ul')
                MEANING_LIST.setAttribute('class', 'meaning-list')
                MEANING_LIST.append(...json[0].meanings[0].definitions.map(defObj => {
                    const MEANING_LIST_ITEM = document.createElement('li')
                    MEANING_LIST_ITEM.setAttribute('class', 'meaning-list-item')
                    MEANING_LIST_ITEM.appendChild(document.createTextNode(defObj.definition))

                    if (defObj.example) {
                        const MEANING_LIST_ITEM_EXAMPLE = document.createElement('p')
                        MEANING_LIST_ITEM_EXAMPLE.setAttribute('class', 'meaning-list-item-example')
                        MEANING_LIST_ITEM_EXAMPLE.appendChild(document.createTextNode(defObj.example))

                        MEANING_LIST_ITEM.appendChild(MEANING_LIST_ITEM_EXAMPLE)
                    }
                    

                    return MEANING_LIST_ITEM
                }))

                 DEFINITION_CONT.append(PART_OF_SPEECH, MEANING_LIST_TITLE, MEANING_LIST)

                if (meaning.partOfSpeech == "noun") {
                    const SYNONYM_LIST_TITLE = document.createElement('h3')
                    SYNONYM_LIST_TITLE.setAttribute('class', 'synonym-list-title')
                    SYNONYM_LIST_TITLE.appendChild(document.createTextNode("synonyms"))

                    const SYNONYM_LIST = document.createElement('ul')
                    SYNONYM_LIST.setAttribute('class', 'synonym-list')
                    SYNONYM_LIST.append(...json[0].meanings[0].synonyms.map(synonym => {
                        const MEANING_LIST_ITEM = document.createElement('li')
                        MEANING_LIST_ITEM.setAttribute('class', 'synonym')
                        MEANING_LIST_ITEM.appendChild(document.createTextNode(synonym))

                        return MEANING_LIST_ITEM
                    }))

                     DEFINITION_CONT.append(SYNONYM_LIST_TITLE, SYNONYM_LIST)
                }
                
               
                MAIN.appendChild(DEFINITION_CONT)
            })
            
            // json[0].meanings[0].synonyms.forEach(synonym => {
            //     const MEANING_LIST_ITEM = document.createElement('li')
            //     MEANING_LIST_ITEM.setAttribute('class', 'synonym')
            //     MEANING_LIST_ITEM.appendChild(document.createTextNode(synonym))

            //     SYNONYMS_LIST.appendChild(MEANING_LIST_ITEM)
            // })

            // json[0].meanings[0].synonyms.forEach(synonym => {
            //     const MEANING_LIST_ITEM = document.createElement('li')
            //     MEANING_LIST_ITEM.setAttribute('class', 'synonym')
            //     MEANING_LIST_ITEM.appendChild(document.createTextNode(synonym))

            //     SYNONYMS_LIST.appendChild(MEANING_LIST_ITEM)
            // })
            
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

