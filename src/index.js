import React from 'react';
import {render} from 'react-dom';
import App from './App';
import {compose, createStore, applyMiddleware} from "redux"
import {Provider} from "react-redux";
import thunk from "redux-thunk"
import saga from "redux-saga"
import {rootReducer} from "./redux/rootReducer";
import rootSaga from '../src/saga/saga'

const sagaMiddleware = saga()
const store = createStore(rootReducer, compose(
    applyMiddleware(thunk,sagaMiddleware),
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))
sagaMiddleware.run(rootSaga)

const app = (
    <Provider store={store}>
        <App/>
    </Provider>
)

render(app, document.getElementById('root')
);