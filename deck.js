// variable name in caps indicates global constant variable
const SUITS = [
    '♠', 
    '♣', 
    '♦', 
    '♥'
]

const VALUES = [
    'A',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    'J',
    'Q',
    'K'
]

export class Deck {
    constructor(cards = freshDeck()) { // accepts an array of card objects
        this.cards = cards
    }

    get numberOfCards() {
        return this.cards.length
    }

    pop() {
        return this.cards.shift()
    }

    push(card) {
        this.cards.push(card)
    }

    shuffle() {
        // Fisher-Yates (Knuth) shuffle method:
        // iterates through the array in reverse order and 
        // swaps each card with a randomly selected card from the remaining unshuffled portion of the array. 
        
        // Fisher-Yates method using a temporary variable

        for (let i = this.numberOfCards - 1; i > 0; i--) {
            const randomIndex = Math.floor(Math.random() * (i + 1))
            const oldValue = this.cards[randomIndex]
            this.cards[randomIndex] = this.cards[i]
            this.cards[i] = oldValue
        }

        // // Fisher-Yates method using array destructuring assignment --> throws a reference error for some reason

        // for (let i = this.numberOfCards - 1; i > 0; i--) {
        //     const randomIndex = Math.floor(Math.random() * (i + 1))
        //     console.log(i, randomIndex, this.cards[i], this.cards[randomIndex])
        //     [this.cards[i], this.cards[randomIndex]] = [this.cards[randomIndex], this.cards[i]]
        // }

        // // My shuffle method: removes a random card from the original array 
        // // and adds it to a new array

        // const shuffledDeck = new Array(this.numberOfCards)
        // for (let i = 0; i < shuffledDeck.length; i++) {
        //     const randomIndex = Math.floor(Math.random() * this.numberOfCards)
        //     shuffledDeck[i] = this.cards[randomIndex]
        //     this.cards.splice(randomIndex, 1)
        // }
        // this.cards = shuffledDeck
    }
}

class Card {
    constructor(suit, value) {
        this.suit = suit
        this.value = value
    }

    get color() {
        return this.suit === '♣' || this.suit === '♠' ? 'black' : 'red'
    }

    getHTML() {
        const cardDiv = document.createElement('div')
        cardDiv.innerText = this.suit
        cardDiv.classList.add('card', this.color)
        cardDiv.dataset.value = `${this.value} ${this.suit}`
        return cardDiv
    }
}

function freshDeck() { // returns an array of 52 card objects
    
    // my method

    let deck = []

    SUITS.forEach(suit => {
        VALUES.forEach(value => {
            deck.push(new Card(suit, value))
        })
    })

    return deck

    // // wedevsimplified method

    // return SUITS.flatMap(suit => {
    //     return VALUES.map(value => {
    //         return new Card(suit, value)
    //     })
    // })
}