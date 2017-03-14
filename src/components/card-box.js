import React, { Component } from 'react'
import Nav from './nav'
import CardList from './card-list'
import SearchList from './search-list'
import DeckList from './deck-list'
import CardSearch from './card-search'
import _ from 'lodash'

export default class CardBox extends Component {
    constructor (props) {
        super(props)

        this.state = this.getInitialState()
        
        this.state.search = JSON.parse(localStorage.getItem('yamtgdb-search')) || this.state.search
        this.state.active = JSON.parse(localStorage.getItem('yamtgdb-active'))  || this.state.active
        this.state.decks = JSON.parse(localStorage.getItem('yamtgdb-decks'))  || this.state.decks
        this.state.nav = JSON.parse(localStorage.getItem('yamtgdb-nav'))  || this.state.nav

        if (this.state.active > 0) {
            this.state.cards = this.state.decks.find(deck => deck.id == this.state.active);
        }

        this.handleOnSearchSubmit = this.handleOnSearchSubmit.bind(this)
        this.handleSection = this.handleSection.bind(this)
        this.handleOnSearchChange = this.handleOnSearchChange.bind(this)
        this.handleOnSearchResultClick = this.handleOnSearchResultClick.bind(this)
        this.handleOnDeckDoubleCardClick = this.handleOnDeckDoubleCardClick.bind(this)
        this.handleOnDeckCardClick = this.handleOnDeckCardClick.bind(this)
        this.handleContextMenuClick = this.handleContextMenuClick.bind(this)
        this.handleDeckChangeTitle = this.handleDeckChangeTitle.bind(this)
        this.handleNewDeck = this.handleNewDeck.bind(this)
        this.handleDeckChange = this.handleDeckChange.bind(this)
    }

    getInitialState() {
        const initialState = {
            active: 0,
            search: {
                list : [],
                counter : {}
            },
            cards: {
                id: 0,
                name: '<no name>',
                main: {
                    list : [],
                    counter : {}
                },
                side: {
                    list : [],
                    counter : {}
                }
            },
            decks: [],
            nav: 'search'
        } 

        return initialState;
    }

    componentDidUpdate () {
        localStorage.setItem('yamtgdb-search', JSON.stringify(this.state.search))
        localStorage.setItem('yamtgdb-active', JSON.stringify(this.state.active))
        localStorage.setItem('yamtgdb-decks', JSON.stringify(this.state.decks))
        localStorage.setItem('yamtgdb-nav', JSON.stringify(this.state.nav))
    }

    handleOnSearchChange (search) {
        // console.log(search)
    }   

    handleDeckChangeTitle (name) {
        const deck = this.state.cards
        const decks = this.state.decks

        deck.name = name

        if (deck.id == 0) {
            decks.push(deck);
            deck.id = decks.length;
        }

        this.setState({ active: deck.id, cards: deck, decks })
    }

    handleOnSearchResultClick(card) {
        let list = this.state.cards.main.list
        const counter = this.state.cards.main.counter

        const cards = this.state.cards

        list = list.find(x => x.id == card.id) ? list : [ ...list, card ]
        counter[card.id] = counter[card.id] ? counter[card.id] += 1 : 1
        
        cards.main.list = list
        cards.main.counter = counter 

        this.setState({ cards })        
    }

    handleOnDeckCardClick(card, isFromSide) {
        let mainboard = this.state.cards.main            
        let sideboard = this.state.cards.side            
        
        if (!isFromSide) 
        {
            this.swapGroup(card, mainboard, sideboard)
        }
        else 
        {
            this.swapGroup(card, sideboard, mainboard)
        }

        const cards = this.state.cards
        cards.main = mainboard
        cards.side = sideboard

        this.setState({ cards })
    }

    removeCardFromDeck(card){
        const list = this.state.cards.main.list.filter((x) => x.id != card.id)
        const counter = this.state.cards.main.counter
        
        counter[card.id] = list.filter((x) => {x.id == card.id}).length
        
        const cards = this.state.cards

        cards.main.list = list
        cards.main.counter = counter 

        this.setState({ cards })   
    }

