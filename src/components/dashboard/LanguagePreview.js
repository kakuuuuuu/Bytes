import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Button } from 'react-materialize'
import { deleteLanguage } from '../../actions'
import Modal from 'react-modal'
import dateFormat from 'dateformat'

class LanguagePreview extends Component {

  state = {
    deleteModalOpen: false,
  }

  render () {
    const { language, submitDelete } = this.props
    const { deleteModalOpen } = this.state
    return (
      <Row s={5} className='language-preview'>
        {language && (
          <Col s={12}>
            <h5><Link to={`/language/${language._id}`}>{language.name}</Link></h5>
            <p> Last Updated: {dateFormat(language.date_updated, "dddd, mmmm dS, yyyy, h:MM TT")}</p>
            <Button className='right' onClick={() => this.setState({deleteModalOpen: true})} icon='delete'></Button>
          </Col>
        )}
        <Modal
          className='create-modal'
          overlayClassName='overlay'
          isOpen={deleteModalOpen}
          onRequestClose={() => this.setState({deleteModalOpen: false})}
          contentLabel='Modal-Project'
        >
        {deleteModalOpen && (
          <Row>
            <h4>Are you sure you want to delete {language.name}?</h4>
            <Button onClick={submitDelete}>Delete</Button>
          </Row>
        )}
        </Modal>
      </Row>
    )
  }
}

function mapStateToProps ( state, ownProps ) {
  return {
    language: state.languages.filter(language => language._id === ownProps.id)[0]
  }
}
function mapDispatchToProps ( dispatch, ownProps ) {
  return {
    submitDelete: () => dispatch(deleteLanguage(ownProps.id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LanguagePreview)
