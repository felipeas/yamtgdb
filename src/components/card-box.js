import React, { Component } from 'react';
import CardList from './card-list';
import CardSearch from './card-search';

export default class CardBox extends Component {
    constructor (props) {
        super(props);

        this.state = {search: [], cards: []}

        this.state.search = JSON.parse(localStorage.getItem('yamtgdb-search')) || [];
        this.state.cards = JSON.parse(localStorage.getItem('yamtgdb-cards')) || [];
    }

    componentDidUpdate () {
        localStorage.setItem('yamtgdb-search', JSON.stringify(this.state.search));
        localStorage.setItem('yamtgdb-cards', JSON.stringify(this.state.cards));
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
        this.setState({ 'cards': this.state.cards.filter((x) => x.id != card.id)});
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