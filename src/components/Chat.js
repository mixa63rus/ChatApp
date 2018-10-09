import React from 'react'
import {
    View,
    Text
} from 'react-native'
import {
    GiftedChat
} from 'react-native-gifted-chat'
import Backend from '../Backend'

class Chat extends React.Component {
    state = {
        messages: []
    }

    componentWillMount() {

    }

    render() {
        console.log(this.props)
        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={(message) => {
                    Backend.sendMessage(message)
                }}
                user={{
                    _id: Backend.getUid(),
                    name: this.props.username
                }}
            />
        )
    }

    componentDidMount() {
        Backend.loadMessages((message) => {
            this.setState((previousState) => {
                return {
                    messages: GiftedChat.append(previousState.messages, message)
                }
            })
        })
    }
    componentWillUnmount() {
        Backend.closeChat();
    }
}

export default Chat
