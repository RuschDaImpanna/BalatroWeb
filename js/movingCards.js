export function movingCard (container, showGhost) {

    const cards = [...container.querySelectorAll('.dragCard')]

    cards.forEach(card => {

        makeDraggable(card, container, showGhost)
        
    });

}

function makeDraggable (card, container, showGhost) {

    let isDragging = false
    let isReturning = false

    let offsetX = 0
    let offsetY = 0

    let ghost = null

    //Mousedown
    card.addEventListener("mousedown", (e) => {

        if (!card.classList.contains("dragCard")) return
        if (isDragging || isReturning) return

        e.preventDefault()

        isDragging = true

        card.classList.add('dragging')


        //Get measures and positon
        const rect = card.getBoundingClientRect()

        offsetX = e.clientX - rect.left
        offsetY = e.clientY - rect.top

        console.log(rect.width, rect.height)

        //Style stuff
        card.style.position = "fixed"
        card.style.width = rect.width + "px"
        card.style.height = rect.height + "px"
        card.style.zIndex = "9999"

        //Create ghost card
        ghost = document.createElement("div")
        ghost.classList.add("ghost")
        ghost.style.width = rect.width + "px"
        ghost.style.height = rect.height + "px"
        ghost.style.opacity = 0.3
        if (showGhost) {

            ghost.innerHTML = card.innerHTML
            ghost.querySelector('img').style.width = '100%'

        }

        container.replaceChild(ghost, card)
        document.body.appendChild(card)

        moveAt(e.clientX, e.clientY)

    })

    //Mousemove
    document.addEventListener("mousemove", (e) => {

        if (!isDragging) return

        moveAt(e.clientX, e.clientY)

        const afterElement = getClosestCard(container, e.clientX)

        if (!(container.querySelectorAll('.dragCard').length > 1)) return

        animateMove(container, () => {

            if (!afterElement || !container.contains(afterElement)) {

                container.appendChild(ghost)

            } else {

                container.insertBefore(ghost, afterElement)

            }

        })

    })

    //Mouseup
    document.addEventListener("mouseup", () => {

        if (!isDragging) return

        isDragging = false
        isReturning = true

        //Replace ghost with card
        card.classList.remove('dragging')

        animateFly(card, ghost, () => {

            isReturning = false

            if (ghost?.parentNode) {

                ghost.replaceWith(card)

            }


            //Style stuff
            card.style.position = ''
            card.style.left = ''
            card.style.top = ''
            card.style.width = ''
            card.style.height = ''
            card.style.zIndex = ''
            card.style.pointerEvents = ''
            card.style.transform = ''
            
        })


    })

    //Move
    function moveAt(x, y) {

        card.style.left = `${x - offsetX}px`
        card.style.top = `${y - offsetY}px`

    }

    //Get closest card to place ghost
    function getClosestCard(container, x) {

        const cards = [...container.children].filter(c => c !== ghost && c.classList.contains("dragCard"))

        let closest = null
        let closestDistance = Infinity

        for (let i = 0; i < cards.length; i++) {

            const rect = cards[i].getBoundingClientRect()

            const centerX = rect.left + rect.width / 2

            if (x < centerX) {
                return cards[i]
            }
        }

        return null

    }

}

//Animate movement
let isAnimating = false
function animateMove (container, moveFunc) {

    if (isAnimating) return
    isAnimating = true

    const cards = [...container.children].filter(c => c.classList.contains("dragCard"))

    //First position of a card
    const first = new Map()

    for (const card of cards) {

        first.set(card, card.getBoundingClientRect())

    }

    //Change DOM
    moveFunc()

    requestAnimationFrame(() => {

        //Last position of a card
        const last = new Map()

        cards.forEach(card => {

            last.set(card, card.getBoundingClientRect())

        })

        for (const card of cards) {

            const f = first.get(card)
            const l = last.get(card)

            if (!f || !l) continue

            const dx = f.left - l.left
            const dy = f.top - l.top

            card.style.transform = `translate(${dx}px, ${dy}px)`

            card.offsetHeight

            requestAnimationFrame(() => {

                card.style.transform = ''

            })
        }

        isAnimating = false

    })

}

function animateFly (card, target, moveFunc) {

    const targetRect = target.getBoundingClientRect()
    const cardRect = card.getBoundingClientRect()

    const dx = targetRect.left - cardRect.left
    const dy = targetRect.top - cardRect.top

    card.style.transform = `translate(${dx}px, ${dy}px)`

    function handleTransitionEnd() {

        card.removeEventListener("transitionend", handleTransitionEnd)

        moveFunc?.()

    }

    card.addEventListener("transitionend", handleTransitionEnd)

}