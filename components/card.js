import React, { Component } from 'react';

export default class Card extends Component {
    constructor (props) {
        super(props)
    }

    render () {
        const card = this.props;
        //TODO:
        //parse svg icons
        return (
            <div>
                <h3>{card.name}</h3>
                <span>{card.text}</span>
            </div>
        )
    }
}
