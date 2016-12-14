import React, { Component } from 'react'
import Deck from './deck'

export default class DeckList extends Component {
    constructor (props) {
        super(props)

        this.handleNew = this.handleNew.bind(this)
    }

    handleNew(){
        this.props.onNew();
    }

    render () {
        const { data } = this.props;

        const decks = data.map((item, index) => {  
            return (
                <Deck 
                    key={index}
                    data={item}
                    onClick={this.props.onDeckChange}
                />
            )
        })

        return (
            <div className='deck-list'>
                <h2>decks</h2>
                {decks}
                <a
                    onClick={this.handleNew}    
                >
                    >new
                </a>
            </div>
        )
    }
}
