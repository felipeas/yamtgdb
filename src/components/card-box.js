import React, { Component } from 'react';
import CardList from './card-list';
import CardSearch from './card-search';

export default class CardBox extends Component {
    constructor (props) {
        super(props);
        this.state = {search: [], cards: []}
    }

    handleOnSearchChange (search) {
        // console.log(search);
    }   

    handleOnSearchResultClick(card) {
        const cards = this.state.cards;
        //TODO: instead of adding card put a counter on duplicates
        cards.push(card);
        this.setState({ 'cards': cards });
    }

    handleOnListClick(card) {
        const cards = this.state.cards.filter((x) => {x.id != card.id});
        this.setState({ 'cards': cards });
    }

    handleOnSearchSubmit (search) {
        this.setState({ 'search': search });
    }

    render () {
        return (
            <div id='cardbox'>
                <h1>yamtgdb</h1>
                <CardSearch 
                    onChange={this.handleOnSearchChange.bind(this)}
                    onSubmit={this.handleOnSearchSubmit.bind(this)}
                />
                <section className='lists'>
                    <CardList id='search-list'
                        data={this.state.search} 
                        onCardClick={this.handleOnSearchResultClick.bind(this)}
                    />
                    <CardList id='card-list'
                        data={this.state.cards}
                        onCardClick={this.handleOnListClick.bind(this)}
                    />
                </section>
            </div>
        )
    }
}