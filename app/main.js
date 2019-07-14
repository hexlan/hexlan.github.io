define(function (require) {
    var vocabList = []
    var index = 0;
    var vocab = {}

    var japaneseFirst = false;

    // Beginner
    vocab['greetings'] = { on: false, level: 'beginner', words: require('./vocab/greetings')}
    vocab['shopping'] = { on: false, level: 'beginner', words: require('./vocab/shopping')}
    vocab['numbers'] = { on: false, level: 'beginner', words: require('./vocab/numbers')}
    vocab['counters'] = { on: false, level: 'beginner', words: require('./vocab/counters')}
    vocab['time'] = { on: false, level: 'beginner', words: require('./vocab/time')}
    vocab['days'] = { on: true, level: 'beginner', words: require('./vocab/days')}
    vocab['directions'] = { on: true, level: 'beginner', words: require('./vocab/directions')}
    vocab['places'] = { on: true, level: 'beginner', words: require('./vocab/places')}

    vocab['other'] = { on: true, level: 'beginner', words: require('./vocab/other')}

    // Intermediate

    // Advanced

    var beginner = document.getElementById('beginner')
    var intermediate = document.getElementById('intermediate')
    var advanced = document.getElementById('advanced')
    
    var prompt = document.getElementById('prompt')
    var answer = document.getElementById('answer')
    var count = document.getElementById('count')

    var japanese = document.getElementById('japanese')
    var english = document.getElementById('english')

    japanese.addEventListener('click', event => {
        if (!japaneseFirst) {
            japaneseFirst = true
            japanese.classList.toggle('inactive')
            english.classList.toggle('inactive')

            prompt.classList.add('jp')
            prompt.classList.remove('eng')

            answer.classList.add('eng')
            answer.classList.remove('jp')

            displayNext()
        }
    })

    english.addEventListener('click', event => {
        if (japaneseFirst) {
            japaneseFirst = false
            japanese.classList.toggle('inactive')
            english.classList.toggle('inactive')

            prompt.classList.add('eng')
            prompt.classList.remove('jp')

            answer.classList.add('jp')
            answer.classList.remove('eng')

            displayNext()
        }
    })

    document.getElementById('next').addEventListener('click', event => {
        displayNext()
    })

    document.getElementById('previous').addEventListener('click', event => {
        displayPrevious()
    })

    var keys = Object.keys(vocab)
    for(var i = 0; i < keys.length; i++) {
        var name = keys[i]

        if(vocab[name].level == 'beginner') {
            beginner.classList.remove('hidden')
            var category = '<div input id="' + name + '" class="category beginner">' + (name.charAt(0).toUpperCase() + name.slice(1)) + ' (' + vocab[name].words.length + ')</div>'
            beginner.insertAdjacentHTML('beforeend', category)
        }

        if(vocab[name].level == 'intermediate') {
            intermediate.classList.remove('hidden')
            var category = '<div input id="' + name + '" class="category intermediate">' + (name.charAt(0).toUpperCase() + name.slice(1)) + ' (' + vocab[name].words.length + ')</div>'
            intermediate.insertAdjacentHTML('beforeend', category)
        }

        if(vocab[name].level == 'advanced') {
            advanced.classList.remove('hidden')
            var category = '<div input id="' + name + '" class="category advanced">' + (name.charAt(0).toUpperCase() + name.slice(1)) + ' (' + vocab[name].words.length + ')</div>'
            advanced.insertAdjacentHTML('beforeend', category)
        }

        var newCategory = document.getElementById(name)

        if(!vocab[name].on) {
            newCategory.classList.add('inactive')
        }

        newCategory.addEventListener('click', event => {
            vocab[event.target.id].on = !vocab[event.target.id].on
            event.target.classList.toggle('inactive')
            loadVocab()
        })
    }

    loadVocab()

    function loadVocab() {
        vocabList = []
        index = 0
        for (var i = 0; i < keys.length; i++) {
            if(vocab[keys[i]].on) {
                vocabList = vocabList.concat(vocab[keys[i]].words)
            }
        }

        vocabList = shuffle(vocabList)

        count.innerText = 'Total words: ' + vocabList.length
        displayNext(true)
    }

    function displayPrevious() {
        index--
        if(index < 0) {
            index = vocabList.length + index
        }

        if(vocabList.length < 1) {
            prompt.innerText = 'null'
            answer.innerText = 'null'
            return
        }

        var word = vocabList[index]
        if (japaneseFirst) {
            prompt.innerText = word.romaji + "\n" + word.kana
            answer.innerText = word.english
        } else {
            prompt.innerText = word.english
            answer.innerText = word.romaji + "\n" + word.kana
        }
    }

    function displayNext(reset = false) {
        if(reset) {
            index = 0
        } else {
            index++
            index = index % vocabList.length
        }

        if(vocabList.length < 1) {
            prompt.innerText = 'null'
            answer.innerText = 'null'
            return
        }

        var word = vocabList[index]
        if (japaneseFirst) {
            prompt.innerText = word.romaji + "\n" + word.kana
            answer.innerText = word.english
        } else {
            prompt.innerText = word.english
            answer.innerText = word.romaji + "\n" + word.kana
        }
    }

    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex

        while ( 0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex)
            currentIndex -= 1

            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex]
            array[randomIndex] = temporaryValue
        }

        return array
    }
})