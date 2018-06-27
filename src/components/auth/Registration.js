import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Row,
  Col,
  Input,
  Button,
} from 'react-materialize'
import { CSSTransition } from 'react-transition-group';
import { registerUser } from '../../actions'
import ReactLoading from 'react-loading';


class Registration extends Component {

  state = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm: '',
    loading: false,
    error: false,
    errorMsg: '',
    showContent: false,
  }

  componentDidMount(){
    this.setState({ showContent: true })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      loading: true,
      error: false,
      errorMsg: ''
    })
    const { first_name, last_name, email, password, confirm } = this.state
    if(email.length > 0 && password.length > 0) {
      const data = {
        first_name,
        last_name,
        email,
        password,
        confirm
      }
      this.props.register(data).then(result => {
        console.log(result)
        if(result.status === true){
          this.props.history.push('/dashboard')
        }else {
          this.setState({
            error: true,
            errorMsg: result.msg,
            password: '',
            confirm: '',
            loading: false
          })
        }
      })
    }
  }

  render() {
    const { first_name, last_name, email, password, confirm, loading, error, errorMsg, showContent } = this.state
    return (
      <CSSTransition
        in={showContent}
        timeout={900}
        classNames="fade"
        unmountOnExit
      >
        <Row className='fade'>
          <form s={12} onSubmit={this.handleSubmit}>
            <Row>
              <Col className="register" s={10} offset="s1">
                <h4 className="title">Register</h4>
                <Input value={first_name} name="first_name" s={6} label="First Name" onChange={this.handleChange}/>
                <Input value={last_name} name="last_name" s={6} label="Last Name" onChange={this.handleChange}/>
                <Input value={email} name="email" type="email" label="Email" s={12} onChange={this.handleChange}/>
                <Input value={password} name="password" type="password" label="Password" s={12} onChange={this.handleChange}/>
                <Input value={confirm} name="confirm" type="password" label="Confirm Password" s={12} onChange={this.handleChange}/>
                <Button type='submit' className='right button'>Submit</Button>
                {loading === true && (
                    <ReactLoading type="spin" color="#7986cb" height={100} width={100} s={2} offset="s4" className='left'/>
                )}
                {error && (
                  <p>{errorMsg}</p>
                )}
              </Col>
            </Row>
          </form>
        </Row>
      </CSSTransition>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    register: (data) => dispatch(registerUser(data))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Registration)
