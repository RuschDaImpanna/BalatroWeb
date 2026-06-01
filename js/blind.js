import blindList from '../json/blindLists.json' with { type: 'json' }
import { updateLeftInfo } from "./UIFixing.js"
let currentBlind

const runUtilities = JSON.parse(localStorage.getItem('runInfo'))
const randomFromSeed = new Math.seedrandom(runUtilities.run.seed)

const anteBase = blindList[1][runUtilities.run.base][runUtilities.run.ante]

//Set all variable
document.addEventListener('DOMContentLoaded', () => {

    const blindInfo = [blindList[0][0][0], blindList[0][0][1]]

    updateLeftInfo()

    if (runUtilities.gameState.blindState >= 2) {

        blindCond.innerText = blindList[0][1].forEach(bossArr => {
            
            const finding = bossArr.find(b => b.id == runUtilities.gameState.boss)

            if (finding) blindInfo.push(finding)

        })

    }

    document.getElementById('blindTxt').innerText = blindInfo[runUtilities.gameState.blindState].name
    document.getElementById('blindCond').innerText = blindInfo[runUtilities.gameState.blindState].description

    const blindContInfo = document.getElementById('blindInfo')
    blindContInfo.querySelector('img').src = blindInfo[runUtilities.gameState.blindState].image
    blindContInfo.querySelector('#minScore').innerText = anteBase*blindInfo[runUtilities.gameState.blindState].scale

})