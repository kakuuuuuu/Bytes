import React, { Component } from 'react'
import { connect } from 'react-redux'
import Note from '../note/Note'
import {
  Row,
  Col,
  Input,
  Button
} from 'react-materialize'
import { CSSTransition } from 'react-transition-group';
import { Link } from 'react-router-dom'
import Modal from 'react-modal'
import {
  addLanguageProject,
  updateLanguage,
  addNote
} from '../../actions'

class LanguageDetails extends Component {

  state = {
    modalOpen: false,
    variables: false,
    loops: false,
    objects: false,
    conditionals: false,
    methods: false,
    projectId: '',
    noteText: '',
    warning: '',
    showContent: false,
    updated: false,
  }
  componentDidMount(){
    const { variables, loops, objects, conditionals, methods } = this.props.language
    this.setState({
      showContent: true,
      variables,
      loops,
      objects,
      conditionals,
      methods
    })
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
  handleNewProject = (e) => {
    e.preventDefault();
    if(this.state.projectId !== ''){
      const data = {
        language_id: this.props.language._id,
        project_id: this.state.projectId
      }
      this.props.addToProject(data)
    } else {
      this.setState({
        warning: "No language selected"
      })
    }
  }
  handleCheckbox = (e) => {
    this.setState({
      [e.target.name]: e.target.checked,
      updated: true
    })
  }
  handleSave = () => {
    const { variables, loops, objects, conditionals, methods } = this.state
    const data = {
      id: this.props.language._id,
      update: {
        variables,
        loops,
        objects,
        conditionals,
        methods,
        date_updated: Date.now()
      }
    }
    this.props.saveLanguage(data)
      .then(() => this.setState({ updated: false }))
  }
  handleNewNote = (e) => {
    const { noteText } = this.state
    e.preventDefault();
    if(noteText !== ''){
      const note = {
        text: noteText,
        _language: this.props.language._id,
        _project: null,
        _bug: null,
        _feature: null
      }
      this.props.submitNote(note)
        .then(() => this.setState({ noteText: '' }))
    }
  }
  render(){
    const { language, projects } = this.props
    const { modalOpen, noteText, variables, loops, objects, conditionals, methods, projectId, showContent, updated } = this.state
    return (
      <CSSTransition
        in={showContent}
        timeout={900}
        classNames="fade"
        unmountOnExit
      >

          {language && (
            <Row className='details fade'>
              <Col s={4}>
                <Row s={12} className='proj-list'>
                  <Col s={12}>
                    <h4>{language.name}</h4>
                  </Col>
                  <Col s={12}>
                    <h5>Used in...</h5>
                    {language._projects.length > 0
                    ? projects.filter(project => language._projects.includes(project.id)).map(project =>
                        <div
                          key={project.id}
                          className='list-item'
                        >
                          <Link to={`/project/${project.id}`}><p className='list-font'>{project.name}</p></Link>
                        </div>
                      )
                    : <div>
                        <p>Not currently used in any projects.</p>
                      </div>}
                      <Button icon='add' className='button right' onClick={() => this.setState({ modalOpen: true })}></Button>
                  </Col>
                </Row>
              </Col>
              <Col s={4} className='checklist'>
                <Row s={12}>
                  <h5>Learned..</h5>
                </Row>
                <Row s={12}>
                  <Input type='checkbox' label='variables' name='variables' checked={variables} onChange={this.handleCheckbox}/>
                </Row>
                <Row s={12}>
                  <Input type='checkbox' label='loops' name='loops' checked={loops} onChange={this.handleCheckbox}/>
                </Row>
                <Row s={12}>
                  <Input type='checkbox' label='objects' name='objects' checked={objects} onChange={this.handleCheckbox}/>
                </Row>
                <Row s={12}>
                  <Input type='checkbox' label='conditionals' name='conditionals' checked={conditionals} onChange={this.handleCheckbox}/>
                </Row>
                <Row s={12}>
                  <Input type='checkbox' label='methods' name='methods' checked={methods} onChange={this.handleCheckbox}/>
                </Row>
                <CSSTransition
                  in={updated}
                  timeout={500}
                  classNames="fade"
                  unmountOnExit
                >
                  <Button className='button right fade' icon='save' onClick={this.handleSave}></Button>
                </CSSTransition>
              </Col>
              <Col s={4}>
                <Row className='notes'>
                {language._notes.length > 0
                ? <Col s={12}>
                    {language._notes.map(note => (
                      <Note key={note._id} note={note} />
                    ))}
                  </Col>
                : <Col s={12}>
                    <p>No notes.</p>
                  </Col>}
                </Row>
                <Row className='notes-form'>
                  <Input type='textarea' s={12} placeholder='Leave a note...' name='noteText' value={noteText} onChange={this.handleChange}/>
                  <Button s={12} className='button right' icon='message' onClick={this.handleNewNote}></Button>
                </Row>
              </Col>
              <Modal
                className='create-modal'
                overlayClassName='overlay'
                isOpen={modalOpen}
                onRequestClose={this.closeModal}
                contentLabel='Modal-Project'
              >
              {modalOpen && (
                <Row>
                  <h4>Add to a Project</h4>
                  <p>{this.state.warning}</p>
                  <form onSubmit={this.handleNewProject}>
                    <Input
                      s={12}
                      type='select'
                      label="Select a Project"
                      className='language-project-Input'
                      name='projectId'
                      value={projectId}
                      onChange={this.handleChange}>
                        <option value=''>Choose a project</option>
                      {projects && projects.length > 0
                      ? projects.map(project =>
                        <option value={project.id} key={project.id}>{project.name}</option>)
                      : <p>No projects available</p>}
                    </Input>
                    <Button type='submit'>Submit</Button>
                  </form>
                </Row>
              )}
              </Modal>
            </Row>
          )}
      </CSSTransition>
    )
  }

}

function mapStateToProps(state, ownProps) {
  return {
    language: state.languages.filter(language => language._id === ownProps.match.params.id)[0],
    projects: state.projects.map(project => ({ name: project.name, id: project._id}))
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addToProject: (data) => dispatch(addLanguageProject(data)),
    saveLanguage: (data) => dispatch(updateLanguage(data)),
    submitNote: (data) => dispatch(addNote(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LanguageDetails)
