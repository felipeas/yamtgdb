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
        const { data } = this.props;
        const { showImages } = this.state ;

        const cards = data.map((card, index) => {
            return (
                <Card 
                    data={card}
                    key={index}
                    onClick={this.props.onCardClick}
                    showImage={showImages}
                />);
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
