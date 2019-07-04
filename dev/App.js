import React, { Component } from 'react';
import { Widget } from '../index_for_react_app';

export default class App extends Component {

  render() {
    return (
      <Widget
        socketUrl='<ws://YOUR ARTICULATE SERVER URL:7500>'
        socketPath='/agent/<YOUR AGENT ID>/converse'
        converseUrl='<http://YOUR ARTICULATE SERVER URL:7500>/agent/<YOUR AGENT ID>/converse'
        title='Pizza Bot'
        subtitle='Let me prepare your pizza'
        senderPlaceHolder='Type a message...'
        titleAvatar='https://static.thenounproject.com/png/815603-200.png'
        profileAvatar='https://static.thenounproject.com/png/815603-200.png'
      />
    );
  }
}
