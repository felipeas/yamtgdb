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
    
        const total = data.length ? data.length : 0
        
        // const final = {};
        const final = data.reduce((grouped, currCard) => {
            console.log(grouped)
            
            grouped[currCard.id] = grouped[currCard.id] ? grouped[currCard.id] : {count : 0, card: currCard}
            grouped[currCard.id].count +=  + 1
            
            return grouped
        },{})

        const grouped = _.values(final)
        
        const showCount = total != grouped.length
        //TODO:
        //Legality
        //Mana curve
        //Editions
        //Price
        //Print

        const cards = grouped
            .map((item, index) => {  
                return (
                    <Card 
                        data={item.card}
                        key={index}
                        onClick={this.props.onCardClick}
                        showImage={showImages}
                        showText={showText}
                        showCount={showCount}
                        count={item.count}
                    />
                );
             });
    
        return (
            <div className='list'>
                <h2>{title}</h2>
                <span>{`total: ${total}`}</span>
                <label className='list-check-images'>
                    <input
                        type='checkbox' 
                        onChange={this.handleShowImagesChange.bind(this)} 
                        checked={this.state.showImages} 
                    />
                    images
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
