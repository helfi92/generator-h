import React from 'react';
import { render } from 'react-dom';
import Partial from './partial.jsx';
import baybridge from './img/bay-bridge.png';

export default class App extends React.Component {
  render () {
    return (
      <div>
        <p> Hello generator-h React!</p>
        <img src={baybridge} />
        <Partial/>
      </div>
    );
  }
}

render(<App/>, document.getElementById('app'));