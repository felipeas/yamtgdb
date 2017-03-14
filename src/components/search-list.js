import React, { Component } from 'react'
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
        return (<h2 className="title is-4">{name}</h2>)
    }

    render () {
        const { data, name, grouped, className, isHiddenMobile } = this.props
        const { typeFilter, renderTitle } = this

        const shouldBeSeenOnMobile = () => {
            return isHiddenMobile ? 'is-hidden-mobile' : ''
        }

        const total = _.values(data.counter).reduce((soma, atual) => {
            return soma + atual
        }, 0)
        
        const cards = this.renderAll(data.list, data.counter)
        
        return (
            <div className={'is-one-third-desktop column ' + shouldBeSeenOnMobile()}>
                <div className='is-hidden-mobile'>
                    <h2 className="title is-4">search</h2>
                </div>
                {total > 0 ? (<span className='title is-5'>{total} found</span>) : 'nothing'}
                {cards}
            </div>
        )
    }
}
