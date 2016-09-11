import '../node_modules/bootstrap/dist/css/bootstrap.css';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './examples/App';
import Login from './examples/Login';
import LoginNative from './examples/LoginNative';
import RBLogin from './examples/RBLogin';


class Examples extends React.Component {
  render() {
    return (
      <div>
        <h1>Reform Examples</h1>
        <p></p>
        <div>
          <h2>Login example that always displays the errors</h2>
          <Login />
        </div>

        <div>
          <h2>Login example that displays errors (if any) on submit</h2>
          <LoginNative />
        </div>

        <div>
          <h2>React Bootstrap integration</h2>
          <RBLogin />
        </div>

        <div>
          <App />
        </div>

      </div>
    );
  }
}

ReactDOM.render(
  <Examples />,
  document.getElementById('root')
);
