import React, { Component } from 'react'
import {
  Row,
  Button
} from 'react-materialize'
import { CSSTransition } from 'react-transition-group'

class Home extends Component {

  state = {
    showHome: false,
  }
  componentDidMount(){
    this.setState({ showHome: true })
  }
  render() {
    const { showHome } = this.state
    return(
      <CSSTransition
        in={showHome}
        timeout={900}
        classNames="fade"
        unmountOnExit
      >
        <Row id='home' className='fade'>
          <h3 className='title'>Push your progress, one byte at a time.</h3>
          <Button className='blue-grey darken-3' onClick={() => this.props.history.push('/register')}>Get Started</Button>
        </Row>
      </CSSTransition>
    )
  }
}

export default Home
