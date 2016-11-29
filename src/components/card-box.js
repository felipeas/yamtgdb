import React, { Component } from 'react'
import CardList from './card-list'
import SearchList from './search-list'
import DeckList from './deck-list'
import CardSearch from './card-search'

export default class CardBox extends Component {
    constructor (props) {
        super(props)

        this.state = {
            search: {
                list : [],
                counter : {}
            },
            cards: {
                main: {
                    list : [],
                    counter : {}
                },
                side: {
                    list : [],
                    counter : {}
                }
            }
        }
        
        this.state.search = JSON.parse(localStorage.getItem('yamtgdb-search')) || this.state.search
        this.state.cards = JSON.parse(localStorage.getItem('yamtgdb-cards'))  || this.state.cards
        this.state.decks = JSON.parse(localStorage.getItem('yamtgdb-decks'))  || this.state.decks
    }

    componentDidUpdate () {
        localStorage.setItem('yamtgdb-search', JSON.stringify(this.state.search))
        localStorage.setItem('yamtgdb-cards', JSON.stringify(this.state.cards))
    }

    handleOnSearchChange (search) {
        // console.log(search)
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

    render () {
        // TODO: 
        // deck list
        // load decks
        // save deck
        // collection

        const { search, cards } = this.state

        const decks = [
            {
                name: 'dummy'
            },
            {
                name: 'deck'
            },
            {
                name: 'list'
            }
        ]

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
                        grouped
                    />
                    <DeckList
                        data={decks}
                    />
                </section>
            </div>
        )
    }
}