export function noAnimCardsGen (container, data, type, index, tags) {

    for (let it = 0; it < data[index].info.length; it++) {

        container.append(createCard(data[index].info, type, it, tags))

    }

}



export function createCard (dataCard, type, it, tags) {

    const wrapper = document.createElement('div')
    wrapper.classList.add(type, 'dragCard')

        const imgWrap = document.createElement('div')
        imgWrap.classList.add('cardImg')
        if (dataCard[it].edition) imgWrap.classList.add(dataCard[it].edition)

            const dataImg = dataCard[it].image
            const images = Array.isArray(dataImg) ? dataImg : [dataImg];

            for (let ci = 0; ci < images.length; ci++) {

                const img = images[ci]

                const image = document.createElement('img')
                if (img.includes('legend')) image.classList.add('legendaryMove')
                if (img.includes('soul')) image.classList.add('soulCrystal')
                image.src = img

                imgWrap.append(image)
                
            }

        const cardInfo = document.createElement('div')
        cardInfo.classList.add('cardInfo')
            
            const title = document.createElement('h6')
            title.innerText = dataCard[it].name

            const text = document.createElement('p')
            text.innerHTML = dataCard[it].description

            const tagsWrap = document.createElement('div')
            tagsWrap.classList.add('cardTags')

                if (dataCard[it].tags) {

                    dataCard[it].tags.forEach(tag => {

                        tags.push(tag)
                        
                    })

                }

                const editionTagOpt = ['foil', 'holographic', 'polychrome', 'negative']

                tags.forEach(tag => {

                    const spanTag = document.createElement('span')

                    let classTag = toCamelCase(tag)

                    if (editionTagOpt.includes(classTag)) classTag = 'editionTag'
                    if (classTag.endsWith('card')) classTag = 'enhance'

                    spanTag.classList.add(classTag)
                    spanTag.innerText = tag

                    tagsWrap.append(spanTag)
                    
                })

            cardInfo.append(title, text, tagsWrap)

        wrapper.append(imgWrap, cardInfo)

    return wrapper

    function toCamelCase(str) {

        return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (match, char) => char.toUpperCase())

    }

}

export function createTag (dataTag, isBlind) {

    const wrapper = document.createElement('div')
    wrapper.classList.add('tagWrap')

        const img = document.createElement('img')
        img.src = dataTag.image

        const tagInfo = document.createElement('div')
        tagInfo.classList.add('tagInfo')

            const title = document.createElement('h6')
            title.innerText = dataTag.name

            const text = document.createElement('p')
            text.innerHTML = dataTag.description

            tagInfo.append(title, text)
        

        if (isBlind) {

            const tagsWrap = document.createElement('div')
            tagsWrap.classList.add('cardTags')

            const spanTag = document.createElement('span')
            spanTag.classList.add('blind')
            spanTag.innerText = `${dataTag.scale}X Base`

            tagsWrap.append(spanTag)

            tagInfo.append(tagsWrap)

        }

        wrapper.append(img, tagInfo)
    
    return wrapper

}