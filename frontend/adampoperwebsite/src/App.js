import './App.css';
import Home from './components/Home.js';
import Projects from './components/Projects.js';
import Photography from './components/Photography.js';
import Footer from './components/Footer.js';
import DatabaseManager from './components/DataBasemanager.js';
import AboutMe from './components/AboutMe.js';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/Projects" component={Projects} />
          <Route path="/Photography" component={Photography}/>
          <Route path="/DatabaseManagement" component={DatabaseManager}/>
          <Route path="/AboutMe" component={AboutMe}/>
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
