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

    render () {
        const { data, title } = this.props

        const { showImages, showText } = this.state

        // const grouped = _.groupBy(data.list, 'id')
        
        // const showCount = total != grouped.length
        const showCount = true

        // const total = data.counter.reduce((sum, card) => {
        //     console.log(sum)
        //     data.counter[card.id] = data.counter[card.id] ? data.counter[card.id] : 0
        //     return sum += data.counter[card.id]
        // }, 0)
        // const total = 666;
debugger
        const total = _.values(data.counter).reduce((soma, atual) => {
            return soma + atual
        }, 0)
        //TODO:
        //Legality
        //Mana curve
        //Editions
        //Price
        //Print

        const cards = data.list
            .map((item, index) => {  
                return (
                    <Card 
                        data={item}
                        key={index}
                        onClick={this.props.onCardClick}
                        showImage={showImages}
                        showText={showText}
                        showCount={showCount}
                        count={data.counter[item.id]}
                    />
                );
             });
    
        return (
            <div className='list'>
                <h2>{title}</h2>
                <span>{`total: ${total}`}</span>
                <label className='list-check-image'>
                    <input
                        type='checkbox' 
                        onChange={this.handleShowImagesChange.bind(this)} 
                        checked={this.state.showImages} 
                    />
                    image
                </label>

                <label className='list-check-text'>
                    <input
                        type='checkbox' 
                        onChange={this.handleShowTextChange.bind(this)} 
                        checked={this.state.showText} 
                    />
                    text
                </label>

                {cards} 
            </div>
        );
    }
}
