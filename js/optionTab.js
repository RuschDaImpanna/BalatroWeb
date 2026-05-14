const optionBtn = document.getElementById('options')

optionBtn.addEventListener('click', () => {

    Swal.fire({

        showCloseButton: true,
        showConfirmButton: false,
        background: '#3C565E',
        didOpen: () => {

            requestAnimationFrame(() => {

                document.body.classList.remove('swal2-height-auto')

            })

        }

    })

})