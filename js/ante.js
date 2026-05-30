import blindList from '../json/blindLists.json' with { type: 'json' }
import tagList from '../json/tagList.json' with { type: 'json' }
import { createTag } from './generateCards.js'

setTimeout(() => {

    document.querySelector('.blinds.hidden').classList.remove('hidden')

}, 500)

const runUtilities = JSON.parse(localStorage.getItem('runInfo'))
const randomFromSeed = new Math.seedrandom(runUtilities.run.seed)


const anteScore = document.getElementById('ante')
const roundScore = document.getElementById('round')
const moneyScore = document.getElementById('dollars')

const rerollButton = document.getElementById('rerollBlind')

const smallScore = document.getElementById('smallScore')
const bigScore = document.getElementById('bigScore')

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
        //saveToLocal()
        console.log(runUtilities.gameState.boss, runUtilities.gameState.playedBosses)

    }

    document.getElementById('bossTitle').innerText = runUtilities.gameState.boss.name
    document.getElementById('bossCondition').innerText = runUtilities.gameState.boss.description
    document.getElementById('bossScore').innerText = new Intl.NumberFormat('en-US').format(anteBase*runUtilities.gameState.boss.scale)
    const bossReward = runUtilities.gameState.boss.id >= 23 ? '$$$$$$$$':'$$$$$'
    document.getElementById('bossReward').innerText = bossReward
    document.getElementById('bossBlindImg').src = runUtilities.gameState.boss.image

    document.getElementById('deckImg').src = `../assets/playCards/cards_b${runUtilities.run.deck.toString(16)}.png`


    const tagRand = [randomFromSeed(runUtilities.run.ante), randomFromSeed(runUtilities.run.ante)]
    console.log(tagRand, tagList)

    document.querySelectorAll('.tagSelInfo').forEach((element, i) => {

        console.log(tagList[Math.floor(tagRand[i]*tagList.length)])

        element.insertBefore(createTag(tagList[Math.floor(tagRand[i]*tagList.length)].info, false), element.querySelector('.tagBtn'))
        
    })

})

function saveToLocal () {

    localStorage.setItem('runInfo', JSON.stringify(runUtilities))

}