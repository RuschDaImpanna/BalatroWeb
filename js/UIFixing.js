const runUtilities = JSON.parse(localStorage.getItem('runInfo'))
const randomFromSeed = new Math.seedrandom(runUtilities.run.seed)

const anteScore = document.getElementById('ante')
const roundScore = document.getElementById('round')
const moneyScore = document.getElementById('dollars')

export function updateLeftInfo () {

    console.log(runUtilities)

    anteScore.innerText = runUtilities.run.ante
    roundScore.innerHTML = runUtilities.run.round
    moneyScore.innerText = `$${runUtilities.run.money}`

    document.getElementById('chips').innerText = 0
    document.getElementById('mult').innerText = 0
    document.getElementById('handType').innerText = ''
    document.getElementById('currentScore').innerText = 0

    document.querySelector('.jokers').setAttribute('jokerSize', `${runUtilities.inventory.jokers.length}/${runUtilities.inventory.jokerSize}`)
    document.querySelector('.consumables').setAttribute('consumableSize', `${runUtilities.inventory.consumables.length}/${runUtilities.inventory.consumableSize}`)

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