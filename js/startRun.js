import template from '../json/continueTemplate.json' with { type: 'json' }
import standardDeck from '../json/standardDeck.json' with { type: 'json' }
import runInfo from '../json/runSettingLists.json' with { type: 'json' }
import { movingCard } from './movingCards.js'
import { tagSfx } from './musicHandler.js'

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


const playBtn = document.getElementById('play')

window.addEventListener('DOMContentLoaded', () => {

    const decksContImg = document.querySelectorAll('.dragSlot')

    decksContImg.forEach(container => {

        movingCard(container, true)
        
    })

})


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

    const continueRawInfo = localStorage.getItem('runInfo')

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

playBtn.addEventListener('click', () => {

    startNewRun()

})


document.addEventListener('keydown', (event) => {

    const keyName = event.key;

    if (!isTyping) {

        if (keyName === 'ArrowLeft' || keyName.toLowerCase() === 'a') {

            if (!(deckPos <= 0)) btnSfxByKeyboard()
                else cancelSfxByKeyboard()

            deckPos = moveLeft (deckPos, decks)

            enableButtons (deckPos, decks, deckR, deckL)

        }
        if (keyName === 'ArrowRight' || keyName.toLowerCase() === 'd') {

            if (!(deckPos >= decks.children.length - 1)) btnSfxByKeyboard()
                else cancelSfxByKeyboard()

            deckPos = moveRight (deckPos, decks)

            enableButtons (deckPos, decks, deckR, deckL)

        }
        if (keyName === 'ArrowUp' || keyName.toLowerCase() === 'w') {

            if (!(stakePos >= stakes.children.length - 1)) btnSfxByKeyboard()
                else cancelSfxByKeyboard()

            stakePos = moveRight (stakePos, stakes)

            enableButtons (stakePos, stakes, stakeR, stakeL)

        }
        if (keyName === 'ArrowDown' || keyName.toLowerCase() === 's') {

            if (!(stakePos <= 0)) btnSfxByKeyboard()
                else cancelSfxByKeyboard()

            stakePos = moveLeft (stakePos, stakes)

            enableButtons (stakePos, stakes, stakeR, stakeL)

        }

    }

    

    if (keyName === 'Enter') {

        if (localStorage.getItem('noPop') !== 'true') {

            const continueRawInfo = localStorage.getItem('runInfo')

            if (document.getElementById('newRun').classList.contains('selected')) {

                requestAnimationFrame ( () => {

                    Swal.fire({

                        title: "Are you ready to start?",
                        html: `

                        <p>Your current state of run is ${runInfo[0][deckPos].name} on ${runInfo[1][stakePos].name} with ${seed.value ? seed.value + ' as seed':'no seed'}?<p>

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

                        if (result.isConfirmed) startNewRun()

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

                        <p>You will continue this run with the ${runInfo[0][continueInfo.run.deck].name} on ${runInfo[1][continueInfo.run.stake].name} of the ${continueInfo.run.date}<p>

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
    console.log('is JSON')

    const arrayContinue = JSON.parse(continueInfo)

    if (!(typeof arrayContinue === 'object')) return false

    console.log('is object')

    for (const identifier of Object.keys(template)) {

        if (!(identifier in arrayContinue)) return false

        console.log(identifier + ' is there')
        
        const value = template[identifier]
        
        if (Array.isArray(value)) {

            value.forEach(item => {

                console.log(arrayContinue[identifier], item)

                if(!(item in arrayContinue[identifier])) return false

            })

        } else if (typeof value == 'object'){

            console.log('object')
            for (const metaIdentifier of Object.keys(value)) {

                if (!(metaIdentifier in arrayContinue[identifier])) return false
                
            }

        } else {

            return false

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

    document.getElementById('deckTitleInfo').innerText = runInfo[0][continueInfo.run.deck].name
    document.getElementById('continueDeck').innerText = runInfo[0][continueInfo.run.deck].name

    document.getElementById('deckContInfo').innerHTML = document.getElementById(`${continueInfo.run.deck}DI`).innerHTML

    console.log(continueInfo)

    const registeredDate = new Date (continueInfo.run.date)

    document.getElementById('continueDate').innerText = new Intl.DateTimeFormat("en-US", { day: "numeric", month: "long", year: "numeric", hour: "numeric", minute: "2-digit", }).format(registeredDate)

    document.getElementById('stakeTitleInfo').innerText = runInfo[1][continueInfo.run.stake].name
    document.getElementById('continueStake').innerText = runInfo[1][continueInfo.run.stake].name

    document.getElementById('stakeContInfo').innerHTML = document.getElementById(`${continueInfo.run.stake}SI`).innerHTML

    document.querySelector('#currentDeckImg img').src = `../assets/playCards/cards_b${continueInfo.run.deck}.png`

    document.getElementById('continueAnte').innerText = continueInfo.run.ante
    document.getElementById('continueRound').innerText = continueInfo.run.round
    document.getElementById('continueMoney').innerText = continueInfo.run.money

    if (continueInfo.stats.highestScore.value == 0) {

        document.getElementById('bestTitleInfo').innerText = 'No best hand so far'

    } else {

        document.getElementById('bestTitleInfo').innerText = continueInfo.stats.highestScore.bestHand + ' Lvl. ' + continueInfo.stats.highestScore.bestLvl

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

    tagSfx()

    document.getElementById('seed').disabled = !hasSeed.checked

    if (!hasSeed.checked) document.getElementById('seed').value = ''

})

seed.addEventListener('focus', () => {

    isTyping = true

})
seed.addEventListener('blur', () => {

    isTyping = false

})

function btnSfxByKeyboard () {

    const player1 = document.getElementById('player1')

    player1.src = `../assets/sound/button.wav`
    player1.load()

    player1.addEventListener('canplay', async () => {

        try {

            await player1.play()

        } catch (err) {

            errorPlay()
            
        }

    })

}

function cancelSfxByKeyboard () {

    const player1 = document.getElementById('player1')

    player1.src = `../assets/sound/cancel.wav`
    player1.load()

    player1.addEventListener('canplay', async () => {

        try {

            await player1.play()

        } catch (err) {

            errorPlay()
            
        }

    })

}

function startNewRun () {

    const getDeck = runInfo[0][deckPos]
    const getStake = runInfo[1][stakePos]

    const getSeed = new Math.seedrandom(getPos()+localStorage.getItem('lastAlive'))
    const potentialSeed = getSeed()

    //Run info
    const deck = {'deck': deckPos}
    const stake = {'stake': stakePos}
    const base = {'base': (getPropertyOnStake('scaleFast') || 0)}
    const date = {'date': new Date()}
    const seedValue = {'seed': checkSeed(seed.value) || formatSeed(potentialSeed)}
    const state = {'state': 0}
    const ante = {'ante': 1}
    const round = {'round': 0}
    const money = {'money': 4 + (getPropertyOnDeck('money') || 0)}
    const handCount = {'handCount': 4 + (getPropertyOnDeck('handCount') || 0)} 
    const discardCount = {'discardCount': 3 + (getPropertyOnDeck('discardCount') || 0) + (getPropertyOnStake('discardCount') || 0)}
    const handSize = {'handSize': 8 + (getPropertyOnDeck('handSize') || 0)}
    const doubleBase = {'doubleBase': deckPos == 13}

    //Stats
    const scoreInfo = {

        'bestHand': '',
        'bestLvl': 0,
        'fireState': 0,
        'chips': 0,
        'mult': 0,
        'value': 0

    }
    const highestScore = {'highestScore': scoreInfo}

    //Shop
    const handInterest = {'handInterest': 1 + (getPropertyOnDeck('handInterest') || 0)}
    const discardInterest = {'discardInterest': 0 + (getPropertyOnDeck('discardInterest') || 0)}
    const interestCap = {'interestCap': getPropertyOnDeck('interestCap') ?? 5}
    const isBuyingPack = {'isBuyingPack': false}
    const shopState = {'shopState': 0}
    const shopSize = {'shopSize': 2}
    const weightInfo = {

        'jokerWeight': 20,
        'jokerSticker': (getPropertyOnStake('jokerSticker') || 0),
        'editionWeight': 1,
        'tarotWeight': 4,
        'planetWeight': 4,
        'cardsWeight': 0,
        'spectralWeight': 0 + (getPropertyOnDeck('spectralWeight') || 0)

    }
    const shopWeights = {'shopWeights': weightInfo}

    //Gamestate
    const blindState = {'blindState': 0}
    const hasRerolled = {'hasRerolled': false}
    const boss = {'boss': 0}
    const playedBosses = {'playedBosses': []}
    const currentScore = {'currentScore' : 0}
    const alreadyPlayedCards = {'alreadyPlayedCards' : []}
    const handCards = {'handCards' : []}
    const currentHands = {'currentHands' : handCount.handCount}
    const currentDiscards = {'currentDiscards' : discardCount.discardCount}
    const currentToScore = {'currentToScore' : [0, 0, '']}

    //Inventory
    const jokerSize = {'jokerSize': 5 + (getPropertyOnDeck('jokerSize') || 0)}
    const consumableSize = {'consumableSize': 2 + (getPropertyOnDeck('consumableSize') || 0)}
    const lastConsumable = {'lastConsumable': 'None'}
    const skipTags = {'skipTags': []}
    const pokerLvls = {'pokerLvls': [

        {id:0, lvl:1, times:0},
        {id:1, lvl:1, times:0},
        {id:2, lvl:1, times:0},
        {id:3, lvl:1, times:0},
        {id:4, lvl:1, times:0},
        {id:5, lvl:1, times:0},
        {id:6, lvl:1, times:0},
        {id:7, lvl:1, times:0},
        {id:8, lvl:1, times:0},
        {id:9, lvl:1, times:0},
        {id:10, lvl:1, times:0},
        {id:11, lvl:1, times:0},

     ]}
    const jokers = {'jokers': []}
    const vouchers = {'vouchers': getPropertyOnDeck('vouchersObtained') || []}
    const consumables = {'consumables': getPropertyOnDeck('consumableObjects') || []}

    //Deckstate
    const deckState = {'deckState': generateDeck()}

    localStorage.setItem('runInfo', JSON.stringify({

        'run': {

            ...deck,
            ...stake,
            ...base,
            ...date,
            ...seedValue,
            ...state,
            ...ante,
            ...round,
            ...money,
            ...handCount,
            ...discardCount,
            ...handSize,
            ...doubleBase

        },
        'stats': {

            ...highestScore

        },
        'shop': {

            ...handInterest,
            ...discardInterest,
            ...interestCap,
            ...isBuyingPack,
            ...shopState,
            ...shopSize,
            ...shopWeights

        },
        'gameState': {

            ...blindState,
            ...hasRerolled,
            ...boss,
            ...playedBosses,
            ...currentScore,
            ...alreadyPlayedCards,
            ...handCards,
            ...currentHands,
            ...currentDiscards,
            ...currentToScore

        },
        'inventory': {

            ...jokerSize,
            ...consumableSize,
            ...lastConsumable,
            ...skipTags,
            ...pokerLvls,
            ...jokers,
            ...vouchers,
            ...consumables
            
        },
        ...deckState

    }))

    window.location.href = '../html/ante.html'

    function getPos () {

        return new Promise(resolve => {

            const handler = (event) => {

                const x = event.clientX;
                const y = event.clientY;

                document.removeEventListener('mousemove', handler);

                resolve(x * y);

            };

            document.addEventListener('mousemove', handler);
        })

    }

    function getPropertyOnDeck (propertyName) {

        const properties = Array.isArray(getDeck.property) ? getDeck.property : [getDeck.property]
        const values = Array.isArray(getDeck.value) ? getDeck.value : [getDeck.value]
        
        const index = properties.findIndex(p => typeof p === "string" ? p === propertyName : p.name === propertyName)

        if (index === -1) return undefined

        const property = properties[index]

        return typeof property === "object" ? property.inventory : values[index];

    }

    function getPropertyOnStake (propertyName) {

        let result

        for (let s = 0; s <= stakePos; s++) {

            const stake = runInfo[1][s];

            if (stake.property == propertyName) result = stake.value

        }

        return result
        
    }

    function formatSeed (seed) {

        const text = "ABCDEFGHIJKLMNPQRSTUVWXYZ123456789"
        let result = ""

        for (let i = 0; i < 8; i++) {

            const char = Math.floor(getSeed() * text.length)
            result += text[char]

        }

        return result;

    }

    function checkSeed (seed) {

        const seedArr = [...seed]
        const randomFromSeed = new Math.seedrandom(seed)
        const text = "ABCDEFGHIJKLMNPQRSTUVWXYZ123456789"
        let result = ""

        seedArr.forEach(letter => {

            if ([...text].find(l => l == letter.toUpperCase())) result += letter.toUpperCase()
                else result += text[Math.floor(randomFromSeed() * text.length)]
            
        })

        return result

    }

    function generateDeck () {

        let currentDeck = standardDeck[0]
        const deckTransform = getPropertyOnDeck('changeCards')

        switch (deckTransform){

            case 1: 

                const face = [11, 12, 13]
                currentDeck = currentDeck.filter(card => !face.some(f => card[1].endsWith(String(f))))
                break
            
            case 2:

                const suitMap = {

                    D: 'H',
                    C: 'S'

                }
                currentDeck.forEach(card => {

                    const suit = card[1][0]

                    if (suitMap[suit]) {

                        card[1] = suitMap[suit] + card[1].slice(1)

                    }

                })
                break
            
            case 3:

                currentDeck = []
                const cardCreation = new Math.seedrandom(seedValue[1])
                const suits = ['D', 'S', 'H', 'C']

                for (let i = 0; i < 52; i++) {

                    const currentCard = suits[Math.floor(cardCreation()*4)] +  (Math.floor(cardCreation() * 13) + 1)
                    currentDeck.push([i, currentCard , 0, 0, 0, true])
                    
                }
                break

            default:

                currentDeck = standardDeck[0]
            
        }

        return currentDeck

    }

}