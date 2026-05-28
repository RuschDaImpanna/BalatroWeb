import { noAnimCardsGen } from "./generateCards.js"
import { movingCard } from "./movingCards.js"
import { changeVolume, buttonSfx, hoverCardSfx } from "./musicHandler.js"
import voucherTemplate from '../json/voucherList.json' with { type: 'json' }
import tarotTemplate from '../json/tarotList.json' with { type: 'json' }
import planetTemplate from '../json/pokerLvls.json' with { type: 'json' }
import spectralTemplate from '../json/spectralList.json' with { type: 'json' }
import cardsTemplate from '../json/cardList.json' with { type: 'json' }
import boosterTemplate from '../json/boosterList.json' with { type: 'json' }

export function settingsSwal () {

    Swal.fire({

        title: "Settings",
        html: (`

            <div class="settingsSwal">

                <div class="settingContainer" id="gameSpeedContainer">

                    <h4>Game Speed</h4>

                    <div class="sliderWrap">

                        <span id="gameSpeedTxt">##GAMESPEED##</span>
                        <input type="range" min="0" max="4" class="slider" id="gameSpeed">

                    </div>
                    

                </div>

                <div class="settingContainer" id="buttonsPosContainer">

                    <h4>Play/Discard Button Position</h4>

                    <form id="buttonsPos">

                        <div class="radioButtonPos" id="normalBtn">

                            <input type="radio" name="buttonsPos" id="normalPos">
                            <span>Play/Discard</span>

                        </div>

                        <div class="radioButtonPos" id="invertBtn">

                            <input type="radio" name="buttonsPos" id="invertPos">
                            <span>Discard/Play</span>

                        </div>

                    <form>
                
                </div>

                <div class="settingContainer" id="screenContainer">

                    <h4>Screenshake</h4>

                    <div class="sliderWrap">

                        <span id="screenTxt">##SCREENSHAKE##</span>
                        <input type="range" min="0" max="100" class="slider" id="screen">

                    </div>

                </div>

                <div class="settingContainer" id="volumeContainer">

                    <h4>Volumes</h4>

                    <div class="volumeContainer">

                        <h5>Master Volume</h5>

                        <div class="sliderWrap">

                            <span id="masterTxt">##MASTER##</span>
                            <input type="range" min="0" max="100" class="slider" id="master">

                        </div>

                    </div>

                    <div class="volumeContainer">

                        <h5>Music Volume</h5>
                        <div class="sliderWrap">

                            <span id="musicTxt">##MUSIC##</span>
                            <input type="range" min="0" max="100" class="slider" id="music">

                        </div>

                    </div>

                    <div class="volumeContainer">

                        <h5>SFX Volume</h5>
                        <div class="sliderWrap">

                            <span id="sfxTxt">##SFX##</span>
                            <input type="range" min="0" max="100" class="slider" id="sfx">

                        </div>

                    </div>

                </div>

            </div>
            
        `),
        showCloseButton: true,
        confirmButtonColor: '#F3AD16',
        confirmButtonText: 'Close',
        background: '#3C565E',
        customClass: {
            container: 'settingsSwalContainer',
            popup: 'settingsSwalPopup'
        },
        didOpen: () => {

            //Load SFX
            buttonSfx('button')

            const gameSpeedSlider = document.getElementById('gameSpeed')
            const gameSpeedDisplay = document.getElementById('gameSpeedTxt')

            const buttonsPos = [...document.getElementById('buttonsPos').children]

            const screenSlider = document.getElementById('screen')
            const screenDisplay = document.getElementById('screenTxt')

            const masterSlider = document.getElementById('master')
            const musicSlider = document.getElementById('music')
            const sfxSlider = document.getElementById('sfx')
            const masterDisplay = document.getElementById('masterTxt')
            const musicDisplay = document.getElementById('musicTxt')
            const sfxDisplay = document.getElementById('sfxTxt')

            let volume = [100, 80, 80]

            //Set default values
            let gameSpeedValue = localStorage.getItem('gameSpeed')
            if (!gameSpeedValue) {

                gameSpeedValue = gameSpeedSlider.value
                localStorage.setItem('gameSpeed', gameSpeedValue)

            }
            let screenValue = localStorage.getItem('screen')
            if (!screenValue) {

                screenValue = screenSlider.value
                localStorage.setItem('screen', screenValue)

            }
            const savedVolume = localStorage.getItem('volume')
            if (savedVolume) volume = JSON.parse(savedVolume)
                 else localStorage.setItem('volume', JSON.stringify(volume))

            gameSpeedSlider.value = gameSpeedValue
            gameSpeedDisplay.innerHTML = gameSpeedValue

            screenSlider.value = screenValue
            screenDisplay.innerHTML = screenValue

            masterSlider.value = volume[0]
            masterDisplay.innerHTML = volume[0]
            musicSlider.value = volume[1]
            musicDisplay.innerHTML = volume[1]
            sfxSlider.value = volume[2]
            sfxDisplay.innerHTML = volume[2]


            //Set slider values
            gameSpeedSlider.oninput = function() {

                const speed = Math.pow(2, Number(this.value) - 1) 

                gameSpeedDisplay.innerHTML = speed
                localStorage.setItem('gameSpeed',speed)
                
            }
            screenSlider.oninput = function() {

                screenDisplay.innerHTML = this.value
                localStorage.setItem('screen',this.value)
                
            }

            //Set radio values
            buttonSfx('.radioButtonPos')
            buttonsPos.forEach((radioDiv, i) => {

                const input = [...radioDiv.children][0]

                if (i == localStorage.getItem('buttonsPos')) {

                    input.checked = true
                    radioDiv.classList.add('selected')

                }

                radioDiv.addEventListener('click', () => { 

                    input.checked = true
                    localStorage.setItem('buttonsPos', i)

                    buttonsPos.find(d => d != radioDiv).classList.remove('selected')
                    radioDiv.classList.add('selected')

                })

                input.addEventListener('change', () => { localStorage.setItem('buttonsPos', i) })
                
            })

            //Set volume values
            function saveVolumes() {

                const saveVolume = [

                    masterSlider.value,
                    musicSlider.value,
                    sfxSlider.value

                ]

                localStorage.setItem('volume', JSON.stringify(saveVolume))

                changeVolume()

            }

            masterSlider.oninput = function() {
                masterDisplay.innerHTML = this.value
                saveVolumes()
            }

            musicSlider.oninput = function() {
                musicDisplay.innerHTML = this.value
                saveVolumes()
            }

            sfxSlider.oninput = function() {
                sfxDisplay.innerHTML = this.value
                saveVolumes()
            }

            requestAnimationFrame(() => {

                document.body.classList.remove('swal2-height-auto')

            })

        }

    })


}

