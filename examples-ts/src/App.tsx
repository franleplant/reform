import * as React from 'react';
import AsyncForm from './AsyncForm'
import Form1 from './Form1'
import Form2 from './Form2'
import GettingStarted from './GettingStarted'
import Radios from './Radios'


const rowStyle = {
  display: 'flex',
  flexDirection: 'row' as any,
  marginBottom: 10,
}

const formContainerStyle = {
  border: '1px solid grey',
  padding: 10,
  flex: 1,
}



export default class App extends React.Component<{}, {}> {
  render() {
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
        <div style={rowStyle}>
          <div style={formContainerStyle}>
            <h3>With Radios!</h3>
            <Radios/>
          </div>
        </div>
        <div style={rowStyle}>
          <div style={formContainerStyle}>
            <h3>Async</h3>
            <AsyncForm/>
          </div>
        </div>
      </div>
    );
  }
}
