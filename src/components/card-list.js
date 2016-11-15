import React, { Component } from 'react';
import Card from './card';
import _ from 'lodash';

export default class CardList extends Component {
    constructor (props) {
        super(props)
        this.state = {showImages: false}
    }

    componentWillReceiveProps(nextProps) {
        // console.log(`carlistReceiveProps: ${JSON.stringify(nextProps, null, 2)}`);
    }

    handleShowImagesChange(e) {
        this.setState({showImages: e.target.checked});
    }

    handleShowTextChange(e) {
        this.setState({showText: e.target.checked});
    }

    typeFilter(filter, card) {
        return card.types.indexOf(filter) != -1
    }

    renderAll(list, counter) { 
        return this.renderGroup(null, list, counter)
    }

    renderGroup (title, list, counter) { 
        const { showImages, showText } = this.state
        const showCount = true

        let betterCounter = {}
        list.forEach(card => {
            betterCounter[card.id] = counter[card.id]
        })

        const total = _.values(betterCounter).reduce((soma, atual) => {
            return soma + atual
        }, 0)
 
        const cards = list.map((item, index) => {  
            return (
                <Card 
                    data={item}
                    key={index}
                    onClick={this.props.onCardClick}
                    showImage={showImages}
                    showText={showText}
                    showCount={showCount}
                    count={counter[item.id]}
                />
            );
        });

        if (title) {
            return (
                <div className='list-header'>
                    <span className='list-header-subtotal'>{total}</span>
                    <span className='list-header-type'>{title}</span>
                    {cards}
                </div>
            )
        }
        return cards
    }

    render () {
        const { data, name, grouped } = this.props

        const { typeFilter } = this

        const total = _.values(data.counter).reduce((soma, atual) => {
            return soma + atual
        }, 0)
        
        //TODO:
        //Legality / formats
        //Mana curve
        //Editions
        //Price
        //Print
        
        let cards = []
        let creatures = []
        let lands = []
        let other = []

        if (!grouped) {
            cards = this.renderAll(data.list, data.counter)
        } else {
            lands = this.renderGroup(
                'lands',
                data.list.filter(card => typeFilter('land', card)),
                data.counter
            )

            creatures = this.renderGroup(
                'creatures',
                data.list.filter(card => typeFilter('creature', card)),
                data.counter
            )
        }

        return (
            <div className='list'>
                <h2>{name}</h2>
                <div className='list-header'>
                    <span className='list-header-total'>{total}</span>
                </div>
                {cards}
                {creatures}
                {lands}
                {other}
            </div>
        );
    }
}
