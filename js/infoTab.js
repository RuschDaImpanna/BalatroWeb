import deck from '../json/standardDeck.json' with { type: 'json' }
import { buttonSfx } from './musicHandler.js'
import { getHandCondition } from "./playHand.js"

const runBtn = document.getElementById('runInfo')

runBtn.addEventListener('click', () => {

    const iFrameBlind = takeIframe()
    document.body.append(iFrameBlind)

    Swal.fire({

        html: (`

        <div class="swalHtmlSlot" id="swalRunInfo">

            <article class="menuRun">

                <button type="button" class="selected" id="run0Btn">Poker Hands</button>
                <button type="button" id="run1Btn">Blinds</button>
                <button type="button" id="run2Btn">Vouchers</button>

            </article>

            <article class="infoRun">

                <div class="content appear" id="run0">

                    <div class="pokerBtn">

                        <button type="button" class="selected" id="poker0Btn">

                            <span class="material-symbols-outlined">format_list_bulleted</span>

                        </button>

                        <button type="button" id="poker1Btn">

                            <span class="material-symbols-outlined">bookmark_flag</span>

                        </button>

                    </div>

                    <div class="pokerInfo">

                        <div class="pokerContent pokerAppear"  id="poker0">

                            <div class="pokerHandLine" id="handC" style="display: none">

                                <div class="pokerLvl">

                                    <p id="lvlC">Lvl. XXX</p>

                                </div>

                                <div class="pokerName">

                                    <p>Flush Five</p>

                                </div>

                                <div class="pokerMult">

                                    <p class="chipsTab" id="chipsC">##CHIPS##</p>

                                    <p>×</p>

                                    <p class="multTab" id="multC">##MULT##</p>

                                </div>

                                <div class="pokerTimes">

                                    <span class="material-symbols-outlined"> mobile_theft </span>

                                    <p id="timesC">##TIMES##</p>

                                </div>

                            </div>

                            <div class="pokerHandLine" id="handB" style="display: none">

                                <div class="pokerLvl">

                                    <p id="lvlB">Lvl. XXX</p>

                                </div>

                                <div class="pokerName">

                                    <p>Flush House</p>

                                </div>

                                <div class="pokerMult">

                                    <p class="chipsTab" id="chipsB">##CHIPS##</p>

                                    <p>×</p>

                                    <p class="multTab" id="multB">##MULT##</p>

                                </div>

                                <div class="pokerTimes">

                                    <span class="material-symbols-outlined"> mobile_theft </span>

                                    <p id="timesB">##TIMES##</p>

                                </div>

                            </div>

                            <div class="pokerHandLine" id="handA" style="display: none">

                                <div class="pokerLvl">

                                    <p id="lvlA">Lvl. XXX</p>

                                </div>

                                <div class="pokerName">

                                    <p>Five of a Kind</p>

                                </div>

                                <div class="pokerMult">

                                    <p class="chipsTab" id="chipsA">##CHIPS##</p>

                                    <p>×</p>

                                    <p class="multTab" id="multA">##MULT##</p>

                                </div>

                                <div class="pokerTimes">

                                    <span class="material-symbols-outlined"> mobile_theft </span>

                                    <p id="timesA">##TIMES##</p>

                                </div>

                            </div>

                            <div class="pokerHandLine" id="hand9" style="display: none">

                                <div class="pokerLvl">

                                    <p id="lvl9">Lvl. XXX</p>

                                </div>

                                <div class="pokerName">

                                    <p>Royal Flush</p>

                                </div>

                                <div class="pokerMult">

                                    <p class="chipsTab" id="chips9">##CHIPS##</p>

                                    <p>×</p>

                                    <p class="multTab" id="mult9">##MULT##</p>

                                </div>

                                <div class="pokerTimes">

                                    <span class="material-symbols-outlined"> mobile_theft </span>

                                    <p id="times9">##TIMES##</p>

                                </div>

                            </div>

                            <div class="pokerHandLine" id="hand8">

                                <div class="pokerLvl">

                                    <p id="lvl8">Lvl. XXX</p>

                                </div>

                                <div class="pokerName">

                                    <p>Straight Flush</p>

                                </div>

                                <div class="pokerMult">

                                    <p class="chipsTab" id="chips8">##CHIPS##</p>

                                    <p>×</p>

                                    <p class="multTab" id="mult8">##MULT##</p>

                                </div>

                                <div class="pokerTimes">

                                    <span class="material-symbols-outlined"> mobile_theft </span>

                                    <p id="times8">##TIMES##</p>

                                </div>

                            </div>

                            <div class="pokerHandLine" id="hand7">

                                <div class="pokerLvl">

                                    <p id="lvl7">Lvl. XXX</p>

                                </div>

                                <div class="pokerName">

                                    <p>Four of a Kind</p>

                                </div>

                                <div class="pokerMult">

                                    <p class="chipsTab" id="chips7">##CHIPS##</p>

                                    <p>×</p>

                                    <p class="multTab" id="mult7">##MULT##</p>

                                </div>

                                <div class="pokerTimes">

                                    <span class="material-symbols-outlined"> mobile_theft </span>

                                    <p id="times7">##TIMES##</p>

                                </div>

                            </div>

                            <div class="pokerHandLine" id="hand6">

                                <div class="pokerLvl">

                                    <p id="lvl6">Lvl. XXX</p>

                                </div>

                                <div class="pokerName">

                                    <p>Full House</p>

                                </div>

                                <div class="pokerMult">

                                    <p class="chipsTab" id="chips6">##CHIPS##</p>

                                    <p>×</p>

                                    <p class="multTab" id="mult6">##MULT##</p>

                                </div>

                                <div class="pokerTimes">

                                    <span class="material-symbols-outlined"> mobile_theft </span>

                                    <p id="times6">##TIMES##</p>

                                </div>

                            </div>

                            <div class="pokerHandLine" id="hand5">

                                <div class="pokerLvl">

                                    <p id="lvl5">Lvl. XXX</p>

                                </div>

                                <div class="pokerName">

                                    <p>Flush</p>

                                </div>

                                <div class="pokerMult">

                                    <p class="chipsTab" id="chips5">##CHIPS##</p>

                                    <p>×</p>

                                    <p class="multTab" id="mult5">##MULT##</p>

                                </div>

                                <div class="pokerTimes">

                                    <span class="material-symbols-outlined"> mobile_theft </span>

                                    <p id="times5">##TIMES##</p>

                                </div>

                            </div>

                            <div class="pokerHandLine" id="hand4">

                                <div class="pokerLvl">

                                    <p id="lvl4">Lvl. XXX</p>

                                </div>

                                <div class="pokerName">

                                    <p>Straight</p>

                                </div>

                                <div class="pokerMult">

                                    <p class="chipsTab" id="chips4">##CHIPS##</p>

                                    <p>×</p>

                                    <p class="multTab" id="mult4">##MULT##</p>

                                </div>

                                <div class="pokerTimes">

                                    <span class="material-symbols-outlined"> mobile_theft </span>

                                    <p id="times4">##TIMES##</p>

                                </div>

                            </div>

                            <div class="pokerHandLine" id="hand3">

                                <div class="pokerLvl">

                                    <p id="lvl3">Lvl. XXX</p>

                                </div>

                                <div class="pokerName">

                                    <p>Three of a kind</p>

                                </div>

                                <div class="pokerMult">

                                    <p class="chipsTab" id="chips3">##CHIPS##</p>

                                    <p>×</p>

                                    <p class="multTab" id="mult3">##MULT##</p>

                                </div>

                                <div class="pokerTimes">

                                    <span class="material-symbols-outlined"> mobile_theft </span>

                                    <p id="times3">##TIMES##</p>

                                </div>

                            </div>

                            <div class="pokerHandLine" id="hand2">

                                <div class="pokerLvl">

                                    <p id="lvl2">Lvl. XXX</p>

                                </div>

                                <div class="pokerName">

                                    <p>Two Pair</p>

                                </div>

                                <div class="pokerMult">

                                    <p class="chipsTab" id="chips2">##CHIPS##</p>

                                    <p>×</p>

                                    <p class="multTab" id="mult2">##MULT##</p>

                                </div>

                                <div class="pokerTimes">

                                    <span class="material-symbols-outlined"> mobile_theft </span>

                                    <p id="times2">##TIMES##</p>

                                </div>

                            </div>

                            <div class="pokerHandLine" id="hand1">

                                <div class="pokerLvl">

                                    <p id="lvl1">Lvl. XXX</p>

                                </div>

                                <div class="pokerName">

                                    <p>Pair</p>

                                </div>

                                <div class="pokerMult">

                                    <p class="chipsTab" id="chips1">##CHIPS##</p>

                                    <p>×</p>

                                    <p class="multTab" id="mult1">##MULT##</p>

                                </div>

                                <div class="pokerTimes">

                                    <span class="material-symbols-outlined"> mobile_theft </span>

                                    <p id="times1">##TIMES##</p>

                                </div>

                            </div>

                            <div class="pokerHandLine" id="hand0">

                                <div class="pokerLvl">

                                    <p id="lvl0">Lvl. XXX</p>

                                </div>

                                <div class="pokerName">

                                    <p>High Card</p>

                                </div>

                                <div class="pokerMult">

                                    <p class="chipsTab" id="chips0">##CHIPS##</p>

                                    <p>×</p>

                                    <p class="multTab" id="mult0">##MULT##</p>

                                </div>

                                <div class="pokerTimes">

                                    <span class="material-symbols-outlined"> mobile_theft </span>

                                    <p id="times0">##TIMES##</p>

                                </div>

                            </div>
                            
                        </div>

                        <div class="pokerContent" id="poker1Wrap">

                            <div id="poker1">

                                <div class="handInfo" id="hand0">

                                    <div class="titleWrap">

                                        <h2>High Card</h2>

                                        <div class="statsHandWrap">

                                            <div class="pokerLvl">

                                                <p id="lvl0">Lvl. XXX</p>

                                            </div>

                                            <div class="pokerMult">

                                                <p class="chipsTab" id="chips0">##CHIPS##</p>

                                                <p>×</p>

                                                <p class="multTab" id="mult0">##MULT##</p>

                                            </div>

                                            <div class="pokerTimes">

                                                <span class="material-symbols-outlined"> mobile_theft </span>

                                                <p id="times0">##TIMES##</p>

                                            </div>

                                        </div>

                                    </div>

                                    <div class="handInfoCards" id="infoCards0">

                                    </div>

                                    <p>

                                        If the played hand is not any of the other hands, the highest ranked card scores.

                                    </p>

                                </div>

                                <div class="handInfo" id="hand1">

                                    <div class="titleWrap">

                                        <h2>Pair</h2>

                                        <div class="statsHandWrap">

                                            <div class="pokerLvl">

                                                <p id="lvl1">Lvl. XXX</p>

                                            </div>

                                            <div class="pokerMult">

                                                <p class="chipsTab" id="chips1">##CHIPS##</p>

                                                <p>×</p>

                                                <p class="multTab" id="mult1">##MULT##</p>

                                            </div>

                                            <div class="pokerTimes">

                                                <span class="material-symbols-outlined"> mobile_theft </span>

                                                <p id="times1">##TIMES##</p>

                                            </div>

                                        </div>

                                    </div>

                                    <div class="handInfoCards" id="infoCards1">

                                    </div>

                                    <p>

                                        Two cards that share the same rank. These may be played with up to three unscored cards.

                                    </p>

                                </div>

                                <div class="handInfo" id="hand2">

                                    <div class="titleWrap">

                                        <h2>Two Pair</h2>

                                        <div class="statsHandWrap">

                                            <div class="pokerLvl">

                                                <p id="lvl2">Lvl. XXX</p>

                                            </div>

                                            <div class="pokerMult">

                                                <p class="chipsTab" id="chips2">##CHIPS##</p>

                                                <p>×</p>

                                                <p class="multTab" id="mult2">##MULT##</p>

                                            </div>

                                            <div class="pokerTimes">

                                                <span class="material-symbols-outlined"> mobile_theft </span>

                                                <p id="times2">##TIMES##</p>

                                            </div>

                                        </div>

                                    </div>

                                    <div class="handInfoCards" id="infoCards2">

                                    </div>

                                    <p>

                                        Two pairs of cards with different ranks. May be played with one other unscored cards.

                                    </p>

                                </div>

                                <div class="handInfo" id="hand3">

                                    <div class="titleWrap">

                                        <h2>Three of a Kind</h2>

                                        <div class="statsHandWrap">

                                            <div class="pokerLvl">

                                                <p id="lvl3">Lvl. XXX</p>

                                            </div>

                                            <div class="pokerMult">

                                                <p class="chipsTab" id="chips3">##CHIPS##</p>

                                                <p>×</p>

                                                <p class="multTab" id="mult3">##MULT##</p>

                                            </div>

                                            <div class="pokerTimes">

                                                <span class="material-symbols-outlined"> mobile_theft </span>

                                                <p id="times3">##TIMES##</p>

                                            </div>

                                        </div>

                                    </div>

                                    <div class="handInfoCards" id="infoCards3">

                                    </div>

                                    <p>

                                        Three cards with the same rank. These may be played with up to two unscored cards.

                                    </p>

                                </div>

                                <div class="handInfo" id="hand4">

                                    <div class="titleWrap">

                                        <h2>Straight</h2>

                                        <div class="statsHandWrap">

                                            <div class="pokerLvl">

                                                <p id="lvl4">Lvl. XXX</p>

                                            </div>

                                            <div class="pokerMult">

                                                <p class="chipsTab" id="chips4">##CHIPS##</p>

                                                <p>×</p>

                                                <p class="multTab" id="mult4">##MULT##</p>

                                            </div>

                                            <div class="pokerTimes">

                                                <span class="material-symbols-outlined"> mobile_theft </span>

                                                <p id="times4">##TIMES##</p>

                                            </div>

                                        </div>

                                    </div>

                                    <div class="handInfoCards" id="infoCards4">

                                    </div>

                                    <p>

                                        Five cards in rank order, regardless of their suits.

                                    </p>

                                </div>

                                <div class="handInfo" id="hand5">

                                    <div class="titleWrap">

                                        <h2>Flush</h2>

                                        <div class="statsHandWrap">

                                            <div class="pokerLvl">

                                                <p id="lvl5">Lvl. XXX</p>

                                            </div>

                                            <div class="pokerMult">

                                                <p class="chipsTab" id="chips5">##CHIPS##</p>

                                                <p>×</p>

                                                <p class="multTab" id="mult5">##MULT##</p>

                                            </div>

                                            <div class="pokerTimes">

                                                <span class="material-symbols-outlined"> mobile_theft </span>

                                                <p id="times5">##TIMES##</p>

                                            </div>

                                        </div>

                                    </div>

                                    <div class="handInfoCards" id="infoCards5">

                                    </div>

                                    <p>

                                        Five cards that share the same suit.

                                    </p>

                                </div>

                                <div class="handInfo" id="hand6">

                                    <div class="titleWrap">

                                        <h2>Full house</h2>

                                        <div class="statsHandWrap">

                                            <div class="pokerLvl">

                                                <p id="lvl6">Lvl. XXX</p>

                                            </div>

                                            <div class="pokerMult">

                                                <p class="chipsTab" id="chips6">##CHIPS##</p>

                                                <p>×</p>

                                                <p class="multTab" id="mult6">##MULT##</p>

                                            </div>

                                            <div class="pokerTimes">

                                                <span class="material-symbols-outlined"> mobile_theft </span>

                                                <p id="times6">##TIMES##</p>

                                            </div>

                                        </div>

                                    </div>

                                    <div class="handInfoCards" id="infoCards6">

                                    </div>

                                    <p>

                                        A Three of a Kind and a Pair.

                                    </p>

                                </div>

                                <div class="handInfo" id="hand7">

                                    <div class="titleWrap">

                                        <h2>Four of a Kind</h2>

                                        <div class="statsHandWrap">

                                            <div class="pokerLvl">

                                                <p id="lvl7">Lvl. XXX</p>

                                            </div>

                                            <div class="pokerMult">

                                                <p class="chipsTab" id="chips7">##CHIPS##</p>

                                                <p>×</p>

                                                <p class="multTab" id="mult7">##MULT##</p>

                                            </div>

                                            <div class="pokerTimes">

                                                <span class="material-symbols-outlined"> mobile_theft </span>

                                                <p id="times7">##TIMES##</p>

                                            </div>

                                        </div>

                                    </div>

                                    <div class="handInfoCards" id="infoCards7">

                                    </div>

                                    <p>

                                        Four cards with the same rank. Those may be played with one other unscored card.

                                    </p>

                                </div>

                                <div class="handInfo" id="hand8">

                                    <div class="titleWrap">

                                        <h2>Straight Flush</h2>

                                        <div class="statsHandWrap">

                                            <div class="pokerLvl">

                                                <p id="lvl8">Lvl. XXX</p>

                                            </div>

                                            <div class="pokerMult">

                                                <p class="chipsTab" id="chips8">##CHIPS##</p>

                                                <p>×</p>

                                                <p class="multTab" id="mult8">##MULT##</p>

                                            </div>

                                            <div class="pokerTimes">

                                                <span class="material-symbols-outlined"> mobile_theft </span>

                                                <p id="times8">##TIMES##</p>

                                            </div>

                                        </div>

                                    </div>

                                    <div class="handInfoCards" id="infoCards8">

                                    </div>

                                    <p>

                                        Five cards in rank order with all cards sharing the same suit.

                                    </p>

                                </div>

                                <div class="handInfo" id="hand9" style="display: none">

                                    <div class="titleWrap">

                                        <h2>Royal Flush</h2>

                                        <div class="statsHandWrap">

                                            <div class="pokerLvl">

                                                <p id="lvl9">Lvl. XXX</p>

                                            </div>

                                            <div class="pokerMult">

                                                <p class="chipsTab" id="chips9">##CHIPS##</p>

                                                <p>×</p>

                                                <p class="multTab" id="mult9">##MULT##</p>

                                            </div>

                                            <div class="pokerTimes">

                                                <span class="material-symbols-outlined"> mobile_theft </span>

                                                <p id="times9">##TIMES##</p>

                                            </div>

                                        </div>

                                    </div>

                                    <div class="handInfoCards" id="infoCards8">

                                    </div>

                                    <p style="margin: 0;">

                                        Five cards with the rank order: A, J, Q, K, 10 with all cards sharing the same suit.

                                        <br>

                                        <i style="font-size: 0.8em;">(This hand shares the same level as Straight Flush)</i>

                                    </p>

                                </div>

                                <div class="handInfo" id="handA" style="display: none">

                                    <div class="titleWrap">

                                        <h2>Five of a kind</h2>

                                        <div class="statsHandWrap">

                                            <div class="pokerLvl">

                                                <p id="lvlA">Lvl. XXX</p>

                                            </div>

                                            <div class="pokerMult">

                                                <p class="chipsTab" id="chipsA">##CHIPS##</p>

                                                <p>×</p>

                                                <p class="multTab" id="multA">##MULT##</p>

                                            </div>

                                            <div class="pokerTimes">

                                                <span class="material-symbols-outlined"> mobile_theft </span>

                                                <p id="timesA">##TIMES##</p>

                                            </div>

                                        </div>

                                    </div>

                                    <div class="handInfoCards" id="infoCardsA">

                                    </div>

                                    <p>

                                        Five cards cards with the same rank.

                                    </p>

                                </div>

                                <div class="handInfo" id="handB" style="display: none">

                                    <div class="titleWrap">

                                        <h2>Flush House</h2>

                                        <div class="statsHandWrap">

                                            <div class="pokerLvl">

                                                <p id="lvlB">Lvl. XXX</p>

                                            </div>

                                            <div class="pokerMult">

                                                <p class="chipsTab" id="chipsB">##CHIPS##</p>

                                                <p>×</p>

                                                <p class="multTab" id="multB">##MULT##</p>

                                            </div>

                                            <div class="pokerTimes">

                                                <span class="material-symbols-outlined"> mobile_theft </span>

                                                <p id="timesB">##TIMES##</p>

                                            </div>

                                        </div>

                                    </div>

                                    <div class="handInfoCards" id="infoCardsB">

                                    </div>

                                    <p>

                                        A Three of a Kind and a Pair that share the same suit.

                                    </p>

                                </div>

                                <div class="handInfo" id="handC" style="display: none">

                                    <div class="titleWrap">

                                        <h2>Five Flush</h2>

                                        <div class="statsHandWrap">

                                            <div class="pokerLvl">

                                                <p id="lvlC">Lvl. XXX</p>

                                            </div>

                                            <div class="pokerMult">

                                                <p class="chipsTab" id="chipsC">##CHIPS##</p>

                                                <p>×</p>

                                                <p class="multTab" id="multC">##MULT##</p>

                                            </div>

                                            <div class="pokerTimes">

                                                <span class="material-symbols-outlined"> mobile_theft </span>

                                                <p id="timesC">##TIMES##</p>

                                            </div>

                                        </div>

                                    </div>

                                    <div class="handInfoCards" id="infoCardsC">

                                    </div>

                                    <p>

                                        Five cards cards with the same rank and same suit.

                                    </p>

                                </div>

                            </div>

                            <button class="left" id="handsL" disabled>

                                <span class="material-symbols-outlined">chevron_left</span>

                            </button>

                            <button class="right" id="handsR">

                                <span class="material-symbols-outlined">chevron_right</span>

                            </button>

                        </div>

                    </div>

                </div>

                <div class="content" id="run1">

                </div>

                <div class="content" id="run2">

                r

                </div>

            <article>

        </div>

        `),
        showCloseButton: true,
        showConfirmButton: false,
        background: '#3C565E',
        customClass: {
            container: 'infoSwalContainer',
            popup: 'infoSwalPopup'
        },
        didOpen: () => {

            //Load SFX
            buttonSfx('button')

            const modal = Swal.getPopup()

            //Menu top buttons
            const menuBtns = Array.from(modal.querySelector('.menuRun').children)
            const infoTab = modal.querySelector('.infoRun').children

            //Menu poker tab buttons
            const pokerBtns = Array.from(modal.querySelector('.pokerBtn').children)
            const pokerInfo = modal.querySelector('.pokerInfo').children

            //Find hand description stuff
            const info = modal.querySelector('#poker1')
            const handsL = modal.querySelector('#handsL')
            const handsR = modal.querySelector('#handsR')
            let handsPos = 0
            const infoDisplay = modal.querySelectorAll('.handInfoCards')

            //Find line of poker
            const linesPoker = modal.querySelectorAll('.pokerHandLine')

            //Menu buttons functions
            menuBtns.forEach((element, index) => {

                element.addEventListener('click', () => {

                    openCorrespondingTab(index, infoTab, modal, 'appear')

                    menuBtns.find(e => e.classList.contains('selected')).classList.remove('selected')
                    element.classList.add('selected')

                })
                
            })
            pokerBtns.forEach((element, index) => {

                element.addEventListener('click', () => {

                    openCorrespondingTab(index, pokerInfo, modal, 'pokerAppear')

                    pokerBtns.find(e => e.classList.contains('selected')).classList.remove('selected')
                    element.classList.add('selected')

                })
                
            })

            //Scroll buttons functions
            info.addEventListener('scroll', () => {

                handsPos = updateByScroll(info)

                enableButtons (handsPos, info, handsR, handsL)

            })
            handsL.addEventListener('click', () => {

                handsPos = moveLeft (handsPos, info)

                enableButtons (handsPos, info, handsR, handsL)

            })
            handsR.addEventListener('click', () => {

                handsPos = moveRight (handsPos, info)

                enableButtons (handsPos, info, handsR, handsL)

            })

            //If click on the lines, go to description of hand
            buttonSfx('.pokerHandLine')
            linesPoker.forEach((element, index) => {

                element.addEventListener('click', () => {

                    openCorrespondingTab(1, pokerInfo, modal, 'pokerAppear')

                    pokerBtns.find(e => e.classList.contains('selected')).classList.remove('selected')
                    pokerBtns[1].classList.add('selected')

                    const itemsWidth = info.children[0].clientWidth * 1.125
                    info.scrollTo({ left: Math.abs(index - linesPoker.length+1) * itemsWidth, behavior: 'smooth' })

                })

            })

            //Display cards
            infoDisplay.forEach((element, index) => {

                placeHandCardsInfo(element, index)
                
            })

            //Scroll with keyboard too
            modal.addEventListener('keydown', (event) => {

                const keyName = event.key;

                if (keyName === 'ArrowLeft' || keyName.toLowerCase() === 'a') {

                    handsPos = moveLeft (handsPos, info)

                    enableButtons (handsPos, info, handsR, handsL)

                }
                if (keyName === 'ArrowRight' || keyName.toLowerCase() === 'd') {

                    handsPos = moveRight (handsPos, info)

                    enableButtons (handsPos, info, handsR, handsL)

                }
            
            })

            function updateByScroll (container) {

                let closestIndex = 0
                let closestDistance = Infinity
                const availableInfo = [...container.children].filter(i => i.style.display != 'none')

                availableInfo.forEach((child, index) => {

                    const distance = Math.abs(container.scrollLeft - child.offsetLeft)

                    if (distance < closestDistance) {

                        closestDistance = distance
                        closestIndex = index
                        
                    }

                })

                return closestIndex

            }
            function enableButtons (position, container, R, L) {

                const availableInfo = [...container.children].filter(i => i.style.display != 'none')

                if (position >= availableInfo.length -1) {

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

                const availableInfo = [...container.children].filter(i => i.style.display != 'none')

                position = Math.min(position + 1, availableInfo.length - 1)
                container.scrollTo({ left: availableInfo[position].offsetLeft, behavior: 'smooth' })

                return position
                
            }
            function moveLeft (position, container) {

                const availableInfo = [...container.children].filter(i => i.style.display != 'none')

                position = Math.max(position - 1, 0)
                container.scrollTo({ left: availableInfo[position].offsetLeft, behavior: 'smooth' })

                return position

            }

            //Get blinds HTML to display
            iFrameBlind.addEventListener('load', () => {

                const blindCheck = modal.querySelector('#run1')
                const iframeDoc = iFrameBlind.contentDocument

                blindCheck.innerHTML = iframeDoc.querySelector('.blinds').innerHTML

                const blindBtns = blindCheck.querySelectorAll('button')

                blindBtns.forEach(e => e.remove())
                iFrameBlind.remove()

            })

        }


    })

    //CSS fix
    requestAnimationFrame(() => {

        document.body.classList.remove('swal2-height-auto')

    })


})

function openCorrespondingTab (i, tabs, swal, selection) {

    const current = swal.querySelector(`.${selection}`)

    current.classList.remove(selection)
    tabs[i].classList.add(selection) 

}

//Create HTML iFrame of ante.html to get blinds
function takeIframe () {

    const iFrameBlind = document.createElement('iframe')
    iFrameBlind.src = "../html/ante.html"
    iFrameBlind.style.pointerEvents = 'none '
    iFrameBlind.style.position = 'absolute'
    iFrameBlind.style.opacity = 0

    return iFrameBlind

}

function placeHandCardsInfo (container, id) {

    const cond = getHandCondition(id);
    const cards = []
    const template = deck[0]

    function generateHighCard () {

        while (true){

            const charge = []
            const select = []

            //Fill with random cards
            generateHighSet(charge)

            //Check if straight
            if (!getHandCondition(4).check(charge, 0)) {

                const numbers = charge.map(c => Number(c.slice(1)))
                const target = numbers.includes(1) ? 1:Math.max(...numbers)

                select.push(...numbers.map(n => n === target))

                generateCards(charge, select)

                return
            }

        }

    }

    function generateHighSet (charge) {

        while (charge.length < 5) {

            //Check if no pair, flush or same value gets repeated
            const value = template[Math.floor(Math.random()*52)][1]
            if (!charge.includes(value) && !charge.some(c => c.slice(1) == value.slice(1)) && charge.filter(c => c.slice(0, 1) == value.slice(0, 1)).length <= 5) {

                charge.push(value)

            }

        }

    }

    function generatePairSet (count, templateValue, charge) {

        for (let i = 0; i < count; i++) {

            const pos = Math.floor(Math.random()*5)
            const value = templateValue[Math.floor(Math.random()*4)][1]
            
            if (charge.includes(value) || isNaN(Number(charge[pos]))) {

                i--
                continue

            }

            charge[pos] = value
            
        }

    }

    function generateStr8Set (charge, royal) {
        

        let startStr8
        const royalFind = template.filter(e => Number(e[1].slice(1)) == 10)

        while (!startStr8 || Number(startStr8.slice(1)) >= 11) {

            startStr8 = royal ? royalFind[Math.floor(Math.random()*4)][1]:template[Math.floor(Math.random()*52)][1]

        }

        for (let i = 0; i < 5; i++) {

            let currentValue = (Number(startStr8.slice(1))+i)%13
            if (currentValue == 0) currentValue = 13

            const templateValues = template.filter(e => Number(e[1].slice(1)) == currentValue)
            const valueSelected = templateValues[Math.floor(Math.random()*4)][1]

            if (charge.filter(c => c.slice(0,1) == valueSelected.slice(0,1)).length >= 5) {

                console.log('fail')
                i--
                continue

            }

            charge.push(valueSelected)
            
        }


    }

    function generateFlushSet (charge) {

        const suit = charge[Math.floor(Math.random()*charge.length)].slice(0,1)

        charge.forEach(card => {

            charge[charge.indexOf(card)] = suit + card.slice(1)
            
        })

    }

    function fillEmpty (charge) {

        const empty = charge.filter(e => !isNaN(Number(e)))
        for (let e = 0; e < empty.length; e++) {

            const value = template[Math.floor(Math.random()*52)][1]

            if (charge.includes(value) || (charge.some(c => c.length > 1 && c.slice(1) == value.slice(1)))) {

                e--
                continue

            }

            charge[charge.indexOf(empty[e])] = value


        }

    }

    //All functions but high card
    const genFunctions = {

        generatePair: () => {

            const charge = [0, 1, 2, 3, 4]
            const select = []

            const pairValue = Math.floor(Math.random()*13)+1
            const templateValue = template.filter(e => Number(e[1].slice(1)) == pairValue)
            
            //Select the pairs
            generatePairSet(2, templateValue, charge)

            //Check selected
            charge.forEach(card => select.push(isNaN(card)))

            //Find empty and fill with random cards
            fillEmpty(charge)

            generateCards(charge, select)

        },
        generateTwoPair: () => {

            const charge = [0, 1, 2, 3, 4]
            const select = []

            const tpValues = []

            //Select the pairs
            for (let t = 0; t < 2; t++) {
                
                const pairValue = Math.floor(Math.random()*13)+1
                const templateValue = template.filter(e => Number(e[1].slice(1)) == pairValue)

                if (tpValues.includes(pairValue)) {

                    t--
                    continue

                }

                tpValues.push(pairValue)

                generatePairSet(2, templateValue, charge)
                
            }
            //Check selected
            charge.forEach(card => select.push(isNaN(card)));

            //Find empty and fill with random cards
            fillEmpty(charge)

            generateCards(charge, select)

        },
        generateThree: () => {

            const charge = [0, 1, 2, 3, 4]
            const select = []

            const trioValue = Math.floor(Math.random()*13)+1
            const templateValue = template.filter(e => Number(e[1].slice(1)) == trioValue)

            //Select the trio
            generatePairSet(3, templateValue, charge)

            //Check selected
            charge.forEach(card => select.push(isNaN(card)))

            //Find empty and fill with random cards
            fillEmpty(charge)

            generateCards(charge, select)

        },
        generateStraight: () => {

            const charge = []
            const select = [true, true, true, true, true]

            //Generate straight
            generateStr8Set(charge, false)

            generateCards(charge, select)

        },
        generateFlush: () => {

            const charge = []
            const select = [true, true, true, true, true]

            //Generate random
            generateHighSet(charge)

            //Generate flush
            generateFlushSet(charge)

            generateCards(charge, select)

        },
        generateHouse: () => {

            while (true) {

                const charge = [0, 1, 2, 3, 4]
                const select = [true, true, true, true, true]

                const pairValue = Math.floor(Math.random()*13)+1
                const pairTemplateValue = template.filter(e => Number(e[1].slice(1)) == pairValue)

                let trioValue

                //Check pair and trio is the same
                while (!trioValue || trioValue == pairValue) {

                    trioValue = Math.floor(Math.random()*13)+1

                }

                const trioTemplateValue = template.filter(e => Number(e[1].slice(1)) == trioValue)

                //Select the pairs
                generatePairSet(2, pairTemplateValue, charge)

                //Select the trio
                generatePairSet(3, trioTemplateValue, charge)

                //Check if flush
                if (!getHandCondition(5).check(charge, 0)) {

                    generateCards(charge, select)
                    
                    return

                }

            }

        },
        generateFour: () => {

            const charge = [0, 1, 2, 3, 4]
            const select = []

            const fourValue = Math.floor(Math.random()*13)+1
            const templateValue = template.filter(e => Number(e[1].slice(1)) == fourValue)

            //Select the four
            generatePairSet(4, templateValue, charge)

            //Check selected
            charge.forEach(card => select.push(isNaN(card)))

            //Find empty and fill with random cards
            fillEmpty(charge)

            generateCards(charge, select)

        },
        generateStr8Flush: () => {

            while (true) {

                const charge = []
                const select = [true, true, true, true, true]

                //Generate straight
                generateStr8Set(charge)

                //Generate flush
                generateFlushSet(charge)

                //Check if royal flush
                if (!getHandCondition(9).check(charge, 0)){

                    generateCards(charge, select)

                    return

                }

            }

        },
        generateRoyalFlush: () => {

            const charge = []
            const select = [true, true, true, true, true]

            //Generate straight
            generateStr8Set(charge, true)

            //Generate flush
            generateFlushSet(charge)

            generateCards(charge, select)
            
        },
        generateFive: () => {

            const charge = [0, 1, 2, 3, 4]
            const select = [true, true, true, true, true]

            const fourValue = Math.floor(Math.random()*13)+1
            const templateValue = template.filter(e => Number(e[1].slice(1)) == fourValue)

            //Select the five by doing four
            generatePairSet(4, templateValue, charge)

            charge[charge.findIndex(c => !isNaN(c))] = charge.filter(c => isNaN(c))[Math.floor(Math.random()*4)]

            generateCards(charge, select)

        },
        generateFlushHouse: () => {

            const charge = [0, 1, 2, 3, 4]
            const select = [true, true, true, true, true]

            const pairValue = Math.floor(Math.random()*13)+1
            const pairTemplateValue = template.filter(e => Number(e[1].slice(1)) == pairValue)

            let trioValue

            //Check pair and trio is the same
            while (!trioValue || trioValue == pairValue) {

                trioValue = Math.floor(Math.random()*13)+1

            }

            const trioTemplateValue = template.filter(e => Number(e[1].slice(1)) == trioValue)

            //Select the pairs
            generatePairSet(2, pairTemplateValue, charge)

            //Select the trio
            generatePairSet(3, trioTemplateValue, charge)

            //Make it flush
            generateFlushSet(charge)

            generateCards(charge, select)

        },
        generateFiveFlush: () => {

            const charge = [0, 1, 2, 3, 4]
            const select = [true, true, true, true, true]

            const fourValue = Math.floor(Math.random()*13)+1
            const templateValue = template.filter(e => Number(e[1].slice(1)) == fourValue)

            //Select the five by doing four
            generatePairSet(4, templateValue, charge)

            charge[charge.findIndex(c => !isNaN(c))] = charge.filter(c => isNaN(c))[Math.floor(Math.random()*4)]

            //Make it flush
            generateFlushSet(charge)

            generateCards(charge, select)

        }

    }
    
    if (!cond) {

        generateHighCard()

    } else {

        genFunctions[cond.generate]()

    }

    function generateCards (onCharge, selected){

        onCharge.forEach((card, index) => {

            const container = document.createElement('div')

            container.style.position = 'relative'

            container.style.width = '100%'
            container.style.height = '100%'
            container.style.padding = '50% 0'
            container.style.boxSizing = 'border-box'

            if (!selected[index]) {

                container.style.margin = '7px'
                
                container.style.width = 'calc(100% - 14px)'
                container.style.height = 'calc(100% - 14px)'

            }

                const bgImg = document.createElement('img')
                bgImg.src = `../assets/playCards/cards__e0.png`

                const valueImg = document.createElement('img')
                valueImg.src = `../assets/playCards/cards__${card}.png`

                valueImg.style.position = 'absolute'
                valueImg.style.left = 0

            container.append(bgImg, valueImg)

            cards.push(container)
            
        });

    }

    cards.forEach(card => {

        container.appendChild(card)
        
    });

}