import React, { Component } from 'react'
import CardList from './card-list'
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
                list : [],
                counter : {}
            }
        }
        
        this.state.search = JSON.parse(localStorage.getItem('yamtgdb-search')) || this.state.search
        this.state.cards = JSON.parse(localStorage.getItem('yamtgdb-cards'))  || this.state.cards
    }

    componentDidUpdate () {
        localStorage.setItem('yamtgdb-search', JSON.stringify(this.state.search))
        localStorage.setItem('yamtgdb-cards', JSON.stringify(this.state.cards))
    }

    handleOnSearchChange (search) {
        // console.log(search)
    }   

    handleOnSearchResultClick(card) {
        let list = this.state.cards.list
        const counter = this.state.cards.counter

        const cards = this.state.cards

        list = list.find((x) => {x.id = card.id}) ? list : [ ...list, card ]
        counter[card.id] = counter[card.id] ? counter[card.id] += 1 : 1
        
        cards.list = list
        cards.counter = counter 

        debugger

        this.setState({ cards })        
    }

    handleOnListClick(card) {
        const list = this.state.cards.list.filter((x) => x.id != card.id)
        const counter = this.state.cards.counter
        
        counter[card.id] = list.filter((x) => {x.id == card.id}).length
        
        const cards = this.state.cards

        cards.list = list
        cards.counter = counter 

        this.setState({ cards })     
    }

    handleOnSearchSubmit (search) {
        this.setState({ 
            search: { 
                list: search,
                counter: []
            } 
        })   
    }

    render () {
        return (
            <div id='cardbox'>
                <h1>yamtgdb</h1>
                <CardSearch 
                    onChange={this.handleOnSearchChange.bind(this)}
                    onSubmit={this.handleOnSearchSubmit.bind(this)}
                />
                <section className='lists'>
                    <CardList id='search-list'
                        title='search'
                        data={this.state.search} 
                        onCardClick={this.handleOnSearchResultClick.bind(this)}
                    />
                    <CardList id='card-list'
                        title='deck'
                        data={this.state.cards}
                        onCardClick={this.handleOnListClick.bind(this)}
                        grouped='true'
                    />
                </section>
            </div>
        )
    }
}