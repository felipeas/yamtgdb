import React, { Component } from 'react'

export default class Card extends Component {
    constructor (props) {
        super(props)
    }

    render () {
        const { data }= this.props
        
        return (
            <div className="deck-wrapper">
                <div className="deck-title">
                    <span>{data.name}</span>
                </div>
            </div>
        )
    }
}
