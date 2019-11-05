import React, { Component } from 'react';
import firebase from '../../firebase'


class Mail extends Component{
    constructor(props){
        super(props);
        this.state = {
            to: firebase.getUserMail(),
            message :''
        };

        this.handleUserTo = this.handleTo.bind(this);
        this.handleUserMessage = this.handleMessage.bind(this);
        
        this.writeMail = this.writeMail.bind(this);
    }

    // When the user input changes, set the newNoteContent
    // to the value of what's in the input box.
    
    writeMail(){
        // call a method that sets the noteContent for a note to
        // the value of the input
       if(this.state.message == ''){
           alert('plz enter message');
           return
       }
       else if(! (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.to))){
            alert('pls enter valid mail');
            return
       }
        this.props.addMail(this.state.to ,this.state.message);

        // Set newNoteContent back to an empty string.
        this.setState({
            message: '',
            to : ''
        })
    }

    handleTo(event) {
        this.setState({
          to: event.target.value
        });
      }

      handleMessage(event) {
        this.setState({
          message: event.target.value
        });
      }

    render(){
        return(
            <div className="formWrapper">
                
                <input className="noteInput"
                value={this.state.to} 
                onChange={this.handleUserTo}
                type = "email"
                required/>

                <input className="noteInput"
                value={this.state.message} 
                onChange={this.handleUserMessage}
                placeholder = "message" 
                required/>

                <button className="noteButton"
                onClick={this.writeMail}>Send Mail</button>
            </div>
        )
    }
}

export default Mail;