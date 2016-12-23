import React, { Component } from 'react';
import Form1 from './Form1'

export default class App extends Component {
  render() {
    console.log(this.state)
    return (
      <div style={{ display: 'flex'}}>
        <div style={{
          border: '1px solid grey',
          padding: 10,
          flex: 1,
          marginRight: 10,
        }}>
          <h3>Validate onChange</h3>
          <Form1/>
        </div>
        <div style={{
          border: '1px solid grey',
          padding: 10,
          flex: 1,
        }}>
          <h3>Validate onSubmit</h3>
        </div>
      </div>
    );
  }
}
