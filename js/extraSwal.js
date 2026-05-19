import { movingCard } from "./movingCards.js"
import { changeVolume, buttonSfx } from "./musicHandler.js"

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
            gameSpeedSlider.value = localStorage.getItem('gameSpeed')
            gameSpeedDisplay.innerHTML = localStorage.getItem('gameSpeed')

            screenSlider.value = localStorage.getItem('screen')
            screenDisplay.innerHTML = localStorage.getItem('screen')

            const savedVolume = localStorage.getItem('volume')
            if (savedVolume) {

                volume = JSON.parse(savedVolume)
                
            }

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
            Swal.fire({

                title: "Decks",
                html:(`
                    
                `),
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
                    container: 'collectionTabsContainer, colCon1',
                    popup: 'collectionTabPopup colTab1'
                },

            }).then(r => {

                if (r.isConfirmed) collectionSwal()

            })
            break
        case 2:
            Swal.fire({

                title: "Voucher",
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

                                <div class="cardInfoWrapper dragCard">

                                    <div class="cardImg">

                                        <img src="../assets/playCards/cards_e1.png">

                                    </div>

                                    <div class="cardInfo">

                                        <h6>Bonus card</h6>
                                        <p><strong style="color: #1199F0;">+30</strong> extra chips</p>
                                        <div class="cardTags">

                                            <span style="background-color: #6D76D0;">Bonus Card</span>

                                        </div>

                                    </div>

                                </div>

                                <div class="cardInfoWrapper dragCard">

                                    <div class="cardImg">

                                        <img src="../assets/playCards/cards_e2.png">

                                    </div>

                                    <div class="cardInfo">

                                        <h6>Mult Card</h6>
                                        <p><strong style="color: #DF2525;">+4</strong> Mult</p>
                                        <div class="cardTags">

                                            <span style="background-color: #6D76D0;">Mult Card</span>

                                        </div>

                                    </div>

                                </div>

                                <div class="cardInfoWrapper dragCard">

                                    <div class="cardImg">

                                        <img src="../assets/playCards/cards_e3.png">

                                    </div>

                                    <div class="cardInfo">

                                        <h6>Wild card</h6>
                                        <p>Can be used as any suit</p>
                                        <div class="cardTags">

                                            <span style="background-color: #6D76D0;">Wild Card</span>

                                        </div>

                                    </div>
                                
                                </div>

                                <div class="cardInfoWrapper dragCard">

                                    <div class="cardImg">

                                        <img src="../assets/playCards/cards_e4.png">

                                    </div>

                                    <div class="cardInfo">

                                        <h6>Glass Card</h6>
                                        <p><strong style="background-color: #DF2525; color: white; padding: 1px 2px;">X2</strong> Mult <br> <strong style="color: #4CC192;">1 in 4</strong> chance to destroy card</p>
                                        <div class="cardTags">

                                            <span style="background-color: #6D76D0;">Glass Card</span>

                                        </div>

                                    </div>

                                </div>

                            </div>

                            <div class="cardsRow row4">

                                <div class="cardInfoWrapper dragCard">

                                    <div class="cardImg">

                                        <img src="../assets/playCards/cards_e5.png">

                                    </div>

                                    <div class="cardInfo">

                                        <h6>Steel card</h6>
                                        <p><strong style="background-color: #DF2525; color: white; padding: 1px 2px;">X1.5</strong> Mult <br> while this card stays in hand</p>
                                        <div class="cardTags">

                                            <span style="background-color: #6D76D0;">Steel Card</span>

                                        </div>

                                    </div>

                                </div>

                                <div class="cardInfoWrapper dragCard">

                                    <div class="cardImg">

                                        <img src="../assets/playCards/cards_e6.png">

                                    </div>

                                    <div class="cardInfo">

                                        <h6>Stone Card</h6>
                                        <p><strong style="color: #1199F0;">+50</strong> Chips <br> No rank or suit</p>
                                        <div class="cardTags">

                                            <span style="background-color: #6D76D0;">Stone Card</span>

                                        </div>

                                    </div>

                                </div>

                                <div class="cardInfoWrapper dragCard">

                                    <div class="cardImg">

                                        <img src="../assets/playCards/cards_e7.png">

                                    </div>

                                    <div class="cardInfo">

                                        <h6>Gold card</h6>
                                        <p><strong style="color: #F3AD16;">$3</strong> if this card is held in hand at the end of round</p>
                                        <div class="cardTags">

                                            <span style="background-color: #6D76D0;">Gold Card</span>

                                        </div>

                                    </div>
                                
                                </div>

                                <div class="cardInfoWrapper dragCard">

                                    <div class="cardImg">

                                        <img src="../assets/playCards/cards_e8.png">

                                    </div>

                                    <div class="cardInfo">

                                        <h6>Lucky Card</h6>
                                        <p><strong style="color: #4CC192;">1 in 5</strong> chance for <strong style="color: #DF2525;">+20</strong> Mult <br> <strong style="color: #4CC192;">1 in 5</strong> chance to win <strong style="color: #F3AD16;">$20</strong></p>
                                        <div class="cardTags">

                                            <span style="background-color: #6D76D0;">Lucky Card</span>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>
                    
                `),
                footer: 'Playing cards may have one Enhancement, Edition and Seal',
                didOpen: () => {
                    
                    //Load SFX
                    buttonSfx('button')

                    const row = document.querySelectorAll('.cardsRow')

                    row.forEach(r => {

                        movingCard(r)
                        
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

                                <div class="cardInfoWrapper dragCard">

                                    <div class="cardImg">

                                        <img src="../assets/playCards/cards_e0.png">
                                        <img src="../assets/playCards/cards_sl0.png">

                                    </div>

                                    <div class="cardInfo">

                                        <h6>Gold Seal</h6>
                                        <p>Earn <strong style="color: #F3AD16;">$3</strong> when this card is played and scores</p>
                                        <div class="cardTags">

                                            <span style="background-color: #F3AD16;">Gold Seal</span>

                                        </div>

                                    </div>

                                </div>

                                <div class="cardInfoWrapper dragCard">

                                    <div class="cardImg">

                                        <img src="../assets/playCards/cards_e0.png">
                                        <img src="../assets/playCards/cards_sl1.png">

                                    </div>

                                    <div class="cardInfo">

                                        <h6>Red Seal</h6>
                                        <p>Retrigger this card <strong style="color: #F3AD16;">1</strong> time</p>
                                        <div class="cardTags">

                                            <span style="background-color: #DF2525;">Red Seal</span>

                                        </div>

                                    </div>

                                </div>

                                <div class="cardInfoWrapper dragCard">

                                    <div class="cardImg">

                                        <img src="../assets/playCards/cards_e0.png">
                                        <img src="../assets/playCards/cards_sl2.png">

                                    </div>

                                    <div class="cardInfo">

                                        <h6>Blue Seal</h6>
                                        <p>Creates the <strong style="color: #03A4C7;">Planet</strong> card for final played <strong style="color: #F3AD16;">poker hand</strong> of round if <strong style="color: #F3AD16;">held</strong> in hand <br> <i style="color: #3C565E;">(Must have room)</i></p>
                                        <div class="cardTags">

                                            <span style="background-color: #03A4C7;">Blue Seal</span>

                                        </div>

                                    </div>
                                
                                </div>

                                <div class="cardInfoWrapper dragCard">

                                    <div class="cardImg">

                                        <img src="../assets/playCards/cards_e0.png">
                                        <img src="../assets/playCards/cards_sl3.png">

                                    </div>

                                    <div class="cardInfo">

                                        <h6>Blue Seal</h6>
                                        <p>Creates a <strong style="color: #9E74CE;">Tarot</strong> card when <strong style="color: #F3AD16;">discarded</strong> <br> <i style="color: #3C565E;">(Must have room)</i></p>
                                        <div class="cardTags">

                                            <span style="background-color: #9E74CE;">Purple Seal</span>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>
                    
                `),
                footer:'Playing cards may have one Enhancement, Edition and Seal',
                didOpen: () => {

                    //Load SFX
                    buttonSfx('button')

                    movingCard(document.querySelector('.cardsRow'))

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
                    
                        <div class="holder" id="holder7">

                            <div class="cardsRow row5">

                                <div class="cardInfoWrapper dragCard">

                                    <div class="cardImg">

                                        <img src="../assets/jokers/joker_00.png">

                                    </div>

                                    <div class="cardInfo">

                                        <h6>Base</h6>
                                        <p>No effect</p>
                                        <div class="cardTags">

                                            <span class="editionTag">Edition</span>

                                        </div>

                                    </div>

                                </div>

                                <div class="cardInfoWrapper dragCard">

                                    <div class="cardImg foil">

                                        <img src="../assets/jokers/joker_00.png">

                                    </div>

                                    <div class="cardInfo">

                                        <h6>Foil</h6>
                                        <p><strong style="color: #1199F0;">+50</strong> chips</p>
                                        <div class="cardTags">

                                            <span class="editionTag">Edition</span>
                                            <span class="editionTag">Foil</span>

                                        </div>

                                    </div>

                                </div>

                                <div class="cardInfoWrapper dragCard">

                                    <div class="cardImg holographic">

                                        <img src="../assets/jokers/joker_00.png">

                                    </div>

                                    <div class="cardInfo">

                                        <h6>Holographic</h6>
                                        <p><strong style="color: #DF2525;">+10</strong> Mult</p>
                                        <div class="cardTags">

                                            <span class="editionTag">Edition</span>
                                            <span class="editionTag">Holographic</span>

                                        </div>

                                    </div>
                                
                                </div>

                                <div class="cardInfoWrapper dragCard">

                                    <div class="cardImg polychrome">

                                        <img src="../assets/jokers/joker_00.png">

                                    </div>

                                    <div class="cardInfo">

                                        <h6>Polychrome</h6>
                                        <p><strong style="background-color: #DF2525; color: white; padding: 1px 2px;">X1.5</strong> Mult</p>
                                        <div class="cardTags">

                                            <span class="editionTag">Edition</span>
                                            <span class="editionTag">Polychrome</span>

                                        </div>

                                    </div>

                                </div>

                                <div class="cardInfoWrapper dragCard">

                                    <div class="cardImg negative">

                                        <img src="../assets/jokers/joker_00.png">

                                    </div>

                                    <div class="cardInfo">

                                        <h6>Negative</h6>
                                        <p><strong style="color: #9E74CE;">+1</strong> Joker Slot</p>
                                        <div class="cardTags">

                                            <span class="editionTag">Edition</span>
                                            <span class="editionTag">Polychrome</span>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>
                    
                `),
                didOpen: () => {

                    //Load SFX
                    buttonSfx('button')

                    movingCard(document.querySelector('.cardsRow'))

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

                        <div class="tagsHolder">

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