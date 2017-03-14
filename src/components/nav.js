import React, { Component, PropTypes } from 'react';

export default class Nav extends Component {
    constructor (props) {
        super(props)

        this.handleNavigate = this.handleNavigate.bind(this)
    }

    handleNavigate (e) {
        const nav = e.target.id

        this.props.onSection(nav)
    }

    render() {
        const { deck } = this.props

        const active = nav => {
            return nav == this.props.active ? 'is-active' : ''
        }

        return (
            <nav className='nav is-flex-desktop-only'>
                <div className='nav-left'>
                    <a className="nav-item title is-3">yamtgdb</a>
                </div>
                <div className='nav-center'>
                    <a
                        id='search'
                        className={"nav-item is-tab is-hidden-desktop " + active('search')}
                        onClick={this.handleNavigate}
                    >
                        search
                    </a>
                    <a
                        id='deck'
                        className={"nav-item is-tab is-hidden-desktop " + active('deck')}
                        onClick={this.handleNavigate}
                    >
                        {`${deck.name} (${deck.count})`} 
                    </a>
                    <a
                        id='list'
                        className={"nav-item is-tab is-hidden-desktop " + active('list')}
                        onClick={this.handleNavigate}
                    >
                        decks
                    </a>
                </div>
            </nav>
        )
    }
}