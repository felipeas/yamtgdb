import React, { Component } from 'react';

export default class Card extends Component {
    constructor (props) {
        super(props)
    }

    handleClick() {
        const card = this.props.data;
        this.props.onClick(card);
    }

    render () {
        const { data }= this.props;
        const showImage = this.props.showImage;
        
        //TODO:
        //svgeezus all the symbols in parsing
        return (
            <div className="card-wrapper" onClick={this.handleClick.bind(this)}>
                <div className="card-title">
                    <h3>{data.name}</h3>
                </div>
                <div className="card-text">
                    <span>{data.text? data.text : '[none]' }</span>
                </div>
                {showImage ? this.renderImage(data) : '' }
            </div>
        )
    }

    renderImage(data) {
        return (
            <div className="card-image">
                <img src={data.editions[0].image_url}/>
            </div>    
        )
    }
}
