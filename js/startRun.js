import template from '../json/continueTemplate.json' with { type: 'json' }

const decks = document.querySelector('.decks')
const deckL = document.getElementById('deckL')
const deckR = document.getElementById('deckR')
let deckPos = 0

const stakes = document.querySelector('.stakes')
const stakeL = document.getElementById('stakeL')
const stakeR = document.getElementById('stakeR')
let stakePos = 0

const hasSeed = document.getElementById('hasSeed')
const seed = document.getElementById('seed')
let isTyping

const newRun = document.getElementById('newRun')
const goBack = document.getElementById('goBack')
const continueRun = document.getElementById('continueRun')

const decksList = {

    0:'Red',
    1:'Blue',
    2:'Yellow',
    3:'Green',
    4:'Black',
    5:'Magic',
    6:'Nebula',
    7:'Ghost',
    8:'Abandoned',
    9:'Checkered',
    10:'Zodiac',
    11:'Painted',
    12:'Anaglyph',
    13:'Plasma',
    14:'Erratic'

}

const stakeList = {

    0:'White',
    1:'Red',
    2:'Green',
    3:'Black',
    4:'Blue',
    5:'Purple',
    6:'Orange',
    7:'Gold'

}


decks.addEventListener('scroll', () => {

    deckPos = updateByScroll(decks)

    enableButtons (deckPos, decks, deckR, deckL)

})
deckL.addEventListener('click', () => {

    deckPos = moveLeft (deckPos, decks)

    enableButtons (deckPos, decks, deckR, deckL)

})
deckR.addEventListener('click', () => {

    deckPos = moveRight (deckPos, decks)

    enableButtons (deckPos, decks, deckR, deckL)

})


stakes.addEventListener('scroll', () => {

    stakePos = updateByScroll(stakes)

    enableButtons (stakePos, stakes, stakeR, stakeL)

})
stakeL.addEventListener('click', () => {

    stakePos = moveLeft (stakePos, stakes)

    enableButtons (stakePos, stakes, stakeR, stakeL)

})
stakeR.addEventListener('click', () => {

    stakePos = moveRight (stakePos, stakes)

    enableButtons (stakePos, stakes, stakeR, stakeL)

})


newRun.addEventListener('click', () => {

    openCorrespondingTab(document.getElementById('runWrap'))
    newRun.classList.add('selected')
    continueRun.classList.remove('selected')

})
goBack.addEventListener('click', () => {

    openCorrespondingTab(document.getElementById('runWrap'))
    newRun.classList.add('selected')
    continueRun.classList.remove('selected')

})
continueRun.addEventListener('click', () => {

    const continueRawInfo = localStorage.getItem('continueRunInfo')

    if (continueRawInfo) {

        if (!confirmContinue(continueRawInfo)) {

            document.getElementById('msgError').innerText = 'Sorry, last run saved is broken'
            openCorrespondingTab(document.getElementById('nothing'))

        } else {

            displayContinueRun(JSON.parse(continueRawInfo))
            openCorrespondingTab(document.getElementById('continueWrap'))

        }

    } else  {

        document.getElementById('msgError').innerText = 'Sorry, no current run available'
        openCorrespondingTab(document.getElementById('nothing'))

    }

    newRun.classList.remove('selected')
    continueRun.classList.add('selected')

})


document.addEventListener('keydown', (event) => {

    const keyName = event.key;

    if (!isTyping) {

        if (keyName === 'ArrowLeft' || keyName.toLowerCase() === 'a') {

            deckPos = moveLeft (deckPos, decks)

            enableButtons (deckPos, decks, deckR, deckL)

        }
        if (keyName === 'ArrowRight' || keyName.toLowerCase() === 'd') {

            deckPos = moveRight (deckPos, decks)

            enableButtons (deckPos, decks, deckR, deckL)

        }
        if (keyName === 'ArrowUp' || keyName.toLowerCase() === 'w') {

            stakePos = moveRight (stakePos, stakes)

            enableButtons (stakePos, stakes, stakeR, stakeL)

        }
        if (keyName === 'ArrowDown' || keyName.toLowerCase() === 's') {

            stakePos = moveLeft (stakePos, stakes)

            enableButtons (stakePos, stakes, stakeR, stakeL)

        }

    }

    

    if (keyName === 'Enter') {

        if (localStorage.getItem('noPop') !== 'true') {

            const continueRawInfo = localStorage.getItem('continueRunInfo')

            if (document.getElementById('newRun').classList.contains('selected')) {

                requestAnimationFrame ( () => {

                    Swal.fire({

                        title: "Are you ready to start?",
                        html: `

                        <p>Your current state of run is ${decksList[deckPos]} Deck on ${stakeList[stakePos]} Stake with ${seed.value ? seed.value + ' as seed':'no seed'}?<p>

                        <input type="checkbox" name="noPop" id="noPop">
                        <label for="noPop">Don't show this again</label>
                        
                        `,
                        icon: "question",
                        showCancelButton: true,
                        confirmButtonText: `Play`,

                    }).then(result => {

                        const checkBox = document.getElementById('noPop')

                        if (checkBox.checked) {

                            localStorage.setItem('noPop', true)

                        } else {

                            localStorage.setItem('noPop', false)

                        }

                    })

                    requestAnimationFrame(() => {

                        document.body.classList.remove('swal2-height-auto')

                    })

                })

            } else if (document.getElementById('continueRun').classList.contains('selected') && confirmContinue(continueRawInfo)) {

                const continueInfo = JSON.parse(continueRawInfo)

                requestAnimationFrame ( () => {

                    Swal.fire({

                        title: "Are you ready to start?",
                        html: `

                        <p>You will continue this run with the ${decksList[continueInfo.run.deck]} Deck on ${stakeList[continueInfo.run.stake]} Stake of the ${continueInfo.run.date}<p>

                        <input type="checkbox" name="noPop" id="noPop">
                        <label for="noPop">Don't show this again</label>
                        
                        `,
                        icon: "question",
                        showCancelButton: true,
                        confirmButtonText: `Play`,

                    }).then(result => {

                        const checkBox = document.getElementById('noPop')

                        if (checkBox.checked) {

                            localStorage.setItem('noPop', true)

                        } else {

                            localStorage.setItem('noPop', false)

                        }

                    })

                    requestAnimationFrame(() => {

                        document.body.classList.remove('swal2-height-auto')

                    })

                })

            }

        }

        
    }

});


