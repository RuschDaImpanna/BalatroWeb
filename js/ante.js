import blindList from '../json/blindLists.json' with { type: 'json' }
import tagList from '../json/tagList.json' with { type: 'json' }
import { createTag } from './generateCards.js'
import { playDynamically } from './musicHandler.js'
const sfx0 = document.getElementById('player1')
const sfx1 = document.getElementById('player2')

setTimeout(() => {

    document.querySelector('.blinds.hidden').classList.remove('hidden')
    playDynamically([sfx0, sfx1], `../assets/sound/cancel.wav`, 50)

}, 500)

const runUtilities = JSON.parse(localStorage.getItem('runInfo'))
const randomFromSeed = new Math.seedrandom(runUtilities.run.seed)


const anteScore = document.getElementById('ante')
const roundScore = document.getElementById('round')
const moneyScore = document.getElementById('dollars')

const rerollButton = document.getElementById('rerollBlind')

const smallScore = document.getElementById('smallScore')
const bigScore = document.getElementById('bigScore')

let availableTags = tagList
if (runUtilities.run.ante <= 1) {

    const bannedTags = [2, 9, 11, 12, 13, 14, 15, 20, 22]
    availableTags = availableTags.filter(t => !bannedTags.some(b => b == t.id))

}
const tagRand = [Math.floor(randomFromSeed(runUtilities.run.ante)*availableTags.length), Math.floor(randomFromSeed(runUtilities.run.ante)*availableTags.length)]
while (tagRand[0] == tagRand[1]) {

    tagRand[1] = Math.floor(randomFromSeed(runUtilities.run.ante)*availableTags.length)

}
const tagDisplay = document.getElementById('tags')

//Set all variables
document.addEventListener('DOMContentLoaded', () => {

    console.log(runUtilities)

    document.title = `Ante ${runUtilities.run.ante} - Balatro Web Port`

    const anteBase = blindList[1][runUtilities.run.base][runUtilities.run.ante]

    anteScore.innerText = runUtilities.run.ante
    roundScore.innerHTML = runUtilities.run.round
    moneyScore.innerText = `$${runUtilities.run.money}`

    document.getElementById('chips').innerText = 0
    document.getElementById('mult').innerText = 0
    document.getElementById('handType').innerText = ''
    document.getElementById('currentScore').innerText = 0

    document.querySelector('.jokers').setAttribute('jokerSize', `${runUtilities.inventory.jokers.length}/${runUtilities.inventory.jokerSize}`)
    document.querySelector('.consumables').setAttribute('consumableSize', `${runUtilities.inventory.consumables.length}/${runUtilities.inventory.consumableSize}`)

    rerollButton.hidden = true

    const findVoucher = runUtilities.inventory.vouchers.find(voucher => voucher.id === 14)

    if (findVoucher) {

        rerollButton.hidden = false
        rerollButton.disabled = false

        rerollButton.addEventListener('click', () => {

            if (findVoucher.phase == 0 && !runUtilities.gameState.hasRerolled) {

                runUtilities.gameState.hasRerolled = true
                saveToLocal()

            }

        })

        console.log(findVoucher.phase)

    }

    smallScore.innerText = new Intl.NumberFormat('en-US').format(anteBase)
    bigScore.innerText = new Intl.NumberFormat('en-US').format(anteBase*1.5)


    if (!runUtilities.gameState.boss) {

        let bossesToChoose = []

        getBossesOptions()

        runUtilities.gameState.playedBosses.forEach(blindId => {

            bossesToChoose = bossesToChoose.filter(b => b.id !== blindId)

        })

        console.log(bossesToChoose)

        if (bossesToChoose.length <= 0) {

            runUtilities.gameState.playedBosses = []
            saveToLocal()
            getBossesOptions()

        }

        function getBossesOptions () {

            if (runUtilities.run.ante%8 == 0 && runUtilities.run.ante !== 0) {

                bossesToChoose.push(...blindList[0][2])
                return

            }

            const calcAnte = runUtilities.run.ante <= 0 ? 1:runUtilities.run.ante

            for (let a = 0; a < calcAnte; a++) {

                bossesToChoose.push(...blindList[0][1][a])
                
            }

        }

        runUtilities.gameState.boss = bossesToChoose[Math.floor(randomFromSeed()*bossesToChoose.length)]
        runUtilities.gameState.playedBosses.push(bossesToChoose.indexOf(runUtilities.gameState.boss))
        saveToLocal()
        console.log(runUtilities.gameState.boss, runUtilities.gameState.playedBosses)

    }

    document.getElementById('boss').style.borderColor = runUtilities.gameState.boss.color
    const bossTitle =  document.getElementById('bossTitle')
    bossTitle.innerText = runUtilities.gameState.boss.name
    bossTitle.style.backgroundColor = runUtilities.gameState.boss.color
    document.getElementById('bossCondition').innerText = runUtilities.gameState.boss.description
    document.getElementById('bossScore').innerText = new Intl.NumberFormat('en-US').format(anteBase*runUtilities.gameState.boss.scale)
    const bossReward = runUtilities.gameState.boss.id >= 23 ? '$$$$$$$$':'$$$$$'
    document.getElementById('bossReward').innerText = bossReward
    document.getElementById('bossBlindImg').src = runUtilities.gameState.boss.image



    document.getElementById('deckImg').src = `../assets/playCards/cards_b${runUtilities.run.deck.toString(16)}.png`


    document.querySelectorAll('.tagSelInfo').forEach((element, i) => {

        console.log(availableTags[tagRand[i]])

        element.insertBefore(createTag(availableTags[tagRand[i]].info, false), element.querySelector('.tagBtn'))
        
    })

    runUtilities.inventory.skipTags.forEach(tag => {

        const tagInfo = tagList.find(t => t.id == tag)
        tagDisplay.append(createTag(tagInfo.info, false))
        
    })

})

document.querySelectorAll('.tagBtn').forEach((btn, id) => {

    btn.addEventListener('click', () => {

        const tagInfo = availableTags[tagRand[id]]
        tagDisplay.append(createTag(tagInfo.info, false))
        console.log(tagInfo.info)
        playDynamically([sfx0, sfx1], `../assets/sound/tag.wav`, 45)

    })
    
})

function saveToLocal () {

    localStorage.setItem('runInfo', JSON.stringify(runUtilities))

}