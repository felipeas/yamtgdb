import React, { Component } from 'react';

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
        e.preventDefault();

        const searchTerm = e.target.search.value
        const url = `https://api.deckbrew.com/mtg/cards?name=${searchTerm}`;

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
                .catch(err => console.error(url, err.toString()));
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
        const { props } = this;
        return (
            <form className="search" onSubmit={this.handleSubmit.bind(this)}>
                <input
                    id="search"
                    type="text"
                    placeholder="search"
                    onChange={this.handleChange.bind(this)}
                />
                <label
                    style={this.state.isFetching ? {display:'block'} : {display: 'none' }}    
                >
                    fetching
                </label>
            </form>
        )
    }
}

