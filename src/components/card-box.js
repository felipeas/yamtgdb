import React, { Component } from 'react'
import CardList from './card-list'
import SearchList from './search-list'
import DeckList from './deck-list'
import CardSearch from './card-search'

export default class CardBox extends Component {
    constructor (props) {
        super(props)

        this.state = this.getInitialState()
        
        this.state.search = JSON.parse(localStorage.getItem('yamtgdb-search')) || this.state.search
        this.state.active = JSON.parse(localStorage.getItem('yamtgdb-active'))  || this.state.active
        this.state.decks = JSON.parse(localStorage.getItem('yamtgdb-decks'))  || this.state.decks

        if (this.state.active > 0) {
            this.state.cards = this.state.decks.find(deck => deck.id == this.state.active);
        }
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
                name: '<new>',
                main: {
                    list : [],
                    counter : {}
                },
                side: {
                    list : [],
                    counter : {}
                }
            },
            decks: []
        } 

        return initialState;
    }

    componentDidUpdate () {
        localStorage.setItem('yamtgdb-search', JSON.stringify(this.state.search))
        localStorage.setItem('yamtgdb-active', JSON.stringify(this.state.active))
        localStorage.setItem('yamtgdb-decks', JSON.stringify(this.state.decks))
    }

    handleOnSearchChange (search) {
        // console.log(search)
    }   

    handleDeckChangeTitle (name) {
        const cards = this.state.cards
        cards.name = name

        this.setState({ cards })
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

    handleOnListClick(card) {
        const list = this.state.cards.main.list.filter((x) => x.id != card.id)
        const counter = this.state.cards.main.counter
        
        counter[card.id] = list.filter((x) => {x.id == card.id}).length
        
        const cards = this.state.cards

        cards.main.list = list
        cards.main.counter = counter 

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

    render () {
        // TODO: 
        // load decks
        // save deck
        // collection
        // move bindingins to constructor

        const { search, cards, decks } = this.state

        return (
            <div id='cardbox'>
                <div className='title'>
                    <h1>yamtgdb</h1>
                    <span className='sub-title'>yet another magic the gathering deck builder</span>
                </div>
                <CardSearch 
                    onChange={this.handleOnSearchChange.bind(this)}
                    onSubmit={this.handleOnSearchSubmit.bind(this)}
                />
                <section className='lists'>
                    <SearchList 
                        id='search-list'
                        name='search'
                        className='search'
                        data={search} 
                        onCardClick={this.handleOnSearchResultClick.bind(this)}
                    />
                    <CardList 
                        id='card-list'
                        name='deck'
                        className='deck'
                        data={cards}
                        onCardClick={this.handleOnListClick.bind(this)}
                        onChangeTitle={this.handleDeckChangeTitle.bind(this)}
                        grouped
                    />
                    <DeckList
                        data={decks}
                        onNew={this.handleNewDeck.bind(this)}
                        onDeckChange={this.handleDeckChange.bind(this)}
                    />
                </section>
            </div>
        )
    }
}