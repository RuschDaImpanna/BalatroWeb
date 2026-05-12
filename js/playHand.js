const fourHands = 0

export function getHandCondition (id) {

    switch(id) {


        case 1:
            return { 

                check: hasPairSet,
                generate: 'generatePair'

            }

        case 2:
            return { 

                check: hasTwoPair,
                generate: 'generateTwoPair'

            }

        case 3:
            return { 

                check: hasPairSet,
                generate: 'generateThree'

            }

        case 4:
            return { 

                check: hasStraight,
                generate: 'generateStraight'

            }

        case 5:
            return { 

                check: hasFlush,
                generate: 'generateFlush'

            }

        case 6:
            return { 

                check: hasHouse,
                generate: 'generateHouse'

            }

        case 7:
            return { 

                check: hasPairSet,
                generate: 'generateFour'

            }

        case 8:
            return { 

                check: hasStr8Flush,
                generate: 'generateStr8Flush'

            }

        case 9:
            return { 

                check: hasRoyalFlush,
                generate: 'generateRoyalFlush'

            }
        case 10:
            return { 

                check: hasPairSet,
                generate: 'generateFive'

            }
        case 11:
            return { 

                check: hasFlushHouse,
                generate: 'generateFlushHouse'

            }
        case 12:
            return { 

                check: hasFiveFlush,
                generate: 'generateFiveFlush'

            }

        default:
            return false

    }

    function hasPairSet (hand, count) {

        const values = hand.map(c => Number(c.slice(1)))
        const counts = {}

        for (const cards of values) {

            counts[cards] = (counts[cards] || 0) + 1
            
        }

        return Object.values(counts).includes(count)

    }

    function hasTwoPair (hand) {

        const values = hand.map(c => Number(c.slice(1)))
        const counts = {}

        for (const cards of values) {

            counts[cards] = (counts[cards] || 0) + 1
            
        }

        return Object.values(counts).filter(v => v == 2).length == 2

    }


    function hasStraight (hand) {

        const values = hand.map(c => Number(c.slice(1)))
        values.sort((a, b) => a - b)

        const expected = []

        for (let i = 0; i <= 4 - fourHands; i++) {

            let number = values[0] + i

            if (number >= 14) number = 1

            expected.push(number)
            
        }

        expected.sort((a, b) => a - b)

        return expected.every((e, i) => e == values[i])

    }

    function hasFlush (hand) {

        const values = hand.map(c => c.slice(0, 1))
        const counts = {}

        for (const cards of values) {

            counts[cards] = (counts[cards] || 0) + 1
            
        }

        return Object.values(counts).includes(5 - fourHands)

    }

    function hasHouse (hand) {

        return hasPairSet(hand, 2) && hasPairSet(hand, 3)

    }

    function hasStr8Flush (hand) {

        return hasStraight(hand) && hasFlush(hand)

    }

    function hasRoyalFlush (hand) {

        const values = hand.map(c => Number(c.slice(1)))
        values.sort((a, b) => a - b)

        const expected = [1, 10, 11, 12, 13];
        expected.sort((a, b) => a - b)

        return expected.every((e, i) => e == values[i]) && hasFlush(hand)

    }


    function hasFlushHouse (hand) {

        return hasFlush(hand) && hasHouse(hand)

    }

    function hasFiveFlush (hand) {

        return hasPairSet(hand, 5) && hasFlush(hand)

    }

}