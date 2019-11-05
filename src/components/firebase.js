import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firebase-firestore';
import 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyBsq0e9xx1aFdr0BubiHaiMw7gL7mnfFvI",
    authDomain: "todo-86b4e.firebaseapp.com",
    databaseURL: "https://todo-86b4e.firebaseio.com",
    projectId: "todo-86b4e",
    storageBucket: "todo-86b4e.appspot.com",
    messagingSenderId: "964804800479",
    appId: "1:964804800479:web:42dbb7d336b0d2a5a31e6a",
    measurementId: "G-RPBWF5BXCD"
  };

  class Firebase{
      constructor(){    
        app.initializeApp(firebaseConfig);
        this.auth = app.auth();
        this.db = app.database().ref();
      }

    login(email, password) {
		return this.auth.signInWithEmailAndPassword(email, password)
	}

	logout() {
		return this.auth.signOut()
	}

	async register(name, email, password) {
		await this.auth.createUserWithEmailAndPassword(email, password)
		return this.auth.currentUser.updateProfile({
			displayName: name
		})
	}

	addQuote(quote) {
		if(!this.auth.currentUser) {
			return alert('Not authorized')
		}

		return this.db.doc(`users_codedamn_video/${this.auth.currentUser.uid}`).set({
			quote
		})
	}

	isInitialized() {
		return new Promise(resolve => {
			this.auth.onAuthStateChanged(resolve)
		})
	}

	getCurrentUsername() {
		return this.auth.currentUser && this.auth.currentUser.displayName
    }
    
    getUserId(){
        return  this.auth.currentUser.uid
    }

    getUserMail(){
        return this.auth.currentUser.email
    }

	async getCurrentUserQuote() {
		const quote = await this.db.doc(`users_codedamn_video/${this.auth.currentUser.uid}`).get()
		return quote.get('quote')
	}
}

export default new Firebase()