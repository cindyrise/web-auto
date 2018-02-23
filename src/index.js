import React from 'react';
import {hydrate,render} from 'react-dom';
import createHistory from 'history/createBrowserHistory'
import Loadable from 'react-loadable';
import app from './app/index.js';
const initialState =window && window.__INITIAL_STATE__;
let history=createHistory()
let {configureStore,createApp}=app;
let store=configureStore(initialState)

const renderApp=()=>{
  let application=createApp({store,history});
  if(process.env.NODE_ENV==='production'){
    hydrate(application,document.getElementById('root'));
  }else{
    render(application,document.getElementById('root'));
  }
}

window.main = () => {
  Loadable.preloadReady().then(() => {
    renderApp()
  });
};


if(process.env.NODE_ENV==='development'){
  if(module.hot){
    module.hot.accept('./store/reducers/index.js',()=>{
      let newReducer=require('./store/reducers/index.js');
      store.replaceReducer(newReducer)
    })
    module.hot.accept('./app/index.js',()=>{
      let {createApp}=require('./app/index.js');
      let newReducer=require('./store/reducers/index.js');
      store.replaceReducer(newReducer)
      let application=createApp({store,history});
      hydrate(application,document.getElementById('root'));
    })
  }
}



