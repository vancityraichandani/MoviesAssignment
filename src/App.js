import { useState } from 'react';
import './App.css';
import Login from './Components/Login';
import Moviepage from './Components/Moviepage';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function App() {
  // storedMode = localStorage.getItem(mode);
  // console.log(storedMode);
  let [mode, setMode] = useState('light');
  let [storedMode, setStoredMode] = useState('')
  let toggleMode = () => {
    if (mode === 'light') {
      console.log('dark set');
      setMode('dark');
      localStorage.setItem('mode', 'dark')
    } else {
      console.log('light set');
      setMode('light');
      localStorage.setItem('mode', 'light')
    }
  }
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/moviepage" >
            <Moviepage toggleMode={toggleMode} setMode={setMode} mode={mode} />
          </Route>
          <Route exact path="/">
            <Login mode={mode} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
