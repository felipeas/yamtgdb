import React, { Component } from 'react';
import Card from './card';

export default class CardList extends Component {
    constructor (props) {
        super(props)
        this.state = {showImages: false}
    }

    componentWillReceiveProps(nextProps) {
        // console.log(`carlistReceiveProps: ${JSON.stringify(nextProps, null, 2)}`);
        console.log(nextProps);
    }

    handleCheckboxChange(e) {
        this.setState({showImages: e.target.checked});
    }

    render () {
        const { data, showCount } = this.props;
        const { showImages } = this.state;

        const total = data.length ? data.length : 0;

        const counted = data.reduce((counter, currCard) => {
            counter[currCard.id] = (counter[currCard.id] || 0) + 1;
            return counter;            
        },{});

        //TODO:
        //Legality
        //Mana curve
        //Price
        //Print
        
        const cards = Array.from(new Set(data))
            .map((card, index) => {  
                return (
                    <Card 
                        data={card}
                        key={index}
                        onClick={this.props.onCardClick}
                        showImage={showImages}
                        count={counted[card.id]}
                    />
                );
             });
            
        return (
            <div className='list'>
                <h2>list title</h2>
                <span>{`total: ${total}`}</span>
                <label className='list-check-images'>
                    <input
                        type='checkbox' 
                        onChange={this.handleCheckboxChange.bind(this)} 
                        checked={this.state.showImages} 
                    />
                    images
                </label>
                {cards} 
            </div>
        );
    }
}
