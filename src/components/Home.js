import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity
} from 'react-native'
import {
    Actions
} from 'react-native-router-flux'

class Home extends React.Component {
    state = {
        name: ''
    }

    render() {
        const { title, nameInput, buttonText } = styles
        const { name } = this.state

        return (
            <View>
                <Text style={title}>
                    Enter your name :
                </Text>
                <TextInput
                    style={nameInput}
                    placeholder='John Snow'
                    onChangeText={(text) => {
                        this.setState({ name: text })
                    }}
                    value={name}
                />
                <TouchableOpacity
                    onPress={() => {
                        Actions.chat({
                            username: this.state.name
                        })
                    }}
                >
                    <Text style={buttonText}>
                        Next
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        marginTop: 20,
        marginLeft: 20,
        fontSize: 20
    },
    nameInput: {
        padding: 5,
        height: 40,
        borderWidth: 2,
        borderColor: 'black',
        margin: 20
    },
    buttonText: {
        marginLeft: 20,
        fontSize: 20
    }
})

export default Home
