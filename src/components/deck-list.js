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
        const { data, active } = this.props;

        const decks = data.map((item, index) => {  
            return (
                <Deck 
                    key={index}
                    data={item}
                    onClick={this.props.onDeckChange}
                    className={item.id == active? 'deck-active': ''}
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
