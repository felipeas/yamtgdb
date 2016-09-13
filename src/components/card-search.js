import React, { Component } from 'react';

export default class CardSearch extends Component {
    constructor (props) {
        super(props)
    }
    
    handleSubmit (e) {
        e.preventDefault();
        const searchTerm = e.target.search.value

        const url = `https://api.deckbrew.com/mtg/cards?name=${searchTerm}`;
        fetch(url)
            .then(response => response.json())
            .then(data => this.props.onSubmit(data))
            .catch(err => console.error(url, err.toString()));
    }

    handleChange (e) {
        e.preventDefault();
        this.props.onChange({text: e.target.value});
    }

    updateSearch(data){
        //TODO: save searchs in localStorage
        //TODO: paginated searchs, api return lists by 100, 
        // if array lenght is > 100 then lookup for page 2, 3 and goes on
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

