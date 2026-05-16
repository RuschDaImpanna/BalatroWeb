const player0 = document.getElementById('player0')
const player1 = document.getElementById('player1')

window.addEventListener('DOMContentLoaded', async () => {

    //Default value
    if (!localStorage.getItem('track')) {

        localStorage.setItem('track', 0)

    }
    if (!localStorage.getItem('trackTime')) {

        localStorage.setItem('trackTime', 0)

    }

    const track = localStorage.getItem('track')
    const time = localStorage.getItem('trackTime')

    //Set default volume

    if (!localStorage.getItem('volume')) {

        localStorage.setItem('volume', JSON.stringify([100, 80, 80]))

    }

    const volume = JSON.parse(localStorage.getItem('volume'))

    const master = volume[0] / 100
    const ch0 = volume[1] / 100
    const ch1 = volume[2] / 100

    player0.volume = master * ch0
    player1.volume = master * ch1

    //Charge audio
    player0.src = `../assets/sound/music${track}.wav`

    player0.load()

    //Play audio
    player0.addEventListener('canplay', async () => {

        //Set time
        player0.currentTime = time

        try {

            await player0.play()

        } catch (err) {

            Swal.fire({

                title: "Page reloaded",
                text: "We have detected an ilegal realoding page move. Your progress has been saved. Please click here to continue playing",
                icon: "warning",
                allowOutsideClick: false,
                allowEscapeKey: false,
                preConfirm: false,
                confirmButtonText: 'Continue',
                didOpen: requestAnimationFrame(() => { document.body.classList.remove('swal2-height-auto') })
                
            }).then(async () => {

                await player0.play()

            })

        }

    }, { once: true })

    //Save time for each frame
    player0.addEventListener('timeupdate', () => {

        localStorage.setItem('trackTime', player0.currentTime)

    })

})

export function changeVolume () {

    const volume = JSON.parse(localStorage.getItem('volume'))

    const master = volume[0] / 100
    const ch0 = volume[1] / 100
    const ch1 = volume[2] / 100

    player0.volume = master * ch0
    player1.volume = master * ch1

}