export function collectionSwal () {

    Swal.fire({

        title: "Collection",
        html: (`

            <div class="collectionSet" id="leftSet">

                <div class="miniCollectionSet">

                    <button type="button" id="col0">Jokers</button>
                    <button type="button" id="col1">Decks</button>
                    <button type="button" id="col2">Vouchers</button>

                </div>

                <div id="consumableCollectionSet">

                    <h4>CONSUMABLES</h4>
                    
                    <br>

                    <div class="miniCollectionSet">

                        <button type="button" id="col3">Tarot Cards</button>
                        <button type="button" id="col4">Planet Cards</button>
                        <button type="button" id="col5">Spectral Cards</button>

                    </div>

                </div>

            </div>

            <div class="collectionSet" id="rightSet">

                <div id="cardsCollectionSet">

                    <div class="miniCollectionSet">

                        <button type="button" id="col6">Enhanced Cards</button>
                        <button type="button" id="col7">Seals</button>
                        <button type="button" id="col8">Editions</button>

                    </div>

                    <br>

                    <h4>CARDS</h4>

                </div>

                <div class="miniCollectionSet">

                    <button type="button" id="col9">Booster Packs</button>
                    <button type="button" id="colA">Tags</button>
                    <button type="button" id="colB">Blinds</button>

                </div>

            </div>

        `),
        didOpen: () => {

            //Load SFX
            buttonSfx('button')

            const htmlContainer = document.getElementById('swal2-html-container')
            const buttons = [...htmlContainer.querySelectorAll('*')].filter(b => b.tagName == 'BUTTON' )
            
            buttons.forEach((btn, i)=> {

                btn.addEventListener('click', () => collectionTabs(i))
                
            });

            requestAnimationFrame(() => {

                document.body.classList.remove('swal2-height-auto')

            })

        },
        showCloseButton: true,
        confirmButtonColor: '#F3AD16',
        confirmButtonText: 'Close',
        background: '#3C565E',
        customClass: {
            container: 'collectionSwalContainer',
            popup: 'collectionSwalPopup'
        },

    })

}

