import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loginUser } from '../../actions'
import {
  Row,
  Col,
  Input,
  Button,
} from 'react-materialize'
import { CSSTransition } from 'react-transition-group';
import ReactLoading from 'react-loading';


class Login extends Component {

  state = {
    email: '',
    password: '',
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
    const { email, password } = this.state
    if(email.length > 0 && password.length > 0) {
      const data = {
        email,
        password
      }
      this.props.login(data).then(result => {
        if(result.status === true){
          this.props.history.push('/dashboard')
        }else {
          this.setState({
            error: true,
            errorMsg: result.msg,
            password: '',
            loading: false
          })
        }
      })
    }

  }

  render() {
    const { email, password, loading, error, errorMsg, showContent } = this.state
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
              <Col className='login' s={10} offset="s1">
                <h4 className='title'>Sign In</h4>
                <Input value={email} name="email" type="email" label="Email" s={6} onChange={this.handleChange}/>
                <Input value={password} name="password" type="password" label="Password" s={6} onChange={this.handleChange}/>
                <Button type='submit' className='right button'>Login</Button>
                {loading === true && (
                    <ReactLoading type="spin" color="#7986cb" height={100} width={50} s={2} offset="s4" className='left'/>
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
    login: (data) => dispatch(loginUser(data))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Login)
