import { createTag, noAnimCardsGen } from "./generateCards.js"
import { movingCard } from "./movingCards.js"
import { scaleAnte } from "./getAnte.js"
import { changeVolume, buttonSfx, hoverCardSfx } from "./musicHandler.js"
import voucherTemplate from '../json/voucherList.json' with { type: 'json' }
import tarotTemplate from '../json/tarotList.json' with { type: 'json' }
import planetTemplate from '../json/pokerLvls.json' with { type: 'json' }
import spectralTemplate from '../json/spectralList.json' with { type: 'json' }
import cardsTemplate from '../json/cardList.json' with { type: 'json' }
import boosterTemplate from '../json/boosterList.json' with { type: 'json' }
import tagTemplate from '../json/tagList.json' with { type: 'json' }
import blindTemplate from '../json/blindLists.json' with { type: 'json' }

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

            if (!localStorage.getItem('buttonPos')) {

                localStorage.setItem('buttonsPos', 0)

            }

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

                            

                        </div>

                    </div>
                    
                `),
                didOpen: () => {

                    const holder = document.querySelector('.tagsHolder')

                    tagTemplate.forEach(tag => {

                        holder.append(createTag(tag.info, false))
                        
                    })

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
                html: (`

                    <div class="holder" id="holderB">

                        <article class="menuBlind">

                            <button type="button" class="selected" id="blind0Btn">Blinds</button>
                            <button type="button" id="blind1Btn">Ante Scale</button>

                        </article>

                        <article class="infoBlind">

                            <div class="content appear tagsHolder row5" id="blind0">


                            </div>

                            <div class="content" id="blind1">

                                <div id="infoScale">

                                    <h3 class="anteCol">Ante</h3>
                                    <h3 class="baseCol">Base</h3>

                                </div>

                                <div id="buttons">

                                    <button type="button" class="scaleSelected" id="scale0Btn"><img src="../assets/misc/chip_0.png"></button>
                                    <button type="button" id="scale1Btn"><img src="../assets/misc/chip_2.png"></button>
                                    <button type="button" id="scale2Btn"><img src="../assets/misc/chip_5.png"></button>

                                </div>

                            </div>

                        </article>
                    
                    </div>
                    
                `),
                didOpen: () => {

                    const modal = Swal.getPopup()

                    //Menu buttons
                    const menuBtns = Array.from(modal.querySelector('.menuBlind').children)
                    const infoTab = modal.querySelector('.infoBlind').children

                    const holder = document.getElementById('blind0')
                    const infoGrid = document.getElementById('infoScale')

                    //Scale buttons
                    const scaleBtns = Array.from(modal.querySelector('#buttons').children)

                    //Menu buttons functions
                    menuBtns.forEach((element, index) => {

                        element.addEventListener('click', () => {

                            openCorrespondingTab(index, infoTab, modal, 'appear')

                            menuBtns.find(e => e.classList.contains('selected')).classList.remove('selected')
                            element.classList.add('selected')

                        })
                        
                    })

                    blindTemplate[0].forEach(blindConfig => {

                        for (const blind of blindConfig) {

                            if (Array.isArray(blind)) {

                                blind.forEach(specBlind => {

                                    holder.append(createTag(specBlind, true))
                                    
                                })

                                continue

                            }

                            holder.append(createTag(blind, true))
                            console.log(blind)
                            
                        }
                        
                    })

                    function openCorrespondingTab (i, tabs, swal, selection) {

                        const current = swal.querySelector(`.${selection}`)

                        current.classList.remove(selection)
                        tabs[i].classList.add(selection) 

                    }

                    //Menu buttons functions
                    scaleBtns.forEach((element, index) => {

                        element.addEventListener('click', () => {

                            document.querySelectorAll('.generated').forEach(e => e.remove())

                            calculeScale(index)

                            scaleBtns.find(e => e.classList.contains('scaleSelected')).classList.remove('scaleSelected')
                            element.classList.add('scaleSelected')

                        })
                        
                    })

                    function calculeScale (index) {

                        const scaleValues = blindTemplate[1][index]
                        const chipValues = [0, 2, 5]

                        for (let i = 0; i < 40; i++) {

                            const baseValue = i <= 8 ? scaleValues[i] : scaleAnte(i, scaleValues[8])

                            let formatValue = new Intl.NumberFormat('en-US').format(baseValue)
                            if (Math.abs(baseValue) >= 1e12) {

                                formatValue = baseValue.toExponential(2)

                            }
                            
                            const ante = document.createElement('h4')
                            ante.classList.add('anteCol', 'generated')
                            ante.innerText = i

                            const baseWrap = document.createElement('div')
                            baseWrap.classList.add('baseCol', 'generated')
                            baseWrap.style.display = 'grid'
                            baseWrap.style.gridTemplateColumns = 'repeat(2, 1fr)'
                            baseWrap.style.gap = '10px'

                                const chip = document.createElement('img')
                                chip.src = `../assets/misc/chip_${chipValues[index]}.png`
                                chip.style.height = '25px'
                                chip.style.justifySelf = 'end'

                                const base = document.createElement('h4')
                                base.innerText = formatValue

                                baseWrap.append(chip, base)

                            infoGrid.append(ante, baseWrap)
                            
                        }

                    }

                    calculeScale(0)

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