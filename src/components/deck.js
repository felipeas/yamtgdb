import React, { Component } from 'react'
import classnames from 'classnames'

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
        const { data, className } = this.props
        
        return (
            <div className={classnames('deck-wrapper', className)}>
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
