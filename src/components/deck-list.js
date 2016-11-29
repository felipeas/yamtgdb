import React, { Component } from 'react'
import Deck from './deck'

export default class DeckList extends Component {
    constructor (props) {
        super(props)
    }

    render () {
        const { data } = this.props;

        const decks = data.map((item, index) => {  
            return (
                <Deck 
                    key={index}
                    data={item}
                />
            )
        })

        return (
            <div className='deck-list'>
                <h2>decks</h2>
                {decks}
            </div>
        )
    }
}
