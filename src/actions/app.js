export const APP_SEARCH = 'APP_SEARCH';
export const APP_ADD_CARD = 'APP_ADD_CARD';
// export const APP_SEARCH_CLEAR = 'APP_SEARCH_CLEAR';
// export const APP_CARD_LIST_CLEAR = 'APP_CARD_LIST_CLEAR';

export function searchCards(results) {
    // debugger;
    return {
        type: APP_SEARCH,
        results
    };
}

export function addCard(card) {
    return {
        type: APP_ADD_CARD,
        card
    };
}

