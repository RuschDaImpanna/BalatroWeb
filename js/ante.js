import blindList from '../json/blindLists.json' with { type: 'json' }
import tagList from '../json/tagList.json' with { type: 'json' }
import { createTag } from './generateCards.js'
import { playDynamically } from './musicHandler.js'
const sfx0 = document.getElementById('player1')
const sfx1 = document.getElementById('player2')

const blindsHolder = document.querySelector('.blinds')

setTimeout(() => {

    blindsHolder.classList.remove('hidden')
    playDynamically([sfx0, sfx1], `../assets/sound/cancel.wav`, 50)

}, 500)

const runUtilities = JSON.parse(localStorage.getItem('runInfo'))
const randomFromSeed = new Math.seedrandom(runUtilities.run.seed)


const anteScore = document.getElementById('ante')
const anteBase = blindList[1][runUtilities.run.base][runUtilities.run.ante]
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

        updateVoucherView(rerollButton)

        rerollButton.addEventListener('click', () => {

            const hasCreditCard = runUtilities.inventory.jokers.some(j => j[0] == '12')

            if (runUtilities.run.money >= 10 || (hasCreditCard && runUtilities.run.money >= -10)) {

                if (findVoucher.phase == 0 && !runUtilities.gameState.hasRerolled) {

                    const bossCont = [...blindsHolder.children][2]
                    bossCont.classList.add('hidden')
                    setTimeout(() => {

                        rerollBoss(bossCont)
                        bossCont.classList.remove('hidden')
                        
                        runUtilities.gameState.hasRerolled = true
                        runUtilities.run.money-=10

                        saveToLocal()
                        updateVoucherView(rerollButton)

                    }, 250)

                } else if (findVoucher.phase == 1) {

                    const bossCont = [...blindsHolder.children][2]
                    bossCont.classList.add('hidden')
                    setTimeout(() => {

                        rerollBoss(bossCont)
                        bossCont.classList.remove('hidden')
                        runUtilities.gameState.hasRerolled = true

                        runUtilities.run.money-=10

                        saveToLocal()
                        updateVoucherView(rerollButton)

                    }, 250)

                }

                
            }

        })

        console.log(findVoucher.phase)

    }

    smallScore.innerText = new Intl.NumberFormat('en-US').format(anteBase)
    bigScore.innerText = new Intl.NumberFormat('en-US').format(anteBase*1.5)


    if (!runUtilities.gameState.boss) {

        rerollBoss(undefined)

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
        const created = createTag(availableTags[tagRand[i]].info, false)

        if (availableTags[tagRand[i]].id == 21) {

            fixSkipLayout(created)

        }

        if (availableTags[tagRand[i]].id == 13) {

            const infoText = created.querySelector('#handsForMoney')
            infoText.textContent = `$${runUtilities.stats.playingInfo.playedHands}`

        }

        if (availableTags[tagRand[i]].id == 14) {

            const infoText = created.querySelector('#discardsForMoney')
            infoText.textContent = `$${runUtilities.stats.playingInfo.lostDiscards}`

        }

        element.insertBefore(created, element.querySelector('.tagBtn'))
        
    })

    runUtilities.inventory.skipTags.forEach(tag => {

        const tagInfo = tagList.find(t => t.id == tag)
        const created = createTag(tagInfo.info, false)

        if (tagInfo.id == 21) {

            fixSkipLayout(created)

        }

        if (tagInfo.id == 13) {

            const infoText = created.querySelector('#handsForMoney')
            infoText.textContent = `$${runUtilities.stats.playingInfo.playedHands}`

        }

        if (tagInfo.id == 14) {

            const infoText = created.querySelector('#discardsForMoney')
            infoText.textContent = `$${runUtilities.stats.playingInfo.lostDiscards}`

        }

        tagDisplay.append(created)
        
    })

})

document.querySelectorAll('.tagBtn').forEach((btn, id) => {

    btn.addEventListener('click', async () => {

        if (!btn.closest('.current')) return

        const blindsAtHolder = [...blindsHolder.children]
        const currentBlind = btn.closest('.blind.normal')
        const currentIndex = blindsAtHolder.findIndex(b => b == currentBlind)
        const tagInfo = availableTags[tagRand[id]]

        //Change blind
        console.log(blindsHolder, currentBlind, currentIndex)
        currentBlind.classList.remove('current')
        currentBlind.querySelectorAll('button').forEach(btn => {

            btn.disabled = true
            
        })
        currentBlind.querySelector('.skipMark').classList.remove('noSkip')

        //Save tag
        const created = createTag(tagInfo.info, false)
        tagDisplay.append(created)
        if (tagInfo.id == 21) {

            fixSkipLayout(created)

        }
        runUtilities.inventory.skipTags.push(tagInfo.id)
        runUtilities.stats.playingInfo.skips++
        saveToLocal()

        //Play sound
        playDynamically([sfx0, sfx1], `../assets/sound/tag.wav`, 50)

        //Check update
        await checkTagUpdate().then(() => {

            assignNewBlind()
            saveToLocal()

        })

        function assignNewBlind () {

            const newCurrent = blindsAtHolder[currentIndex+1]
            newCurrent.classList.add('current')
            newCurrent.querySelectorAll('button').forEach(btn => {

                btn.disabled = false
                
            })

        }

    })
    
})

function saveToLocal () {

    localStorage.setItem('runInfo', JSON.stringify(runUtilities))

}