function updateByScroll(container) {

    let closestIndex = 0
    let closestDistance = Infinity

    Array.from(container.children).forEach((child, index) => {

        const distance = Math.abs(container.scrollLeft - child.offsetLeft)

        if (distance < closestDistance) {

            closestDistance = distance
            closestIndex = index
            
        }

    })

    return closestIndex
    
}
function enableButtons (position, container, R, L) {

    if (position >= container.children.length - 1) {

        R.disabled = true
        L.disabled = false

    } else if (position <= 0) {

        L.disabled = true
        R.disabled = false

    } else {

        R.disabled = false
        L.disabled = false

    }

}

function moveRight (position, container) {

    position = Math.min(position + 1, container.children.length - 1)
    container.scrollTo({ left: container.children[position].offsetLeft, behavior: 'smooth' })

    return position
    
}
function moveLeft (position, container) {

    position = Math.max(position - 1, 0)
    container.scrollTo({ left: container.children[position].offsetLeft, behavior: 'smooth' })

    return position

}

function openCorrespondingTab (tabs) {

    const current = document.querySelector(`.content.appear`)

    current.classList.remove('appear')
    current.style.display = 'none'

    tabs.classList.add('appear')
    tabs.style.display = ''

}

function confirmContinue (continueInfo) {

    if (!isJsonString(continueInfo)) return false

    const arrayContinue = JSON.parse(continueInfo)

    if (!(typeof arrayContinue === 'object')) return false

    for (const identifier of Object.keys(template)) {

        if (!(identifier in arrayContinue)) return false
        
        const value = template[identifier]
        
        if (Array.isArray(value)) {

            value.forEach(item => {


                if(!(item in arrayContinue[identifier])) return false

            })

        } else {

            if (!(value in arrayContinue)) return false

        }

    }

    return true

    function isJsonString(str) {

        try {

            JSON.parse(str);

        } catch (e) {

            return false;

        }

        return true;
    }

}
function displayContinueRun (continueInfo) {

    document.getElementById('deckTitleInfo').innerText = decksList[continueInfo.run.deck] + ' Deck'
    document.getElementById('continueDeck').innerText = decksList[continueInfo.run.deck] + ' Deck'

    document.getElementById('deckContInfo').innerHTML = document.getElementById(`${continueInfo.run.deck}DI`).innerHTML

    console.log(continueInfo)

    document.getElementById('continueDate').innerText = continueInfo.run.date

    document.getElementById('stakeTitleInfo').innerText = stakeList[continueInfo.run.stake] + ' Stake'
    document.getElementById('continueStake').innerText = stakeList[continueInfo.run.stake] + ' Stake'

    document.getElementById('stakeContInfo').innerHTML = document.getElementById(`${continueInfo.run.stake}SI`).innerHTML

    document.getElementById('continueAnte').innerText = continueInfo.run.ante
    document.getElementById('continueRound').innerText = continueInfo.run.round
    document.getElementById('continueMoney').innerText = continueInfo.run.money

    if (continueInfo.stats.highestScore.value == 0) {

        document.getElementById('bestTitleInfo').innerText = 'No best hand so far'

    } else {

        document.getElementById('bestTitleInfo').innerText = continueInfo.stats.highestScore.best.hand + ' Lvl. ' + continueInfo.stats.highestScore.best.lvl

    }

    if (continueInfo.stats.highestScore.fireState > 0) {

        const fireTag = document.createElement('img')
        fireTag.style.position = 'absolute'
        fireTag.style.width = '100%'
        fireTag.style.height = 8 * continueInfo.stats.highestScore.fireState + 'px'
        fireTag.style.top = '3px'
        fireTag.style.transformOrigin = '0 100%'
        fireTag.style.transform = 'translate(-50%, -100%)'

        document.getElementById('bestContChips').appendChild(fireTag.cloneNode(true))
        document.getElementById('bestContMult').appendChild(fireTag.cloneNode(true))

    }

    document.querySelector('#bestContChips p').innerText = continueInfo.stats.highestScore.chips
    document.querySelector('#bestContMult p').innerText = continueInfo.stats.highestScore.mult

    document.getElementById('continueBestHand').innerText = continueInfo.stats.highestScore.value

    if ((continueInfo.run.ante <= 8) && continueInfo.run.seed[1]) {

        document.querySelectorAll('.seedShow').forEach(e => e.hidden = true)

    } else {

        document.getElementById('continueSeed').innerText = continueInfo.run.seed[0]

    }

}


hasSeed.addEventListener('click', () => {

    document.getElementById('seed').disabled = !hasSeed.checked

    if (!hasSeed.checked) document.getElementById('seed').value = ''

})

seed.addEventListener('focus', () => {

    isTyping = true

})
seed.addEventListener('blur', () => {

    isTyping = false

})