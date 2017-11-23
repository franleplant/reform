import React, { Component } from 'react';
import GettingStarted from './GettingStarted'


const rowStyle = {
  display: 'flex',
  flexDirection: 'row',
  marginBottom: 10,
}

const formContainerStyle = {
  border: '1px solid grey',
  padding: 10,
  flex: 1,
}



export default class App extends Component {
  render() {
    return (
      <div style={{maxWidth: '800px', marginRight: 'auto', marginLeft: 'auto'}}>
        <div style={rowStyle}>
          <div style={formContainerStyle}>
            <h3>Getting Started</h3>
            <GettingStarted/>
          </div>
        </div>
      </div>
    );
  }
}
