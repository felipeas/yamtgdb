import React, { Component } from 'react'
import ManaCost from './mana-cost'
import Tooltip from './tooltip'
import { liga } from '../modules/price'


export default class Card extends Component {
    constructor (props) {
        super(props)

        this.state = {
            isFetching: false,
            price: 0
        } 
    }

    componentDidMount () {
        const card = this.props.data
        let url = `http://localhost:3000/price?card=${card.name}`
        url = `https://liga-price-crawler-nxwxrqpgds.now.sh/price?card=${card.name}`
        
        //if (process.env.NODE_ENV == 'production') {
        //    url = `https://liga-price-crawler-nxwxrqpgds.now.sh/price?card=${card.name}`
        //}
    
        this.setState({
                isFetching: true
            },
            () => {
                fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        isFetching: false,
                        price: data.Low
                    })
                })
                .catch(err => console.error(url, err.toString()))
            }
        );
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
        const { price } = this.state;
        const { data, count } = this.props
        const { showImage, showText, showCount } = this.props
        
        const showPrice = true;
        //TODO:
        //show text
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
                    {showPrice ? this.renderPrice(price) : '' }
                </div>
            </Tooltip>
        )
    }

    renderImage(data) {
        const imagem = data.editions[0].image_url;
        //Get random art, for fun purpouses
        //const imagem = data.editions[Math.floor(Math.random() * data.editions.length)].image_url;
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
    
    renderPrice(data) {
        const { isFetching, price } = this.state

        return (
            <div className="card-price">
                <span>{isFetching ? '...' : price }</span>
            </div>   
        )
    }
}
