import React, { Component } from 'react'
import { connect } from 'react-redux'
import Note from '../note/Note'
import {
  Row,
  Col,
  Input,
  Button
} from 'react-materialize'
import {
  addLanguageProject,
  addNote
} from '../../actions'
import { CSSTransition } from 'react-transition-group';
import { Link } from 'react-router-dom'
import Modal from 'react-modal'

class ProjectDetails extends Component {
    state = {
      modalOpen: false,
      languageId: '',
      warning: '',
      noteText: '',
      showContent: false,
    }

    componentDidMount(){
      this.setState({ showContent: true })
    }

    closeModal = () => {
      this.setState({
        modalOpen: false,
        warning: ''
      })
    }
    handleChange = (e) => {
      e.preventDefault();
      this.setState({
        [e.target.name]: e.target.value
      })
    }
    handleNewLanguage = (e) => {
      e.preventDefault();
      if(this.state.languageId !== ''){
        const data = {
          project_id: this.props.project._id,
          language_id: this.state.languageId
        }
        this.props.addToProject(data)
          .then(this.closeModal())
      } else {
        this.setState({
          warning: "No Project Selected"
        })
      }
    }
    handleNewNote = (e) => {
      const { noteText } = this.state
      e.preventDefault();
      if(noteText !== ''){
        const note = {
          text: noteText,
          _language: null,
          _project: this.props.project._id,
          _bug: null,
          _feature: null
        }
        this.props.submitNote(note)
          .then(() => this.setState({ noteText: '' }))
      }
    }

    render(){
      const { project, languages } = this.props
      const { modalOpen, languageId, showContent, noteText } = this.state
      return (
        <CSSTransition
          in={showContent}
          timeout={900}
          classNames="fade"
          unmountOnExit
        >
          <Row className='details fade'>
          {project && (
            <Col s={12}>
              <Row s={12}>
                <Col>
                  <h4 className='title'>{project.name}</h4>
                </Col>
              </Row>
              <Row s={6}>
                <Col s={4} className='lang-list'>
                <h5>Languages Used</h5>
                {project._languages.length > 0
                ? languages.filter(language => project._languages.includes(language.id)).map(language =>
                    <div key={language.id} className='list-item'>
                      <Link to={`/language/${language.id}`}><p className='list-font'>{language.name}</p></Link>
                    </div>
                  )
                : <div>
                    <p>Not using any languages.</p>
                  </div>}
                  <Button icon='add' className='button right' onClick={() => this.setState({ modalOpen: true })}></Button>
                </Col>
                <Col s={6}>
                  <Row className='notes'>
                  {project._notes.length > 0
                  ? <Col s={12}>
                      {project._notes.map(note => (
                        <Note key={note._id} note={note} />
                      ))}
                    </Col>
                  : <Col s={12}>
                      <p>No notes.</p>
                    </Col>}
                  </Row>
                  <Row className='notes-form'>
                    <Input type='textarea' s={12} placeholder='Leave a note...' name='noteText' value={noteText} onChange={this.handleChange}/>
                    <Button s={12} className='button right' onClick={this.handleNewNote}>Add Note</Button>
                  </Row>
                </Col>
              </Row>
              <Modal
                className='create-modal'
                overlayClassName='overlay'
                isOpen={modalOpen}
                onRequestClose={this.closeModal}
                contentLabel='Modal-Project'
              >
              {modalOpen && (
                <Row>
                  <h4>Add a Language</h4>
                  <p>{this.state.warning}</p>
                  <form onSubmit={this.handleSubmit}>
                    <Input
                      s={12}
                      type='select'
                      label="Select a Language"
                      className='language-project-Input'
                      name='languageName'
                      value={languageId}
                      onChange={this.handleChange}>
                        <option value=''>Choose a language</option>
                      {languages && languages.length > 0
                      ? languages.map(language =>
                        <option value={project.id} key={language.id}>{language.name}</option>)
                      : <p>No languages available</p>}
                    </Input>
                    <Button type='submit' onClick={this.handleNewLanguage}>Submit</Button>
                  </form>
                </Row>
              )}
              </Modal>
            </Col>
          )}
          </Row>
        </CSSTransition>
      )
    }
}

function mapStateToProps(state, ownProps) {
  return {
    project: state.projects.filter(project => project._id === ownProps.match.params.id)[0],
    languages: state.languages.map(language => ({ name: language.name, id: language._id}))
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addToProject: (data) => dispatch(addLanguageProject(data)),
    submitNote: (data) => dispatch(addNote(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectDetails)