    swapGroup(card, origin, destination) {
        //take from origin
        origin.list = origin.list.filter((x) => x.id != card.id)

        //store amount
        const amount = origin.counter[card.id]

        //move to destiny
        destination.list = destination.list.find(x => x.id == card.id) ? destination.list : [ ...destination.list, card ]

        //change counters
        origin.counter[card.id] = origin.list.filter((x) => {x.id == card.id}).length

        //update destination
        destination.counter[card.id] = destination.counter[card.id] ? destination.counter[card.id] += amount : amount
    }

    handleOnDeckDoubleCardClick(card, isFromSide) {
        this.removeCardFromDeck(card)
    }

    handleContextMenuClick(card, isFromSide) {
        let mainboard = this.state.cards.main            
        let sideboard = this.state.cards.side            
        
        if (!isFromSide) 
        {
            mainboard.list = mainboard.list.filter((x) => x.id != card.id)
            delete mainboard.counter[card.id]
        }
        else 
        {
            sideboard.list = sideboard.list.filter((x) => x.id != card.id)
            delete sideboard.counter[card.id]
        }

        const cards = this.state.cards
        cards.main = mainboard
        cards.side = sideboard

        this.setState({ cards })
    }

    handleOnSearchSubmit (search) {
        this.setState({ 
            search: { 
                list: search,
                counter: search.reduce((counter, card) => {
                    counter[card.id] = 1
                    return counter;
                }, {})
            } 
        })   
    }

    handleDeckChange (deck) {
        this.setState({ active: deck.id, cards: deck })
    }

    handleNewDeck () {
        const deck = this.getInitialState().cards
        const decks = this.state.decks

        decks.push(deck);
        deck.id = decks.length;

        this.setState({ active: deck.id, cards: deck, decks })
    }

    handleSection (section) {
        this.setState({ nav: section})
    }

    getActiveDeck () {
        const{ name, main, side} = this.state.cards

        const totalMain = _.values(main.counter).reduce((soma, atual) => soma + atual, 0)
        const totalSide = _.values(side.counter).reduce((soma, atual) => soma + atual, 0)

        return {
            name: name,
            count: totalMain +  '/' + totalSide
        }
    }

    render () {
        // TODO: 
        // load decks
        // save deck
        // collection
        // define prop types (all over app)
        const { search, cards, decks, nav } = this.state

        const shouldBeSeenMobile = section => {
            return nav == section ? false : true
        }

        return (
            <div 
                id='cardbox'
                className='container is-black'
            >
                <Nav
                    deck={this.getActiveDeck()}
                    active={this.state.nav}
                    onSection={this.handleSection}
                />
                
                <section className='section'>
                    <div className='container'>
                        <CardSearch 
                            onChange={this.handleOnSearchChange}
                            onSubmit={this.handleOnSearchSubmit}
                            isHiddenMobile={shouldBeSeenMobile('search')}
                        />
                        <div className='columns'>
                            <SearchList 
                                id='search-list'
                                data={search} 
                                onCardClick={this.handleOnSearchResultClick}
                                isHiddenMobile={shouldBeSeenMobile('search')}
                            />
                            <CardList 
                                id='card-list'
                                data={cards}
                                onCardClick={this.handleOnDeckCardClick}
                                onCardDoubleClick={this.handleOnDeckDoubleCardClick}
                                onCardContextMenu={this.handleContextMenuClick}
                                onChangeTitle={this.handleDeckChangeTitle}
                                grouped
                                isHiddenMobile={shouldBeSeenMobile('deck')}
                            />
                            <DeckList
                                data={decks}
                                active={this.state.active}
                                onNew={this.handleNewDeck}
                                onDeckChange={this.handleDeckChange}
                                isHiddenMobile={shouldBeSeenMobile('list')}
                            />
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}