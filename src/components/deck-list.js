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
        const { data, active, isHiddenMobile } = this.props;

        const shouldBeSeenOnMobile = () => {
            return isHiddenMobile ? 'is-hidden-mobile' : ''
        }

        const decks = data.map((item, index) => {  
            return (
                <Deck 
                    key={index}
                    data={item}
                    onClick={this.props.onDeckChange}
                    active={active == item.id}
                />
            )
        })

        return (
            <div className={'is-one-third-desktop column ' + shouldBeSeenOnMobile()}>
                <div className='is-hidden-mobile'>
                    <h2 className="title is-4">decks</h2>
                </div>
                <div className="menu">
                    <ul className="menu-list">
                        {decks}
                    </ul>
                </div>
                
                <a
                    onClick={this.handleNew}    
                >
                    >new
                </a>
            </div>
        )
    }
}
