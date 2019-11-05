import React, { Component } from 'react';
import './Note.css';
import PropTypes from 'prop-types';

class Note extends Component{

    constructor(props){
        super(props);
        this.noteContent = props.noteContent; 
        this.noteId = props.noteId; 
        this.notePriority = props.notePriority;
        this.date = props.date;
        this.time = props.time;
        this.handleRemoveNote = this.handleRemoveNote.bind(this);
    }

    handleRemoveNote(id){
        this.props.removeNote(id);
    }

    render(){
        return(
            <div className="note fade-in">
                <span className="closebtn" 
                      onClick={() => this.handleRemoveNote(this.date+"__"+this.time)}>
                      &times;
                </span>
                <p className="noteContent">{this.noteContent}</p>
                <span className = "spano">{this.notePriority}</span>
                <p>{this.time}  <span>{this.date}</span>  </p>
            </div>
        )
    }
}

Note.propTypes = {
    noteContent: PropTypes.string
}

export default Note;