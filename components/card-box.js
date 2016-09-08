import React, { Component } from 'react';
import { connect } from 'react-redux'
import CardList from './card-list';
import CardSearch from './card-search';
import { addCard, searchCards } from '../actions/app';
import { bindActionCreators } from 'redux';

export default class CardBox extends Component {
    constructor (props) {
        super(props);
        this.state = {search: [], cards: []}
    }

    handleOnSearchChange (search) {
        // console.log(search);
    }   

    updateSearch(data){
        //TODO: save searchs in localStorage
        //TODO: paginated searchs, api return lists by 100, 
        // if array lenght is > 100 then lookup for page 2, 3 and goes on
        this.setState({ 'search': data });
    }

    handleOnSearchSubmit (search) {
        const url = `https://api.deckbrew.com/mtg/cards?name=${search.text}`;
        fetch(url)
            .then(response => response.json())
            .then(data => this.updateSearch(data))
            .catch(err => console.error(url, err.toString()));
    }

    render () {
        return (
            <div id='cardbox'>
                <h1>card box</h1>
                <CardSearch 
                    onChange={this.handleOnSearchChange.bind(this)}
                    onSubmit={this.handleOnSearchSubmit.bind(this)}
                />

                <section id='lists'>
                    <CardList 
                        data={this.state.search} 
                    />
                </section>
            </div>
        )
    }
}