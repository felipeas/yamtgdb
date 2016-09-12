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
        
        // const cardstemp = ['fog', 'doom-blade', 'ponder', 'fog', 'ponder', 'nip-gwyllion'];
        const countedList = data.reduce((counter, currCard) => {
            counter[currCard.id] = (counter[currCard.id] || 0) + 1;
            return counter;            
        },{});

        // console.log(countedList);

        const cards = data.map((card, index) => {  
            return (
                <Card 
                    data={card}
                    key={index}
                    onClick={this.props.onCardClick}
                    showImage={showImages}
                    count={countedList[card.id]}
                />
            );
        });
            
        return (
            <div className='list'>
                <h2>list</h2>
                <input 
                    type='checkbox' 
                    onChange={this.handleCheckboxChange.bind(this)} 
                    checked={this.state.showImages} 
                />
                {cards} 
            </div>
        );
    }
}
