import React from 'react';
import 'babel-polyfill'
import { render } from 'react-dom';
import 'fetch-ie8'
import 'normalize.css'
import App from './Container/App'


const elem = document.getElementById("root");
render(
    <App/>,
    elem
)