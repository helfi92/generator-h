import Partial from './partial.jsx';

export default class App extends React.Component {
  render () {
    return (
      <div>
        <p> Hello generator-h React!</p>
        <Partial/>
      </div>
    );
  }
}

render(<App/>, document.getElementById('app'));