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
                    
                    <div class="holder" id="holder7">

                        <div class="cardsRow row4">

                            <div class="cardInfoWrapper">

                                <div class="cardImg">

                                    <img src="../assets/playCards/cards__e0.png">
                                    <img src="../assets/playCards/cards__sl0.png">

                                </div>

                                <div class="cardInfo">

                                    <h6>Gold Seal</h6>
                                    <p>Earn <strong style="color: #F3AD16;">$3</strong> when this card is played and scores</p>
                                    <div class="cardTags">

                                        <span>Gold Seal<span>

                                    </div>

                                </div>

                            </div>

                            <div class="cardInfoWrapper">

                                <div class="cardImg">

                                    <img src="../assets/playCards/cards__e0.png">
                                    <img src="../assets/playCards/cards__sl1.png">

                                </div>

                                <div class="cardInfo">

                                    <h6>Red Seal</h6>
                                    <p>Retrigger this card <strong style="color: #F3AD16;">1</strong> time</p>
                                    <div class="cardTags">

                                        <span>Red Seal<span>

                                    </div>

                                </div>

                            </div>

                            <div class="cardInfoWrapper">

                                <div class="cardImg">

                                    <img src="../assets/playCards/cards__e0.png">
                                    <img src="../assets/playCards/cards__sl2.png">

                                </div>

                                <div class="cardInfo">

                                    <h6>Blue Seal</h6>
                                    <p>Creates the <strong style="color: #03A4C7;">Planet</strong> card for final played <strong style="color: #F3AD16;">poker hand</strong> of round if <strong style="color: #F3AD16;">held</strong> in hand <br> <i style="color: #3C565E;">(Must have room)</i></p>
                                    <div class="cardTags">

                                        <span>Blue Seal<span>

                                    </div>

                                </div>
                            
                            </div>

                            <div class="cardInfoWrapper">

                                <div class="cardImg">

                                    <img src="../assets/playCards/cards__e0.png">
                                    <img src="../assets/playCards/cards__sl3.png">

                                </div>

                                <div class="cardInfo">

                                    <h6>Blue Seal</h6>
                                    <p>Creates a <strong style="color: #9E74CE;">Tarot</strong> card when <strong style="color: #F3AD16;">discarded</strong> <br> <i style="color: #3C565E;">(Must have room)</i></p>
                                    <div class="cardTags">

                                        <span>Purple Seal<span>

                                    </div>

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
                    container: 'collectionTabsContainer, colConA',
                    popup: 'collectionTabPopup colTabA'
                },

            }).then(r => {

                if (r.isConfirmed) collectionSwal()

            })
            break
        case 11:
            Swal.fire({

                title: "Tags",
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