function collectionTabs (id) {

    Swal.close()
    
    switch (id) {

        case 0:
            Swal.fire({

                title: "Jokers",
                text: "You clicked the button!",
                icon: "success",
                didOpen: () => { 

                    //Load SFX
                    buttonSfx('button')

                    requestAnimationFrame(() => {

                        document.body.classList.remove('swal2-height-auto')

                    })

                },
                showCloseButton: true,
                confirmButtonColor: '#F3AD16',
                confirmButtonText: 'Back',
                background: '#3C565E',
                customClass: {
                    container: 'collectionTabsContainer, colCon0',
                    popup: 'collectionTabPopup colTab0'
                },

            }).then(r => {

                if (r.isConfirmed) collectionSwal()

            })
            break
        case 1:
            const iFrame = takeIframe()
            document.body.append(iFrame)
            Swal.fire({

                title: "Decks",
                html:(`

                    <div id="holder1">

                    </div>
                    
                `),
                didOpen: () => { 

                    const modal = Swal.getPopup()

                    iFrame.addEventListener('load', () => {

                        const deckPlace = modal.querySelector('#holder1')
                        const iframeDoc = iFrame.contentDocument

                        deckPlace.innerHTML = iframeDoc.querySelector('#decksWrap').innerHTML

                        const row = modal.querySelectorAll('.dragSlot')

                        //Load SFX
                        buttonSfx('button')

                        setDeckScroll(modal.querySelector('.decks'), modal.querySelector('#deckL'), modal.querySelector('#deckR'), 1)

                        row.forEach(r => {

                            movingCard(r, true)
                            
                        })

                        iFrame.remove()

                    })

                    requestAnimationFrame(() => {

                        document.body.classList.remove('swal2-height-auto')

                    })

                },
                showCloseButton: true,
                confirmButtonColor: '#F3AD16',
                confirmButtonText: 'Back',
                background: '#3C565E',
                customClass: {
                    container: 'collectionTabsContainer, colCon1',
                    popup: 'collectionTabPopup colTab1'
                },

            }).then(r => {

                if (r.isConfirmed) collectionSwal()

            })
            function takeIframe () {

                const iFrameDeck = document.createElement('iframe')
                iFrameDeck.src = "../html/deck.html"
                iFrameDeck.style.pointerEvents = 'none'
                iFrameDeck.style.position = 'absolute'
                iFrameDeck.style.opacity = 0

                return iFrameDeck

            }
            break
        case 2:
            Swal.fire({

                title: "Voucher",
                html:(`

                    <div class="bigContCol">
                    
                        <div class="holder" id="holder2">

                            <div class="cardsRow row4">

                                <div class="voucherHolder">
                                
                                    

                                </div>

                                <div class="voucherHolder">
                                
                                    

                                </div>

                                <div class="voucherHolder">
                                
                                    

                                </div>

                                <div class="voucherHolder">
                                
                                    

                                </div>

                            </div>

                            <div class="cardsRow row4">

                                <div class="voucherHolder">
                                
                                    

                                </div>

                                <div class="voucherHolder">
                                
                                    

                                </div>

                                <div class="voucherHolder">
                                
                                    

                                </div>

                                <div class="voucherHolder">
                                
                                    

                                </div>

                            </div>

                            <div class="cardsRow row4">

                                <div class="voucherHolder">
                                
                                    

                                </div>

                                <div class="voucherHolder">
                                
                                    

                                </div>

                                <div class="voucherHolder">
                                
                                    

                                </div>

                                <div class="voucherHolder">
                                
                                    

                                </div>

                            </div>

                            <div class="cardsRow row4">

                                <div class="voucherHolder">
                                
                                    

                                </div>

                                <div class="voucherHolder">
                                
                                    

                                </div>

                                <div class="voucherHolder">
                                
                                    

                                </div>

                                <div class="voucherHolder">
                                
                                    

                                </div>

                            </div>

                        </div>

                        <button class="left" id="voucherL" style="z-index: 999;" disabled>

                            <span class="material-symbols-outlined">chevron_left</span>

                        </button>

                        <button class="right" id="voucherR" style="z-index: 999;">

                            <span class="material-symbols-outlined">chevron_right</span>

                        </button>
                    
                    </div>

                `),
                didOpen: () => { 

                    const modal = Swal.getPopup()
                    const row = document.querySelectorAll('.voucherHolder')

                    setDeckScroll(modal.querySelector('#holder2'), modal.querySelector('#voucherL'), modal.querySelector('#voucherR'), 2)

                    row.forEach((r, i) => {

                        noAnimCardsGen(r, voucherTemplate, 'consumableInfoWrapper', i, ['Voucher'])
                        movingCard(r, false)
                        
                    })

                    //Load SFX
                    buttonSfx('button')
                    hoverCardSfx('.consumableInfoWrapper')

                    requestAnimationFrame(() => {

                        document.body.classList.remove('swal2-height-auto')

                    })

                },
                showCloseButton: true,
                confirmButtonColor: '#F3AD16',
                confirmButtonText: 'Back',
                background: '#3C565E',
                customClass: {
                    container: 'collectionTabsContainer, colCon2',
                    popup: 'collectionTabPopup colTab2'
                },

            }).then(r => {

                if (r.isConfirmed) collectionSwal()

            })
            break
        case 3:
            Swal.fire({

                title: "Tarot Cards",
                html:(`

                    <div class="bigContCol">
                    
                        <div class="holder" id="holder3">

                            <div class="cardsRow row5">

                                

                            </div>

                            <div class="cardsRow row6">

                                

                            </div>

                            <div class="cardsRow row5">

                                

                            </div>

                            <div class="cardsRow row6">

                                

                            </div>

                            </div>

                        </div>

                        <button class="left" id="tarotL" style="z-index: 999;" disabled>

                            <span class="material-symbols-outlined">chevron_left</span>

                        </button>

                        <button class="right" id="tarotR" style="z-index: 999;">

                            <span class="material-symbols-outlined">chevron_right</span>

                        </button>

                    </div>                    

                `),
                didOpen: () => { 

                    const modal = Swal.getPopup()
                    const row = document.querySelectorAll('.cardsRow')

                    setDeckScroll(modal.querySelector('#holder3'), modal.querySelector('#tarotL'), modal.querySelector('#tarotR'), 2)

                    let cardScan = 0
                    row.forEach(r => {

                        const rowClasses = [...r.classList]
                        const size = Number(rowClasses.find(c => c.startsWith('row')).slice(-1))

                        for (let t = 0; t < size; t++) {
                            
                            noAnimCardsGen(r, tarotTemplate, 'consumableInfoWrapper', cardScan + t, ['Tarot'])
                            
                        }

                        cardScan += size

                        movingCard(r, false)
                        
                    })

                    //Load SFX
                    buttonSfx('button')
                    hoverCardSfx('.consumableInfoWrapper')

                    requestAnimationFrame(() => {

                        document.body.classList.remove('swal2-height-auto')

                    })

                },
                showCloseButton: true,
                confirmButtonColor: '#F3AD16',
                confirmButtonText: 'Back',
                background: '#3C565E',
                customClass: {
                    container: 'collectionTabsContainer, colCon3',
                    popup: 'collectionTabPopup colTab3'
                },

            }).then(r => {

                if (r.isConfirmed) collectionSwal()

            })
            break
        case 4:
            Swal.fire({

                title: "Planet Cards",
                html:(`

                    <div class="bigContCol">
                    
                        <div class="holder" id="holder6">

                            <div class="cardsRow row6">

                                

                            </div>

                            <div class="cardsRow row6">

                                

                            </div>

                        </div>

                    </div>
                    
                `),
                didOpen: () => { 

                    const row = document.querySelectorAll('.cardsRow')
                    const order = {

                        0:1,
                        1:3,
                        2:6,
                        3:7,
                        4:5,
                        5:4,
                        6:2,
                        7:8,
                        8:0,
                        9:9,
                        10:10,
                        11:11

                    }

                    let cardScan = 0
                    row.forEach(r => {

                        const rowClasses = [...r.classList]
                        const size = Number(rowClasses.find(c => c.startsWith('row')).slice(-1))

                        for (let t = 0; t < size; t++) {
                            
                            noAnimCardsGen(r, planetTemplate, 'consumableInfoWrapper', order[cardScan + t], ['Planet'])
                            
                        }

                        cardScan += size

                        movingCard(r, false)
                        
                    })

                    //Load SFX
                    buttonSfx('button')
                    hoverCardSfx('.consumableInfoWrapper')

                    requestAnimationFrame(() => {

                        document.body.classList.remove('swal2-height-auto')

                    })

                },
                showCloseButton: true,
                confirmButtonColor: '#F3AD16',
                confirmButtonText: 'Back',
                background: '#3C565E',
                customClass: {
                    container: 'collectionTabsContainer, colCon4',
                    popup: 'collectionTabPopup colTab4'
                },

            }).then(r => {

                if (r.isConfirmed) collectionSwal()

            })
            break
        case 5:
            Swal.fire({

                title: "Spectral Cards",
                html:(`

                    <div class="bigContCol">
                    
                        <div class="holder" id="holder5">

                            <div class="cardsRow row4">

                                

                            </div>

                            <div class="cardsRow row5">

                                

                            </div>

                            <div class="cardsRow row4">

                                

                            </div>

                            <div class="cardsRow row5">

                                

                            </div>

                        </div>

                        <button class="left" id="spectralL" style="z-index: 999;" disabled>

                            <span class="material-symbols-outlined">chevron_left</span>

                        </button>

                        <button class="right" id="spectralR" style="z-index: 999;">

                            <span class="material-symbols-outlined">chevron_right</span>

                        </button>

                    </div>

                    `),
                didOpen: () => {

                    const modal = Swal.getPopup()
                    const row = document.querySelectorAll('.cardsRow')

                    setDeckScroll(modal.querySelector('#holder5'), modal.querySelector('#spectralL'), modal.querySelector('#spectralR'), 2)

                    let cardScan = 0
                    row.forEach(r => {

                        const rowClasses = [...r.classList]
                        const size = Number(rowClasses.find(c => c.startsWith('row')).slice(-1))

                        for (let t = 0; t < size; t++) {
                            
                            noAnimCardsGen(r, spectralTemplate, 'consumableInfoWrapper', cardScan + t, ['Spectral'])
                            
                        }

                        cardScan += size

                        movingCard(r, false)
                        
                    })

                    //Load SFX
                    buttonSfx('button')
                    hoverCardSfx('.consumableInfoWrapper')

                    requestAnimationFrame(() => {

                        document.body.classList.remove('swal2-height-auto')

                    })

                },
                showCloseButton: true,
                confirmButtonColor: '#F3AD16',
                confirmButtonText: 'Back',
                background: '#3C565E',
                customClass: {
                    container: 'collectionTabsContainer, colCon5',
                    popup: 'collectionTabPopup colTab5'
                },

            }).then(r => {

                if (r.isConfirmed) collectionSwal()

            })
            break
        case 6:
            Swal.fire({

                title: "Enhanced Cards",
                html: (`

                    <div class="bigContCol">
                    
                        <div class="holder" id="holder6">

                            <div class="cardsRow row4">

                                

                            </div>

                            <div class="cardsRow row4">

                                

                            </div>

                        </div>

                    </div>
                    
                `),
                footer: 'Playing cards may have one Enhancement, Edition and Seal',
                didOpen: () => {

                    const row = document.querySelectorAll('.cardsRow')

                    let cardScan = 0
                    row.forEach(r => {

                        const rowClasses = [...r.classList]
                        const size = Number(rowClasses.find(c => c.startsWith('row')).slice(-1))

                        for (let t = 0; t < size; t++) {
                            
                            noAnimCardsGen(r, cardsTemplate[0], 'cardInfoWrapper', cardScan + t, [])
                            
                        }

                        cardScan += size

                        movingCard(r, false)
                        
                    })

                    //Load SFX
                    buttonSfx('button')
                    hoverCardSfx('.cardInfoWrapper')

                    requestAnimationFrame(() => {

                        document.body.classList.remove('swal2-height-auto')

                    })

                },
                showCloseButton: true,
                confirmButtonColor: '#F3AD16',
                confirmButtonText: 'Back',
                background: '#3C565E',
                customClass: {
                    container: 'collectionTabsContainer, colCon6',
                    popup: 'collectionTabPopup colTab6'
                },

            }).then(r => {

                if (r.isConfirmed) collectionSwal()

            })
            break
        case 7:
            Swal.fire({

                title: "Seals",
                html: (`

                    <div class="bigContCol">
                    
                        <div class="holder" id="holder7">

                            <div class="cardsRow row4">

                                

                            </div>

                        </div>

                    </div>
                    
                `),
                footer:'Playing cards may have one Enhancement, Edition and Seal',
                didOpen: () => {

                    const row = document.querySelector('.cardsRow')

                    const rowClasses = [...row.classList]
                    const size = Number(rowClasses.find(c => c.startsWith('row')).slice(-1))

                    const copyTemplate = cardsTemplate[1]

                    copyTemplate.forEach(element => {

                        const currentImg = element.info[0].image
                        element.info[0].image = ['../assets/playCards/cards_e0.png', currentImg]
                        
                    })
                    

                    for (let t = 0; t < size; t++) {
                        
                        noAnimCardsGen(row, copyTemplate, 'cardInfoWrapper', t, [])
                        
                    }

                    movingCard(row, false)

                    //Load SFX
                    buttonSfx('button')
                    hoverCardSfx('.cardInfoWrapper')

                    requestAnimationFrame(() => {

                        document.body.classList.remove('swal2-height-auto')

                    })

                },
                showCloseButton: true,
                confirmButtonColor: '#F3AD16',
                confirmButtonText: 'Back',
                background: '#3C565E',
                customClass: {
                    container: 'collectionTabsContainer, colCon7',
                    popup: 'collectionTabPopup colTab7'
                },

            }).then(r => {

                if (r.isConfirmed) collectionSwal()

            })
            break
        case 8:
            Swal.fire({

                title: "Editions",
                html: (`

                    <div class="bigContCol">
                    
                        <div class="holder" id="holder8">

                            <div class="cardsRow row5">

                                

                            </div>

                        </div>

                    </div>
                    
                `),
                didOpen: () => {

                    const row = document.querySelector('.cardsRow')

                    const rowClasses = [...row.classList]
                    const size = Number(rowClasses.find(c => c.startsWith('row')).slice(-1))

                    const copyTemplate = cardsTemplate[2]

                    copyTemplate.forEach(element => {

                        element.info[0].image = ['../assets/jokers/joker_00.png']
                        
                    })
                    

                    for (let t = 0; t < size; t++) {
                        
                        noAnimCardsGen(row, copyTemplate, 'cardInfoWrapper', t, ['Edition'])
                        
                    }

                    movingCard(row, false)

                    //Load SFX
                    buttonSfx('button')
                    hoverCardSfx('.cardInfoWrapper')

                    requestAnimationFrame(() => {

                        document.body.classList.remove('swal2-height-auto')

                    })

                },
                showCloseButton: true,
                confirmButtonColor: '#F3AD16',
                confirmButtonText: 'Back',
                background: '#3C565E',
                customClass: {
                    container: 'collectionTabsContainer, colCon8',
                    popup: 'collectionTabPopup colTab8'
                },

            }).then(r => {

                if (r.isConfirmed) collectionSwal()

            })
            break
        case 9:
            Swal.fire({

                title: "Booster Packs",
                html:(`

                    <div class="bigContCol">
                    
                        <div class="holder" id="holder9">

                            <div class="cardsRow row4">

                                

                            </div>

                            <div class="cardsRow row4">

                                

                            </div>

                            <div class="cardsRow row4">

                                

                            </div>

                            <div class="cardsRow row4">

                                

                            </div>

                            <div class="cardsRow row4">

                                

                            </div>

                            <div class="cardsRow row4">

                                

                            </div>

                            <div class="cardsRow row4">

                                

                            </div>

                            <div class="cardsRow row4">

                                

                            </div>

                        </div>

                        <button class="left" id="boosterL" style="z-index: 999;" disabled>

                            <span class="material-symbols-outlined">chevron_left</span>

                        </button>

                        <button class="right" id="boosterR" style="z-index: 999;">

                            <span class="material-symbols-outlined">chevron_right</span>

                        </button>
                    
                    </div>

                `),
                didOpen: () => {

                    const modal = Swal.getPopup()
                    const row = document.querySelectorAll('.cardsRow')

                    setDeckScroll(modal.querySelector('#holder9'), modal.querySelector('#boosterL'), modal.querySelector('#boosterR'), 2)

                    let cardScan = 0
                    row.forEach(r => {

                        const rowClasses = [...r.classList]
                        const size = Number(rowClasses.find(c => c.startsWith('row')).slice(-1))

                        for (let t = 0; t < size; t++) {
                            
                            noAnimCardsGen(r, boosterTemplate, 'consumableInfoWrapper', cardScan + t, ['Booster'])
                            
                        }

                        cardScan += size

                        movingCard(r, false)
                        
                    })

                    //Load SFX
                    buttonSfx('button')
                    hoverCardSfx('.cardInfoWrapper')

                    requestAnimationFrame(() => {

                        document.body.classList.remove('swal2-height-auto')

                    })

                },
                showCloseButton: true,
                confirmButtonColor: '#F3AD16',
                confirmButtonText: 'Back',
                background: '#3C565E',
                customClass: {
                    container: 'collectionTabsContainer, colCon9',
                    popup: 'collectionTabPopup colTab9'
                },

            }).then(r => {

                if (r.isConfirmed) collectionSwal()

            })
            break
        case 10:
            Swal.fire({

                title: "Tags",
                html: (`

                    <div class="bigContCol">

                        <div class="tagsHolder holderA">

                            <div class="tagWrap">

                                <img src="../assets/tags_vouchers/tag_00.png">

                                <div class="tagInfo">

                                    <h6>Uncommon Tag</h6>
                                    <p>Shop has a free <strong style="color: #4CC192;">Uncommon Joker</strong></p>

                                </div>

                            </div>

                            <div class="tagWrap">

                                <img src="../assets/tags_vouchers/tag_01.png">

                                <div class="tagInfo">

                                    <h6>Rare Tag</h6>
                                    <p>Shop has a free <strong style="color: #DF2525;">Rare Joker</strong></p>

                                </div>

                            </div>

                            <div class="tagWrap">

                                <img src="../assets/tags_vouchers/tag_02.png">

                                <div class="tagInfo">

                                    <h6>Negative Tag</h6>
                                    <p>Next base edition shop Joker is free and becomes <strong class="editionText">Negative</strong></p>

                                </div>

                            </div>

                            <div class="tagWrap">

                                <img src="../assets/tags_vouchers/tag_03.png">

                                <div class="tagInfo">

                                    <h6>Foil Tag</h6>
                                    <p>Next base edition shop Joker is free and becomes <strong class="editionText">Foil</strong></p>

                                </div>

                            </div>

                            <div class="tagWrap">

                                <img src="../assets/tags_vouchers/tag_04.png">

                                <div class="tagInfo">

                                    <h6>Holographic Tag</h6>
                                    <p>Next base edition shop Joker is free and becomes <strong class="editionText">Holographic</strong></p>

                                </div>

                            </div>

                            <div class="tagWrap">

                                <img src="../assets/tags_vouchers/tag_05.png">

                                <div class="tagInfo">

                                    <h6>Polychrome Tag</h6>
                                    <p>Next base edition shop Joker is free and becomes <strong class="editionText">Polychrome</strong></p>

                                </div>

                            </div>

                            <div class="tagWrap">

                                <img src="../assets/tags_vouchers/tag_06.png">

                                <div class="tagInfo">

                                    <h6>Investment Tag</h6>
                                    <p>After defeating the Boss Blind, gain <strong style="color: #F3AD16">$25</strong></p>

                                </div>

                            </div>

                            <div class="tagWrap">

                                <img src="../assets/tags_vouchers/tag_07.png">

                                <div class="tagInfo">

                                    <h6>Voucher Tag</h6>
                                    <p>Adds one Voucher to the next shop</p>

                                </div>

                            </div>

                            <div class="tagWrap">

                                <img src="../assets/tags_vouchers/tag_08.png">

                                <div class="tagInfo">

                                    <h6>Boss Tag</h6>
                                    <p>Rerolls the <strong style="color: #F3AD16">Boss Blind</strong></p>

                                </div>

                            </div>

                            <div class="tagWrap">

                                <img src="../assets/tags_vouchers/tag_09.png">

                                <div class="tagInfo">

                                    <h6>Standard Tag</h6>
                                    <p>Gives a free <strong style="color: #F3AD16">Mega Standard Pack</strong></p>

                                </div>

                            </div>

                            <div class="tagWrap">

                                <img src="../assets/tags_vouchers/tag_0A.png">

                                <div class="tagInfo">

                                    <h6>Charm Tag</h6>
                                    <p>Gives a free <strong style="color: #9E74CE">Mega Arcana Pack</strong></p>

                                </div>

                            </div>

                            <div class="tagWrap">

                                <img src="../assets/tags_vouchers/tag_0B.png">

                                <div class="tagInfo">

                                    <h6>Meteor Tag</h6>
                                    <p>Gives a free <strong style="color: #03A4C7">Mega Celestial Pack</strong></p>

                                </div>

                            </div>

                            <div class="tagWrap">

                                <img src="../assets/tags_vouchers/tag_0C.png">

                                <div class="tagInfo">

                                    <h6>Buffoon Tag</h6>
                                    <p>Gives a free <strong style="color: #F3AD16">Mega Buffoon Pack</strong></p>

                                </div>

                            </div>

                            <div class="tagWrap">

                                <img src="../assets/tags_vouchers/tag_0D.png">

                                <div class="tagInfo">

                                    <h6>Handy Tag</h6>
                                    <p>Gives <strong style="color: #F3AD16">$1</strong> per played <strong style="color: #1199F0">hand</strong> this run <br> <i style="color: #3C565E;">(Will give <strong style="color: #F3AD16">$[hands]</strong>)</i></p>

                                </div>

                            </div>

                            <div class="tagWrap">

                                <img src="../assets/tags_vouchers/tag_0E.png">

                                <div class="tagInfo">

                                    <h6>Garbage Tag</h6>
                                    <p>Gives <strong style="color: #F3AD16">$1</strong> per unused <strong style="color: #DF2525">discard</strong> this run <br> <i style="color: #3C565E;">(Will give <strong style="color: #F3AD16">$[discards]</strong>)</i></p>

                                </div>

                            </div>

                            <div class="tagWrap">

                                <img src="../assets/tags_vouchers/tag_0F.png">

                                <div class="tagInfo">

                                    <h6>Ethereal Tag</h6>
                                    <p>Gives a free <strong style="color: #2E76FD">Spectral Pack</strong></p>

                                </div>

                            </div>

                            <div class="tagWrap">

                                <img src="../assets/tags_vouchers/tag_10.png">

                                <div class="tagInfo">

                                    <h6>Coupon Tag</h6>
                                    <p>Initial cards and booster packs in the next shop are free</p>

                                </div>

                            </div>

                            <div class="tagWrap">

                                <img src="../assets/tags_vouchers/tag_11.png">

                                <div class="tagInfo">

                                    <h6>Double Tag</h6>
                                    <p>Gives a copy of the next selected <strong style="color: #F3AD16">Tag</strong> <br> <i style="color: #3C565E;"><strong style="color: #F3AD16">Double tag</strong> excluded</i></p>

                                </div>

                            </div>

                            <div class="tagWrap">

                                <img src="../assets/tags_vouchers/tag_12.png">

                                <div class="tagInfo">

                                    <h6>Juggle Tag</h6>
                                    <p><strong style="color: #F3AD16">+3</strong> hand size next round</p>

                                </div>

                            </div>

                            <div class="tagWrap">

                                <img src="../assets/tags_vouchers/tag_13.png">

                                <div class="tagInfo">

                                    <h6>D6 Tag</h6>
                                    <p>Rerolls in the next shop start at <strong style="color: #F3AD16">$0</strong></p>

                                </div>

                            </div>

                            <div class="tagWrap">

                                <img src="../assets/tags_vouchers/tag_14.png">

                                <div class="tagInfo">

                                    <h6>Top-up Tag</h6>
                                    <p>Create up to <strong style="color: #F3AD16">2</strong> <strong style="color: #1199F0">Common</strong> Jokers <br> <i style="color: #3C565E;">(Must have room)</i></p>

                                </div>

                            </div>

                            <div class="tagWrap">

                                <img src="../assets/tags_vouchers/tag_15.png">

                                <div class="tagInfo">

                                    <h6>Speed Tag</h6>
                                    <p>Gives <strong style="color: #F3AD16">$5</strong> per skipped Blind this run <br> <i style="color: #3C565E;">(Will give <strong style="color: #F3AD16">$[skips]</strong>)</i></p>

                                </div>

                            </div>

                            <div class="tagWrap">

                                <img src="../assets/tags_vouchers/tag_16.png">

                                <div class="tagInfo">

                                    <h6>Orbital Tag</h6>
                                    <p>Upgrade <strong style="color: #F3AD16">[randomPokerHand]</strong> by <strong style="color: #F3AD16">3 levels</strong></p>

                                </div>

                            </div>

                            <div class="tagWrap">

                                <img src="../assets/tags_vouchers/tag_17.png">

                                <div class="tagInfo">

                                    <h6>Economy Tag</h6>
                                    <p>Doubles your money <br> <i style="color: #3C565E;">(Max of <strong style="color: #F3AD16">$40</strong>)</i></p>

                                </div>

                            </div>

                        </div>

                    </div>
                    
                `),
                didOpen: () => {

                    //Load SFX
                    buttonSfx('button')
                    hoverCardSfx('.tagWrap')

                    requestAnimationFrame(() => {

                        document.body.classList.remove('swal2-height-auto')

                    })

                },
                showCloseButton: true,
                confirmButtonColor: '#F3AD16',
                confirmButtonText: 'Back',
                background: '#3C565E',
                customClass: {
                    container: 'collectionTabsContainer, colConA',
                    popup: 'collectionTabPopup colTabA'
                },

            }).then(r => {

                if (r.isConfirmed) collectionSwal()

            })
            break
        case 11:
            Swal.fire({

                title: "Blinds",
                text: "You clicked the button!",
                icon: "success",
                didOpen: () => {

                    //Load SFX
                    buttonSfx('button')

                    requestAnimationFrame(() => {

                        document.body.classList.remove('swal2-height-auto')

                    })

                },
                showCloseButton: true,
                confirmButtonColor: '#F3AD16',
                confirmButtonText: 'Back',
                background: '#3C565E',
                customClass: {
                    container: 'collectionTabsContainer, colConB',
                    popup: 'collectionTabPopup colTabB'
                },

            }).then(r => {

                if (r.isConfirmed) collectionSwal()

            })
            break

    }

}

