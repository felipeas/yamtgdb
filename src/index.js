import React from 'react';
import ReactDOM from 'react-dom';
import CardBox from './components/card-box';
import { Provider } from 'react-redux';
import configureStore from './stores'

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <CardBox/>
    </Provider>,
    document.getElementById('root')
);
