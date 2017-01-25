import React, { Component } from 'react'
import ManaCost from './mana-cost'
import Tooltip from './tooltip'

export default class Card extends Component {
    constructor (props) {
        super(props)
    }

    handleClick() {
        const card = this.props.data
        const isSide = this.props.isSide

        this.props.onClick(card, isSide)
    }

    handleDoubleClick() {
        const card = this.props.data
        const isSide = this.props.isSide

        if (this.props.onDoubleClick){
            this.props.onDoubleClick(card, isSide)
        }
    }

    handleContextMenu(e) {
        e.preventDefault()
        const card = this.props.data
        const isSide = this.props.isSide

        this.props.onContextMenu(card, isSide)
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
                    onContextMenu={this.handleContextMenu.bind(this)}
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
        const imagem = data.editions[0].image_url;
        //Get random art, for fun purpouses
        //const imagem = data.editions[Math.floor(Math.random() * data.editions.length)].image_url;
        debugger
        return (
            <div className="card-image">
                <img src={imagem}/>
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
