import React, { Component } from 'react'

export default class Card extends Component {
    constructor (props) {
        super(props)

        this.handleClick = this.handleClick.bind(this)
    }

    handleClick () {
        const { data } = this.props
        
        this.props.onClick(data);
    }

    render () {
        const { data } = this.props
        
        return (
            <div className="deck-wrapper">
                <div className="deck-title">
                    <span
                        onClick={this.handleClick}
                    >
                        {data.name}
                    </span>
                </div>
            </div>
        )
    }
}
