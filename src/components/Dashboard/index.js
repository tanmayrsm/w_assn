import React, { Component} from 'react'
import { Typography, Paper, Avatar, CircularProgress, Button } from '@material-ui/core'
import firebase from '../firebase'
import { withRouter } from 'react-router-dom'
import Note from './Note/Note'
import NoteForm from './Noteform/NoteForm'
import Mail from'./Mail/Mail'
import axios from 'axios';
import {Link} from 'react-router-dom';
import './dash.css';


if(!firebase.getCurrentUsername()) {
   
}

class DashBoard extends Component{
    constructor(props){
        super(props);
        this.addNote = this.addNote.bind(this);
        this.addMail = this.addMail.bind(this);
        console.log(firebase.getUserId());
        this.state = {
            notes : [
                
            ],
        }
        
    }

    componentWillMount(){
        const previousNotes = this.state.notes;
    
        // DataSnapshot
        firebase.db.child('notes').child(firebase.getUserId()).on('child_added', snap => {
          previousNotes.push({
            id: snap.key,
            noteContent: snap.val().noteContent,
            notePriority : snap.val().notePriority,
            date: snap.val().date,
            time : snap.val().time
          })
    
          this.setState({
            notes: previousNotes
          })
        })
    
        firebase.db.child('notes').child(firebase.getUserId()).on('child_removed', snap => {
          for(var i=0; i < previousNotes.length; i++){
            if(previousNotes[i].id === snap.key){
              previousNotes.splice(i, 1);
            }
          }
    
          this.setState({
            notes: previousNotes
          })
        })


        firebase.db.child('notes').on('child_removed', snap => {
            for(var i=0; i < previousNotes.length; i++){
              if(previousNotes[i].id === snap.key){
                previousNotes.splice(i, 1);
              }
            }
      
            this.setState({
              notes: previousNotes
            })
          })
      }
    
    
    addNote(note ,level){
        const previousnotes = this.state.notes;
        
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() ;
       
        var noon=new Date(today.getFullYear(),today.getMonth(),today.getDate(),12,0,0);
        var ampm = (today.getTime()<noon.getTime())?'am':'pm';
        time = time + ampm;
        
        firebase.db.child('notes').child(firebase.getUserId()).child(date + "__" + time).set(
            {
                id : previousnotes.length + 1 ,
                noteContent : note ,
                notePriority : level,
                date : date,
                time : time 
            })
            
    }
    
    removeNote(noteId){
        console.log("from the parent: " + noteId);
        firebase.db.child('notes').child(firebase.getUserId()).child(noteId).remove();
    }
    delAl(){
        firebase.db.child('notes').child(firebase.getUserId()).remove();
        
    }
    
    async addMail(to ,message){

        if(this.state.notes.length === 0){
            alert('Please enter something in the list');
            return;
        }
        var stringname = "";
        
        let a;
        for(a = 0 ;a < this.state.notes.length ;a++){
            stringname = stringname + this.state.notes[a].noteContent + " ---(priority)" 
                        + this.state.notes[a].notePriority + "\n";
        }
        // console.log('message:'+message);
        // console.log('records of todo:');
        alert('Mail done successfully')
//        console.log(stringname);

        const form = await axios.post('/api/mail',{
            to,
            message ,
            stringname
        },() => {})
    }
    
    render(){
        const { classes } = this.props;
        const styles = theme => ({
            main: {
                width: 'auto',
                display: 'block', // Fix IE 11 issue.
                marginLeft: theme.spacing.unit * 3,
                marginRight: theme.spacing.unit * 3,
                [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
                    width: 400,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                },
            },
            paper: {
                marginTop: theme.spacing.unit * 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
            },
            avatar: {
                margin: theme.spacing.unit,
                backgroundColor: theme.palette.secondary.main,
            },
            submit: {
                marginTop: theme.spacing.unit * 3,
            },
        })
	return (
 
		<div>

				
				
                
               
                <div className = "notesWrapper">
                    <div className = "notesHeader">
                        <div className = "heading">
                            To do list
                        </div>
                        <Typography component="h1" variant="h5" className = "head">
                    Hello { firebase.getCurrentUsername() }      
				</Typography>
                <div className = "kio">
                        <Link to="/login" className = "delall">
                        <Button
                            type="submit"
                            variant="contained"
                            color="secondary"
                            onClick={logout}
                            className = "logout"
                            >
                            Logout
                        </Button>
                        </Link>

                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.delAl}
                            className = "man"
                            >        
                            Delete All
                        </Button> 
                  </div>

                <Mail addMail = {this.addMail}/>
                <div>
                
                 
                        <div className = "notesBody">
                            {
                                this.state.notes.map((note) => {
                                    return(                                       
                                        <Note 
                                            noteContent = {note.noteContent} 
                                            noteId = {note.id} 
                                            notePriority = {note.notePriority} 
                                            key = {note.id}
                                            date = {note.date}
                                            time = {note.time}
                                            removeNote = {this.removeNote}/>
                                    )
                                })
                                
                            }
                        </div>

                        <div className = "notesFooter">
                            <NoteForm addNote = {this.addNote}/>
                        </div>
                    </div>
                </div>

                
                  </div>
                  
            
            
		</div>
    )
    async function logout() {
        await firebase.logout()
        
    }}

     

	
}

export default withRouter(DashBoard)