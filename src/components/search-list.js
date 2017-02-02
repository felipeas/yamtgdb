import React, { Component } from 'react'
import classnames from 'classnames'
import Card from './card'
import _ from 'lodash'

export default class SearchList extends Component {
    constructor (props) {
        super(props)
        this.state = {}
    }

    componentWillReceiveProps(nextProps) {
        // console.log(`carlistReceiveProps: ${JSON.stringify(nextProps, null, 2)}`)
    }

    typeFilter(filter, card) {
        return card.types.indexOf(filter) != -1
    }

    renderAll(list) { 
        return list.map((item, index) => {  
            return (
                <Card 
                    key={item.id}
                    data={item}
                    onClick={this.props.onCardClick}
                    showCount={false}
                />
            )
        })
    }

    renderTitle(name) {
        return (<h2>{name}</h2>)
    }

    render () {
        const { data, name, grouped, className } = this.props
        const { typeFilter, renderTitle } = this

        const total = _.values(data.counter).reduce((soma, atual) => {
            return soma + atual
        }, 0)
        
        const cards = this.renderAll(data.list, data.counter)
        
        return (
            <div className={classnames('list', className)}>
                {renderTitle(name)}
                
                <div className='list-header'>
                    {total > 0 ? 
                        (<span className='list-header-total'>{total} found</span>) 
                    : (<span>nothing</span>)}
                </div>
                {cards}
            </div>
        )
    }
}
