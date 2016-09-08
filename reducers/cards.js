import { APP_ADD_CARD, APP_SEARCH } from '../actions/app';

const initialState = {
    list: [],
    search: []
};

export default function(state = initialState, action) {
    switch (action.type) {
        case APP_ADD_CARD:
            // debugger;
            state.list.push(action.card);
        case APP_SEARCH:
            // debugger;   
            state.search = action.results;
        default:
            return state;
    }
}
