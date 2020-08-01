import React, { Component } from 'react';
import AddressBook from './Components/AddressBook';
import AddContactForm from './Components/AddContactForm';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './css/sass/App.scss';
import UpdateContactForm from './Components/UpdateContactForm';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className='App'>
          <Router>
            <nav>
              <div id='address-book-header'>
                <Link to='/'>Address Book</Link>
                <Link to='/addcontact'>Add contact</Link>
              </div>
            </nav>

            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Switch>
              <Route path='/addcontact'>
                <AddContactForm />
              </Route>
              <Route path='/updatecontact'>
                <UpdateContactForm />
              </Route>
              <Route path='/'>
                <AddressBook />
              </Route>
            </Switch>
          </Router>
        </div>
      </Provider>
    );
  }
}

export default App;
