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
        const { data, active } = this.props
        
        return (
            <li>
                <a
                    className={active ? 'label is-active is-black': 'label is-black'}
                    onClick={this.handleClick}
                >
                    {data.name}
                </a>
            </li>
        )
    }
}