function setDeckScroll (holder, leftBtn, rightBtn, step) {

    let holderPos = 0

    //Scroll buttons functions
    holder.addEventListener('scroll', () => {

        holderPos = updateByScroll(holder, step)

        enableButtons (holderPos, holder, rightBtn, leftBtn, step)

    })
    leftBtn.addEventListener('click', () => {

        holderPos = moveLeft (holderPos, holder, step)

        enableButtons (holderPos, holder, rightBtn, leftBtn, step)

    })
    rightBtn.addEventListener('click', () => {

        holderPos = moveRight (holderPos, holder, step)

        enableButtons (holderPos, holder, rightBtn, leftBtn, step)

    })

}

function updateByScroll(container, amountRow) {

    let closestIndex = 0
    let closestDistance = Infinity

    for (const child of Array.from(container.children)) {

        const index = Array.from(container.children).indexOf(child)

        if (index%amountRow == 0 && amountRow != 1) continue

        const distance = Math.abs(container.scrollLeft - child.offsetLeft)

        if (distance < closestDistance) {

            closestDistance = distance
            closestIndex = index
            
        }
        
    }

    return closestIndex
    
}
function enableButtons (position, container, R, L, amountRow) {

    const availableInfo = [...container.children].filter(i => i.style.display != 'none')

    if (amountRow == 1)  amountRow = 0

    if (position >= availableInfo.length - 1 - amountRow%2) {

        R.disabled = true
        L.disabled = false

    } else if (position <= amountRow) {

        L.disabled = true
        R.disabled = false

    } else {

        R.disabled = false
        L.disabled = false

    }

}

function moveRight (position, container, amountRow) {

    position = Math.min(position + amountRow, container.children.length - amountRow)
    container.scrollTo({ left: container.children[position].offsetLeft, behavior: 'smooth' })

    return position
    
}
function moveLeft (position, container, amountRow) {

    position = Math.max(position - amountRow, 0)
    container.scrollTo({ left: container.children[position].offsetLeft, behavior: 'smooth' })

    return position

}