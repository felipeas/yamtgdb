import React, { Component } from 'react';

export default class Card extends Component {
    constructor (props) {
        super(props)
    }

    render () {
        const { data }= this.props;
        //TODO:
        //parse svg icons
        //images
        return (
            <div className="card-wrapper">
                <div className="card-title">
                    <h3>{data.name}</h3>
                </div>
                <div className="card-text">
                    <span>{data.text}</span>
                </div>
                <div className="card-image">
                    <img src={data.editions[0].image_url}/>
                </div>
            </div>
        )
    }
}
