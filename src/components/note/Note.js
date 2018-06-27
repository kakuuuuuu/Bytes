import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Row,
  Col,
  Icon
} from 'react-materialize'
import { deleteNote } from '../../actions'
import dateFormat from 'dateformat'

class Note extends Component {

  handleDelete = () => {
    console.log("HELLO")
    this.props.remove()
  }

  render(){
    const { note } = this.props
    return(
      <Row>
        <Col className='note-card speech-bubble' s={12}>
          <p>{note.text}</p>
          <p>{dateFormat(note.date_created, "mmmm dS, yyyy, h:MM TT")}</p>
          <Icon small>edit</Icon><a href="#" onClick={this.handleDelete}><Icon small>delete</Icon></a>
        </Col>
      </Row>
    )
  }
}


function mapDispatchToProps(dispatch, ownProps){
  return{
    remove: () => dispatch(deleteNote(ownProps.note._id))
  }
}

export default connect(
  null,
  mapDispatchToProps,
)(Note)
