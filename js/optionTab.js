import { settingsSwal, collectionSwal } from "./extraSwal.js"

const optionBtn = document.getElementById('options')

optionBtn.addEventListener('click', () => {

    let optionSel

    Swal.fire({

        html: (`

            <div class="menuOptSwal">

                <ul id="menuList">

                    <li>
                    
                        <button type="button" id="opt0Btn">Settings</button>

                    </li>

                    <li>
                    
                        <a href="deck.html"><button type="button" id="opt1Btn">New Run</button></a>

                    </li>

                    <li>
                    
                        <a href="main.html"><button type="button" id="opt2Btn">Main Menu</button></a>

                    </li>

                    <li>
                    
                        <button type="button" id="opt3Btn">Collection</button>

                    </li>

                </ul>

            </div>
            
            `),
        showCloseButton: true,
        showConfirmButton: false,
        showCancelButton: true,
        cancelButtonText: 'Back',
        cancelButtonColor: '#F3AD16',
        background: '#3C565E',
        didOpen: () => {

            const listBtns = [...document.getElementById('menuList').children]

            listBtns.forEach((btn, i) => {

                btn.addEventListener('click', () => {

                    optionSel = i
                    Swal.close()
                })
                
            })

            requestAnimationFrame(() => {

                document.body.classList.remove('swal2-height-auto')

            })

        },
        customClass: {
            container: 'optionSwalContainer',
            popup: 'optionSwalPopup'
        }

    }).then(r => {

        if (optionSel == 0){

            settingsSwal()

        } else if (optionSel == 3) {

            collectionSwal()

        }

    })

})