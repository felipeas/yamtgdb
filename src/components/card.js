import React, { Component } from 'react'
import ManaCost from './mana-cost'
import Tooltip from './tooltip'

export default class Card extends Component {
    constructor (props) {
        super(props)
    }

    handleClick() {
        const card = this.props.data
        this.props.onClick(card)
    }

    handleDoubleClick() {
        const card = this.props.data
        this.props.onDoubleClick(card)
    }

    render () {
        const { data, count }= this.props
        const { showImage, showText, showCount }  = this.props
        
        //TODO:
        //svgeezus all the symbols in parsing
        return (
            <Tooltip
                element={this.renderImage(data)}
                place='top'
            >
                <div 
                    className="card-wrapper" 
                    onClick={this.handleClick.bind(this)}
                    onDoubleClick={this.handleDoubleClick.bind(this)}
                >
                    <div className="card-title">
                        <span>{data.name}</span>
                    </div>
        
                    {showCount ? this.renderCount(count) : '' }
                    {showText ? this.renderText(data) : '' }
                    {showImage ? this.renderImage(data) : '' }
                </div>
            </Tooltip>
        )
    }

    renderImage(data) {
        return (
            <div className="card-image">
                <img src={data.editions[0].image_url}/>
            </div>    
        )
    }

    renderText(data) {
        return (
            <div className="card-text">
                <span>{data.text? data.text : '[none]' }</span>
                <ManaCost 
                    data={data.cost}
                />
            </div>    
        )
    }

    renderCount(data) {
        return (
            <div className="card-count">
                <span>{data}</span>
            </div>   
        )
    }
}
