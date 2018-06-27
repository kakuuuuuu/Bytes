import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Row,
  Col,
  Button,
  Input
} from 'react-materialize'
import {
  Tab,
  Tabs,
  TabList,
  TabPanel
} from 'react-tabs';
import { PieChart } from 'react-easy-chart';
import Modal from 'react-modal'
import LanguagePreview from './LanguagePreview'
import ProjectPreview from './ProjectPreview'

import { CSSTransition } from 'react-transition-group';
import {
  addLanguage,
  addProject
} from '../../actions'
import 'react-tabs/style/react-tabs.css';

class Dashboard extends Component {

  state = {
    languageModalOpen: false,
    languageName: '',
    projectModalOpen: false,
    projectName: '',
    tab: true,
    showDashboard: false,
    languageData: [],
    projectData: [],
  }

  componentWillMount() {
    Modal.setAppElement('body');
  }
  componentDidMount(){
    console.log(this.refs.pie)
    const languageData = this.props.languages.map(language => (
      {
        key: language.name,
        value: language._projects.length
      }
    ))
    const projectData = [
      {
        key: 'Completed',
        value: this.props.projects.filter(project => project.completion === true).length
      },
      {
        key: 'Incomplete',
        value: this.props.projects.filter(project => project.completion === false).length
      }
    ]
    this.setState({
      showDashboard: true,
      languageData,
      projectData,
    })
  }
  componentWillReceiveProps(nextProps){
    const languageData = nextProps.languages.map(language => (
      {
        key: language.name,
        value: language._projects.length
      }
    ))
    const projectData = [
      {
        key: 'Completed',
        value: nextProps.projects.filter(project => project.completion === true).length
      },
      {
        key: 'Incomplete',
        value: nextProps.projects.filter(project => project.completion === false).length
      }
    ]
    if(nextProps !== this.props){
      this.setState({
        languageData,
        projectData
      })
    }
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  closeModal = () => {
    this.setState(() => ({
      languageModalOpen: false,
      projectModalOpen: false,
      languageName: '',
      projectName: '',
    }))
  }

  submitLanguage = (e) => {
    e.preventDefault();
    const data = {
      user_id: this.props.user._id,
      name: this.state.languageName
    }
    this.props.submitLanguage(data)
    this.closeModal()
  }
  submitProject = (e) => {
    e.preventDefault();
    const data = {
      user_id: this.props.user._id,
      name: this.state.projectName
    }
    this.props.submitProject(data)
    this.closeModal()
  }


  render () {
    const {
      user,
      languages,
      projects
    } = this.props
    const {
      languageModalOpen,
      projectModalOpen,
      languageName,
      projectName,
      showDashboard,
      languageData,
      projectData,
    } = this.state
    return (
        <CSSTransition
          in={showDashboard}
          timeout={900}
          classNames="fade"
          unmountOnExit
        >
          <Row className='fade'>
            {(user && (
              <Col s={12}>
                <h5>Welcome back, {user.first_name}</h5>
                <Row>
                  <Tabs>
                    <TabList>
                      <Tab>Languages</Tab>
                      <Tab>Projects</Tab>
                    </TabList>

                    <TabPanel>
                      <Col s={12} m={6}>
                      {languages && languages.length > 0
                      ? languages.map(language => (
                        <LanguagePreview id={language._id} key={language._id} />
                      ))
                      : <p>No languages started yet.</p>}
                      <Button icon='add' onClick={() => this.setState({languageModalOpen: true})}></Button>
                      </Col>
                      <Col m={6} ref='pie' className='hide-on-small-only'>
                        <PieChart
                          size={260}
                          innerHoleSize={150}
                          labels
                          data={languageData}
                          styles={{
                            '.chart_text': {
                              fontSize: '4em',
                              fill: '#fff'
                            }
                          }}
                        />
                      </Col>
                    </TabPanel>
                    <TabPanel>
                      <Tabs>
                        <TabList>
                          <Tab>Active</Tab>
                          <Tab>Completed</Tab>
                        </TabList>
                        <Col s={12} m={6}>
                        {projects && projects.length > 0
                        ? <div>
                            <TabPanel>
                              {projects.filter(project => project.completion === false).map(project => (
                                <ProjectPreview id={project._id} key={project._id} />
                              ))}
                            </TabPanel>
                            <TabPanel>
                              {projects.filter(project => project.completion === true).map(project => (
                                <ProjectPreview id={project._id} key={project._id} />
                              ))}
                            </TabPanel>
                          </div>
                        : <div>
                            <TabPanel>
                              <p>No Projects added yet.</p>
                            </TabPanel>
                            <TabPanel>
                              <p>No Projects added yet.</p>
                            </TabPanel>
                          </div>}
                          <Button icon='add' onClick={() => this.setState({projectModalOpen: true})}></Button>
                        </Col>
                        <Col m={6} className='hide-on-small-only'>
                          <PieChart
                            size={260}
                            innerHoleSize={150}
                            labels
                            data={projectData}
                            styles={{
                              '.chart_text': {
                                fontSize: '4em',
                                fill: '#fff'
                              }
                            }}
                          />
                        </Col>
                      </Tabs>
                    </TabPanel>
                  </Tabs>
                </Row>
              </Col>
            ))}
            <Col>
              <Modal
                className='create-modal'
                overlayClassName='overlay'
                isOpen={languageModalOpen}
                onRequestClose={this.closeModal}
                contentLabel='Modal-Language'
              >
              {languageModalOpen && (
                <Row>
                  <h4>Add a Language</h4>
                  <form onSubmit={this.submitLanguage}>
                    <Input
                      s={12}
                      className='language-Input'
                      type='text'
                      placeholder='Name'
                      name='languageName'
                      value={languageName}
                      onChange={this.handleChange}
                    />
                    <Button type='submit'>Submit</Button>
                  </form>
                </Row>
              )}
              </Modal>
              <Modal
                className='create-modal'
                overlayClassName='overlay'
                isOpen={projectModalOpen}
                onRequestClose={this.closeModal}
                contentLabel='Modal-Project'
              >
              {projectModalOpen && (
                <Row>
                  <h4>Add a Project</h4>
                  <form onSubmit={this.submitProject}>
                    <Input
                      s={12}
                      className='project-Input'
                      type='text'
                      placeholder='Name'
                      name='projectName'
                      value={projectName}
                      onChange={this.handleChange}
                    />
                    <Button type='submit'>Submit</Button>
                  </form>
                </Row>
              )}
              </Modal>
            </Col>
          </Row>
        </CSSTransition>
    )
  }
}

function mapStateToProps ({ user, languages, projects }) {
  return {
    user: user.data,
    languages,
    projects
  }
}

function mapDispatchToProps (dispatch) {
  return {
    submitLanguage: (data) => dispatch(addLanguage(data)),
    submitProject: (data) => dispatch(addProject(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)
