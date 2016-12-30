import React from 'react';
import { render } from 'react-dom';
import Partial from './partial.jsx';
import baybridge from './img/bay-bridge.png';
import './style/globalStyle.css';

export default class App extends React.Component {
  render () {
    return (
      <div>
        <p> Hello generator-h React!</p>
        <div><img className="bay-bridge" src={baybridge} /></div>
        <Partial/>
      </div>
    );
  }
}

render(<App/>, document.getElementById('app'));
