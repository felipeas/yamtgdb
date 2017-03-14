import React, { Component } from 'react';
import classnames from 'classnames'

export default class CardSearch extends Component {
    constructor (props) {
        super(props)

        this.state = {
            isFetching: false
        }
    }

    componentDidUpdate (nextProps, nextState) {
        // console.log(nextProps)
        // console.log(nextState)
    }    
    
    handleSubmit (e) {
        e.preventDefault()

        const searchTerm = e.target.search.value
        const url = `https://api.deckbrew.com/mtg/cards?name=${searchTerm}`

        this.setState({
                isFetching: true
            },
            () => {
                fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.props.onSubmit(data)
                    this.setState({isFetching: false})
                })
                .catch(err => console.error(url, err.toString()))
            }
        );
    }

    handleChange (e) {
        e.preventDefault();
        this.props.onChange({text: e.target.value});
    }

    updateSearch(data){
        // TODO: paginated searchs, api return lists by 100, 
        // if array lenght is > 100 then lookup for page 2, 3 and goes on
    }

    render () {
        const { isHiddenMobile } = this.props;

        const shouldBeSeenOnMobile = () => {
            return isHiddenMobile ? 'is-hidden-mobile' : ''
        }

        return (
            <form 
                onSubmit={this.handleSubmit.bind(this)}
                className={'container is-flex-desktop-only ' + shouldBeSeenOnMobile()}
            >
                <p className="control has-addons search-button is-one-third-desktop">
                    <input 
                        id="search"
                        autoFocus
                        className="input is-expanded" 
                        type="text" 
                        placeholder="search here"
                    />   
                    <a 
                        className={classnames('button',  this.state.isFetching ? 'is-loading is-dark is-disabled' : 'is-dark')}
                        onClick={this.handleSubmit.bind(this)}
                    >
                        search
                    </a>
                </p>
            </form>
        )
    }
}

