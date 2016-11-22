import React, { Component } from 'react';
import Card from './card';
import _ from 'lodash';

export default class CardList extends Component {
    constructor (props) {
        super(props)
        this.state = {
            showImages: false,
            editingTitle: false
        }

        this.handleClickTitle = this.handleClickTitle.bind(this)
        this.handleEditTitle = this.handleEditTitle.bind(this)
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

    handleClickTitle(e) {
        this.setState({editingTitle: true});
    }

    handleEditTitle(e) {
        this.setState({editingTitle: false});
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

    renderTitle(self, name) {
        return (
            <h2
                onClick={self.handleClickTitle()}
            >
                {name}
            </h2>
        )
    }

    renderInput(self, name) {
         return (
            <input
                type="text"
                placeholder={name}
                onClick={self.handleEditTitle()}
            />
        )
    }

    render () {
        const { data, name, grouped } = this.props
        const { editingTitle } = this.state
        const { typeFilter, renderInput, renderTitle } = this

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

        if (!grouped) {
            cards = this.renderAll(data.list, data.counter)
        } else {
            const lands = this.renderGroup(
                'lands',
                data.list.filter(card => typeFilter('land', card)),
                data.counter
            )

            const creatures = this.renderGroup(
                'creatures',
                data.list.filter(card => typeFilter('creature', card)),
                data.counter
            )

            const other = this.renderGroup(
                'other',
                data.list.filter(card => !typeFilter('land', card) && !typeFilter('creature', card)),
                data.counter
            )

            cards = [ lands, creatures, other ]
        }

        return (
            <div className='list'>
                {editingTitle ? renderInput(this, name) : renderTitle(this, name)}
                
                <div className='list-header'>
                    <span className='list-header-total'>{total}</span>
                </div>
                {cards}
            </div>
        );
    }
}
