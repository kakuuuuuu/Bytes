import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
  Navbar,
  NavItem
} from 'react-materialize'
import {
  Route,
  Redirect
} from 'react-router-dom'
import Home from './Home'
import Login from './auth/Login'
import Registration from './auth/Registration'
import Dashboard from './dashboard/Dashboard'
import LanguageDetails from './language/LanguageDetails'
import ProjectDetails from './project/ProjectDetails'
import Error from './error'
import { logoutUser } from '../actions'
import '../app.css'

class App extends Component {
  render() {
    return (
      <div>
        <Navbar className='blue-grey darken-3' brand='Bytes' right>
          <NavItem onClick={() => {
            this.props.user.authenticated === false
            ? this.props.history.push('/')
            : this.props.history.push('/dashboard')
          }}>
            {this.props.user.authenticated === false
            ? "Home"
            : "Dashboard"}
          </NavItem>
          {this.props.user.authenticated === false
            ? <NavItem onClick={() => this.props.history.push('/login')}>Login</NavItem>
            : <NavItem onClick={() => this.props.logout()} >Logout</NavItem>

          }
        </Navbar>
        <div className='background'>
          <Route exact path="/" render={(props) => (
            this.props.user.authenticated === false
            ? <Home {...props}/>
            : <Redirect to={{pathname:"/dashboard"}} />
          ) } />
          <Route path="/login" render={(props) => (
            this.props.user.authenticated === false
            ? <Login {...props} />
            : <Redirect to={{pathname:"/dashboard"}} />
          ) } />
          <Route path="/register" render={(props) => (
            this.props.user.authenticated === false
            ? <Registration {...props} />
            : <Redirect to={{pathname:"/dashboard"}} />
          ) } />
          <Route path="/dashboard" render={() => (
            this.props.user.authenticated === true
            ? <Dashboard />
            : <Redirect to={{pathname:"/"}} />
          ) } />
          <Route path="/language/:id" render={(props) => (
            this.props.user.authenticated === true
            ? <LanguageDetails {...props} />
            : <Redirect to={{pathname:"/"}} />
          ) } />
          <Route path="/project/:id" render={(props) => (
            this.props.user.authenticated === true
            ? <ProjectDetails {...props} />
            : <Redirect to={{pathname:"/"}} />
          ) } />
          <Route path="/error" component={Error} />
        </div>
      </div>
    );
  }
}

function mapStateToProps ({user}) {
  return {
    user
  }
}
function mapDispatchToProps (dispatch) {
  return {
    logout: () => dispatch(logoutUser())
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps)(App)
