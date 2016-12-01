import React, { Component } from 'react'
import classnames from 'classnames'
import Card from './card'
import _ from 'lodash'

export default class CardList extends Component {
    constructor (props) {
        super(props)
        this.state = {
            editing: false
        }

        this.toggleEdit = this.toggleEdit.bind(this)
        this.handleChangeTitle = this.handleChangeTitle.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        // console.log(`carlistReceiveProps: ${JSON.stringify(nextProps, null, 2)}`)
    }

    toggleEdit() {
        this.setState({editing: true})
    }
    
    handleChangeTitle(e) {
        if(e.charCode == 13){
            this.setState({editing: false})
            
            this.props.onChangeTitle(e.target.value);
        }
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
                    onClick={this.props.onCardClick}
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
        const title = name ? name : '<missingno>'

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
                    className='deck-name-input'
                    type="text"
                    placeholder={name}
                    onKeyPress={self.handleChangeTitle}
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
        //Price
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
