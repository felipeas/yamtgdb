import React, { Component } from 'react';

export default class CardSearch extends Component {
    constructor (props) {
        super(props)
    }
    
    handleSubmit (e) {
        e.preventDefault();
        this.props.onSubmit({text: e.target.search.value});
    }

    handleChange (e) {
        e.preventDefault();
        this.props.onChange({text: e.target.value});
    }

    render () {
        const { props } = this;
        return (
            <form className="search" onSubmit={this.handleSubmit.bind(this)}>
                <h2>search</h2>
                <input
                    id="search"
                    type="text"
                    placeholder="search"
                    onChange={this.handleChange.bind(this)}
                />
            </form>
        )
    }
}