function updateVoucherView (rerollButton) {

    const hasCreditCard = runUtilities.inventory.jokers.some(j => j[0] == '12')

    if (runUtilities.run.money >= 10 || (hasCreditCard && runUtilities.run.money >= -10)) {

        rerollButton.disabled = false

        if (findVoucher.phase == 0 && runUtilities.gameState.hasRerolled) {

            rerollButton.disabled = true
            
        }

    } else {

        rerollButton.disabled = true

    }

}

function fixSkipLayout (skipObj) {

    const infoText = skipObj.querySelector('#skipsForMoney')
    infoText.textContent = `$${(runUtilities.stats.playingInfo.skips*5) + 5}`

}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

export async function checkTagUpdate() {

    const skipTags = runUtilities.inventory.skipTags

    await delay(500);

    for (const id of skipTags) {

        let notUsed = true

        switch (id) {

            case 8:

                if (window.location.href.endsWith('ante.html')) {

                    const bossCont = [...blindsHolder.children][2]

                    bossCont.classList.add('hidden')

                    await delay(250)

                    rerollBoss(bossCont)

                    bossCont.classList.remove('hidden')

                    runUtilities.gameState.hasRerolled = true
                    notUsed = false
                }

                break
            case 13:

                if (window.location.href.endsWith('ante.html')) {

                    const toSum = runUtilities.stats.playingInfo.playedHands
                    runUtilities.run.money += toSum

                    await delay(250)

                    sumAnimation(document.getElementById('dollars'), toSum, runUtilities.run.money).then(() => {

                        //Play sound
                        playDynamically([sfx0, sfx1], `../assets/sound/coin${Math.floor(randomFromSeed(runUtilities.run.money)*3)}.wav`, 50)

                    })

                    notUsed = false

                }

                break
            case 14:

                if (window.location.href.endsWith('ante.html')) {

                    const toSum = runUtilities.stats.playingInfo.lostDiscards
                    runUtilities.run.money += toSum

                    await delay(250)

                    sumAnimation(document.getElementById('dollars'), toSum, runUtilities.run.money).then(() => {

                        //Play sound
                        playDynamically([sfx0, sfx1], `../assets/sound/coin${Math.floor(randomFromSeed(runUtilities.run.money)*3)}.wav`, 50)

                    })

                    notUsed = false

                }

                break
            case 21:

                if (window.location.href.endsWith('ante.html')) {

                    const toSum = runUtilities.stats.playingInfo.skips*5
                    runUtilities.run.money += toSum

                    await delay(250)

                    sumAnimation(document.getElementById('dollars'), toSum, runUtilities.run.money).then(() => {

                        //Play sound
                        playDynamically([sfx0, sfx1], `../assets/sound/coin${Math.floor(randomFromSeed(runUtilities.run.money)*3)}.wav`, 50)

                    })

                    notUsed = false

                }

                break

            default:
                break

        }

        const tagsObtained = [...tagDisplay.children]
        const tagUsed = tagsObtained[skipTags.indexOf(id)]

        saveToLocal()

        console.log(notUsed, tagUsed)
        if (notUsed || !tagUsed) continue

        //Play sound
        playDynamically([sfx0, sfx1], `../assets/sound/tagRedeemed.wav`, 50)

        tagUsed.remove()
        runUtilities.inventory.skipTags = runUtilities.inventory.skipTags.filter(t => t !== id)
        saveToLocal()
        
    }
}

export function sumAnimation (container, value, finalValue) {

    return new Promise(resolve => {

        const colorBg = value >= 0 ? '#F3AD16':'#DF2525'
        const symbol = value >= 0 ? '+': ''

        container.innerText = symbol + value
        container.style.color = 'white'
        container.style.backgroundColor = colorBg

        setTimeout(() => {

            container.innerText = finalValue
            container.style.color = ''
            container.style.backgroundColor = ''

            resolve()

        }, 500)

    })

}

export function rerollBoss (blindBoss) {

    let bossesToChoose = []

    getBossesOptions()

    runUtilities.gameState.playedBosses.forEach(blindId => {

        bossesToChoose = bossesToChoose.filter(b => b.id !== blindId)

    })

    console.log(bossesToChoose)

    if (bossesToChoose.length <= 0) {

        runUtilities.gameState.playedBosses = []
        if (!blindBoss) saveToLocal()
        getBossesOptions()

    }


    runUtilities.gameState.boss = bossesToChoose[Math.floor(randomFromSeed()*bossesToChoose.length)]
    runUtilities.gameState.playedBosses.push(bossesToChoose.indexOf(runUtilities.gameState.boss))
    if (!blindBoss) saveToLocal()
    console.log(runUtilities.gameState.boss, runUtilities.gameState.playedBosses)

    if (!blindBoss) return

    blindBoss.style.borderColor = runUtilities.gameState.boss.color
    const bossTitle =  blindBoss.querySelector('#bossTitle')
    bossTitle.innerText = runUtilities.gameState.boss.name
    bossTitle.style.backgroundColor = runUtilities.gameState.boss.color
    blindBoss.querySelector('#bossCondition').innerText = runUtilities.gameState.boss.description
    blindBoss.querySelector('#bossScore').innerText = new Intl.NumberFormat('en-US').format(anteBase*runUtilities.gameState.boss.scale)
    console.log(anteBase)
    const bossReward = runUtilities.gameState.boss.id >= 23 ? '$$$$$$$$':'$$$$$'
    blindBoss.querySelector('#bossReward').innerText = bossReward
    blindBoss.querySelector('#bossBlindImg').src = runUtilities.gameState.boss.image


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

}