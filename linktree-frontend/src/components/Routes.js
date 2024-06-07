import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import SignUp from './components/SignUp';
import Links from './components/Links';
import Account from './components/Account';

const App = () => {
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    setUser(null);
  };

  const handleLogin = (userData) => {
    setUser(userData);
  };

  return (
    <Router>
      <Navbar user={user} onLogout={handleLogout} />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" render={(props) => <SignUp {...props} onSignupSuccess={handleLogin} />} />
        <Route path="/links" component={Links} />
        <Route path="/account" render={(props) => <Account {...props} user={user} />} />
      </Switch>
    </Router>
  );
};

export default App;
