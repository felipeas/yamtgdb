import React, { Component } from 'react'
import ManaCost from './mana-cost'
import Tooltip from './tooltip'

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
        const { price } = this.state
        const { data, count } = this.props
        const { showCount } = this.props
        const showPrice = true
        //TODO:
        //show text
        //svgeezus all the symbols in parsing
        // tooltip, refactor
        return (

            <div 
                className='is-mobile is-gapless box'
                onClick={this.handleClick.bind(this)}
                onDoubleClick={this.handleDoubleClick.bind(this)}
                onContextMenu={this.handleContextMenu.bind(this)}
            >
                <Tooltip
                    element={this.renderImage(data)}
                    place='top'
                    className='columns is-mobile'
                >
                    <div className='column is-1'>
                        {showCount ? count : '' }
                    </div>
                    <div className='column is-three-quarters'>
                        {data.name}
                    </div>
                    <div className='column is-one-quarter'>
                        {showPrice ? <p className='is warming'>{price}</p> : '' }
                    </div>
                </Tooltip>                
            </div>
        )
    }

    renderImage(data) {
        const imagem = data.editions[0].image_url;
        //Get random art, for fun purpouses
        //const imagem = data.editions[Math.floor(Math.random() * data.editions.length)].image_url;
        debugger
        return (
            <div>
                <img src={imagem}/>
            </div>    
        )
    }

    renderName(name) {
        return (
            <span>{name}</span> 
        )
    }
    
    renderPrice(data) {
        const { isFetching, price } = this.state

        return (
            <div className="card-price">
                {isFetching ? '...' : price }            
            </div>   
        )
    }
}
