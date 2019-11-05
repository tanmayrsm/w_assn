import React, { Component } from 'react';
import './NoteForm.css';

class NoteForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            newNoteContent: '',
            level :'⚪'
        };

        this.handleUserInput = this.handleUserInput.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.writeNote = this.writeNote.bind(this);
    }

    // When the user input changes, set the newNoteContent
    // to the value of what's in the input box.
    handleUserInput(e){
        this.setState({
            newNoteContent: e.target.value, // the value of the text input
        })
    }

    writeNote(){
        // call a method that sets the noteContent for a note to
        // the value of the input
        if(this.state.newNoteContent===''){
            alert('Please enter the text');
            return;
        }
            
        this.props.addNote(this.state.newNoteContent ,this.state.level);

        // Set newNoteContent back to an empty string.
        this.setState({
            newNoteContent: '',
            level : '⚪'
        })
    }

    handleChange(event) {
        this.setState({
          level: event.target.value
        });
      }

    render(){
        return(
            <div className="formWrapper">
                <div className = "pop">
                <input className="noteInput"
                placeholder="Write a new note..."
                value={this.state.newNoteContent} 
                onChange={this.handleUserInput}
                required />

            <div className="radio">
                <label>
                    <input type="radio" value="⚪" checked={this.state.level === "⚪"} onChange={this.handleChange} />
                    Low
                </label>
                <label>
                    <input type="radio" value="⭕" checked={this.state.level === "⭕"} onChange={this.handleChange}/>
                    Medium
                </label>
                <label>
                    <input type="radio" value="🔴" checked={this.state.level === "🔴"} onChange={this.handleChange}/>
                    High
                </label>
            </div>
            </div>


                <button className="noteButton"
                onClick={this.writeNote}>Add Note</button>
            </div>
        )
    }
}

export default NoteForm;