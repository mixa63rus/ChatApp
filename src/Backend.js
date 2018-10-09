import firebase from 'firebase'

class Backend {
    uid = ''
    messagesRef = null
    constructor() {
        firebase.initializeApp({
            apiKey: "AIzaSyASfngv1nSvupXBp6T6e0WnKl0DlTjShlM",
            authDomain: "chatapp-f64dc.firebaseapp.com",
            databaseURL: "https://chatapp-f64dc.firebaseio.com",
            projectId: "chatapp-f64dc",
            storageBucket: "chatapp-f64dc.appspot.com",
            messagingSenderId: "591582345682"
        })
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setUid(user.uid)
            } else {
                firebase.auth().signInAnonymously().catch((error) => {
                    alert(error.message)
                })
            }
        })
    }

    setUid(value) {
        this.uid = value
    }

    getUid() {
        return this.uid
    }
    // retrieve the messages from the Backend
    loadMessages(callback) {
        this.messagesRef = firebase.database().ref('messages')
        this.messagesRef.off();
        const onReceiv = (data) => {
            const message = data.val();
            callback({
                _id: data.key,
                text: message.text,
                createdAt: new Date(message.createdAt),
                user: {
                    id: message.user._id,
                    name: message.user.name
                }
            })
        }
        this.messagesRef.limitToLast(20).on('child_added', onReceiv)
    }
    // send the message to the Backend
    sendMessage(message) {
        for (let i = 0; i < message.length; i++) {
            this.messagesRef.push({
                text: message[i].text,
                user: message[i].user,
                createdAt: firebase.database.ServerValue.TIMESTAMP,
            })
        }
    }
    //close the connection to the Backend
    closeChat() {
        if (this.messagesRef) {
            this.messagesRef.off()
        }
    }
}

export default new Backend()
