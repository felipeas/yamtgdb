import React, { Component } from 'react'
import { findDOMNode } from 'react-dom';
import classnames from 'classnames'
import Card from './card'
import _ from 'lodash'

const delay = 200;
let timer = 0;
let prevent = false;

export default class CardList extends Component {
    constructor (props) {
        super(props)
        this.state = {
            editing: false
        }

        this.toggleEdit = this.toggleEdit.bind(this)
        this.handleChangeTitle = this.handleChangeTitle.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.handleDoubleClick = this.handleDoubleClick.bind(this)
        this.handleBlur = this.handleBlur.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        // console.log(`carlistReceiveProps: ${JSON.stringify(nextProps, null, 2)}`)
    }

    componentDidUpdate(prevProps, prevState) {
        this.state.editing ? findDOMNode(this.refs.name).focus() : null
    }

    toggleEdit() {
        this.setState({editing: true})
    }
    
    handleChangeTitle(e) {
        if(e.charCode == 13){
            this.setState({editing: false})
            if(e.target.value != '' ) {
                this.props.onChangeTitle(e.target.value);
            }
        }
    }

    handleBlur() {
        this.setState({editing: false})
    }

//TODO: Move this shit to card Component
    handleDoubleClick (card, isSide) {
        clearTimeout(timer);
        prevent = true;
                    
        this.props.onCardDoubleClick(card, isSide)
    }

    handleClick (card) {        
        timer = setTimeout(() => {
            if (!prevent) {
                this.props.onCardClick(card)
            }
            
            prevent = false;
        }, delay);
    }

    typeFilter(filter, card) {
        return card.types.indexOf(filter) != -1
    }

    renderAll(list, counter) { 
        return this.renderGroup(null, list, counter)
    }

    renderGroup (title, list, counter) { 
        const { showImages, showText } = this.state
        const showCount = true

        let groupCounter = {}

        list.forEach(card => {
            groupCounter[card.id] = counter[card.id]
        })

        const total = _.values(groupCounter).reduce((soma, atual) => {
            return soma + atual
        }, 0)
 
        const cards = list.map((item, index) => {  
            return (
                <Card
                    key={item.id} 
                    data={item}
                    isSide={title == 'sideboard'}
                    onClick={this.handleClick}
                    onDoubleClick={this.handleDoubleClick}
                    onContextMenu={this.props.onCardContextMenu}
                    showImage={showImages}
                    showText={showText}
                    showCount={showCount}
                    count={counter[item.id]}
                />
            )
        })

        if (title) {
            return (
                <div className='list-header'>
                    <span className='list-header-subtotal'>{total}</span>
                    <span className='list-header-type'>{title}</span>
                    {cards}
                </div>
            )
        }

        return cards
    }

    renderTitle(self, name) {
        const title = name ? name : '<missingNO>'

        return (
            <h2
                key={name}
                onClick={self.toggleEdit}
            >
                {title}
            </h2>
        )
    }

    renderInput(self, name) {
         return (
            <div className='deck-name'>
                <input
                    ref='name' 
                    className='deck-name-input'
                    type="text"
                    placeholder={name}
                    onKeyPress={self.handleChangeTitle}
                    onBlur={self.handleBlur}
                />
            </div>
        )
    }

    render () {
        const { data, grouped, className } = this.props
        const { editing } = this.state
        const { typeFilter, renderInput, renderTitle } = this

        const totalMain = _.values(data.main.counter).reduce((soma, atual) => soma + atual, 0)
        const totalSide = _.values(data.side.counter).reduce((soma, atual) => soma + atual, 0)
        
        //TODO:
        //Legality / formats
        //Mana curve
        //Editions
        //Price / Ligamagic Price??
        //Print
            
        const lands = this.renderGroup(
            'lands',
            data.main.list.filter(card => typeFilter('land', card)),
            data.main.counter
        )

        const creatures = this.renderGroup(
            'creatures',
            data.main.list.filter(card => typeFilter('creature', card)),
            data.main.counter
        )

        const other = this.renderGroup(
            'spells',
            data.main.list.filter(card => !typeFilter('land', card) && !typeFilter('creature', card)),
            data.main.counter
        )

        const side = this.renderGroup(
            'sideboard',
            data.side.list,
            data.side.counter
        )

        const main = [ lands, creatures, other ]
    
        return (
            <div className={classnames('list', className)}>
                { editing ? renderInput(this, data.name) : renderTitle(this, data.name)}
                <div className='list-header'>
                    <span className='list-header-total'>{totalMain}</span>
                </div>
                {main}
                {side}
            </div>
        )
    }
}
