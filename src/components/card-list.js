import React, { Component } from 'react';
import Card from './card';

export default class CardList extends Component {
    constructor (props) {
        super(props)
    }

    componentWillReceiveProps(nextProps) {
        // console.log(`carlistReceiveProps: ${JSON.stringify(nextProps, null, 2)}`);
        console.log(nextProps);
    }

    render () {
        //TODO: User remarakble
        const { data } = this.props;

        const cards = data.map((card, index) => {
            return (
                <Card 
                    name={card.name} 
                    text={card.text} 
                    key={index}
                />);
            });

        return (
            <div className="list">
                <h2>list</h2>
                {cards} 
            </div>
        );
    }
}
