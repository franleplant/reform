import React, { Component } from 'react';
import Form1 from './Form1'
import Form2 from './Form2'
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
    console.log(this.state)
    return (
      <div style={{maxWidth: '800px', marginRight: 'auto', marginLeft: 'auto'}}>
        <div style={rowStyle}>
          <div style={formContainerStyle}>
            <h3>Getting Started</h3>
            <GettingStarted/>
          </div>
        </div>
        <div style={rowStyle}>
          <div style={formContainerStyle}>
            <h3>validate onChange</h3>
            <Form1/>
          </div>
        </div>
        <div style={rowStyle}>
          <div style={formContainerStyle}>
            <h3>validate onSubmit</h3>
            <Form2/>
          </div>
        </div>
      </div>
    );
  }
}
